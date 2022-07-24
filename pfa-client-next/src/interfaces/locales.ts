import localesDates from "@src/i18n/locales-dates";

export type LangKeys = keyof typeof localesDates;

// any should be replaced by Locale which is a date-fns type, but for a mysterious reason
// it does not work, maybe a conflict with Locale type defined elsewhere
export interface LocaleObject {
  [k: string]: any;
  formatString: string;
}

export type LocalesObject = { [k: string]: LocaleObject };
