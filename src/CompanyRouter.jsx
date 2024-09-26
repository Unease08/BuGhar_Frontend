import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  // Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./company/scenes";

const CompanyRouter = () => {
  return (
    
      <Routes>
        
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          {/* <Route path="/line" element={<Line />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
       
      </Routes>

  );
};

export default CompanyRouter;
