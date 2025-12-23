import style from "./modalSuccess.module.scss";

type ModalSuccessPropsType = {
  changeSubmittedSuccess: (value: boolean) => void;
};
export default function ModalSuccess({
  changeSubmittedSuccess,
}: ModalSuccessPropsType) {
  return (
    <div>
      <div
        className={style.modal}
        onClick={() => {
          changeSubmittedSuccess(false);
        }}
      >
        <div
          className={style["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={style["modal-close"]}
            onClick={() => {
              changeSubmittedSuccess(false);
            }}
          ></div>
          <div className={style["modal-title"]}>Спасибо!</div>
          <div className={style["modal-inner"]}>
            <div>Ваш заказ оформлен</div>
          </div>
        </div>
      </div>
    </div>
  );
}
