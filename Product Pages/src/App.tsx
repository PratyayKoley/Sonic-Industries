// App.tsx
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage"; 
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/admin/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/:slug" element={<ProductPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
