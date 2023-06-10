import React, { FC, memo } from "react";

import dictionary from "~/shared/locales/en";

const Translate: FC<{
  textKey: string;
}> = ({ textKey }) => {
  const text = dictionary[textKey as keyof typeof dictionary];

  return <span>{text}</span>;
};

export default memo(Translate);
