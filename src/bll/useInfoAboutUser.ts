import { useState, useEffect, useRef } from "react";

export const useInfoAboutUser = () => {
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (loginRef.current && !loginRef?.current?.contains(e.target as Node)) {
      setIsOpenInfo(false);
    }
  };

  return {
    isOpenInfo,
    loginRef,
    changeIsOpenInfo: () => {
      setIsOpenInfo((prev) => !prev);
    },
  };
};
