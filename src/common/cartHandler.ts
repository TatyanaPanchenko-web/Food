import { updateCart, changeItemCart, deleteItemCart } from "@/services/FB";
import shopStore from "@/store/shopStore";
import { DataProductsType, UploadType } from "@/types/index";

const { changeUpload } = shopStore;

export function addItemCart(
  item: DataProductsType,
  uid: string | null | undefined,
  cartElements: DataProductsType[],
  upload: UploadType,
  imgUrl: string
) {
  const fullItem = { ...item, imgUrl };
  let indexElement: number | undefined;
  const checkedItem = cartElements.find((el, index) => {
    indexElement = index;
    return el.id === fullItem.id;
  });

  if (!checkedItem) {
    if (!uid) {
      const checkLocaleCart = localStorage.getItem("cart");
      if (checkLocaleCart) {
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartElements, fullItem])
        );
      } else {
        localStorage.setItem("cart", JSON.stringify([fullItem]));
      }
      changeUpload();
      return;
    }

    updateCart(fullItem, uid).then(() => {
      changeUpload();
    });
    return;
  }

  const newItem = { ...checkedItem, count: checkedItem.count + 1 };

  if (!uid) {
    if (indexElement !== undefined && indexElement !== -1) {
      const newCartArr = [
        ...cartElements.slice(0, indexElement),
        newItem,
        ...cartElements.slice(indexElement + 1),
      ];
      localStorage.setItem("cart", JSON.stringify(newCartArr));
    }
    changeUpload();
    return;
  }
  if (upload.dataKeys) {
    if (indexElement !== undefined && upload.dataKeys[indexElement]) {
      changeItemCart(newItem, uid, upload.dataKeys[indexElement]).then(() => {
        changeUpload();
        return;
      });
    }
  }
}

export function getItemsCount(
  cartElements: DataProductsType[],
  price: boolean = false
): number {
  let allTotalCount = 0;
  let allTotalPrice = 0;
  cartElements.forEach((item) => {
    allTotalCount += item.count;
    allTotalPrice += Number(item.price) * item.count;
  });
  return price ? allTotalPrice : allTotalCount;
}

export function changeCountCartItem(
  cartElements: DataProductsType[],
  flag: boolean,
  uid: string | null | undefined,
  item: DataProductsType,
  upload: UploadType,
  indexElement: number
): void | null {
  if (!uid) {
    let localIndexElement: number | undefined;
    const checkedItem = cartElements.find((el, index) => {
      localIndexElement = index;
      return el.id === item.id;
    });

    if (!checkedItem) return;

    let newItem: DataProductsType;
    if (flag) {
      newItem = { ...checkedItem, count: item.count + 1 };
    } else {
      newItem = { ...checkedItem, count: item.count - 1 };
      if (newItem.count < 1) {
        if (localIndexElement !== undefined && localIndexElement !== -1) {
          const newCartArr = [
            ...cartElements.slice(0, localIndexElement),
            ...cartElements.slice(localIndexElement + 1),
          ];
          localStorage.setItem("cart", JSON.stringify(newCartArr));
          changeUpload();
          return;
        }
      }
    }
    if (localIndexElement !== undefined && localIndexElement !== -1) {
      const newCartArr = [
        ...cartElements.slice(0, localIndexElement),
        newItem,
        ...cartElements.slice(localIndexElement + 1),
      ];
      localStorage.setItem("cart", JSON.stringify(newCartArr));
      changeUpload();
      return;
    }
    return;
  }

  let newItem;

  if (flag) {
    newItem = { ...item, count: item.count + 1 };
  } else {
    newItem = { ...item, count: item.count - 1 };
    if (newItem.count < 1) {
      if (upload.dataKeys) {
        if (upload.dataKeys[indexElement]) {
          deleteItemCart(uid, upload.dataKeys[indexElement]).then(() =>
            changeUpload()
          );
        }
      }
      return null;
    }
  }
  if (upload.dataKeys) {
    if (upload.dataKeys[indexElement]) {
      changeItemCart(newItem, uid, upload.dataKeys[indexElement]).then(() =>
        changeUpload()
      );
    }
  }
}
