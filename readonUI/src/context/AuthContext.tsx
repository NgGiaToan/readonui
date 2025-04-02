import { createContext, useContext, useState} from "react";
import {jwtDecode} from "jwt-decode";

interface IAuthContext {
    id : string | null;
    username: string | null;
    fullname: string | null;
    role: string | null;
    accessToken: string | null;
    signin: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | null> (null);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [id, setId] = useState<string | null>(
        localStorage.getItem("id")
    );
    
    const [username, setUsername] = useState<string | null>(
        localStorage.getItem("username")
    );

    const [fullname, setFullname] = useState<string| null>(
        localStorage.getItem("fullname")
    );

    const [role, setRole] = useState<string | null>(
        localStorage.getItem("role")
    );

    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );

    const signin = (accessToken: string, refreshToken: string)=> {
        try {
            const decoded: any = jwtDecode(accessToken);
            const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const fullname = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            
            localStorage.clear();
            setId(id);
            setUsername(username);
            setFullname(fullname);
            setRole(role);
            setAccessToken(accessToken);
            localStorage.clear();
            localStorage.setItem("id", id);
            localStorage.setItem("username", username);
            localStorage.setItem("fullname", fullname);
            localStorage.setItem("role", role);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        } catch (error){
            console.log(error);
        }
    };

    const logout = () => {
        setId(null);
        setUsername(null);
        setFullname(null);
        setRole(null);
        setAccessToken(null);
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("fullname");
        localStorage.removeItem("role");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider value = {{id, username, fullname, role , accessToken, signin, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

