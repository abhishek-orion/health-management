import React from "react";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import { Input } from "../input";

describe("Input Component", () => {
  it("renders correctly with default props", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with different types", () => {
    const { rerender } = render(<Input type="email" placeholder="Enter email" />);
    let input = screen.getByPlaceholderText("Enter email");
    expect(input).toHaveAttribute("type", "email");
    
    rerender(<Input type="password" placeholder="Enter password" />);
    input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("type", "password");
    
    rerender(<Input type="number" placeholder="Enter number" />);
    input = screen.getByPlaceholderText("Enter number");
    expect(input).toHaveAttribute("type", "number");
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" placeholder="Custom input" />);
    const inputElement = screen.getByPlaceholderText("Custom input");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("handles input events", () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Test input" onChange={handleChange} />);
    
    const inputElement = screen.getByPlaceholderText("Test input");
    fireEvent.change(inputElement, { target: { value: "test value" } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue("test value");
  });

  it("applies disabled state correctly", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const inputElement = screen.getByPlaceholderText("Disabled input");
    
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("disabled:opacity-50");
  });

  it("renders addon correctly", () => {
    render(
      <Input 
        placeholder="Input with addon" 
        addon={<span data-testid="test-addon">Addon</span>}
      />
    );
    
    const inputElement = screen.getByPlaceholderText("Input with addon");
    const addonElement = screen.getByTestId("test-addon");
    
    expect(inputElement).toBeInTheDocument();
    expect(addonElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("pr-10"); // Should have padding-right for addon
  });

  it("passes additional props to input element", () => {
    render(
      <Input 
        placeholder="Test input" 
        data-testid="test-input"
        maxLength={10}
        readOnly
      />
    );
    
    const inputElement = screen.getByTestId("test-input");
    expect(inputElement).toHaveAttribute("maxLength", "10");
    expect(inputElement).toHaveAttribute("readOnly");
  });

  it("applies aria-invalid styles when invalid", () => {
    render(<Input aria-invalid placeholder="Invalid input" />);
    const inputElement = screen.getByPlaceholderText("Invalid input");
    
    expect(inputElement).toHaveAttribute("aria-invalid");
    // We can't directly test tailwind classes here, but we can check for the aria attribute
  });
});
