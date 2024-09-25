import { Route, Routes } from "react-router-dom";
import Home from "../company/pages/Home";
import About from "../company/pages/About";

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
};

export default CompanyRoutes;
