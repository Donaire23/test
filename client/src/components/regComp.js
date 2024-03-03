  import { useState, useEffect } from 'react'
  import {Link, useNavigate} from 'react-router-dom'
  import Axios, { HttpStatusCode } from 'axios'
  import { setFullName, setEmailAddress, setPassword, setRepeatPassword, setLoading, setModalIsOpen } from '../actions/reg'
  import { setReg } from '../actions/reg'
  import { UseSelector, useDispatch, useSelector } from 'react-redux'
  import Cookies from 'js-cookie'
  import { css } from '@emotion/react';
  import { CircleLoader } from 'react-spinners';
  import Modal from 'react-modal';
  import Spinner from 'react-bootstrap/Spinner';

  const RegisterComponent = () => {

    const dispatch = useDispatch();
    const fullName = useSelector((state) => state.Register.full_name);
    const emailAddress = useSelector((state) => state.Register.email_address);
    const password = useSelector((state) => state.Register.password);
    const repeatPass = useSelector((state) => state.Register.repeatPassword);
    const Navigate = useNavigate()
    const response = useSelector((state) => state.Register.responseData);
   
    const isLoading = useSelector((state) => state.Register.loading);
    const modalIsOpen = useSelector((state) => state.Register.modalIsOpen)

    const res = useSelector((state) => state.Register.errors)

    const SubmitReg = async(e) => {

 
      dispatch(setLoading(true));
      dispatch(setModalIsOpen(true));

        try {
          e.preventDefault();
          await dispatch(setReg({
            email: emailAddress,
            name: fullName,
            password: password
          }));
        } catch (error) {
  
        } finally {
          setTimeout(() => {
            dispatch(setLoading(false));
            dispatch(setModalIsOpen(false));
          }, 2000);
        }

  
    }


      const token = Cookies.get('authToken');
  
      if (token) {
        Navigate('/welcome');
        return null;
      } 
    
    return (

      <>
        <div className="container-md ">

          <div className="text-center mt-3">
            <h4>Register</h4>
            <p className="sign-in-text">Get your Todoist account now.</p>
          </div>

          <div className="d-flex justify-content-center mt-5">

              <form className="form-container row d-flex justify-content-center col-lg-5 pb-5 pt-5">

                <div  className="d-flex flex-column col-lg-8 mb-3">
                  <label className="mb-2" htmlFor="emailLogin">Full Name</label>
                  <input  value={fullName} onChange={((e) => dispatch(setFullName(e.target.value)))}  type="text" className="pt-2 pb-2  col-lg-12" id="emailLogin"/>
                </div>

                <div className="d-flex flex-column col-lg-8 mb-3">
                  <label className="mb-2" htmlFor="emailLogin">Email Address</label>
                  <input value={emailAddress} onChange={((e) => dispatch(setEmailAddress(e.target.value)))}  type="text" 
                     className={`pt-2 pb-2 col-lg-12`}  id="emailLogin"/>
                </div>

                <div className="d-flex flex-column col-lg-8 mb-4">
                  <label className="mb-2" htmlFor="passLogin">Password</label>
                  <input value={password} onChange={((e) => dispatch(setPassword(e.target.value)))} type="password" className="pt-2 pb-2" id="passLogin"/>
                </div>

                <div className="d-flex flex-column col-lg-8 mb-4">
                  <label className="mb-2" htmlFor="passLogin">Repeat Password</label>
                  <input value={repeatPass} onChange={((e) => dispatch(setRepeatPassword(e.target.value)))} type="password" className="pt-2 pb-2" id="passLogin"/>
                </div> 

                <div className="col-lg-8">
                <button onClick={SubmitReg} className="bg bg-dark pt-2 pb-2 col-lg-12" >Register</button>
                </div>

              
              </form>

          </div>

          <div className="d-flex justify-content-center mt-3  ">

            <div>

            <p className='text-center'>Already have an account ? <span><Link className="signup-link" to='/'>Sign in</Link></span></p>
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


  export default RegisterComponent
