"use client";

import { useMemo, useState } from "react";

interface Props {
  product: any;
  onVariantChange?: (variant: any) => void;
  onQuantityChange?: (qty: number) => void;
}

export default function ProductVariants({
  product,
  onVariantChange,
  onQuantityChange,
}: Props) {

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const variants = product?.variants || [];
  const options = product?.options || [];

  // INIT DEFAULT OPTIONS
  useMemo(() => {
    if (options.length > 0) {
      const initial: Record<string, string> = {};
      options.forEach((opt: any) => {
        initial[opt.name] = opt.values?.[0];
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  // FIND MATCHING VARIANT
  const activeVariant = useMemo(() => {
    return variants.find((variant: any) => {
      return options.every((opt: any, index: number) => {
        const key = `option${index + 1}`;
        return variant[key] === selectedOptions[opt.name];
      });
    });
  }, [selectedOptions, variants, options]);

  const handleSelect = (optionName: string, value: string) => {
    const updated = {
      ...selectedOptions,
      [optionName]: value,
    };

    setSelectedOptions(updated);

    const matched = variants.find((variant: any) => {
      return options.every((opt: any, index: number) => {
        const key = `option${index + 1}`;
        return variant[key] === updated[opt.name];
      });
    });

    onVariantChange?.(matched);
  };

  const handleQty = (val: number) => {
    setQuantity(val);
    onQuantityChange?.(val);
  };

  return (
    <div className="space-y-6">

      {/* QUANTITY */}
      <div>
        <p className="text-sm font-bold mb-2">Quantity:</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQty(Math.max(1, quantity - 1))}
            className="w-9 h-9 border rounded"
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => handleQty(quantity + 1)}
            className="w-9 h-9 border rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* OPTIONS (DYNAMIC) */}
      {options.map((option: any, index: number) => (
        <div key={option.name}>
          <p className="text-sm font-bold mb-2">
            {option.name}:
          </p>

          <div className="flex flex-wrap gap-2">
            {option.values.map((value: string) => (
              <button
                key={value}
                onClick={() => handleSelect(option.name, value)}
                className={`px-4 py-2 border rounded-sm text-sm transition
                  ${selectedOptions[option.name] === value
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* VARIANT INFO */}
      {activeVariant && (
        <div className="text-sm text-gray-600 space-y-1 border-t pt-4">
          <p>Price: Rs. {activeVariant.price}</p>
          <p>Stock: {activeVariant.stock}</p>
        </div>
      )}

    </div>
  );
}