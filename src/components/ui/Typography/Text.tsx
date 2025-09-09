import { TextProps } from "./Text.d";

const Text = ({ children, type, className, color, style }: TextProps) => {
  switch (type) {
    case "h1":
      return (
        <h1
          className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={`scroll-m-20 text-lg font-semibold tracking-tight ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={`scroll-m-20 text-base font-semibold tracking-tight ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </h6>
      );
    case "p":
      return (
        <p
          className={`leading-7 [&:not(:first-child)]:mt-1 ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </p>
      );
    case "span":
      return (
        <span className={`inline-block ${className}`} style={{ color, fontFamily: "Inter", ...style }}>
          {children}
        </span>
      );
    default:
      return (
        <p
          className={`leading-7 [&:not(:first-child)]:mt-1 ${className}`}
          style={{ color, fontFamily: "Inter", ...style }}
        >
          {children}
        </p>
      );
  }
};

export { Text };
