import adjustFontColor from "@components/common/helpers/adjustFontColor";

import type { Category } from "@src/interfaces/category";

const getCategoryComponent = (item: Category) => {
  return (
    <div
      className="flex justify-center rounded border border-categoryBorder text-xxs uppercase"
      style={{
        color: `${adjustFontColor(item.categoryColor)}`,
        backgroundColor: `${item.categoryColor}`,
      }}
    >
      {item.category}
    </div>
  );
};

export default getCategoryComponent;
