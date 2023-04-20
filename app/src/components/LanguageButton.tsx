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

export type Language = "en" | "es" | "ca" | "pt" | "dk" | "de";

interface LanguageButtonProps {
  value?: Language;
  onChange?: (val: Language) => any;
}

const LanguageButton = (props: LanguageButtonProps) => {
  const [language, setLanguage] = useState<Language>(props.value ?? "en");

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(language);
    }
  }, [language]);

  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button rightIcon={<IconChevronDown size={18} stroke={1.5} />} pr={12}>
          Language
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => setLanguage("en")} icon={<GBFlag w={17} />}>
          English
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("es")} icon={<ESFlag w={17} />}>
          Spanish
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("ca")} icon={<CAFlag w={17} />}>
          Catalan
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("pt")} icon={<PTFlag w={17} />}>
          Portuguese
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("dk")} icon={<DKFlag w={17} />}>
          Danish
        </Menu.Item>
        <Menu.Item onClick={() => setLanguage("de")} icon={<DEFlag w={17} />}>
          German
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageButton;
