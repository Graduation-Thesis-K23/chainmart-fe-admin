import React, { memo, useEffect, useState } from "react";
import { Control } from "react-hook-form";

import Location from "~/dataSources/Location.json";
import { AddBranchType } from "~/redux";
import ISelect from "./ISelect";

const DistrictSelect: React.FC<{
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
}> = (props) => {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    const districtList = Location.map((item) => ({
      value: item.name,
      label: item.name,
    }));

    setOptions(districtList);
  }, []);

  return <ISelect {...props} options={options} />;
};

export default memo(DistrictSelect);
