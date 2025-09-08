import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-label", "Loading");
    });

    it("renders with custom size", () => {
      render(<LoadingSpinner size="lg" />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveClass("h-16", "w-16");
    });

    it("renders with default (md) size when no size specified", () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveClass("h-12", "w-12");
    });

    it("renders with small size", () => {
      render(<LoadingSpinner size="sm" />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveClass("h-6", "w-6");
    });

    it("renders with custom text", () => {
      render(<LoadingSpinner text="Please wait..." />);
      
      expect(screen.getByText("Please wait...")).toBeInTheDocument();
    });

    it("renders without text when text is empty", () => {
      render(<LoadingSpinner text="" />);
      
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies default styling classes", () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveClass(
        "animate-spin",
        "rounded-full",
        "border-2",
        "border-border",
        "border-t-primary"
      );
    });

    it("applies custom className", () => {
      render(<LoadingSpinner className="custom-spinner" />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveClass("custom-spinner");
      expect(spinner).toHaveClass("animate-spin"); // Should still have default classes
    });

    it("applies custom styles", () => {
      const customStyle = { opacity: 0.5 };
      render(<LoadingSpinner style={customStyle} />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveStyle({ opacity: '0.5' });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toHaveAttribute("role", "status");
      expect(spinner).toHaveAttribute("aria-label", "Loading");
    });

    it("includes descriptive text for screen readers", () => {
      render(<LoadingSpinner text="Loading data..." />);
      
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("renders within a centered container", () => {
      const { container } = render(<LoadingSpinner />);
      const outerContainer = container.firstChild;
      
      expect(outerContainer).toHaveClass("flex", "items-center", "justify-center", "h-screen");
    });

    it("centers content within text container", () => {
      const { container } = render(<LoadingSpinner />);
      const textContainer = container.querySelector(".text-center");
      
      expect(textContainer).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles all size variants", () => {
      const { rerender } = render(<LoadingSpinner size="sm" />);
      let spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("h-6", "w-6");
      
      rerender(<LoadingSpinner size="md" />);
      spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("h-12", "w-12");
      
      rerender(<LoadingSpinner size="lg" />);
      spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("h-16", "w-16");
    });

    it("handles undefined props gracefully", () => {
      render(<LoadingSpinner size={undefined} text={undefined} />);
      const spinner = screen.getByRole("status");
      
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("h-12", "w-12"); // Should default to md
    });
  });
});