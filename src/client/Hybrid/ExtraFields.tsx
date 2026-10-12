"use client";
import PolicyConsent from "@/components/PolicyConsent";
import ReadMoreLess from "@/components/ReadMoreLess";
import { Badge } from "@/components/ui/badge";
import { sortByType } from "@/lib/utils";
import React, { useEffect, useReducer, useRef } from "react";
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
        //console.log(item)
        let obj: any = {};
        let extraFields: any = [];
        obj.id = item.id;
        obj.quantity = item.quantity;
        obj.name = item.name;
        obj.price = item.price;
        obj.row = item?.row;
        obj.distributionId =
          item?.type == "parkings"
            ? item?.parkingDistributionId
            : item?.distributionId;
        obj.seatNo = item?.seatNo;
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
    case "SAME_FIELDS": {
      let fields = action.payload.value;
      return { fields };
    }
    default:
      return { ...state };
  }
};

interface Provider {
  onStageChange: any;
  setFields: any;
  shouldMount: boolean;
}

const ExtraFields = ({ onStageChange, setFields, shouldMount }: Provider) => {
  const { items } = useCart();
  const sortedItems = sortByType(items);
  const [fields, dispatch] = useReducer(fieldsReducer, initialFields);
  const formRef = useRef<any>(null);
  let hasRenderedParkingHeading = false;

  function changeField(distId: any, fieldId: any, qtyId: any, value: any) {
    dispatch({
      type: "CHANGE_FIELD",
      payload: { distId, fieldId, qtyId, value },
    });
  }

  const handleCheckboxChange = (e: any, item: any) => {
    const isChecked = e.target.checked;
    // If the checkbox is not checked, we don't want to do anything
    if (!isChecked) return;
    // If the checkbox is checked, we want to copy the first row's values to all other rows
    if (!fields.fields || fields.fields.length === 0) return;
    let newFields = fields.fields.map((field: any) => {
      if (field.id !== item.id) return field;

      const firstRow = field.extraFields[0];
      // If the first row is empty, we don't want to do anything
      if (!firstRow) return field;
      // If the first row has no values, we don't want to do anything
      if (!firstRow.some((f: any) => f.value)) return field;

      const updatedExtraFields = field.extraFields.map(
        (row: any, index: number) => {
          if (index === 0) return row;
          return row.map((fieldItem: any) => {
            const source = firstRow.find((f: any) => f.id === fieldItem.id);
            return { ...fieldItem, value: source?.value ?? null };
          });
        }
      );
      //console.log(updatedExtraFields, firstRow);
      return {
        ...field,
        extraFields: [firstRow, ...updatedExtraFields.slice(1)],
      };
    });
    dispatch({
      type: "SAME_FIELDS",
      payload: {
        value: newFields,
      },
    });
    setTimeout(() => {
      e.target.checked = !isChecked;
    }, 2000);
  };

  const getExtrafieldValue = (distId: any, fieldId: any, index: any) => {
    if (!fields.fields || fields.fields.length === 0) return null;
    let dist = fields.fields.find((item: any) => item.id === distId);
    if (!dist) return null;
    let extraField = dist.extraFields[index].find(
      (field: any) => field.id === fieldId
    );
    return extraField ? extraField.value : null;
  };

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
        <React.Fragment key={item?.id + i}>
          <div
            className="flex items-start justify-start gap-2 w-full mb-2 flex-wrap extrafields-wrapper"
            data-length={item?.extraFields?.length}
            key={i}
          >
            {item?.extraFields?.map((field: any, index: any) => {
              if (field.type === "SelectField") {
                let options = field?.options?.split(",");
                return (
                  <div className="extrafield-block" key={index}>
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
                      className="w-full flex-shrink-0 rounded-sm select--field"
                      id={"extrafield" + index}
                      onChange={(e) =>
                        changeField(item.id, field.id, i, e.currentTarget.value)
                      }
                      value={getExtrafieldValue(item.id, field.id, i)}
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
                    {field?.info && <ReadMoreLess text={field?.info} />}
                  </div>
                );
              } else {
                return (
                  <div className="extrafield-block" key={index}>
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
                      className="rounded-sm input--field"
                      placeholder={field.placeHolder}
                      required={field.isRequired}
                      value={getExtrafieldValue(item.id, field.id, i)}
                      onChange={(e) => {
                        changeField(
                          item.id,
                          field.id,
                          i,
                          e.currentTarget.value
                        );
                      }}
                      onBlur={(e) => {
                        let value = e.target?.value?.trim();
                        if (field?.isRequired && value === "") {
                          e.target.setCustomValidity("This field is required");
                        } else {
                          e.target.setCustomValidity(""); // Reset validity
                        }
                      }}
                    />
                    {field?.info && <ReadMoreLess text={field?.info} />}
                  </div>
                );
              }
            })}
          </div>
          {i == 0 && item?.quantity > 1 && (
            <div className="w-full text-sm flex items-center justify-start gap-2 mb-2 text-black">
              <input
                className="checkbox--field cursor-pointer"
                type="checkbox"
                name={"flexCheckChecked" + item.id + i}
                onChange={(e) => handleCheckboxChange(e, item)}
                id={"flexCheckChecked" + item.id + i}
              />
              <label
                className="cursor-pointer text-sm flex flex-col"
                htmlFor={"flexCheckChecked" + item.id + i}
              >
                <span>
                  Use this information for all{" "}
                  <span className="font-medium">{item?.name}</span> tickets
                </span>
                <span className="text-gray-500 text-xs">
                  This will copy the current details to all tickets once, then
                  uncheck automatically.
                </span>
              </label>
            </div>
          )}
          {i < item.quantity - 1 && <hr className="mb-2" />}
        </React.Fragment>
      );
    }

    return <div className="mt-3">{fieldItems}</div>;
  }

  useEffect(() => {
    dispatch({
      type: "INIT_FIELDS",
      payload: sortedItems,
    });
    setFields(null);
  }, []);

  useEffect(() => {
    if (shouldMount) {
      handleSumbit({ preventDefault: () => { } });
    }
  }, [shouldMount]);
  // console.log('items', sortedItems)
  return (
    <div>
      <form onSubmit={handleSumbit} id="extrafields-form" ref={formRef}>
        <button
          className="border border-1 border-black py-1 px-4 rounded-sm font-bold mb-2"
          type="button"
          onClick={handleBack}
        >
          Back
        </button>
        <PolicyConsent />
        {/* Wrap This Div For The Distribution >> This Include Title, fields, and apply button */}
        <h3 className="text-xl font-bold mb-2">Tickets Information</h3>

        {sortedItems?.map((item: any, i: number) => {
          const hasFields = item?.extraFields?.length > 0;
          if (!hasFields) return <></>;
          const isParking = item.type === "parkings";
          return (
            <React.Fragment key={i + item?.id}>
              {isParking &&
                !hasRenderedParkingHeading &&
                (() => {
                  hasRenderedParkingHeading = true;
                  return (
                    <h3 className="text-xl font-bold mb-2 mt-6">
                      Parking Information
                    </h3>
                  );
                })()}
              <div
                className="info-wrap pb-1 border-b border-gray-200 mb-2"
                style={{
                  borderStyle: "groove",
                }}
                key={i + item?.id}
              >
                <h3 className="mt-3 text-base md:text-lg font-medium flex items-center justify-start gap-2 text-gray-600">
                  <span className="underline">Information of {item?.name}</span>
                </h3>
                {renderFields(item)}
              </div>
            </React.Fragment>
          );
        })}
      </form>
    </div>
  );
};

export default ExtraFields;
