import { CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export const Skeleton = ({
  className = "",
  style = {},
  width = "100%",
  height = "1rem",
  borderRadius = "var(--radius-md)",
}: SkeletonProps) => {
  const skeletonStyle: CSSProperties = {
    width,
    height,
    borderRadius,
    backgroundColor: "var(--muted)",
    backgroundImage: `linear-gradient(
      90deg,
      var(--muted) 25%,
      var(--accent) 50%,
      var(--muted) 75%
    )`,
    backgroundSize: "200% 100%",
    animation: "skeleton-loading 1.5s infinite ease-in-out",
    ...style,
  };

  return (
    <>
      <style>
        {`
          @keyframes skeleton-loading {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}
      </style>
      <div className={className} style={skeletonStyle} />
    </>
  );
};