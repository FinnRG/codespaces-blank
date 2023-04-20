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

const Login = () => {
  const { setUserData } = useUserData();
  const [name, setName] = useInputState<string>("");
  const [language, setLanguage] = useState<Language>("en");
  const step = usePagination({ total: 2, initialPage: 1 });

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
          <Title order={2}>Welcome to Let's Science</Title>
          <Logo />
          {step.active === 1 && <Title order={4}>Choose your name</Title>}
          {step.active === 2 && (
            <Title order={4}>Choose your preferred language</Title>
          )}
          {step.active === 1 && (
            <TextInput
              label="Name"
              placeholder="Your name"
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
          <Group>
            {step.active !== 1 && (
              <Button
                onClick={() => step.previous()}
                leftIcon={<IconArrowLeft />}
              >
                Back
              </Button>
            )}
            {step.active !== 2 && (
              <Button
                onClick={() => {
                  step.next();
                }}
                rightIcon={<IconArrowRight />}
              >
                Next
              </Button>
            )}
            {step.active === 2 && (
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
                Done
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
