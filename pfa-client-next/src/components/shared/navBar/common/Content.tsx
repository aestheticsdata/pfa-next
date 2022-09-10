const Content = ({ handleclosefromchild, content }) => {
  return (
    <div className="absolute top-12">
      <div
        onClick={() => handleclosefromchild()}
        role="menu"
        className="flex flex-col items-end bg-grey2 p-1.5 rounded border border-grey0 shadow-login shadow-grey2"
      >
        <ul className="flex flex-col">{ content }</ul>
      </div>
    </div>
  )
};

export default Content;
