import { RingProgress, Text, Paper, Center, Group } from "@mantine/core";
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
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper radius="md" key={stat.label}>
        <Group>
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
      </Paper>
    );
  });
  return <>{stats}</>;
};
