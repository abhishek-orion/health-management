import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import { Text } from "../Text";

describe("Text Component", () => {
  describe("Rendering", () => {
    it("renders children text content", () => {
      render(<Text type="p">Hello World</Text>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("renders with default paragraph when no type is specified", () => {
      render(<Text>Default paragraph</Text>);
      const element = screen.getByText("Default paragraph");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("leading-7");
    });

    it("renders complex children content", () => {
      render(
        <Text type="div">
          <span>Child 1</span>
          <em>Child 2</em>
        </Text>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("Heading Elements", () => {
    it("renders h1 with correct styling", () => {
      render(<Text type="h1">Main Heading</Text>);
      const heading = screen.getByText("Main Heading");
      
      expect(heading.tagName).toBe("H1");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-center", 
        "text-4xl",
        "font-extrabold",
        "tracking-tight",
        "text-balance"
      );
    });

    it("renders h2 with correct styling", () => {
      render(<Text type="h2">Section Heading</Text>);
      const heading = screen.getByText("Section Heading");
      
      expect(heading.tagName).toBe("H2");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "border-b",
        "pb-2",
        "text-3xl",
        "font-semibold",
        "tracking-tight",
        "first:mt-0"
      );
    });

    it("renders h3 with correct styling", () => {
      render(<Text type="h3">Subsection Heading</Text>);
      const heading = screen.getByText("Subsection Heading");
      
      expect(heading.tagName).toBe("H3");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-2xl",
        "font-semibold",
        "tracking-tight"
      );
    });

    it("renders h4 with correct styling", () => {
      render(<Text type="h4">Sub-subsection Heading</Text>);
      const heading = screen.getByText("Sub-subsection Heading");
      
      expect(heading.tagName).toBe("H4");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-xl",
        "font-semibold",
        "tracking-tight"
      );
    });

    it("renders h5 with correct styling", () => {
      render(<Text type="h5">Minor Heading</Text>);
      const heading = screen.getByText("Minor Heading");
      
      expect(heading.tagName).toBe("H5");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-lg",
        "font-semibold",
        "tracking-tight"
      );
    });

    it("renders h6 with correct styling", () => {
      render(<Text type="h6">Smallest Heading</Text>);
      const heading = screen.getByText("Smallest Heading");
      
      expect(heading.tagName).toBe("H6");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-base",
        "font-semibold",
        "tracking-tight"
      );
    });
  });

  describe("Text Elements", () => {
    it("renders paragraph with correct styling", () => {
      render(<Text type="p">This is a paragraph</Text>);
      const paragraph = screen.getByText("This is a paragraph");
      
      expect(paragraph.tagName).toBe("P");
      expect(paragraph).toHaveClass(
        "leading-7",
        "[&:not(:first-child)]:mt-1"
      );
    });

    it("renders span with correct styling", () => {
      render(<Text type="span">This is a span</Text>);
      const span = screen.getByText("This is a span");
      
      expect(span.tagName).toBe("SPAN");
      expect(span).toHaveClass("inline-block");
    });

    it("renders p as default when invalid type is provided", () => {
      // @ts-ignore - Testing invalid type
      render(<Text type="invalid">Default text</Text>);
      const element = screen.getByText("Default text");
      
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("leading-7");
    });

    it("renders p as default when no type is provided", () => {
      // @ts-ignore - Testing undefined type
      render(<Text>No type specified</Text>);
      const element = screen.getByText("No type specified");
      
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("leading-7");
    });
  });

  describe("Font and Typography", () => {
    it("applies Inter font family to all text elements", () => {
      const { rerender } = render(<Text type="h1">Heading</Text>);
      expect(screen.getByText("Heading")).toHaveStyle({ fontFamily: "Inter" });
      
      rerender(<Text type="p">Paragraph</Text>);
      expect(screen.getByText("Paragraph")).toHaveStyle({ fontFamily: "Inter" });
      
      rerender(<Text type="span">Span</Text>);
      expect(screen.getByText("Span")).toHaveStyle({ fontFamily: "Inter" });
    });

    it("applies custom color prop", () => {
      render(<Text type="p" color="red">Red text</Text>);
      expect(screen.getByText("Red text")).toHaveStyle({ color: "red" });
    });

    it("applies custom color with hex value", () => {
      render(<Text type="p" color="#0066cc">Blue text</Text>);
      expect(screen.getByText("Blue text")).toHaveStyle({ color: "#0066cc" });
    });

    it("applies custom color with rgb value", () => {
      render(<Text type="p" color="rgb(255, 0, 0)">RGB red text</Text>);
      expect(screen.getByText("RGB red text")).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });
  });

  describe("Styling and customization", () => {
    it("applies custom className", () => {
      render(<Text type="p" className="custom-text-class">Custom class text</Text>);
      expect(screen.getByText("Custom class text")).toHaveClass("custom-text-class");
    });

    it("combines default classes with custom className", () => {
      render(<Text type="h1" className="extra-class">Heading with extra class</Text>);
      const heading = screen.getByText("Heading with extra class");
      
      expect(heading).toHaveClass("extra-class");
      expect(heading).toHaveClass("text-4xl"); // Should still have default classes
    });

    it("applies custom style object", () => {
      const customStyle = {
        backgroundColor: "blue",
        padding: "10px",
        margin: "5px"
      };
      
      render(<Text type="p" style={customStyle}>Styled text</Text>);
      const textElement = screen.getByText("Styled text");
      
      expect(textElement).toHaveStyle({
        backgroundColor: "blue",
        padding: "10px",
        margin: "5px",
        fontFamily: "Inter"
      });
    });

    it("merges custom style with default font family", () => {
      render(
        <Text type="p" style={{ fontSize: "20px", lineHeight: "1.5" }}>
          Custom styled text
        </Text>
      );
      const textElement = screen.getByText("Custom styled text");
      
      expect(textElement).toHaveStyle({
        fontSize: "20px",
        lineHeight: "1.5",
        fontFamily: "Inter"
      });
    });

    it("overrides default font family when specified in style", () => {
      render(
        <Text type="p" style={{ fontFamily: "Arial, sans-serif" }}>
          Arial text
        </Text>
      );
      
      expect(screen.getByText("Arial text")).toHaveStyle({
        fontFamily: "Arial, sans-serif"
      });
    });
  });

  describe("Accessibility", () => {
    it("preserves semantic heading hierarchy", () => {
      render(
        <div>
          <Text type="h1">Main Title</Text>
          <Text type="h2">Section Title</Text>
          <Text type="h3">Subsection Title</Text>
        </div>
      );
      
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Main Title");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Section Title");
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Subsection Title");
    });

    it("allows screen readers to navigate properly with scroll-m-20 class", () => {
      render(<Text type="h2">Scroll Margin Heading</Text>);
      expect(screen.getByText("Scroll Margin Heading")).toHaveClass("scroll-m-20");
    });

    it("supports proper text wrapping with text-balance on h1", () => {
      render(<Text type="h1">Long heading that should balance properly</Text>);
      expect(screen.getByText("Long heading that should balance properly")).toHaveClass("text-balance");
    });
  });

  describe("Edge cases", () => {
    it("handles empty children", () => {
      render(<Text type="p"></Text>);
      expect(screen.getByText("")).toBeInTheDocument();
    });

    it("handles null children", () => {
      render(<Text type="p">{null}</Text>);
      const element = screen.getByTestId("paragraph") || document.querySelector("p");
      expect(element).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Text type="p">{undefined}</Text>);
      const element = document.querySelector("p");
      expect(element).toBeInTheDocument();
    });

    it("handles numeric children", () => {
      render(<Text type="p">{42}</Text>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(<Text type="p">{true}</Text>);
      // React doesn't render boolean values as text
      const element = document.querySelector("p");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Component composition", () => {
    it("can be nested within other components", () => {
      render(
        <div data-testid="container">
          <Text type="h1">Nested Heading</Text>
          <Text type="p">Nested paragraph</Text>
        </div>
      );
      
      const container = screen.getByTestId("container");
      expect(container).toContainElement(screen.getByText("Nested Heading"));
      expect(container).toContainElement(screen.getByText("Nested paragraph"));
    });

    it("supports complex nested content", () => {
      render(
        <Text type="p">
          This paragraph contains{" "}
          <Text type="span" className="font-bold">bold text</Text>
          {" "}and regular text.
        </Text>
      );
      
      expect(screen.getByText("bold text")).toHaveClass("font-bold", "inline-block");
      expect(screen.getByText(/This paragraph contains.*and regular text/)).toBeInTheDocument();
    });
  });
});
