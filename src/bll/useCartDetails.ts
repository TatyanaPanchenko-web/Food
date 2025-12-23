import { useState } from "react";
import { useNavigate } from "react-router-dom";
import shopStore from "@/store/shopStore";
import { deleteAllCart } from "@/services/FB";
import { UserInfoType } from "@/types/index";

export const useCartDetails = (dataAuth?: UserInfoType | null | undefined) => {
  const [modalDeliveryStatus, setModalDeliveryStatus] =
    useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { cartElements, changeUpload } = shopStore;
  const checkPromo = cartElements.data.filter(
    (item) => item.promotion === true
  );
  const handleOrder = () => {
    if (!dataAuth?.uid) {
      navigate("/authorization");
      return;
    }
    setModalDeliveryStatus(true);
  };

  const handleDeleteCart = (uid: string | undefined) => {
    if (!uid) {
      localStorage.removeItem("cart");
      changeUpload();
      return;
    }
    deleteAllCart(uid);
    changeUpload();
  };
  return {
    modalDeliveryStatus,
    submittedSuccess,
    checkPromo,
    handleOrder,
    handleDeleteCart,
    changeModalDeliveryStatus: (value: boolean) => {
      setModalDeliveryStatus(value);
    },
    changeSubmittedSuccess: (value: boolean) => {
      setSubmittedSuccess(value);
    },
  };
};
