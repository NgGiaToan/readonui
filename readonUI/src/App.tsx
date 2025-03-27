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

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element ={<SignInPage></SignInPage>}></Route>
        <Route path="/signup" element ={<SignUpPage></SignUpPage>}></Route>
        <Route path="/forgot_password" element ={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
        <Route path="/check_otp" element={<CheckOtpPage></CheckOtpPage>}></Route>
        <Route path="/reset_password" element={<ResetPasswordPage></ResetPasswordPage>}></Route>
        
        <Route element={<ProtectedRoute allowRoles={["Admin"]}></ProtectedRoute>}>
          <Route path="/admin_dashboard" element={<Admin_DashboardPage></Admin_DashboardPage>}></Route>
          <Route path="/admin_catalog" element={<Admin_Catalog></Admin_Catalog>}></Route>
          <Route path="/admin_books" element={<Admin_Books></Admin_Books>}></Route>
          <Route path="/admin_users" element={<Admin_Users></Admin_Users>}></Route>
          <Route path="/admin_branches" element={<Admin_Branches></Admin_Branches>}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
