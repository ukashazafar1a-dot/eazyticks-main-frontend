"use client";

import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { useCart } from "react-use-cart";
import {
  LoginUser,
  cancelTheOrder,
  completeTheOrder,
  getClientSecret,
  getWishlist,
  placeLayoutOrder,
  placeTheOrder,
  requestHybridOrder,
} from "@/helpers/businessRequests";
import {
  getExtrafieldsFilteredOrder,
  getFilteredOrder,
  returnHybridObject,
  returnLayoutOrderObject,
} from "@/helpers/generals";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { fetchCookie, isTokenExpired } from "@/lib/utils";
import useCookie from "@/hooks/useCookie";
import fetchClient from "@/helpers/fetchClient";
import { UserProfile } from "@/lib/types";

type toastType = "success" | "error" | "info" | "warning";

interface statetypes {
  userProfile: UserProfile | null;
  user: any;
  isAdmin: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  activeStep: string;
  steps: string[];
  clientSecret: string | undefined | null;
  orderId: string | undefined;
  orderPlaced: boolean;
  orderFailed: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  wishlists: any;
  tokenExpired: boolean;
  tkLoading: boolean;
}

const initialState: statetypes = {
  userProfile: null,
  user: null,
  isAdmin: false,
  isLoading: true,
  isLoggedIn: false,
  activeStep: "tickets",
  steps: [],
  clientSecret: undefined,
  orderId: undefined,
  orderPlaced: false,
  orderFailed: false,
  email: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  wishlists: [],
  tokenExpired: false,
  tkLoading: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INIT_BOOKINGS":
      return {
        ...state,
        steps: action.payload.steps,
        activeStep: action.payload.steps[0],
      };
    case "CHANGE_STEP":
      return {
        ...state,
        activeStep: action.payload,
      };
    case "SET_WISHLISTS":
      return {
        ...state,
        wishlists: action.payload,
      };
    case "SET_EXPIRY":
      return {
        ...state,
        tokenExpired: action.payload,
      };
    case "SET_CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };
    case "SET_ORDER_ID":
      return {
        ...state,
        orderId: action.payload,
      };
    case "SET_EMAIL":
      const object = action.payload;
      //console.log(object)
      return {
        ...state,
        email: object.email,
        firstName: object?.firstName ? object?.firstName : null,
        lastName: object?.lastName ? object?.lastName : null,
        phoneNumber: object.phoneNumber ? object.phoneNumber : null,
      };
    case "SET_USER": {
      const { user, isLoggedIn } = action.payload;
      return {
        ...state,
        user,
        isLoggedIn,
      };
    }
    case "SET_ADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };
    case "SET_ORDER_PLACED":
      return {
        ...state,
        orderPlaced: action.payload,
      };
    case "SET_ORDER_FAILED":
      return {
        ...state,
        orderFailed: action.payload,
      };
    case "SET_TKlOADING":
      return {
        ...state,
        tkLoading: action.payload,
      };
    default: {
      return { ...state };
    }
  }
};
type loginData = {
  email: string;
  password: string;
  token: string;
};
const AppContext = createContext({
  ...initialState,
  // addStepOne: () => Promise.resolve(),
  logIn: (data: loginData) => Promise.resolve(),
  logout: () => null,
  updateUserProfile: (name: string, userImageURL: string) => null,
  changeStep: (name: any) => Promise.resolve(),
  placeOrder: (event: any, handlePlaceOrder: any) => Promise.resolve(),
  completeOrder: (event: any) => Promise.resolve(),
  cancelOrder: () => Promise.resolve(),
  initBookings: (event: any) => Promise.resolve(),
  changeEmail: (object: any) => Promise.resolve(),
  setClientSecret: (secret: any) => null,
  setOrderPlaced: (placed: any) => null,
  setUser: (user: any, isLoggedIn: boolean) => null,
  setToaster: (type: toastType, message: string) => null,
  setOrderFailed: (failed: any) => null,
  startTkLoading: (value: boolean) => null,
  handleLayoutOrder: (eventId: any, extraInfo: any) => Promise.resolve(),
  placeHybridOrder: (eventId: any, extraInfo: any) => Promise.resolve(),
});

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cartTotal, items } = useCart();
  const { setCookie, deleteCookie } = useCookie();
  const router = useRouter();

  const updateUserProfile = (name: string, userImageURL: string) => {
    let user = {
      ...state.user,
      name,
      userImageURL,
    };
    setUser(user, true);
  };

  const setUser = async (user: any, isLoggedIn: boolean) => {
    //console.log('user', user, isLoggedIn)
    dispatch({
      type: "SET_USER",
      payload: { user, isLoggedIn },
    });
    if (!user) return;
    if (user && user?.token) {
      const decoded: any = jwtDecode(user?.token);
      //console.log("decoded token", decoded);
      if (decoded) {
        if (
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "Seller" ||
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "Staff"
        ) {
          //console.log("it is a admin", decoded);
          dispatch({
            type: "SET_ADMIN",
            payload: true,
          });
          let object = {
            token: user?.token,
            isAdmin: true,
            tokenExpiryTime: user?.tokenExpiryTime,
          };
          await setCookie(object);
        } else {
          let object = {
            token: user?.token,
            isAdmin: false,
            tokenExpiryTime: user?.tokenExpiryTime,
          };
          dispatch({
            type: "SET_ADMIN",
            payload: false,
          });
          await setCookie(object);
        }
      }
      await fetchUserProfile();
    }
  };

  const logIn = async (values: loginData) => {
    try {
      const { data } = await LoginUser(values);
      //console.log(data)
      if (data?.succeeded === true) {
        setUser(data?.data, true);
        //router.push("/");
      } else {
        console.log("Error>>", data);
      }
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject("Failed to login!");
    }
  };

  const logout = async () => {
    await setUser(null, false);
    dispatch({
      type: "SET_ADMIN",
      payload: false,
    });
    dispatch({
      type: "SET_USER_PROFILE",
      payload: null,
    });
    deleteCookie();
    router.refresh();
  };

  const initBookings = async (event: any) => {
    const steps = calculateSteps(event);
    dispatch({
      type: "INIT_BOOKINGS",
      payload: { event, steps },
    });
  };

  const changeStep = (name: any) => {
    dispatch({
      type: "CHANGE_STEP",
      payload: name,
    });
  };

  const setToaster = (type: toastType, message: string) => {
    switch (type) {
      case "success":
        toast.success(message);
        return;
        break;
      case "error":
        toast.error(message);
        return;
      case "info":
        toast(message);
        return;
        break;
      default:
        toast(message);
        break;
    }
    return true;
  };

  const setClientSecret = (secret: any) => {
    dispatch({
      type: "SET_CLIENT_SECRET",
      payload: secret,
    });
  };

  const setOrderId = (id: any) => {
    dispatch({
      type: "SET_ORDER_ID",
      payload: id,
    });
  };

  const setOrderPlaced = (placed: any) => {
    dispatch({
      type: "SET_ORDER_PLACED",
      payload: placed,
    });
  };

  const setOrderFailed = (failed: any) => {
    dispatch({
      type: "SET_ORDER_FAILED",
      payload: failed,
    });
  };
  const startTkLoading = (value: boolean) => {
    dispatch({
      type: "SET_TKlOADING",
      payload: value,
    });
  };

  const fetchUserProfile = async () => {
    try {
      const result = await fetchClient(`/api/auth/userinfo`);
      //console.log(result);
      if(!result || result?.status == 401){
        await logout();
        return;
      }
      if(result && result.succeeded){
        dispatch({
          type: "SET_USER_PROFILE",
          payload: result?.data,
        });
      }else{
        dispatch({
          type: "SET_USER_PROFILE",
          payload: null,
        });
      }
    } catch (error) {
      console.log('error in fetching user profile', error);
    }
  }

  const changeEmail = async (object: any) => {
    //console.log(object)
    return new Promise((resolve, reject) => {
      dispatch({
        type: "SET_EMAIL",
        payload: object,
      });
      resolve(true);
    });
  };

  function calculateSteps(event: any) {
    let steps: any = [];
    if (event?.tickets && event?.tickets?.length > 0) steps.push("tickets");
    if (event?.parkings && event?.parkings?.length > 0) steps.push("parking");
    if (event?.eventShopItems && event?.eventShopItems?.length > 0)
      steps.push("shop");
    if (event?.deals && event?.deals?.length > 0) steps.push("deals");
    return steps;
  }

  async function placeOrder(event: any, extraFields: any) {
    let order: any = null;
    if (extraFields) {
      order = getExtrafieldsFilteredOrder(
        event,
        extraFields.fields,
        state.email,
        cartTotal
      );
    } else {
      order = getFilteredOrder(event, items, state.email, cartTotal);
    }

    try {
      const { data: response } = await placeTheOrder(order);
      const { data, succeeded, messages } = response;
      //console.log(response);
      if (succeeded) {
        const { clientSecret, orderId, orderType, paymentIntent } = data;
        setOrderId(orderId);
        if (orderType === "Success") {
          setClientSecret(clientSecret);
          return Promise.resolve(response);
        } else if (orderType === "Free") {
          const { data }: any = await completeOrder(null, orderId);
          const { status, message, object } = data;
          if (status === "Error") {
            setClientSecret(null);
          } else if (status == "Success") {
            setOrderPlaced(true);
            router.push(
              "/checkout/thank-you?id=" + object?.id + "&sec=" + object.sec
            );
          }
        }
      } else {
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const handleLayoutOrder = async (
    eventId: string | number,
    extraInfo: any
  ) => {
    try {
      console.log(eventId, extraInfo, items, state);
      let orderObj = null;
      if (extraInfo) {
        orderObj = returnLayoutOrderObject(eventId, state?.email, extraInfo);
      } else {
        orderObj = returnLayoutOrderObject(eventId, state?.email, items);
      }
      //console.log("this is the order ojbect", orderObj);
      const { data: response } = await placeLayoutOrder(orderObj);
      //console.log(response);
      if (response && response?.succeeded) {
        const { clientSecret, orderId, orderType, paymentIntent } =
          response?.data;
        setOrderId(orderId);
        if (orderType === "Success") {
          setClientSecret(clientSecret);
          return Promise.resolve(response);
        } else if (orderType === "Free") {
          const { data: result }: any = await completeOrder(null, orderId);
          //console.log(result);
          if (result && result?.succeeded) {
            const { data } = result;
            setToaster("success", result?.messages[0] || "Order successful.");
            setOrderPlaced(true);
            router.push(
              "/checkout/thank-you?id=" + data?.id + "&sec=" + data?.sec
            );
            return Promise.resolve(result);
          } else {
            setClientSecret(null);
            setToaster("error", result?.messages[0] || "Something went wrong!");
            return Promise.reject(result);
          }
        }
      } else {
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const placeHybridOrder = async (userObj: any, extraInfo: any) => {
    try {
      //console.log(extraInfo, items, state);
      let orderObj = null;
      //console.log(userObj);
      if (extraInfo) {
        orderObj = returnHybridObject(userObj, extraInfo);
      } else {
        orderObj = returnHybridObject(userObj, items);
      }
      //console.log("this is the order ojbect", orderObj);
      const { data: response } = await requestHybridOrder(orderObj);
      //console.log(response);
      if (response && response?.succeeded) {
        const { clientSecret, orderId, orderType, paymentIntent } =
          response?.data;
        setOrderId(orderId);
        if (orderType === "Success") {
          setClientSecret(clientSecret);
          return Promise.resolve(response);
        } else if (orderType === "Free") {
          const { data: result }: any = await completeOrder(null, orderId);
          //console.log(result);
          if (result && result?.succeeded) {
            const { data } = result;
            // setToaster(
            //   "success",
            //   "Order is successful! Please check your email for the receipt and a link to your tickets."
            // );
            setOrderPlaced(true);
            router.push(`/checkout/thank-you?id=${data?.id}&sec=${data?.sec}`);
            return Promise.resolve(result);
          } else {
            setClientSecret(null);
            setToaster("error", result?.messages[0] || "Something went wrong!");
            return Promise.reject(result);
          }
        }
      } else {
        return Promise.resolve(response);
      }
    } catch (error) {
      setToaster("error", "Something went wrong!");
      console.log(error);
      return Promise.reject(error);
    }
  };

  async function completeOrder(paymentIntentId: any, orderId?: any) {
    return await completeTheOrder(
      paymentIntentId,
      orderId ? orderId : state.orderId
    );
  }

  async function cancelOrder() {
    if (!state.orderId) return;
    return await cancelTheOrder(state.orderId);
  }

  const checkTokenExpiry = (user: any) => {
    if (user) {
      const result = isTokenExpired(user);
      dispatch({
        type: "SET_EXPIRY",
        payload: result,
      });
    } else {
      dispatch({
        type: "SET_EXPIRY",
        payload: false,
      });
    }
  };
  const getWishlists = async () => {
    try {
      const result = await fetchClient('/api/wishlist');
      //console.log(response)
      if(result?.status == 401){
        await logout();
        return;
      }
      if (result && result?.succeeded) {
        const wishes = result?.data?.map((item: any) => {
          return item?.slug;
        });
        dispatch({
          type: "SET_WISHLISTS",
          payload: wishes,
        });
      } else {
        console.log('error in fetching wishlists', result);
      }
    } catch (error: any) {
      console.log('error in fetching wishlists', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (typeof window === "undefined") return; // ✅ Prevents SSR errors
        let oldUser = fetchCookie();
        if (oldUser) {
          setUser(JSON.parse(oldUser), true);
          checkTokenExpiry(JSON.parse(oldUser));
          getWishlists();

        } else {
          setUser(null, false);
        }
      } catch (err) {
        console.log(
          "Here are the initial errors on page load in checking user",
          err
        );
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        logIn,
        logout,
        updateUserProfile,
        changeStep,
        placeOrder,
        completeOrder,
        cancelOrder,
        changeEmail,
        initBookings,
        setClientSecret,
        setOrderPlaced,
        setOrderFailed,
        setToaster,
        handleLayoutOrder,
        placeHybridOrder,
        startTkLoading,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
