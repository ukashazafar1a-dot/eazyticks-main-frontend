import React, { useEffect, useReducer, useState } from "react";
import { useCart } from "react-use-cart";
import useApp from "@/context/useApp";
import { AddIdPostFix } from "@/helpers/generals";

const initialState = {
  variants: [],
  options: [],
  optionsWithValues: [],
  selectedVariant: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VARIANTS":
      return { ...state, variants: action.payload };
    case "SET_OPTIONS":
      return { ...state, options: action.payload };
    case "SET_OPTIONS_WITH_VALUES":
      return { ...state, optionsWithValues: action.payload };
    case "SET_SELECTED_VARIANT":
      return { ...state, selectedVariant: action.payload };
    default:
      return state;
  }
};

function ShopItem({ item }) {
  const { items, addItem, getItem, updateItemQuantity } = useCart();
  const { setToaster } = useApp();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [quantity, setQuantity] = useState(1);
  const [outOfStockMessage, setOutOfStockMessage] = useState(null);

  function handleQuantityChange(type) {
    let obj = [];
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAddItem() {
    const {
      id: variantId,
      price,
      stock,
      name: variantName,
    } = state.selectedVariant;
    const id = AddIdPostFix(variantId, "shop");
    const { name } = item;
    //Check item stock
    if (getItem(id)) {
      let totalStock = getItem(id).quantity + quantity;
      if (stock < totalStock) {
        setOutOfStockMessage("There are only " + stock + " item(s) available.");
        setToaster("success", "Out of stock!");
        return;
      }
    } else {
      if (stock < quantity) {
        setOutOfStockMessage("There are only " + stock + " item(s) available.");
        setToaster("success", "Out of stock!");
        return;
      }
    }
    setOutOfStockMessage(null);
    if (getItem(id)) {
      updateItemQuantity(id, quantity + getItem(id).quantity);
    } else {
      let itemToAdd = {
        id,
        price,
        name,
        stock,
        variant: variantName,
        type: "shop",
      };
      addItem(itemToAdd, quantity);
      setToaster("success", name + " added!");
    }
  }

  function handleVariantChange(value, index) {
    let newOptions = state.options.slice(0);
    newOptions[index] = value;
    dispatch({ type: "SET_OPTIONS", payload: newOptions });
    let newSelectedVariant = state.variants?.find((variant) => {
      return !variant?.options
        .map((option, i) => {
          return newOptions[i] === option;
        })
        .includes(false);
    });
    dispatch({ type: "SET_SELECTED_VARIANT", payload: newSelectedVariant });
  }

  function renderImage(img, title) {
    let imgUrl = img?.split(";").pop();
    if (img) {
      return (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat  w-full h-full"
            style={{ backgroundImage: `url(${imgUrl})` }}
          ></div>
          <img src={imgUrl} alt={title} loading="lazy" className="max-w-full w-20 "/>
        </>
      );
    } else {
      return (
        <img
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1683022134/ezt-frontend-client-assets/placeholder-image_rkxh0y.png"
          alt="Placeholder for Images - Eazyticks "
          loading="lazy"
        />
      );
    }
  }

  useEffect(() => {
    const { options, variants: recievedVariants } = item;
    dispatch({ type: "SET_OPTIONS_WITH_VALUES", payload: options });
    dispatch({ type: "SET_VARIANTS", payload: recievedVariants });
    dispatch({ type: "SET_SELECTED_VARIANT", payload: recievedVariants[0] });
    dispatch({ type: "SET_OPTIONS", payload: recievedVariants[0]?.options });
  }, []);
  //console.log(state)
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#f4f4f4] mb-2 p-4 sm:gap-5 gap-1 sm:flex-row flex-col">
      <div className="flex items-center sm-max:flex-col gap-5">
        <div className="sm:h-32 sm:w-32 relative overflow-hidden  w-full h-full sm:text-start text-center sm-max:flex sm-max:items-center sm-max:justify-center max-w-32">
          <div>{renderImage(item?.image, item?.name)}</div>
        </div>
        <div className="sm-max:flex sm-max:items-start sm-max:justify-between sm-max:gap-3 sm-max:flex-col">
          <div className="w-full">
            <div className="text-2xl  font-bold sm-max:text-center">
              <span className="text-base ">{item?.name}</span>
            </div>
            <div className="sm-max:text-center">
              {state.selectedVariant !== undefined && (
                <span>$ {state.selectedVariant?.price}</span>
              )}
            </div>
          </div>
          <div className="var-btn">
            <div className="varient-btn mb-2 flex items-center justify-start sm-max:justify-end md-max:flex-wrap gap-4">
              {state.optionsWithValues?.map((option, index) => {
                //console.log(option)
                return (
                  <div className={`vari v-${index}`} key={index}>
                    <div className="form-filed text-base font-semibold">
                      <label id={"option-label-" + option?.name}>
                        {option?.name}
                      </label>
                      <select
                        name={option?.name}
                        className="w-full p-1 text-sm font-medium ps-1 pe-1 rounded-sm min-w-[150px]"
                        onChange={(e) =>
                          handleVariantChange(e.target.value, index)
                        }
                        defaultValue={state.selectedVariant?.options[index]}
                        labelId={"option-label-" + option?.name}
                        id={"option-select-" + option?.name}
                      >
                        {option?.values?.map((optionValue, innerIndex) => {
                          return (
                            <option
                              key={innerIndex}
                              value={optionValue}
                              selected={innerIndex === 0}
                            >
                              {" "}
                              {optionValue}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-auto w-full">
        <div className="gen">
          <div className="second">
            <div className="si-btn cta-act">
              <div className="flex items-center justify-center  mb-2 ">
                <button
                  className="bg-secondary px-3 py-1 text-white rounded"
                  onClick={(e) => handleQuantityChange("minus")}
                >
                  -
                </button>
                {/* <input
                  className="w-[40px] bg-transparent border-0 p-0 outline-0  text-xl font-semibold text-center flex items-center justify-center"
                  type="number"
                  value={quantity}
                  min="1"
                  readOnly
                /> */}
                <span className="px-4 font-semibold text-xl min-w-[40px]">
                  {quantity}
                </span>
                <button
                  className="bg-secondary px-3 py-1 text-white rounded"
                  onClick={(e) => handleQuantityChange("plus")}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn--primary sm:w-auto w-full grow !px-2  !text-xs"
                onClick={(e) => handleAddItem()}
                disabled={state.selectedVariant === undefined}
              >
                {state.selectedVariant === undefined
                  ? "Unavailable"
                  : "Add To Cart"}
              </button>
            </div>
            {outOfStockMessage && (
              <span style={{ color: "red" }}>{outOfStockMessage}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopItem;
