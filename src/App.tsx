import { Route, Routes } from "react-router";
import ChiefWardenRoutes from "./routes/ChiefWarden";
import StudentRoutes from "./routes/Student";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/*" element={`NOT FOUND`} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/chief-warden/*" element={<ChiefWardenRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
