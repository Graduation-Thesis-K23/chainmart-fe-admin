import React, { FC, useEffect, useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  OptionsContainer,
  OptionsLabel,
  OptionsList,
  OptionsHeader,
} from "./styled";
import OptionsTags from "../OptionsTags";

export interface OptionType {
  id: number;
  label: string;
  values: string[];
}

const Options: FC<{
  label?: string;
  onChange: (...event: unknown[]) => void;
}> = ({ label, onChange }) => {
  const [moreOption, setMoreOption] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([
    { id: Date.now(), label: "Color", values: ["s", "b"] },
  ]);

  const handleMoreOptions = (status: boolean) => {
    setMoreOption(status);
  };

  useEffect(() => {
    onChange(JSON.stringify(options));
  }, [options]);

  return (
    <OptionsContainer>
      <OptionsHeader>
        <OptionsLabel>{label}</OptionsLabel>

        <PlusCircleTwoTone
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleMoreOptions(true)}
        />
      </OptionsHeader>
      <OptionsList>
        <div>
          {options.map((option) => (
            <div key={option.id}>
              + {option.label}: {option.values.map((i) => i + " | ")}
            </div>
          ))}
        </div>

        {moreOption && (
          <OptionsTags
            options={options}
            setOptions={setOptions}
            handleMoreOptions={handleMoreOptions}
          />
        )}
      </OptionsList>
    </OptionsContainer>
  );
};

export default Options;
