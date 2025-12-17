import { changeCountCartItem } from "@/common/cartHandler";
import { addItemCart } from "@/common/cartHandler";
import shopStore from "@/store/shopStore";
import { DataProductsType } from "@/types/index";
import style from "./modalProduct.module.scss";

type ModalProductPropsType = {
  item: DataProductsType;
  imgUrl: string;
  setModalProductStatus: React.Dispatch<React.SetStateAction<boolean>>;
  userUid: string | undefined;
};

export default function ModalProduct({
  item,
  imgUrl,
  setModalProductStatus,
  userUid,
}: ModalProductPropsType) {
  const { cartElements, upload } = shopStore;
  const { name, weight, price, description, colorie, ingredients } = item;

  return (
    <div>
      <div
        className={style.modal}
        onClick={() => {
          setModalProductStatus(false);
        }}
      >
        <div
          className={style["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={style["modal-close"]}
            onClick={() => {
              setModalProductStatus(false);
            }}
          ></div>
          <div className={style["modal-title"]}>{name}</div>
          <div className={style["modal-inner"]}>
            <div className={style["modal-img"]}>
              <img src={imgUrl} alt={name} />
            </div>

            <div className={style["modal-about"]}>
              <div className={style["modal-description"]}>{description}</div>
              <div className={style["modal-caption-ingredients"]}>Состав:</div>
              <div className={style["modal-ingredients"]}>
                {ingredients
                  ? ingredients.map((el, index) => {
                      return <div key={index}>{el}</div>;
                    })
                  : null}
              </div>
              <div className={style["modal-info"]}>
                {weight}, {colorie}
              </div>
            </div>
          </div>
          <div className={style["modal-bottom"]}>
            <button
              className={style["modal-btn"]}
              onClick={() =>
                addItemCart(item, userUid, cartElements.data,upload,  imgUrl)
              }
            >
              Добавить
            </button>
            <div className={style["modal-total"]}>
              <div className={style["modal-counter"]}>
                <button
                  onClick={() => {
                    cartElements.data.map((el, index) => {
                      if (el.id === item.id) {
                        changeCountCartItem(
                          cartElements.data,
                          false,
                          userUid,
                          el,
                          upload,
                          index
                        );
                      }
                    });
                  }}
                >
                  -
                </button>
                {cartElements.data.length === 0 ||
                !cartElements.data.find((el) => el.id === item.id) ? (
                  <div> 0 </div>
                ) : (
                  <div>
                    {cartElements.data.map((el) => {
                      if (el.id === item.id) {
                        return el.count;
                      }
                    })}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (cartElements.data.length === 0) {
                      addItemCart(item, userUid, cartElements.data, upload,imgUrl);
                      return;
                    }
                    const checkedItem = cartElements.data.find((el) => {
                      return el.id === item.id;
                    });
                    if (!checkedItem) {
                      addItemCart(item, userUid, cartElements.data,upload, imgUrl);
                      return;
                    }
                    cartElements.data.map((el, index) => {
                      if (el.id === item.id) {
                        changeCountCartItem(
                          cartElements.data,
                          true,
                          userUid,
                          el,
                          upload,
                          index
                        );
                      }
                    });
                  }}
                >
                  +
                </button>
              </div>
              <div className={style["modal-price"]}>{price} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
