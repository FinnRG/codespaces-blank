import { Button, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import {
  CAFlag,
  DEFlag,
  DKFlag,
  ESFlag,
  GBFlag,
  PTFlag,
} from "mantine-flagpack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type Language = "en" | "es" | "ca" | "pt" | "dk" | "de";

interface LanguageButtonProps {
  value?: Language;
  onChange?: (val: Language) => any;
}

const LanguageButton = (props: LanguageButtonProps) => {
  const { t } = useTranslation("common");
  const [language, setLanguage] = useState<Language>(props.value ?? "en");

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(language);
    }
  }, [language]);

  const languageIcon =
    language === "ca" ? (
      <CAFlag w={17} />
    ) : language === "de" ? (
      <DEFlag w={17} />
    ) : language === "dk" ? (
      <DKFlag w={17} />
    ) : language === "en" ? (
      <GBFlag w={17} />
    ) : language === "es" ? (
      <ESFlag w={17} />
    ) : (
      <PTFlag w={17} />
    );

  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button
          leftIcon={languageIcon}
          rightIcon={<IconChevronDown size={18} stroke={1.5} />}
          pr={12}
        >
          {t("language")}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => setLanguage("en")} icon={<GBFlag w={17} />}>
          {t("english")}
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("es")} icon={<ESFlag w={17} />}>
          {t("spanish")}
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("ca")} icon={<CAFlag w={17} />}>
          {t("catalan")}
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("pt")} icon={<PTFlag w={17} />}>
          {t("portuguese")}
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("dk")} icon={<DKFlag w={17} />}>
          {t("danish")}
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("de")} icon={<DEFlag w={17} />}>
          {t("german")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageButton;
