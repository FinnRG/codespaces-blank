import { RingProgress, Text, Center, Group } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

interface StatsRingProps {
  data: {
    label: string;
    stats: number;
    progress: number;
    color: string;
    icon: "up" | "down";
  }[];
}

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export const StatsRing = ({ data }: StatsRingProps) => {
  const stats = data.map((stat, key) => {
    const Icon = icons[stat.icon];
    return (
      <Group key={key}>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: stat.progress, color: stat.color }]}
          label={
            <Center>
              <Icon size={22} stroke={1.5} />
            </Center>
          }
        />

        <div>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {stat.label}
          </Text>
          <Text weight={700} size="xl">
            {stat.stats}
          </Text>
        </div>
      </Group>
    );
  });
  return <>{stats}</>;
};
