import React from "react";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import { Button } from "../button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with correct variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary Button</Button>);
    let button = screen.getByRole("button", { name: /primary button/i });
    expect(button).toHaveClass("bg-blue-600");
    
    rerender(<Button variant="success">Success Button</Button>);
    button = screen.getByRole("button", { name: /success button/i });
    expect(button).toHaveClass("bg-green-600");
    
    rerender(<Button variant="error">Error Button</Button>);
    button = screen.getByRole("button", { name: /error button/i });
    expect(button).toHaveClass("bg-red-600");
    
    rerender(<Button variant="warning">Warning Button</Button>);
    button = screen.getByRole("button", { name: /warning button/i });
    expect(button).toHaveClass("bg-yellow-500");
  });

  it("renders with correct size classes", () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    let button = screen.getByRole("button", { name: /small button/i });
    expect(button).toHaveClass("h-8");
    
    rerender(<Button size="default">Default Button</Button>);
    button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveClass("h-9");
    
    rerender(<Button size="lg">Large Button</Button>);
    button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("h-10");
    
    rerender(<Button size="icon">Icon Button</Button>);
    button = screen.getByRole("button", { name: /icon button/i });
    expect(button).toHaveClass("size-9");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    const button = screen.getByRole("button", { name: /custom class button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a different element when asChild is true", () => {
    // Testing asChild with a div element
    const { container } = render(
      <Button asChild>
        <div data-testid="test-child">Child Element</div>
      </Button>
    );
    
    const childElement = screen.getByTestId("test-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveClass("inline-flex"); // Check if button styles applied
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });
  
  it("applies disabled state correctly", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });
});
