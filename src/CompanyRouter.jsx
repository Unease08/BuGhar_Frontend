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
  Report,
  ViewDocument,
} from "./company/scenes"; 
import NotFound from "./user/pages/NotFound"; 
import ReportView from "./company/scenes/report/ReportView";

const CompanyRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/company-verification" element={<CompanyVerification />} />
      <Route path="/view-document" element={<ViewDocument />} />
      <Route path="/Program" element={<Program />} />
      <Route path="/add-program" element={<AddProgram />} />
      <Route path="/update-program/:id" element={<UpdateProgram />} />
      <Route path="/company-info" element={<CompanyInfo />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report-view/:id" element={<ReportView />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/bar" element={<Bar />} />
      <Route path="/pie" element={<Pie />} />
      <Route path="/stream" element={<Stream />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/geography" element={<Geography />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CompanyRouter;
