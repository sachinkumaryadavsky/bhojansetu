import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RestaurantDashboard from "../pages/RestaurantDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant" element={<RestaurantDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
