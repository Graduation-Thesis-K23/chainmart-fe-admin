import React, { FC } from "react";
import styled from "styled-components";

const DescriptionLabel = styled.p`
  display: inline-block;
  margin-right: 6px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
`;

const Description: FC<{
  onChange: (...event: unknown[]) => void;
  defaultValue?: string;
}> = () => {
  /* const [value, setValue] = useState(
    EditorState.createWithContent(stateFromHTML(defaultValue))
  );

  const handleChangeValue = (data: EditorState) => {
    setValue(data);
    onChange(stateToHTML(data.getCurrentContent()));
  };
 */
  return (
    <div>
      <DescriptionLabel>Description</DescriptionLabel>
      <div
        style={{
          backgroundColor: "#eee",
          minHeight: 342,
          padding: 6,
        }}
      >
        {/*  <Toolbar />
        <Editor
          editorState={value}
          onChange={handleChangeValue}
          plugins={plugins}
        /> */}
      </div>
    </div>
  );
};

export default Description;
