import React from "react";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import { Input } from "../input";

describe("Input Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Input placeholder="Enter text" />);
      const inputElement = screen.getByPlaceholderText("Enter text");
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute("data-slot", "input");
    });

    it("renders with default text type when no type specified", () => {
      render(<Input placeholder="Default type" />);
      const inputElement = screen.getByPlaceholderText("Default type");
      expect(inputElement).toHaveAttribute("type", "text");
    });

    it("renders within a relative container", () => {
      const { container } = render(<Input placeholder="Container test" />);
      const containerDiv = container.querySelector(".relative");
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe("Input types", () => {
    it("renders with email type", () => {
      render(<Input type="email" placeholder="Enter email" />);
      const input = screen.getByPlaceholderText("Enter email");
      expect(input).toHaveAttribute("type", "email");
    });

    it("renders with password type", () => {
      render(<Input type="password" placeholder="Enter password" />);
      const input = screen.getByPlaceholderText("Enter password");
      expect(input).toHaveAttribute("type", "password");
    });

    it("renders with number type", () => {
      render(<Input type="number" placeholder="Enter number" />);
      const input = screen.getByPlaceholderText("Enter number");
      expect(input).toHaveAttribute("type", "number");
    });

    it("renders with tel type", () => {
      render(<Input type="tel" placeholder="Enter phone" />);
      const input = screen.getByPlaceholderText("Enter phone");
      expect(input).toHaveAttribute("type", "tel");
    });

    it("renders with url type", () => {
      render(<Input type="url" placeholder="Enter URL" />);
      const input = screen.getByPlaceholderText("Enter URL");
      expect(input).toHaveAttribute("type", "url");
    });

    it("renders with search type", () => {
      render(<Input type="search" placeholder="Search..." />);
      const input = screen.getByPlaceholderText("Search...");
      expect(input).toHaveAttribute("type", "search");
    });

    it("renders with file type", () => {
      render(<Input type="file" />);
      const input = screen.getByDisplayValue("");
      expect(input).toHaveAttribute("type", "file");
    });
  });

  describe("Styling and appearance", () => {
    it("applies default styling classes", () => {
      render(<Input placeholder="Styled input" />);
      const inputElement = screen.getByPlaceholderText("Styled input");
      
      expect(inputElement).toHaveClass(
        "flex",
        "h-9",
        "w-full",
        "min-w-0",
        "rounded-md",
        "border",
        "bg-transparent",
        "px-3",
        "py-1",
        "text-base",
        "shadow-xs"
      );
    });

    it("applies custom className", () => {
      render(<Input className="custom-class" placeholder="Custom input" />);
      const inputElement = screen.getByPlaceholderText("Custom input");
      expect(inputElement).toHaveClass("custom-class");
    });

    it("combines default and custom classes", () => {
      render(<Input className="extra-class" placeholder="Combined classes" />);
      const inputElement = screen.getByPlaceholderText("Combined classes");
      
      expect(inputElement).toHaveClass("extra-class");
      expect(inputElement).toHaveClass("flex"); // Should still have default classes
    });

    it("applies focus styling classes", () => {
      render(<Input placeholder="Focus styling" />);
      const inputElement = screen.getByPlaceholderText("Focus styling");
      
      expect(inputElement).toHaveClass(
        "focus-visible:border-blue-500",
        "focus-visible:ring-blue-500",
        "focus-visible:ring-[2px]"
      );
    });

    it("applies file input specific styling", () => {
      render(<Input type="file" />);
      const inputElement = screen.getByDisplayValue("");
      
      expect(inputElement).toHaveClass(
        "file:text-foreground",
        "file:inline-flex",
        "file:h-7",
        "file:border-0",
        "file:bg-transparent",
        "file:text-sm",
        "file:font-medium"
      );
    });
  });

  describe("Interaction handling", () => {
    it("handles onChange events", () => {
      const handleChange = jest.fn();
      render(<Input placeholder="Test input" onChange={handleChange} />);
      
      const inputElement = screen.getByPlaceholderText("Test input");
      fireEvent.change(inputElement, { target: { value: "test value" } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(inputElement).toHaveValue("test value");
    });

    it("handles onFocus events", () => {
      const handleFocus = jest.fn();
      render(<Input placeholder="Focus test" onFocus={handleFocus} />);
      
      const inputElement = screen.getByPlaceholderText("Focus test");
      fireEvent.focus(inputElement);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("handles onBlur events", () => {
      const handleBlur = jest.fn();
      render(<Input placeholder="Blur test" onBlur={handleBlur} />);
      
      const inputElement = screen.getByPlaceholderText("Blur test");
      fireEvent.blur(inputElement);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events", () => {
      const handleKeyDown = jest.fn();
      render(<Input placeholder="Keyboard test" onKeyDown={handleKeyDown} />);
      
      const inputElement = screen.getByPlaceholderText("Keyboard test");
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("maintains focus state", () => {
      render(<Input placeholder="Focus state" />);
      const inputElement = screen.getByPlaceholderText("Focus state");
      
      inputElement.focus();
      expect(inputElement).toHaveFocus();
    });
  });

  describe("Disabled state", () => {
    it("applies disabled state correctly", () => {
      render(<Input disabled placeholder="Disabled input" />);
      const inputElement = screen.getByPlaceholderText("Disabled input");
      
      expect(inputElement).toBeDisabled();
      expect(inputElement).toHaveClass(
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:pointer-events-none"
      );
    });

    it("prevents input when disabled", () => {
      const handleChange = jest.fn();
      render(<Input disabled placeholder="Disabled input" onChange={handleChange} />);
      
      const inputElement = screen.getByPlaceholderText("Disabled input");
      fireEvent.change(inputElement, { target: { value: "should not work" } });
      
      expect(handleChange).not.toHaveBeenCalled();
      expect(inputElement).toHaveValue("");
    });

    it("prevents focus when disabled", () => {
      render(<Input disabled placeholder="No focus when disabled" />);
      const inputElement = screen.getByPlaceholderText("No focus when disabled");
      
      inputElement.focus();
      expect(inputElement).not.toHaveFocus();
    });
  });

  describe("Addon functionality", () => {
    it("renders addon correctly", () => {
      render(
        <Input 
          placeholder="Input with addon" 
          addon={<span data-testid="test-addon">$</span>}
        />
      );
      
      const inputElement = screen.getByPlaceholderText("Input with addon");
      const addonElement = screen.getByTestId("test-addon");
      
      expect(inputElement).toBeInTheDocument();
      expect(addonElement).toBeInTheDocument();
      expect(addonElement).toHaveTextContent("$");
    });

    it("applies padding-right when addon is present", () => {
      render(
        <Input 
          placeholder="Input with addon" 
          addon={<span>Addon</span>}
        />
      );
      
      const inputElement = screen.getByPlaceholderText("Input with addon");
      expect(inputElement).toHaveClass("pr-10");
    });

    it("positions addon correctly", () => {
      const { container } = render(
        <Input 
          placeholder="Addon positioning" 
          addon={<span data-testid="addon">Icon</span>}
        />
      );
      
      const addonContainer = container.querySelector(".absolute.right-1.top-1\\/2.-translate-y-1\\/2");
      expect(addonContainer).toBeInTheDocument();
    });

    it("renders complex addon content", () => {
      render(
        <Input 
          placeholder="Complex addon" 
          addon={
            <div data-testid="complex-addon">
              <span>🔍</span>
            </div>
          }
        />
      );
      
      const complexAddon = screen.getByTestId("complex-addon");
      expect(complexAddon).toBeInTheDocument();
      expect(complexAddon).toHaveTextContent("🔍");
    });

    it("does not apply padding when no addon", () => {
      render(<Input placeholder="No addon" />);
      const inputElement = screen.getByPlaceholderText("No addon");
      expect(inputElement).not.toHaveClass("pr-10");
    });
  });

  describe("Validation and error states", () => {
    it("applies aria-invalid styles when invalid", () => {
      render(<Input aria-invalid placeholder="Invalid input" />);
      const inputElement = screen.getByPlaceholderText("Invalid input");
      
      expect(inputElement).toHaveAttribute("aria-invalid");
      expect(inputElement).toHaveClass(
        "aria-invalid:ring-red-500",
        "aria-invalid:border-red-500",
        "aria-invalid:focus-visible:border-red-500",
        "aria-invalid:focus-visible:ring-red-500"
      );
    });

    it("applies dark mode invalid styles", () => {
      render(<Input aria-invalid placeholder="Dark invalid" />);
      const inputElement = screen.getByPlaceholderText("Dark invalid");
      
      expect(inputElement).toHaveClass("dark:aria-invalid:ring-red-500");
    });

    it("supports aria-describedby for error messages", () => {
      render(<Input placeholder="Error input" aria-describedby="error-message" />);
      const inputElement = screen.getByPlaceholderText("Error input");
      
      expect(inputElement).toHaveAttribute("aria-describedby", "error-message");
    });

    it("supports required attribute", () => {
      render(<Input placeholder="Required input" required />);
      const inputElement = screen.getByPlaceholderText("Required input");
      
      expect(inputElement).toHaveAttribute("required");
    });
  });

  describe("Attributes and props", () => {
    it("passes additional HTML attributes", () => {
      render(
        <Input 
          placeholder="Test input" 
          data-testid="test-input"
          maxLength={10}
          readOnly
          autoComplete="email"
        />
      );
      
      const inputElement = screen.getByTestId("test-input");
      expect(inputElement).toHaveAttribute("maxLength", "10");
      expect(inputElement).toHaveAttribute("readOnly");
      expect(inputElement).toHaveAttribute("autoComplete", "email");
    });

    it("supports value and defaultValue", () => {
      const { rerender } = render(<Input placeholder="Value test" value="controlled" onChange={() => {}} />);
      let inputElement = screen.getByPlaceholderText("Value test");
      expect(inputElement).toHaveValue("controlled");
      
      rerender(<Input placeholder="Default value test" defaultValue="uncontrolled" />);
      inputElement = screen.getByPlaceholderText("Default value test");
      expect(inputElement).toHaveValue("uncontrolled");
    });

    it("supports name attribute", () => {
      render(<Input placeholder="Named input" name="username" />);
      const inputElement = screen.getByPlaceholderText("Named input");
      expect(inputElement).toHaveAttribute("name", "username");
    });

    it("supports id attribute", () => {
      render(<Input placeholder="ID input" id="user-input" />);
      const inputElement = screen.getByPlaceholderText("ID input");
      expect(inputElement).toHaveAttribute("id", "user-input");
    });
  });

  describe("Theme and responsive styling", () => {
    it("applies dark mode styling", () => {
      render(<Input placeholder="Dark mode test" />);
      const inputElement = screen.getByPlaceholderText("Dark mode test");
      
      expect(inputElement).toHaveClass("dark:bg-input/30");
    });

    it("applies responsive text sizing", () => {
      render(<Input placeholder="Responsive text" />);
      const inputElement = screen.getByPlaceholderText("Responsive text");
      
      expect(inputElement).toHaveClass("text-base", "md:text-sm");
    });

    it("applies selection styling", () => {
      render(<Input placeholder="Selection styling" />);
      const inputElement = screen.getByPlaceholderText("Selection styling");
      
      expect(inputElement).toHaveClass(
        "selection:bg-primary",
        "selection:text-primary-foreground"
      );
    });

    it("applies placeholder styling", () => {
      render(<Input placeholder="Placeholder styling" />);
      const inputElement = screen.getByPlaceholderText("Placeholder styling");
      
      expect(inputElement).toHaveClass("placeholder:text-muted-foreground");
    });
  });

  describe("Form integration", () => {
    it("works within a form", () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Input name="testField" placeholder="Form input" />
          <button type="submit">Submit</button>
        </form>
      );
      
      const inputElement = screen.getByPlaceholderText("Form input");
      const submitButton = screen.getByText("Submit");
      
      fireEvent.change(inputElement, { target: { value: "form data" } });
      fireEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
      expect(inputElement).toHaveValue("form data");
    });

    it("supports form validation", () => {
      render(
        <form>
          <Input 
            placeholder="Email validation" 
            type="email" 
            required 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
          />
        </form>
      );
      
      const inputElement = screen.getByPlaceholderText("Email validation");
      expect(inputElement).toHaveAttribute("pattern");
      expect(inputElement).toHaveAttribute("required");
    });
  });

  describe("Edge cases", () => {
    it("handles empty addon gracefully", () => {
      render(<Input placeholder="Empty addon" addon={null} />);
      const inputElement = screen.getByPlaceholderText("Empty addon");
      
      expect(inputElement).not.toHaveClass("pr-10");
      expect(inputElement).toBeInTheDocument();
    });

    it("handles undefined addon", () => {
      render(<Input placeholder="Undefined addon" addon={undefined} />);
      const inputElement = screen.getByPlaceholderText("Undefined addon");
      
      expect(inputElement).not.toHaveClass("pr-10");
      expect(inputElement).toBeInTheDocument();
    });

    it("handles very long values", () => {
      const longValue = "A".repeat(1000);
      render(<Input placeholder="Long value" defaultValue={longValue} />);
      const inputElement = screen.getByPlaceholderText("Long value");
      
      expect(inputElement).toHaveValue(longValue);
    });
  });
});
