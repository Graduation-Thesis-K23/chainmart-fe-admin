import React, { FC, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Input, Tag } from "antd";

import Log from "~/utils/Log";
import { OptionType } from "../Options";

const OptionsTags: FC<{
  options: OptionType[];
  setOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
  handleMoreOptions: (status: boolean) => void;
}> = ({ options, setOptions, handleMoreOptions }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const labelRef = useRef<InputRef>(null);

  Log("OptionsTags");

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleSubmitNewOption = () => {
    const value = labelRef.current?.input?.value;
    if (value === "" || tags.length === 0) {
      return;
    }
    if (value) {
      setOptions([
        ...options,
        {
          id: Date.now(),
          label: value,
          values: tags,
        },
      ]);
      handleMoreOptions(false);
    }
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <Input
          ref={labelRef}
          type="text"
          size="small"
          style={{ width: 100 }}
          placeholder="Option Label"
        />
      </div>
      :
      <div style={{ marginBottom: 16, display: "inline-block" }}>
        <div>
          {tags.map((tag: string) => (
            <span key={tag} style={{ display: "inline-block" }}>
              <Tag
                closable
                onClose={(e) => {
                  e.preventDefault();
                  handleClose(tag);
                }}
              >
                {tag}
              </Tag>
            </span>
          ))}
        </div>
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput}>
          <PlusOutlined /> More Option
        </Tag>
      )}
      <div>
        <div
          style={{ display: "inline-block" }}
          onClick={() => handleSubmitNewOption()}
        >
          OK
        </div>
        <div
          style={{ display: "inline-block" }}
          onClick={() => handleMoreOptions(false)}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default OptionsTags;
