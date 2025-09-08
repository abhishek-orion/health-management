import React from "react";
import { render } from "../../../../utils/test-utils";
import { Skeleton } from "../Skeleton";

describe("Skeleton Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toBeInTheDocument();
      expect(skeleton?.tagName).toBe("DIV");
    });

    it("renders with custom className", () => {
      const { container } = render(<Skeleton className="custom-skeleton" />);
      const skeleton = container.querySelector("div.custom-skeleton");
      
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("custom-skeleton");
    });

    it("applies custom dimensions through props", () => {
      const { container } = render(<Skeleton width="200px" height="50px" />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        width: '200px',
        height: '50px'
      });
    });

    it("applies custom border radius", () => {
      const { container } = render(<Skeleton borderRadius="8px" />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        borderRadius: '8px'
      });
    });
  });

  describe("Styling", () => {
    it("applies default dimensions", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        width: '100%',
        height: '1rem',
        borderRadius: 'var(--radius-md)'
      });
    });

    it("applies custom styles", () => {
      const customStyle = { opacity: 0.5, margin: '10px' };
      const { container } = render(<Skeleton style={customStyle} />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        opacity: '0.5',
        margin: '10px'
      });
    });

    it("applies background animation styles", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        backgroundColor: 'var(--muted)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite ease-in-out'
      });
    });
  });

  describe("Animation", () => {
    it("includes keyframe animation styles", () => {
      const { container } = render(<Skeleton />);
      const styleElement = container.querySelector("style");
      
      expect(styleElement).toBeInTheDocument();
      expect(styleElement?.textContent).toContain("@keyframes skeleton-loading");
      expect(styleElement?.textContent).toContain("background-position: 200% 0");
      expect(styleElement?.textContent).toContain("background-position: -200% 0");
    });

    it("applies animation to skeleton element", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        animation: 'skeleton-loading 1.5s infinite ease-in-out'
      });
    });
  });

  describe("Common patterns", () => {
    it("can be configured for text loading", () => {
      const { container } = render(<Skeleton width="100%" height="16px" className="text-skeleton" />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveClass("text-skeleton");
      expect(skeleton).toHaveStyle({
        width: '100%',
        height: '16px'
      });
    });

    it("can be configured for avatar loading", () => {
      const { container } = render(<Skeleton width="48px" height="48px" borderRadius="50%" className="avatar-skeleton" />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveClass("avatar-skeleton");
      expect(skeleton).toHaveStyle({
        width: '48px',
        height: '48px',
        borderRadius: '50%'
      });
    });

    it("can be configured for card loading", () => {
      const { container } = render(<Skeleton width="100%" height="200px" className="card-skeleton" />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveClass("card-skeleton");
      expect(skeleton).toHaveStyle({
        width: '100%',
        height: '200px'
      });
    });
  });

  describe("Edge cases", () => {
    it("handles numeric dimensions", () => {
      const { container } = render(<Skeleton width={300} height={100} />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        width: '300px',
        height: '100px'
      });
    });

    it("handles empty className gracefully", () => {
      const { container } = render(<Skeleton className="" />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toBeInTheDocument();
      expect(skeleton?.className).toContain("");
    });

    it("handles undefined props gracefully", () => {
      const { container } = render(<Skeleton width={undefined} height={undefined} />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveStyle({
        width: '100%',
        height: '1rem'
      });
    });

    it("merges custom styles with defaults", () => {
      const customStyle = { marginTop: '20px', backgroundColor: 'red' };
      const { container } = render(<Skeleton style={customStyle} />);
      const skeleton = container.querySelector("div");
      
      expect(skeleton).toHaveStyle({
        marginTop: '20px',
        backgroundColor: 'red', // Should override default
        animation: 'skeleton-loading 1.5s infinite ease-in-out' // Should keep default
      });
    });
  });
});