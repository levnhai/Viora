import { ComponentType } from "react";
import { LoveStoryTimelineItem, WeddingData } from "@/entities/invitation/model/types";
import { VerticalTimeline } from "./variants/VerticalTimeline";
import { SimpleList } from "./variants/SimpleList";
import { MinimalTimeline } from "./variants/MinimalTimeline";

export type TimelineKey = "vertical" | "slider" | "simple" | "minimal";

interface TimelineProps {
  variant: TimelineKey;
  data?: LoveStoryTimelineItem[];
  weddingData?: WeddingData;
  primaryColor?: string;
  textColor?: string;
}

const timelineRegistry: Record<TimelineKey, ComponentType<any>> = {
  vertical: VerticalTimeline,
  slider: VerticalTimeline, // Re-use vertical or slider if horizontal timeline is made
  simple: SimpleList,
  minimal: MinimalTimeline,
};

export function Timeline({ variant, data = [], weddingData, ...props }: TimelineProps) {
  // If variant is minimal, it might not need data, it might need weddingData
  if (variant !== "minimal" && data.length === 0) return null;
  
  const TargetTimeline = timelineRegistry[variant] || SimpleList;
  return <TargetTimeline data={data} weddingData={weddingData} {...props} />;
}
