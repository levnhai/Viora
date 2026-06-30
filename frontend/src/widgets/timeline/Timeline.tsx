import { ComponentType } from "react";
import { LoveStoryTimelineItem } from "@/entities/invitation/model/types";
import { VerticalTimeline } from "./variants/VerticalTimeline";
import { SimpleList } from "./variants/SimpleList";

export type TimelineKey = "vertical" | "slider" | "simple";

interface TimelineProps {
  variant: TimelineKey;
  data?: LoveStoryTimelineItem[];
}

const timelineRegistry: Record<
  TimelineKey,
  ComponentType<{ data: LoveStoryTimelineItem[] }>
> = {
  vertical: VerticalTimeline,
  slider: VerticalTimeline, // Re-use vertical or slider if horizontal timeline is made
  simple: SimpleList,
};

export function Timeline({ variant, data = [] }: TimelineProps) {
  if (data.length === 0) return null;
  const TargetTimeline = timelineRegistry[variant] || SimpleList;
  return <TargetTimeline data={data} />;
}
