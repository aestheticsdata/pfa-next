import adjustFontColor from "@components/shared/helpers/adjustColor";

interface AutocompleteListProps {
  props: any;
  color: string;
  name: string;
}

const AutocompleteItem = ({ props, color, name }: AutocompleteListProps) => {
  return (
    <span
      {...props}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "7px 0",
        backgroundColor: "white",
      }}
      onMouseOver={(e) => {(e.currentTarget as HTMLInputElement).style.backgroundColor = "rgb(220, 220, 220)"}}
      onMouseOut={(e) => {(e.currentTarget as HTMLInputElement).style.backgroundColor = "white"}}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "5px",
          backgroundColor: color,
          width: "110px",
          color: adjustFontColor(color),
          borderRadius: "3px",
          fontSize: "10px",
          padding: "2px 10px",
          textTransform: "uppercase",
        }}
      >
        {name}
      </span>
    </span>
  );
};

export default AutocompleteItem;
