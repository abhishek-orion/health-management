export type TextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface TextProps {
  children: React.ReactNode;
  type: TextType;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}