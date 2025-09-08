import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import { Text } from "../Text";

describe("Text Component", () => {
  describe("Heading Elements", () => {
    it("renders with correct types", () => {
      const { rerender } = render(<Text type="h1">Heading 1</Text>);
      expect(screen.getByText("Heading 1").tagName).toBe("H1");
      
      rerender(<Text type="h2">Heading 2</Text>);
      expect(screen.getByText("Heading 2").tagName).toBe("H2");
      
      rerender(<Text type="h3">Heading 3</Text>);
      expect(screen.getByText("Heading 3").tagName).toBe("H3");
      
      rerender(<Text type="h4">Heading 4</Text>);
      expect(screen.getByText("Heading 4").tagName).toBe("H4");
      
      rerender(<Text type="h5">Heading 5</Text>);
      expect(screen.getByText("Heading 5").tagName).toBe("H5");
      
      rerender(<Text type="h6">Heading 6</Text>);
      expect(screen.getByText("Heading 6").tagName).toBe("H6");
    });
  });

  describe("Text Elements", () => {
    it("renders paragraph and span correctly", () => {
      const { rerender } = render(<Text type="p">Paragraph text</Text>);
      expect(screen.getByText("Paragraph text").tagName).toBe("P");
      
      rerender(<Text type="span">Span text</Text>);
      expect(screen.getByText("Span text").tagName).toBe("SPAN");
    });

    it("renders p as default when invalid type is provided", () => {
      // @ts-ignore - Testing invalid type
      render(<Text type="invalid">Default text</Text>);
      expect(screen.getByText("Default text").tagName).toBe("P");
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      render(<Text type="p" className="custom-text-class">Custom class text</Text>);
      expect(screen.getByText("Custom class text")).toHaveAttribute(
        "class", 
        expect.stringContaining("custom-text-class")
      );
    });

    it("applies custom style", () => {
      render(
        <Text 
          type="p" 
          style={{ backgroundColor: "blue", padding: "10px" }}
        >
          Styled text
        </Text>
      );
      const textElement = screen.getByText("Styled text");
      expect(textElement.style.backgroundColor).toBe("blue");
      expect(textElement.style.padding).toBe("10px");
    });
  });
});
