import { UseSelector, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PrivateRoute = ({element}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    const token = Cookies.get('authToken');
    
    if (token) {
   
      setIsAuthenticated(true);

    } else {
     
      setIsAuthenticated(false);

    }
  });



    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;

};

export default PrivateRoute;
