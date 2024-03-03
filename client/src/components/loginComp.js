import { Link, useNavigate, useLocation } from 'react-router-dom';
import {setEmail, setPassword, setLoading, setModalIsOpen} from '../actions/login';
import { setLog } from '../actions/login';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Spinner from 'react-bootstrap/Spinner';

  const LoginComponents = () => {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
   
    const email = useSelector((state) => state.Login.email);
    const password = useSelector((state) => state.Login.password);

    const isLoading = useSelector((state) => state.Login.loading);
    const modalIsOpen = useSelector((state) => state.Login.modalIsOpen)


    const submit = (e) => {
      e.preventDefault()
      dispatch(setLoading(true));
      dispatch(setModalIsOpen(true));

      try {

        dispatch(setLog({
          email: email,
          password: password
        }))

      } catch(error) {

      } finally {
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(setModalIsOpen(false));
        }, 2000);
      }
    
    }

    const CheckToken = () => {
      const token = Cookies.get('authToken');
  
      if (token) {
        Navigate('/welcome');
        return null;
      }
    };
  useEffect(() => {

    CheckToken()

  }, [])


   
    return (

      <>
        <div className="container-md ">
          <div className="text-center mt-5">
            <h4>Sign in</h4>
            <p className="sign-in-text">Sign in to continue.</p>
          </div>
          <div className="d-flex justify-content-center mt-5">
              <form className="form-container row d-flex justify-content-center col-lg-5 pb-5 pt-5">
                
                <div className="d-flex flex-column col-lg-8 mb-3">
                  <label className="mb-2" htmlFor="emailLogin">Email Address</label>
                  <input value={email} onChange={((e) => dispatch(setEmail(e.target.value)))} type="text" className="pt-2 pb-2  col-lg-12" id="emailLogin"/>
                </div>

                <div className="d-flex flex-column col-lg-8 mb-4">
                  <label className="mb-2" htmlFor="passLogin">Password</label>
                  <input value={password} onChange={((e) => dispatch(setPassword(e.target.value)))} type="password"  className="pt-2 pb-2" id="passLogin"/>
                </div>

                <div className="d-flex col-lg-8 mb-4 flex-row justify-content-around">

                  <div className="me-5">
                    <input type="checkbox"/>
                    <span className="ms-1">Remember me</span>
                  </div>
                
                  <div className="ms-4 forgot-parent">
                    <span className='forgot-span'><Link className="text-decoration-none forgot-link">Forgot Password?</Link></span>
                  </div>
                  
                </div>

                <div className="col-lg-8">
                  <button onClick={submit} className="bg bg-dark pt-2 pb-2 col-lg-12">Sign in</button>
                </div>

              </form>

          </div>

          <div className="d-flex justify-content-center mt-5 ">

            <div>

            <p className='text-center'>Dont have an account? <span><Link className="signup-link" to='/register'>Signup now</Link></span></p>
            <p>©2024 Today-Todoist. Created by Saint Frances</p>

            </div>
            
          </div>

        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => dispatch(setModalIsOpen(false))}
          contentLabel="Loading Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',  
              transform: 'translate(-50%, -50%)',
              padding: 0,
              border: 'none', 
              borderRadius: '8px'
            }
          }}
          shouldCloseOnOverlayClick={false} 
          shouldCloseOnEsc={false} 
        >
         <div className="text-center p-5" style={{  overlay: {  backgroundColor: 'rgba(0, 0, 0, 0.5)' }, border: 'none' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
         </Spinner>

        </div>
      
   
        </Modal>

      </>

    )
  }

  export default LoginComponents
