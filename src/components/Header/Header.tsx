import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuthData } from "@/bll/auth";
import logo from "@/assets/icons/logo.svg";
import iconUser from "@/assets/icons/user.svg";
import style from "./header.module.scss";

export default function Header() {
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const { userInfo, userSignOut } = getAuthData();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref?.current?.contains(e.target as Node)) {
      setIsOpenInfo(false);
    }
  };

  return (
    <header className={style.header}>
      <div className={style["header-container"]}>
        <Link to="/" className={style["header-logo"]}>
          <img src={logo} alt="logo" />
        </Link>
        <div ref={ref} className={style["header-login"]}>
          {userInfo ? (
            <>
              <img
                onClick={() => setIsOpenInfo((prev) => !prev)}
                src={iconUser}
                className={style["header-login-icon"]}
                alt="user"
              />
              {isOpenInfo && (
                <div className={style["header-login-inner"]}>
                  <div className={style["header-login-info"]}>
                    <div>
                      <b>Имя: </b>
                      {userInfo.name}
                    </div>
                    <div>
                      <b>Email:</b> {userInfo.email}
                    </div>
                  </div>

                  <div
                    onClick={userSignOut}
                    className={style["header-signout-btn"]}
                  >
                    Выход
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={style["header-signin-btn"]}>
              <Link to="/authorization" className="link">
                Авторизация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
