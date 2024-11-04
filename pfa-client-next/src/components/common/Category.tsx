import adjustFontColor from "@components/common/helpers/adjustFontColor";

import type { CategoryProps } from "@src/interfaces/category";

interface CategoryComponentProps {
  item: CategoryProps;
  isDynamic?: boolean;
  isClicked?: boolean;
}

const CategoryComponent = ({ item, isDynamic = false, isClicked = false }: CategoryComponentProps) => {
  const getBackgroundColor = () => {
    if (isDynamic && isClicked) {
      return item.categoryColor;
    } else if (isDynamic) {
      return item.categoryColor;
    } else {
      return "#efefef";
    }
  };

  const getTextColor = () => {
    return isDynamic ? adjustFontColor(item.categoryColor) : "#000";
  };

  return (
    <div
      className={`relative flex items-center px-0.5 rounded ${isDynamic ? "text-tiny" : "text-xxs"} uppercase`}
      style={{
        // border: `1px solid ${item.categoryColor}`,
        // borderRadius: "4px",
        color: getTextColor(),
        backgroundColor: getBackgroundColor(),
      }}
    >
      {!isDynamic && (
        <span
          className="absolute left-0 top-0 bottom-0"
          style={{
            border: item.categoryColor,
            backgroundColor: item.categoryColor,
            width: "5px",
            borderTopLeftRadius: "inherit",
            borderBottomLeftRadius: "inherit",
          }}
        ></span>
      )}
      <span className="mx-auto z-10">{item.category || "sans catégorie"}</span>
    </div>
  );
};

export default CategoryComponent;
