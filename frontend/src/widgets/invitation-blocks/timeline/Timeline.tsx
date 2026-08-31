import { ComponentType } from "react";
import {
  LoveStoryTimelineItem,
  WeddingData,
} from "@/entities/invitation/model/types";
import { VerticalTimeline } from "./variants/VerticalTimeline";
import { SimpleList } from "./variants/SimpleList";
import { MinimalTimeline } from "./variants/MinimalTimeline";
import { Timeline1 } from "./variants/Timeline1";

export type TimelineKey =
  | "vertical"
  | "slider"
  | "simple"
  | "minimal"
  | "Timeline1";

export interface TimelineProps {
  variant: TimelineKey;
  data?: LoveStoryTimelineItem[];
  weddingData?: WeddingData;
  primaryColor?: string;
  textColor?: string;
  flowerImage?: string;
  paperBg?: boolean;
}

const timelineRegistry: Record<TimelineKey, ComponentType<any>> = {
  vertical: VerticalTimeline,
  slider: VerticalTimeline,
  simple: SimpleList,
  minimal: MinimalTimeline,
  Timeline1: Timeline1,
};

export function Timeline({
  variant,
  data = [],
  weddingData,
  ...props
}: TimelineProps) {
  // If variant is minimal or Timeline1, it might not need data, it might need weddingData
  if (variant !== "minimal" && variant !== "Timeline1" && data.length === 0) return null;

  const TargetTimeline = timelineRegistry[variant] || SimpleList;
  return <TargetTimeline data={data} weddingData={weddingData} {...props} />;
}
