import React, { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

/* Use another library for create HTML so ReactQuill not supported some function */

const DescriptionLabel = styled.p`
  display: inline-block;
  margin-right: 6px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
`;

const Description: FC<{
  onChange: (...event: unknown[]) => void;
}> = ({ onChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div>
      <DescriptionLabel>Description</DescriptionLabel>

      <ReactQuill
        style={{
          height: 300,
        }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default Description;
