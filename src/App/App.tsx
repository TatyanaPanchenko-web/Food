import React, { Suspense } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useGetAuthData } from "@/bll/useGetAuthData";

const RegistrationPage = React.lazy(() => import("@/pages/RegistrationPage/RegistrationPage"));
const AuthorizationPage = React.lazy(() => import("@/pages/AuthorizationPage/AuthorizationPage"));
const MainPage = React.lazy(() => import("@/pages/MainPage/MainPage"));
const ErrorPage = React.lazy(() => import("@/pages/ErrorPage/ErrorPage"));

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import style from "./app.module.scss";

export default function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const { userInfo } = useGetAuthData();

  return (
    <div className={style.app}>
      {showHeader && <Header />}
      <Suspense fallback={<Loader />}>
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
      </Suspense>
      <Footer />
    </div>
  );
}
