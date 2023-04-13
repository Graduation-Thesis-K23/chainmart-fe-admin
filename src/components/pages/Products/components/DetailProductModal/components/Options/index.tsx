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
  onChange: (...event: unknown[]) => void;
  defaultValue?: OptionType[];
}> = ({ onChange, defaultValue = [] }) => {
  const [moreOption, setMoreOption] = useState(false);
  const [options, setOptions] = useState<OptionType[]>(defaultValue);

  const handleMoreOptions = (status: boolean) => {
    setMoreOption(status);
  };

  useEffect(() => {
    onChange(JSON.stringify(options));
  }, [options]);

  return (
    <OptionsContainer>
      <OptionsHeader>
        <OptionsLabel>Options</OptionsLabel>

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
              + {option.label}: {option.values.join(", ")}
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
