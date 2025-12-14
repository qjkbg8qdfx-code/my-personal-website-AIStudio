import { ReactNode } from "react";

export interface BentoItemProps {
  children: ReactNode;
  className?: string;
  title?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
}

export interface MetricData {
  name: string;
  value: number;
  label: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}