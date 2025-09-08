import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import { Label } from "../label";

describe("Label Component", () => {
  it("renders correctly with default props", () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Label className="custom-class">Custom Label</Label>);
    const labelElement = screen.getByText("Custom Label");
    expect(labelElement).toHaveClass("custom-class");
  });

  it("renders with htmlFor attribute", () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    const labelElement = screen.getByText("Input Label");
    expect(labelElement).toHaveAttribute("for", "test-input");
  });

  it("renders with correct data attribute", () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveAttribute("data-slot", "label");
  });

  it("passes additional props to label element", () => {
    render(<Label data-testid="test-label">Test Label</Label>);
    const labelElement = screen.getByTestId("test-label");
    expect(labelElement).toHaveTextContent("Test Label");
  });

  it("works with nested elements", () => {
    render(
      <Label>
        <span data-testid="nested-element">Nested Element</span>
      </Label>
    );
    
    const nestedElement = screen.getByTestId("nested-element");
    expect(nestedElement).toBeInTheDocument();
  });
});
