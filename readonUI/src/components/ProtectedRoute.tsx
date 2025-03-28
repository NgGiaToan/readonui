import {useNavigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useEffect} from "react";

const ProtectedRoute = ({allowRoles}: { allowRoles?: string[]}) => {
    const {role} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!role) {
          navigate("/signin");
          return;
        }

        if (!allowRoles){
          navigate("/user_dashboard");
          return;
        }
        else {  
          if (!allowRoles.includes(role)) {
            if (role === "User") {
              navigate("/user_dashboard");
            } else if (role === "Admin") {
              navigate("/admin_dashboard");
            } else {
              navigate("/not-authorized");
            }
          }
        }
      }, [role, allowRoles, navigate]); 

    return  <Outlet></Outlet>;
};

export default ProtectedRoute;