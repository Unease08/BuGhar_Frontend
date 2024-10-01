import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import VerifyEmail from "../components/auth/VerifyEmail";
import GoogleCallback from "../components/auth/GoogleCallback";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import AuthIdentity from "../components/auth/AuthIdentity";
import ResearcherRegister from "../components/auth/ResearcherRegsiter";
import CompanyRegister from "../components/auth/CompanyRegister";
import HomePage from "../user/pages/homepage/HomePage";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/auth/login" element={<Login />} exact />
      <Route path="/auth/verify-email/:id" element={<VerifyEmail />} exact />
      <Route path="/oauth/callback" element={<GoogleCallback />} exact />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} exact />
      <Route path="/auth/reset-password" element={<ResetPassword />} exact />
      <Route path="/auth/identity" element={<AuthIdentity />} exact />
      <Route path="/auth/company/register" element={<CompanyRegister />} exact />
      <Route path="/auth/researcher/register" element={<ResearcherRegister />} exact />
    </Routes>
  );
};

export default AuthRoutes;
