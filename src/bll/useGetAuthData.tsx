import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getData } from "@/services/FB";
import { UserInfoType } from "@/types/index";

export const useGetAuthData = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const listenUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUserFromBD: Promise<UserInfoType | null> = getData(
          `users/${user.uid}`
        );
        getUserFromBD.then((result) => {
          setUserInfo(result);
        });
      } else {
        setUserInfo(null);
      }
    });
    return () => {
      listenUser();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    userInfo,
    userSignOut,
  };
};
