import React, { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* Use another library for create HTML so ReactQuill not supported some function */

const Description: FC<{
  onChange: (...event: unknown[]) => void;
  defaultValue?: string;
}> = ({ onChange, defaultValue = "" }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChangeValue = (data: string) => {
    setValue(data);
    onChange(value);
  };

  return (
    <div>
      <div>Description</div>
      <ReactQuill theme="snow" value={value} onChange={handleChangeValue} />
    </div>
  );
};

export default Description;
