import adjustFontColor from "@components/common/helpers/adjustFontColor";

import type { CategoryProps } from "@src/interfaces/category";

interface CategoryComponentProps {
  item: CategoryProps;
  isDynamic?: boolean;
  isClicked?: boolean;
}

const CategoryComponent = ({item, isDynamic = false, isClicked = false}: CategoryComponentProps) => {
  const getColor = () => {
    if (isDynamic) {
      if(isClicked) {
        return adjustFontColor(item.categoryColor)
      } else {
        return item.category ? "#fff" : adjustFontColor(item.categoryColor);
      }
    } else {
      return adjustFontColor(item.categoryColor)
    }
  }

  const getBackgroundcolor = () => {
    if (isDynamic) {
      if (isClicked) {
        return item.categoryColor;
      } else {
        return item.category ? "#aaa" : item.categoryColor;
      }
    } else {
      return item.categoryColor;
    }
  }

  return (
    <div
      className={`flex justify-center px-0.5 rounded border border-categoryBorder ${isDynamic ? "text-tiny" : "text-xxs"} uppercase`}
      style={{
        color: `${getColor()}`,
        backgroundColor: `${getBackgroundcolor()}`,
      }}
      onMouseOver={(el) => el.target.style.boxShadow = "0 0 1px 1px rgb(10, 10, 10)"}
      onMouseOut={(el) => el.target.style.boxShadow = "initial"}
    >
      {item.category || "sans catégorie"}
    </div>
  );
};

export default CategoryComponent;
