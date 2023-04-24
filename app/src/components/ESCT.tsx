import { Box, packSx } from "@mantine/core";
import type { DefaultProps, MantineNumberSize } from "@mantine/core";

export interface FlagProps
  extends DefaultProps,
    React.ComponentPropsWithoutRef<"div"> {
  /** Flag width */
  size?: React.CSSProperties["width"];

  /** Key of theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;
}

export function ESCTFlag({ radius, sx, ...others }: FlagProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          display: "inline-block",
          overflow: "hidden",
          lineHeight: 1,
          borderRadius: theme.fn.radius(radius),

          "& svg": {
            display: "block",
          },
        }),
        ...packSx(sx),
      ]}
      {...others}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="flag-icons-es-ct"
        viewBox="0 0 640 480"
      >
        <path fill="#fcdd09" d="M0 0h640v480H0z" />
        <path
          stroke="#da121a"
          strokeWidth="60"
          d="M0 90h810m0 120H0m0 120h810m0 120H0"
          transform="scale(.79012 .88889)"
        />
      </svg>
    </Box>
  );
}
