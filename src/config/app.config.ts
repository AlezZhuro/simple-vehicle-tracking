import Config from "react-native-config";
import { en, ru } from "../translations";
import { LANG_KEY_RU } from "../constants";

const config = {
  keys: {
    MapBox: Config.MAPBOX_TOKEN as string,
  },
  i18n: {
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    fallbackLng: LANG_KEY_RU,
  }
};

export { config };
