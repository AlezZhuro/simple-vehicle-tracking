import AsyncStorage from "@react-native-async-storage/async-storage";
import { Module } from "i18next";
import { getLocales } from "react-native-localize";

import { STORE_LANGUAGE_KEY } from "../constants";



const languageDetectorPlugin = {
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: async function (callback: (lang: string) => void) {
      try {
        //get stored language from Async storage
        await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
          if (language) {
            //if language was stored before, use this language in the app
            return callback(language);
          } else {
            //if language was not stored yet, use device's locale
            return callback(getLocales()[0].languageCode);
          }
        });
      } catch (error) {
        console.log("Error reading language", error);
      }
    },
    cacheUserLanguage: async function (language: string) {
      try {
        //save a user's language choice in Async storage
        await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
      } catch (error) {}
    },
  };

  export default languageDetectorPlugin as Module;