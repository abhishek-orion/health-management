import React from "react";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import { Button } from "../button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("data-slot", "button");
  });

  describe("Variant props", () => {
    it("renders with neutral variant (default)", () => {
      render(<Button>Neutral Button</Button>);
      const button = screen.getByRole("button", { name: /neutral button/i });
      expect(button).toHaveClass("bg-white", "border", "border-gray-900", "text-black");
    });

    it("renders with primary variant", () => {
      render(<Button variant="primary">Primary Button</Button>);
      const button = screen.getByRole("button", { name: /primary button/i });
      expect(button).toHaveClass("bg-blue-600", "text-white");
    });
    
    it("renders with success variant", () => {
      render(<Button variant="success">Success Button</Button>);
      const button = screen.getByRole("button", { name: /success button/i });
      expect(button).toHaveClass("bg-green-600", "text-white");
    });
    
    it("renders with error variant", () => {
      render(<Button variant="error">Error Button</Button>);
      const button = screen.getByRole("button", { name: /error button/i });
      expect(button).toHaveClass("bg-red-600", "text-white");
    });
    
    it("renders with warning variant", () => {
      render(<Button variant="warning">Warning Button</Button>);
      const button = screen.getByRole("button", { name: /warning button/i });
      expect(button).toHaveClass("bg-yellow-500", "text-yellow-900");
    });

    it("renders with outline variant", () => {
      render(<Button variant="outline">Outline Button</Button>);
      const button = screen.getByRole("button", { name: /outline button/i });
      expect(button).toHaveClass("border", "bg-background", "shadow-xs");
    });

    it("renders with link variant", () => {
      render(<Button variant="link">Link Button</Button>);
      const button = screen.getByRole("button", { name: /link button/i });
      expect(button).toHaveClass("text-primary", "underline-offset-4");
    });
  });

  describe("Size props", () => {
    it("renders with default size", () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole("button", { name: /default button/i });
      expect(button).toHaveClass("h-9", "px-4", "py-2");
    });

    it("renders with small size", () => {
      render(<Button size="sm">Small Button</Button>);
      const button = screen.getByRole("button", { name: /small button/i });
      expect(button).toHaveClass("h-8", "rounded-md", "gap-1.5", "px-3");
    });
    
    it("renders with large size", () => {
      render(<Button size="lg">Large Button</Button>);
      const button = screen.getByRole("button", { name: /large button/i });
      expect(button).toHaveClass("h-10", "rounded-md", "px-6");
    });
    
    it("renders with icon size", () => {
      render(<Button size="icon" aria-label="Icon button">🎯</Button>);
      const button = screen.getByRole("button", { name: /icon button/i });
      expect(button).toHaveClass("size-9");
    });
  });

  describe("Interaction handling", () => {
    it("handles click events", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole("button", { name: /click me/i });
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press me</Button>);
      
      const button = screen.getByRole("button", { name: /press me/i });
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      
      // Button should handle Enter key by default
      expect(button).toHaveFocus();
    });

    it("prevents click when disabled", () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
      
      const button = screen.getByRole("button", { name: /disabled button/i });
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("applies disabled state correctly", () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole("button", { name: /disabled button/i });
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:opacity-50", "disabled:pointer-events-none");
    });

    it("has proper aria attributes", () => {
      render(<Button aria-label="Custom aria label">Button</Button>);
      const button = screen.getByRole("button", { name: /custom aria label/i });
      expect(button).toBeInTheDocument();
    });

    it("supports focus management", () => {
      render(<Button>Focusable Button</Button>);
      const button = screen.getByRole("button", { name: /focusable button/i });
      
      button.focus();
      expect(button).toHaveFocus();
      expect(button).toHaveClass("outline-none", "focus-visible:border-ring");
    });
  });

  describe("Styling and customization", () => {
    it("applies custom className", () => {
      render(<Button className="custom-class">Custom Class Button</Button>);
      const button = screen.getByRole("button", { name: /custom class button/i });
      expect(button).toHaveClass("custom-class");
    });

    it("applies custom styles", () => {
      const customStyle = { backgroundColor: 'red', fontSize: '18px' };
      render(<Button style={customStyle}>Styled Button</Button>);
      const button = screen.getByRole("button", { name: /styled button/i });
      
      expect(button).toHaveStyle({ backgroundColor: 'red', fontSize: '18px' });
    });

    it("maintains default cursor pointer style", () => {
      render(<Button>Button with Cursor</Button>);
      const button = screen.getByRole("button", { name: /button with cursor/i });
      expect(button).toHaveStyle({ cursor: 'pointer' });
    });
  });

  describe("Content rendering", () => {
    it("renders text content", () => {
      render(<Button>Text Content</Button>);
      expect(screen.getByText("Text Content")).toBeInTheDocument();
    });

    it("renders with icons", () => {
      render(
        <Button>
          <span data-testid="icon">🎯</span>
          Button with Icon
        </Button>
      );
      
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Button with Icon")).toBeInTheDocument();
    });

    it("renders children properly", () => {
      render(
        <Button>
          <span>Child 1</span>
          <span>Child 2</span>
        </Button>
      );
      
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("Form integration", () => {
    it("works as submit button", () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );
      
      const button = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(button);
      
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("works as reset button", () => {
      render(
        <form>
          <input defaultValue="test" />
          <Button type="reset">Reset</Button>
        </form>
      );
      
      const button = screen.getByRole("button", { name: /reset/i });
      expect(button).toHaveAttribute("type", "reset");
    });
  });
});
