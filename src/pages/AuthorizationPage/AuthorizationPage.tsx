import { useEffect } from "react";
import { Link } from "react-router-dom";
import Autorization from "@/components/Autorization/Autorization";
import style from "./authorizationPage.module.scss";

type AuthorizationPagePropsType = {
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthorizationPage({
  setShowHeader,
}: AuthorizationPagePropsType) {
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, []);

  return (
    <div className={style.autorization}>
      <Autorization />
      <Link to="/registration" className="link underline">
        Регистрация
      </Link>
    </div>
  );
}
