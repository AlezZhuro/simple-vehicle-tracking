import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, Text, View } from "react-native";
import { LANG_KEY_RU, LANG_KEY_EN } from "../../constants";
import { RadioButton } from "react-native-paper";

interface SettingModalProps {}

const SettingModal: FunctionComponent<SettingModalProps> = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const changeLangHandle = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <View style={styles.container}>
      <RadioButton.Group onValueChange={changeLangHandle} value={currentLang}>
        <Text>{t("core.lang")}</Text>
        <RadioButton.Item label={t("core.langRu")} value={LANG_KEY_RU} />
        <RadioButton.Item label={t("core.langEn")} value={LANG_KEY_EN} />
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
});

export default SettingModal;
