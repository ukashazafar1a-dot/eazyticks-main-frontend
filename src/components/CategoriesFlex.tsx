import React from "react";
import CategoryCard from "./CategoryCard";

interface FunctionProps {
  categories?: any;
}


const CategoriesFlex = ({ categories }: FunctionProps) => {
  //console.log(categories)
  return (
    <div
      className={`flex items-center  justify-center lg:flex-wrap gap-1 flex-nowrap overflow-x-auto`}
    >
      {categories?.map((category: any) => {
        return (
          <CategoryCard
            key={category?.id}
            item={category}
          />
        );
      })}
    </div>
  );
};

export default CategoriesFlex;
