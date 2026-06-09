import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./page/RegisterForm";
import Beranda from "./page/Beranda";
import Competition from "./page/Competition";
import Seminar from "./page/Seminar";
import Workshop from "./page/Workshop";
import Talkshow from "./page/Talkshow";
import LoginForm from "./page/LoginForm";
import MainLayout from "./layouts/MainLayout";
import AuthLayouts from "./layouts/AuthLayouts";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DashboardIndex from "./dashboard/DashboardIndex";
import DashboardLayouts from "./layouts/DashboardLayouts";
import CategoryIndex from "./dashboard/category/CategoryIndex";
import EventIndex from "./dashboard/event/EventIndex";
import CategoryCreate from "./dashboard/category/CategoryCreate";
import EventCreate from "./dashboard/event/EventCreate";
import Biodata from "./dashboard/biodata/biodata";
import CategoryEdit from "./dashboard/category/CategoryEdit";
import UserIndex from "./dashboard/user/UserIndex";
import UserCreated from "./dashboard/user/UserCreated";
import UserEdit from "./dashboard/user/UserEdit";
import PembicaraCreate from "./dashboard/pembicara/PembicaraCreate";
import PembicaraIndex from "./dashboard/pembicara/PembicaraIndex";
import EventEdit from "./dashboard/event/EventEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/dashboard/category/edit/:id" element={<CategoryEdit />} />
          <Route path="/dashboard/category/create" element={<CategoryCreate />} />
          <Route path="/dashboard/user/edit/:id" element={<UserEdit />} />
          <Route path="/pembicara" element={<PembicaraCreate />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/dashboard/event/edit/:id" element={<EventEdit />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/dashboard/user/create" element={<UserCreated />} />
          <Route path="/dashboard/user/edit/:id" element={<UserEdit />} />
        </Route>
        <Route element={<AuthLayouts />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route>
          <Route element={<ProtectedRoutes />}>
            <Route  element={<DashboardLayouts />}>
              <Route path="/dashboard" element={<DashboardIndex />} />
              <Route path="/dashboard/category" element={<CategoryIndex />} />
              <Route path="/dashboard/category/create" element={<CategoryCreate />} />
              <Route path="/dashboard/event" element={<EventIndex />} />
              <Route path="/dashboard/event/create" element={<EventCreate />} />
              <Route path="/dashboard/event/edit/:id" element={<EventEdit />} />
              <Route path="/dashboard/pembicara" element={<PembicaraIndex />} />
              <Route path="/dashboard/pembicara/create" element={<PembicaraCreate/>}/>
              <Route path="/dashboard/user" element={<UserIndex />} />
              <Route path="/dashboard/user/create" element={<UserCreated />} />
              <Route path="/dashboard/user/edit/:id" element={<UserEdit />} />
              <Route path="/dashboard/biodata" element={<Biodata />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
