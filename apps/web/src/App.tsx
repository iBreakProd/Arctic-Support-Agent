import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { DocsPage } from "./components/docs/DocsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<></>} />
          <Route path="/orders" element={<></>} />
          <Route path="/support" element={<></>} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
