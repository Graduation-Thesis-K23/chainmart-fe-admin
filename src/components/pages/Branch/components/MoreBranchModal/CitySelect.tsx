import React, { memo, useEffect, useState } from "react";
import { Control } from "react-hook-form";

import Location from "~/dataSources/Location.json";
import { AddBranchType } from "~/redux";
import ISelect, { SelectOption } from "./ISelect";

const MyAddressCity: React.FC<{
  label: string;
  icon: JSX.Element;
  control: Control<AddBranchType>;
  name: "city" | "ward" | "district";
  disabled?: boolean;
  setStep: React.Dispatch<
    React.SetStateAction<{
      step: number;
      timestamp: number;
    }>
  >;
  district: string;
}> = (props) => {
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  useEffect(() => {
    const districts = Location.find((item) => item.name === props.district);

    if (districts) {
      const cityList = districts.level2s.map((item) => ({
        value: item.name,
        label: item.name,
      }));

      setOptions(cityList);
    }
  }, [props.district]);

  return <ISelect {...props} options={options} />;
};

export default memo(MyAddressCity);
