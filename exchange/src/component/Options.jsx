import React from "react";

const Options = ({ dataObj }) => {
  if (!dataObj) {
    return null; // Eğer dataObj henüz gelmediyse hiçbir şey gösterme
  }


  return (
<>
      {Object.keys(dataObj).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
</>
  );
};

export default Options;
