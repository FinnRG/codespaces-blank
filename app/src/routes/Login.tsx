import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useInputState, usePagination } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import LanguageButton, { Language } from "../components/LanguageButton";
import useUserData from "../hooks/useUserData";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ColorschemePicker from "../components/ColorschemePicker";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation(["login", "common"]);
  const { setUserData } = useUserData();
  const [name, setName] = useInputState<string>("");
  const [language, setLanguage] = useState<Language>("en");
  const step = usePagination({ total: 3, initialPage: 1 });

  const chooseLanguage = (lang: Language) => {
    setUserData((prev) => {
      return {
        ...prev,
        preferredLanguage: lang,
      };
    });
  };

  const chooseName = (name: string) => {
    setUserData((prev) => {
      return {
        ...prev,
        name,
      };
    });
  };

  return (
    <Container>
      <Paper radius="md" p="xl" withBorder>
        <Stack align="center">
          <Title order={2}>{t("welcome")}</Title>
          <Logo />
          {step.active === 1 && <Title order={4}>{t("chooseName")}</Title>}
          {step.active === 2 && <Title order={4}>{t("chooseLang")}</Title>}
          {step.active === 1 && (
            <TextInput
              label={t("name")}
              placeholder={t("namePlaceholder").toString()}
              value={name}
              onChange={setName}
            />
          )}
          {step.active === 2 && (
            <LanguageButton
              value={language}
              onChange={(lang) => setLanguage(lang)}
            />
          )}
          {step.active === 3 && <ColorschemePicker />}
          <Group>
            {step.active !== 1 && (
              <Button
                onClick={() => step.previous()}
                leftIcon={<IconArrowLeft />}
              >
                {t("common:back")}
              </Button>
            )}
            {step.active !== 3 && (
              <Button
                onClick={() => {
                  step.next();
                }}
                rightIcon={<IconArrowRight />}
              >
                {t("common:next")}
              </Button>
            )}
            {step.active === 3 && (
              <Button
                onClick={() => {
                  chooseName(name);
                  chooseLanguage(language);
                }}
                rightIcon={<IconCheck />}
                color="green"
                component={Link}
                to="/challenges"
              >
                {t("common:done")}
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
