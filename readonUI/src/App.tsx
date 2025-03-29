import {Routes, Route} from "react-router-dom";
import { lazy } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const CheckOtpPage = lazy(() => import("./pages/CheckOtpPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

const Admin_DashboardPage = lazy(() => import("./pages/Admin/Admin_DashboardPage"));
const Admin_Catalog = lazy(() => import("./pages/Admin/Admin_Catalog"));
const Admin_Books = lazy(() => import("./pages/Admin/Admin_Books"));
const Admin_Users = lazy(() => import("./pages/Admin/Admin_Users"));
const Admin_Branches = lazy(() => import("./pages/Admin/Admin_Branches"));

const User_DashboardPage = lazy(() => import("./pages/User/User_Dashboard"));
const User_Catalog = lazy(() => import("./pages/User/User_Catalog"));
const User_Books = lazy(() => import("./pages/User/User_Books"));

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/signin" element ={<SignInPage></SignInPage>}></Route>
          <Route path="/signup" element ={<SignUpPage></SignUpPage>}></Route>
          <Route path="/forgot_password" element ={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
          <Route path="/check_otp" element={<CheckOtpPage></CheckOtpPage>}></Route>
          <Route path="/reset_password" element={<ResetPasswordPage></ResetPasswordPage>}></Route>
        </Route>

        
        <Route element={<ProtectedRoute allowRoles={["Admin"]}></ProtectedRoute>}>
          <Route path="/admin_dashboard" element={<Admin_DashboardPage></Admin_DashboardPage>}></Route>
          <Route path="/admin_catalog" element={<Admin_Catalog></Admin_Catalog>}></Route>
          <Route path="/admin_books" element={<Admin_Books></Admin_Books>}></Route>
          <Route path="/admin_users" element={<Admin_Users></Admin_Users>}></Route>
          <Route path="/admin_branches" element={<Admin_Branches></Admin_Branches>}></Route>
        </Route>


        <Route element={<ProtectedRoute allowRoles={["User"]}></ProtectedRoute>}>
          <Route path="/user_dashboard" element={<User_DashboardPage></User_DashboardPage>}></Route>
          <Route path="/user_catalog" element={<User_Catalog></User_Catalog>}></Route>
          <Route path="/user_books" element={<User_Books></User_Books>}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
