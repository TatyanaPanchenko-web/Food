import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMask } from "@react-input/mask";
import { addOrderData } from "@/services/FB";
import { deleteAllCart } from "@/services/FB";
import shopStore from "@/store/shopStore";
import { UserInfoType, ModalFormType } from "@/types/index";
import style from "./modalDelivery.module.scss";

type ModalDeliveryPropsType = {
  setModalDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmittedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  dataAuth: UserInfoType;
};

export default function ModalDelivery({
  setModalDeliveryStatus,
  setSubmittedSuccess,
  dataAuth,
}: ModalDeliveryPropsType) {
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
    addOrderData(data, cartElements.data, userUIdFB);
    changeUpload();
    deleteAllCart(userUIdFB);
    setModalDeliveryStatus(false);
    setSubmittedSuccess(true);
  };

  return (
    <div>
      <div
        className={style.modal}
        onClick={() => {
          setModalDeliveryStatus(false);
        }}
      >
        <div
          className={style["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={style["modal-close"]}
            onClick={() => {
              setModalDeliveryStatus(false);
            }}
          ></div>

          <div className={style["modal-title"]}>Доставка</div>

          <div className={style["modal-inner"]}>
            <form
              className={style["delivery-form"]}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="Ваше имя"
                value={`${dataAuth?.name ? dataAuth?.name : ""}`}
                {...register("firstName", {
                  required: "Необходимо заполнить данное поле",
                  minLength: {
                    value: 2,
                    message: "Некорректное значение",
                  },
                  maxLength: 30,
                  pattern: {
                    value: /^[A-Za-z, А-Яа-я]+$/i,
                    message: "Поле содержит недопустимые символы",
                  },
                })}
              />
              {errors.firstName && (
                <p className={style.errorField}>{errors.firstName?.message}</p>
              )}

              <input
                placeholder="+375 (__) ___-__-__"
                type="tel"
                {...rest}
                ref={(e) => {
                  ref(e);
                  if (e) {
                    inputPhoneRef.current = e;
                  }
                }}
              />
              {errors.phone && (
                <p className={style.errorField}>{errors.phone?.message}</p>
              )}
              <div className={style["modal-radio"]}>
                <div className={style["modal-radio-item"]}>
                  <label
                    onClick={() => {
                      setChoiceDelivery("carrier");
                    }}
                  >
                    <input
                      {...register("delivery", { required: true })}
                      type="radio"
                      value="carrier"
                      name="methodDelivery"
                      defaultChecked={true}
                    />
                    <span>Доставка</span>
                  </label>
                </div>
                <div className={style["modal-radio-item"]}>
                  <label
                    onClick={() => {
                      setChoiceDelivery("self");
                    }}
                  >
                    <input
                      {...register("delivery", { required: true })}
                      type="radio"
                      value="self"
                      name="methodDelivery"
                    />
                    <span>Самовывоз</span>
                  </label>
                </div>
              </div>

              {choiceDelivery === "carrier" && (
                <div className={style["modal-choice-delivery"]}>
                  <input
                    placeholder="Улица, дом, квартира"
                    type="text"
                    {...register("address", {
                      required: "Необходимо заполнить данное поле",
                      maxLength: 60,
                      minLength: {
                        value: 5,
                        message: "Некорректное значение",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className={style.errorField}>
                      {errors.address?.message}
                    </p>
                  )}

                  <div className={style["modal-inputs"]}>
                    <input
                      placeholder="Этаж"
                      type="number"
                      {...register("floor", {
                        maxLength: 2,
                      })}
                    />

                    <input
                      placeholder="Домофон"
                      type="text"
                      {...register("intercom", {
                        maxLength: 10,
                      })}
                    />
                  </div>
                </div>
              )}
              {choiceDelivery === "self" && (
                <div className={style["modal-choice-self-delivery"]}>
                  <div className={style["modal-points]"]}>
                    <div className={style["modal-radio-item"]}>
                      <label>
                        <input
                          {...register("point", {
                            required: "Необходимо выбрать хотя бы один вариант",
                          })}
                          type="radio"
                          value="pointBoulRozhd"
                        />
                        <span>Рождественский бульвар 1, 10:00 - 23:00</span>
                      </label>
                    </div>
                    <div className={style["modal-radio-item"]}>
                      <label>
                        <input
                          {...register("point", {
                            required: "Необходимо выбрать хотя бы один вариант",
                          })}
                          type="radio"
                          value="pointProsLen"
                        />
                        <span>Ленинградский проспект 70, 10:00 - 22:00</span>
                      </label>
                    </div>
                    <div className={style["modal-radio-item"]}>
                      <label>
                        <input
                          {...register("point", {
                            required: "Необходимо выбрать хотя бы один вариант",
                          })}
                          type="radio"
                          value="pointNovosl"
                        />
                        <span>Новослободская 4, 11:00 - 23:00</span>
                      </label>
                    </div>
                    <div className={style["modal-radio-item"]}>
                      <label>
                        <input
                          {...register("point", {
                            required: "Необходимо выбрать хотя бы один вариант",
                          })}
                          type="radio"
                          value="pointMozhVal"
                        />
                        <span>Можайский вал 10, 10:00 - 22:00</span>
                      </label>
                    </div>
                  </div>
                  {/* <div className={style["modal-map]"]}></div> */}
                  {errors.point && (
                    <p className={style.errorField}>{errors.point?.message}</p>
                  )}
                </div>
              )}
              <input type="submit" value="Оформить" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
