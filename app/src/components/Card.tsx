import { DefaultMantineColor, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

interface CardProps {
  children: JSX.Element;
  bg?: DefaultMantineColor;
  to?: string;
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <Paper
      //@ts-ignore
      component={props.to === undefined ? "div" : Link}
      //@ts-ignore
      to={props.to}
      bg={props.bg}
      withBorder
      radius="md"
      style={{ minHeight: "11vh" }}
    >
      <Paper p="xs">{props.children}</Paper>
    </Paper>
  );
};

export default Card;
