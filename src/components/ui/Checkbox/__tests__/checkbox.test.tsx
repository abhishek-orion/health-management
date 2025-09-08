import React from "react";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import { Checkbox } from "../checkbox";

describe("Checkbox Component", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Checkbox data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    });

    it("renders with aria-label", () => {
      render(<Checkbox aria-label="Accept terms" data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("aria-label", "Accept terms");
    });

    it("renders with id attribute", () => {
      render(<Checkbox id="terms-checkbox" data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("id", "terms-checkbox");
    });
  });

  describe("States", () => {
    it("renders unchecked by default", () => {
      render(<Checkbox data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
    });

    it("renders checked when checked prop is true", () => {
      render(<Checkbox checked onCheckedChange={() => {}} data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("data-state", "checked");
    });

    it("renders as disabled", () => {
      render(<Checkbox disabled data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toBeDisabled();
    });
  });

  describe("Styling", () => {
    it("applies default styling classes", () => {
      render(<Checkbox data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveClass(
        "peer",
        "size-4",
        "shrink-0",
        "rounded-[4px]",
        "border"
      );
    });

    it("applies custom className", () => {
      render(<Checkbox className="custom-checkbox" data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveClass("custom-checkbox");
      expect(checkbox).toHaveClass("peer");
    });

    it("applies disabled styling", () => {
      render(<Checkbox disabled data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50");
    });
  });

  describe("Interaction", () => {
    it("handles click events", () => {
      const handleChange = jest.fn();
      render(<Checkbox onCheckedChange={handleChange} data-testid="checkbox" />);
      
      const checkbox = screen.getByTestId("checkbox");
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("toggles checked state when clicked", () => {
      const handleChange = jest.fn();
      render(<Checkbox onCheckedChange={handleChange} data-testid="checkbox" />);
      
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("does not trigger events when disabled", () => {
      const handleChange = jest.fn();
      render(<Checkbox disabled onCheckedChange={handleChange} data-testid="checkbox" />);
      
      const checkbox = screen.getByTestId("checkbox");
      fireEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has proper role", () => {
      render(<Checkbox data-testid="checkbox" />);
      const checkbox = screen.getByRole("checkbox");
      
      expect(checkbox).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      render(<Checkbox aria-describedby="help-text" data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports aria-invalid", () => {
      render(<Checkbox aria-invalid data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("aria-invalid");
    });

    it("is focusable", () => {
      render(<Checkbox data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it("is not focusable when disabled", () => {
      render(<Checkbox disabled data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      checkbox.focus();
      expect(checkbox).not.toHaveFocus();
    });
  });

  describe("Form integration", () => {
    it("works within a form", () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Checkbox name="agree" value="yes" data-testid="checkbox" />
          <button type="submit">Submit</button>
        </form>
      );
      
      const checkbox = screen.getByTestId("checkbox");
      const submitButton = screen.getByText("Submit");
      
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("supports name attribute", () => {
      render(<Checkbox name="terms" data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("name", "terms");
    });

    it("supports value attribute", () => {
      render(<Checkbox value="accepted" data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("value", "accepted");
    });
  });

  describe("Edge cases", () => {
    it("handles defaultChecked", () => {
      render(<Checkbox defaultChecked data-testid="checkbox" />);
      const checkbox = screen.getByTestId("checkbox");
      
      expect(checkbox).toHaveAttribute("data-state", "checked");
    });
  });
});