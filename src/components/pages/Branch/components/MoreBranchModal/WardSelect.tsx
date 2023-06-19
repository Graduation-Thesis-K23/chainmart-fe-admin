import React, { memo, useEffect, useState } from "react";
import { Control } from "react-hook-form";

import Location from "~/dataSources/Location.json";
import ISelect, { SelectOption } from "./ISelect";
import { AddBranchType } from "~/redux";

const MyAddressWard: React.FC<{
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
  city: string;
}> = (props) => {
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  const { city, district } = props;

  useEffect(() => {
    const districtList = Location.find((item) => item.name === district);

    const cityList = districtList?.level2s.find((item) => item.name === city);

    const wardList = cityList?.level3s.map((item) => ({
      value: item.name,
      label: item.name,
    }));

    if (wardList) {
      setOptions(wardList);
    }
  }, [city, district]);

  return <ISelect {...props} options={options} />;
};

export default memo(MyAddressWard);
