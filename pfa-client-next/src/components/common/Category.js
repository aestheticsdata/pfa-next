import adjustFontColor from "@components/common/helpers/adjustFontColor";

const getCategoryComponent = (item) => {
  return (
    <div
      className="flex justify-center rounded border border-categoryBorder"
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
