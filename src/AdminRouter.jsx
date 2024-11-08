import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  CompanyVerification,
} from "./admin/scenes";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/company" element={<CompanyVerification />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/form" element={<Form />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/bar" element={<Bar />} />
      <Route path="/pie" element={<Pie />} />
      <Route path="/stream" element={<Stream />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/geography" element={<Geography />} />
    </Routes>
  );
};

export default AdminRouter;
