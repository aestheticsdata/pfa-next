import { LangKeys } from "./types";
import Cookie from "js-cookie";

import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-US";
import { LocalesObject } from "./types";

export const getLang = ():LangKeys => {
  return Cookie.get('lang') as LangKeys ?? 'en';
}

export const locales: LocalesObject = {
  'fr': {
    fr,
    formatString: 'dd MMM yyyy',
  },
  'en': {
    en,
    formatString: 'MMM do y',
  },
};
