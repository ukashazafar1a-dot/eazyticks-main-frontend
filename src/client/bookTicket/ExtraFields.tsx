"use client";
import PolicyConsent from "@/components/PolicyConsent";
import React, { useEffect, useReducer } from "react";
import { useCart } from "react-use-cart";

const initialFields = [
  {
    id: 1,
    name: "",
    price: 0,
    qty: 1,
    extraFields: [
      [
        {
          id: 1,
          value: "01 Testing 01",
        },
      ],
    ],
  },
];

const fieldsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INIT_FIELDS": {
      let fields = action.payload.map((item: any) => {
        let obj: any = {},
          extraFields: any = [];
        obj.id = item.id;
        obj.qty = item.quantity;
        obj.name = item.name;
        obj.price = item.price;
        obj.type = item.type;
        for (let i = 0; i < item.quantity; i++) {
          let qtyField: any = [];
          item?.extraFields?.forEach((extrafield: any) => {
            qtyField.push({ id: extrafield.id, value: null });
          });
          if (qtyField.length > 0) extraFields.push(qtyField);
        }
        obj.extraFields = extraFields;
        return obj;
      });
      return {
        fields,
      };
    }
    case "CHANGE_FIELD": {
      let fields = state.fields.map((item: any) => {
        if (item.id === action.payload.distId) {
          let extraFields = item.extraFields.map(
            (distExtraField: any, index: any) => {
              if (index === action.payload.qtyId) {
                let extraFieldItems = distExtraField.map(
                  (extraFieldItem: any) => {
                    if (extraFieldItem.id === action.payload.fieldId) {
                      return { ...extraFieldItem, value: action.payload.value };
                    } else {
                      return extraFieldItem;
                    }
                  }
                );
                return extraFieldItems;
              } else {
                return distExtraField;
              }
            }
          );
          return { ...item, extraFields: [...extraFields] };
        } else {
          return item;
        }
      });
      return { fields };
    }
    default:
      return { ...state };
  }
};

interface Provider {
  onStageChange: any;
  setFields: any;
}

const ExtraFields = ({ onStageChange, setFields }: Provider) => {
  const { items } = useCart();
  const [fields, dispatch] = useReducer(fieldsReducer, initialFields);

  function changeField(distId: any, fieldId: any, qtyId: any, value: any) {
    dispatch({
      type: "CHANGE_FIELD",
      payload: { distId, fieldId, qtyId, value },
    });
  }

  async function handleSumbit(e: any) {
    e.preventDefault();
    setFields(fields);
    // setIsLoading(true)
    // try {
    //     await placeOrder(fields,searchParams.get('id'))
    //     setIsLoading(false)
    // } catch (error) {
    //     console.log("Error",error)
    //     setIsLoading(false)
    // }
  }

  function handleBack(e: any) {
    e.preventDefault();
    onStageChange("tickets");
  }

  function renderFields(item: any) {
    let fieldItems: any = [];
    for (let i = 0; i < item.quantity; i++) {
      fieldItems.push(
        <>
          <div className="flex items-center  justify-start gap-2 w-full mb-2 flex-wrap">
            {item?.extraFields?.map((field: any, index: any) => {
              if (field.type === "SelectField") {
                let options = field?.options?.split(",");
                return (
                  <div
                    className="md:basis-[32%] sm:basis-[49%] basis-full flex-shrink-0"
                    key={index}
                  >
                    <label
                      htmlFor={"extrafield" + index}
                      className="input_label"
                    >
                      {field.label}
                      <span style={{ color: "red" }}>
                        {" "}
                        {field.isRequired && "*"}
                      </span>
                    </label>
                    <select
                      name={field.name}
                      className="w-full flex-shrink-0 rounded-sm"
                      id={"extrafield" + index}
                      onChange={(e) =>
                        changeField(item.id, field.id, i, e.currentTarget.value)
                      }
                      required={field.isRequired}
                    >
                      <option selected disabled value={""}>
                        Select {field.label}
                      </option>
                      {options?.map((option: any, i: any) => {
                        return (
                          <option value={option} key={i}>
                            {option}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              } else {
                return (
                  <div
                    className="md:basis-[32%] sm:basis-[49%] basis-full flex-shrink-0"
                    key={index}
                  >
                    <label
                      htmlFor={"extrafield" + index}
                      className="input_label"
                    >
                      {field.label}
                      <span style={{ color: "red" }}>
                        {" "}
                        {field.isRequired && "*"}
                      </span>
                    </label>
                    <input
                      type={"text"}
                      name="first_name"
                      id={"extrafield" + index}
                      className="rounded-sm"
                      placeholder={field.placeHolder}
                      required={field.isRequired}
                      onChange={(e) =>
                        changeField(item.id, field.id, i, e.currentTarget.value)
                      }
                    />
                  </div>
                );
              }
            })}
          </div>
          {i < item.quantity - 1 && <hr />}
        </>
      );
    }

    return <div className="mt-3">{fieldItems}</div>;
  }

  useEffect(() => {
    dispatch({
      type: "INIT_FIELDS",
      payload: items,
    });
    setFields(null);
  }, []);

  return (
    <div>
      <form onSubmit={handleSumbit} id="extrafields-form">
        <button
          className="border border-1 border-black py-1 px-4 rounded-sm font-bold"
          type="button"
          onClick={handleBack}
        >
          Back
        </button>
        <PolicyConsent />
        {/* Wrap This Div For The Distribution >> This Include Title, fields, and apply button */}
        {items.map((item, i) => {
          if (item?.extraFields?.length <= 0 || !item?.extraFields) return "";
          return (
            <div className="info-wrap" key={i}>
              <h3 className="mt-3 text-xl font-bold">
                Information of {item?.name}
              </h3>
              {renderFields(item)}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default ExtraFields;
