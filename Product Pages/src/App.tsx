// App.tsx
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage"; // move your current product page code to ProductPage.tsx

const App = () => {
  return (
    <Routes>
      <Route path="/:id" element={<ProductPage />} />
    </Routes>
  );
};

export default App;