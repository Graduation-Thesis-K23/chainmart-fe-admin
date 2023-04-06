import React, { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* Use another library for create HTML so ReactQuill not supported some function */

const Description: FC<{
  onChange: (...event: unknown[]) => void;
}> = ({ onChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div>
      <div>Description</div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};

export default Description;
