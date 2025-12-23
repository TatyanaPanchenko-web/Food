import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMask } from "@react-input/mask";
import { addOrderData, deleteAllCart } from "@/services/FB";
import { UserInfoType, ModalFormType } from "@/types/index";
import shopStore from "@/store/shopStore";

type ModalDeliveryFormPropsType = {
  dataAuth: UserInfoType;
  changeSubmittedSuccess: (value: boolean) => void;
  changeModalDeliveryStatus: (value: boolean) => void;
};
export const useModalDeliveryForm = ({
  dataAuth,
  changeSubmittedSuccess,
  changeModalDeliveryStatus,
}: ModalDeliveryFormPropsType) => {
  const { cartElements, changeUpload } = shopStore;
  const [choiceDelivery, setChoiceDelivery] = useState("carrier");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalFormType>();

  const { ref, ...rest } = register("phone", {
    required: "Необходимо заполнить данное поле",
    minLength: {
      value: 19,
      message: "Некорректный номер телефона",
    },
  });

  const inputPhoneRef: React.RefObject<HTMLInputElement> = useMask({
    mask: "+___ (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const userUIdFB: string = dataAuth.uid;
  const onSubmit: SubmitHandler<ModalFormType> = (data) => {
    addOrderData(data, cartElements.data, userUIdFB, dataAuth.email);
    changeUpload();
    deleteAllCart(userUIdFB);
    changeSubmittedSuccess(true);
    changeModalDeliveryStatus(false);
  };

  return {
    choiceDelivery,
    setChoiceDelivery,
    register,
    ref,
    rest,
    handleSubmit,
    errors,
    onSubmit,
    inputPhoneRef,
  };
};
