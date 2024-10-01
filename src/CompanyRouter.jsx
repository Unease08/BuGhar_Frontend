import React from "react";
import { Routes, Route } from "react-router-dom";
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
} from "./company/scenes"; // Company scenes
import NotFound from "./user/pages/NotFound"; // NotFound component

const CompanyRouter = () => {
  return (
    <Routes>
      {/* Public routes */}

      {/* Protected routes */}
      <Route path="/" element={<Dashboard />} />
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

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CompanyRouter;
