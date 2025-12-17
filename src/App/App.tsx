import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  RegistrationPage,
  AuthorizationPage,
  MainPage,
  ErrorPage,
} from "@/pages";
import { getAuthData } from "@/bll/auth";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import style from "./app.module.scss";

export default function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const { userInfo } = getAuthData();

  return (
    <div className={style.app}>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<MainPage dataAuth={userInfo} />} />
        <Route
          path="/authorization"
          element={<AuthorizationPage setShowHeader={setShowHeader} />}
        ></Route>
        <Route
          path="/registration/*"
          element={<RegistrationPage setShowHeader={setShowHeader} />}
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
