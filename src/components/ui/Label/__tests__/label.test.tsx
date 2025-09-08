import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import { Label } from "../label";

describe("Label Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Label data-testid="label">Label text</Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Label text");
      expect(label.tagName).toBe("LABEL");
      expect(label).toHaveAttribute("data-slot", "label");
    });

    it("renders with htmlFor attribute", () => {
      render(<Label htmlFor="input-id" data-testid="label">Input Label</Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toHaveAttribute("for", "input-id");
    });

    it("renders children content", () => {
      render(
        <Label data-testid="label">
          <span>Required</span> Field
        </Label>
      );
      
      expect(screen.getByText("Required")).toBeInTheDocument();
      expect(screen.getByText("Field")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies default styling classes", () => {
      render(<Label data-testid="label">Styled label</Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toHaveClass(
        "text-sm",
        "font-medium",
        "leading-none",
        "peer-disabled:cursor-not-allowed",
        "peer-disabled:opacity-70"
      );
    });

    it("applies custom className", () => {
      render(<Label className="custom-label" data-testid="label">Custom label</Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toHaveClass("custom-label");
      expect(label).toHaveClass("text-sm"); // Should still have default classes
    });

    it("supports peer-disabled styling", () => {
      render(
        <div>
          <input disabled className="peer" />
          <Label data-testid="label">Disabled peer label</Label>
        </div>
      );
      const label = screen.getByTestId("label");
      
      expect(label).toHaveClass("peer-disabled:cursor-not-allowed", "peer-disabled:opacity-70");
    });
  });

  describe("Accessibility", () => {
    it("associates with form controls", () => {
      render(
        <div>
          <Label htmlFor="test-input">Test Label</Label>
          <input id="test-input" />
        </div>
      );
      
      const label = screen.getByText("Test Label");
      const input = screen.getByDisplayValue("");
      
      expect(label).toHaveAttribute("for", "test-input");
      expect(input).toHaveAttribute("id", "test-input");
    });

    it("supports aria attributes", () => {
      render(<Label aria-describedby="help-text" data-testid="label">ARIA Label</Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toHaveAttribute("aria-describedby", "help-text");
    });
  });

  describe("Form integration", () => {
    it("works with form controls", () => {
      render(
        <form>
          <Label htmlFor="email">Email Address</Label>
          <input type="email" id="email" name="email" />
        </form>
      );
      
      const label = screen.getByText("Email Address");
      const input = screen.getByDisplayValue("");
      
      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "email");
    });

    it("supports required indicators", () => {
      render(
        <Label data-testid="label">
          Email Address <span className="text-red-500">*</span>
        </Label>
      );
      
      expect(screen.getByText("Email Address")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles empty content", () => {
      render(<Label data-testid="label"></Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("");
    });

    it("handles complex nested content", () => {
      render(
        <Label data-testid="label">
          <strong>Bold</strong> and <em>italic</em> text
        </Label>
      );
      
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("passes additional props", () => {
      render(<Label id="custom-id" role="label" data-testid="label">Props label</Label>);
      const label = screen.getByTestId("label");
      
      expect(label).toHaveAttribute("id", "custom-id");
      expect(label).toHaveAttribute("role", "label");
    });
  });
});
