import { useTranslation } from "react-i18next";
import './i18n'
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage";
import './App.scss';
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";
import { Doctors } from "./pages/doctors/Doctors";
import { DoctorProfile } from "./pages/doctorPofile/DoctorProfile";
import { AppointmentPage } from "./pages/appointmentPage/AppointmentPage";
import { BookingConfirmation } from "./pages/bookingConfirmation/BookingConfirmation";

function App() {
  const { t, i18n } = useTranslation();
  const lng = Cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="login" element={<Login t={t} />} />
        <Route path="signup" element={<SignUp t={t} />} />
        <Route path="doctors" element={<Doctors t={t} />} />
        <Route path="doctor/:id" element={<DoctorProfile t={t} />} />
        <Route path="appointment" element={<AppointmentPage t={t} />} />
        <Route path="bookingconfirmation" element={<BookingConfirmation t={t} />} />
        
        
      </Routes>
    </>
  );
}

export default App;
