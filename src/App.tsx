import { Route, Routes } from "react-router";
import ChiefWardenRoutes from "./routes/ChiefWarden";
import StudentRoutes from "./routes/Student";
import { BrowserRouter } from "react-router-dom";
import ReactToastify from "./components/UI/ReactToastify";
import StaffRoutes from "./routes/Staff";
import { AppDispatch, RootState } from "./config/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import StudentLogin from "./pages/student/Login";

function App() {
  return (
    <>
      <ReactToastify />
      <BrowserRouter>
        <Routes>
          <Route path="/students/*" element={<StudentRoutes />} />
          <Route path="/" element={<StudentLogin />} />
          <Route path="/staffs/*" element={<StaffRoutes />} />
          <Route path="/chief-wardens/*" element={<ChiefWardenRoutes />} />
          <Route path="/*" element={`NOT FOUND`} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// TS config for Redux
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default App;
