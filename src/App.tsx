import { Route, Routes } from "react-router";
import ChiefWardenRoutes from "./routes/ChiefWarden";
import StudentRoutes from "./routes/Student";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/*" element={`NOT FOUND`} />
        <Route path="/students/*" element={<StudentRoutes />} />
        <Route path="/staffs/*" element={<StudentRoutes />} />
        <Route path="/chief-wardens/*" element={<ChiefWardenRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
