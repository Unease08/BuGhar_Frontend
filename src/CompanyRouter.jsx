import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Team,
  Program,
  Bar,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  CompanyInfo,
  CompanyVerification,
  AddProgram,
  UpdateProgram,
} from "./company/scenes"; // Company scenes
import NotFound from "./user/pages/NotFound"; // NotFound component

const CompanyRouter = () => {
  return (
    <Routes>
      {/* Public routes */}

      {/* Protected routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/company-verification" element={<CompanyVerification />} />
      <Route path="/Program" element={<Program />} />
      <Route path="/add-program" element={<AddProgram />} />
      <Route path="/update-program/:id" element={<UpdateProgram />} />
      <Route path="/company-info" element={<CompanyInfo />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/bar" element={<Bar />} />
      <Route path="/pie" element={<Pie />} />
      <Route path="/stream" element={<Stream />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/geography" element={<Geography />} />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CompanyRouter;
