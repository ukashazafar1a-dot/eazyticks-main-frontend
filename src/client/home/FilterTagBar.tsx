import React from "react";

type Props = {
  activeTag: string;
  tags: any;
  handleChangeTag: any;
};

const FilterTagBar = ({ activeTag, tags, handleChangeTag }: Props) => {
  return (
    <div className="filter-bar">
      {tags.map((tag: any) => {
        return (
          <span
            onClick={() => handleChangeTag(tag)}
            key={tag.value}
            className={
              activeTag === tag.value
                ? "filter-bar__item filter-bar__item--active"
                : "filter-bar__item"
            }
          >
            {tag.title}
            {tag?.new && <span className="filter-bar__item__tag">New</span>}
          </span>
        );
      })}
    </div>
  );
};

export default FilterTagBar;
