import dictionary from "~/shared/locales/en";

const TranslateFunc = (textKey: string) =>
  dictionary[textKey as keyof typeof dictionary];

export default TranslateFunc;
