import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig.ts";
import {
  getDatabase,
  ref,
  onValue,
  get,
  set,
  push,
  update,
  remove,
} from "firebase/database";

import type {
  DataProductsType,
  RegFormType,
  ModalFormType,
} from "@/types/index";
import { User } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function getData<Data>(path: string): Promise<Data | null> {
  const dataRef = ref(database, "/" + path);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => reject(error)
    );
  });
}

export function updateCart(item: DataProductsType, uid: string) {
  const dataRef = ref(database, "/cart/" + uid);
  const refKey = push(dataRef).key;
  return push(dataRef, { ...item, key: refKey });
}

export function changeItemCart(
  item: DataProductsType,
  uid: string,
  key: string
) {
  const dataRef = ref(database, "/cart/" + uid + "/" + key);
  return update(dataRef, item);
}

export function deleteItemCart(uid: string, key: string) {
  const dataRef = ref(database, "/cart/" + uid + "/" + key);
  return remove(dataRef);
}

export function addRegData<DataType extends User | RegFormType>(
  data: DataType,
  uid: string
) {
  if ("promo" in data && "agreement" in data) {
    const userInfo = {
      name: data.displayName,
      email: data.email,
      uid: uid,
      promo: data.promo,
      agreement: data.agreement,
    };
    return update(ref(database, "users/" + uid), userInfo);
  } else {
    const userInfo = {
      name: data.displayName,
      email: data.email,
      uid: uid,
    };
    return update(ref(database, "users/" + uid), userInfo);
  }
}
export function addOrderData(
  info: ModalFormType,
  cartItems: DataProductsType[],
  uid: string,
  email: string
) {
  const orderRef = ref(database, "order/" + uid);
  const cartItemsRef = ref(database, "order/" + uid + "/cartItems");

  get(cartItemsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        cartItems.forEach((item) => {
          push(cartItemsRef, item);
        });
        
      } else {
        const order = {
          info: { ...info, email },
          cartItems: cartItems,
        };
        set(orderRef, order);
      }
    })
    .catch((error) => {
      console.error("Ошибка при записи заказа:", error);
    });
}

export function deleteAllCart(uid: string) {
  const dataRef = ref(database, "/cart/" + uid);
  return remove(dataRef);
}
