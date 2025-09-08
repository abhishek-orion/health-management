import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "../card";

describe("Card Components", () => {
  describe("Card Component", () => {
    it("renders correctly with default props", () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId("card");
      
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute("data-slot", "card");
      expect(card).toHaveTextContent("Card content");
    });

    it("applies default styling classes", () => {
      render(<Card data-testid="card">Styled card</Card>);
      const card = screen.getByTestId("card");
      
      expect(card).toHaveClass(
        "bg-card",
        "text-card-foreground",
        "flex",
        "flex-col",
        "gap-6",
        "rounded-xl",
        "border",
        "py-6"
      );
    });

    it("applies elevation shadow styling", () => {
      render(<Card data-testid="card">Shadow card</Card>);
      const card = screen.getByTestId("card");
      
      expect(card).toHaveStyle({ boxShadow: 'var(--elevation-raised)' });
    });

    it("applies custom className", () => {
      render(<Card className="custom-card" data-testid="card">Custom card</Card>);
      const card = screen.getByTestId("card");
      
      expect(card).toHaveClass("custom-card");
      expect(card).toHaveClass("bg-card"); // Should still have default classes
    });

    it("passes additional props", () => {
      render(<Card id="test-card" role="region" data-testid="card">Props card</Card>);
      const card = screen.getByTestId("card");
      
      expect(card).toHaveAttribute("id", "test-card");
      expect(card).toHaveAttribute("role", "region");
    });

    it("renders children content", () => {
      render(
        <Card data-testid="card">
          <span>Child 1</span>
          <span>Child 2</span>
        </Card>
      );
      
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("CardHeader Component", () => {
    it("renders correctly with default props", () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      const header = screen.getByTestId("header");
      
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("data-slot", "card-header");
      expect(header).toHaveTextContent("Header content");
    });

    it("applies default styling classes", () => {
      render(<CardHeader data-testid="header">Styled header</CardHeader>);
      const header = screen.getByTestId("header");
      
      expect(header).toHaveClass(
        "@container/card-header",
        "grid",
        "auto-rows-min",
        "grid-rows-[auto_auto]",
        "items-start",
        "gap-1.5",
        "px-6"
      );
    });

    it("applies custom className", () => {
      render(<CardHeader className="custom-header" data-testid="header">Custom header</CardHeader>);
      const header = screen.getByTestId("header");
      
      expect(header).toHaveClass("custom-header");
      expect(header).toHaveClass("grid"); // Should still have default classes
    });

    it("renders with CardAction layout", () => {
      render(
        <CardHeader data-testid="header">
          <CardTitle>Title</CardTitle>
          <CardAction>Action</CardAction>
        </CardHeader>
      );
      
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("has-data-[slot=card-action]:grid-cols-[1fr_auto]");
    });
  });

  describe("CardTitle Component", () => {
    it("renders correctly with default props", () => {
      render(<CardTitle data-testid="title">Card Title</CardTitle>);
      const title = screen.getByTestId("title");
      
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("data-slot", "card-title");
      expect(title).toHaveTextContent("Card Title");
    });

    it("applies default styling classes", () => {
      render(<CardTitle data-testid="title">Styled title</CardTitle>);
      const title = screen.getByTestId("title");
      
      expect(title).toHaveClass("leading-none", "font-semibold");
    });

    it("applies custom className", () => {
      render(<CardTitle className="custom-title" data-testid="title">Custom title</CardTitle>);
      const title = screen.getByTestId("title");
      
      expect(title).toHaveClass("custom-title");
      expect(title).toHaveClass("font-semibold"); // Should still have default classes
    });

    it("can be used as semantic heading", () => {
      render(<CardTitle data-testid="title">Semantic Title</CardTitle>);
      const title = screen.getByTestId("title");
      
      expect(title.tagName).toBe("DIV");
      expect(title).toHaveTextContent("Semantic Title");
    });
  });

  describe("CardDescription Component", () => {
    it("renders correctly with default props", () => {
      render(<CardDescription data-testid="description">Card description</CardDescription>);
      const description = screen.getByTestId("description");
      
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute("data-slot", "card-description");
      expect(description).toHaveTextContent("Card description");
    });

    it("applies default styling classes", () => {
      render(<CardDescription data-testid="description">Styled description</CardDescription>);
      const description = screen.getByTestId("description");
      
      expect(description).toHaveClass("text-muted-foreground", "text-sm");
    });

    it("applies custom className", () => {
      render(<CardDescription className="custom-desc" data-testid="description">Custom description</CardDescription>);
      const description = screen.getByTestId("description");
      
      expect(description).toHaveClass("custom-desc");
      expect(description).toHaveClass("text-sm"); // Should still have default classes
    });

    it("renders markdown or rich text content", () => {
      render(
        <CardDescription data-testid="description">
          Description with <em>emphasis</em> and <strong>strong</strong> text.
        </CardDescription>
      );
      
      expect(screen.getByText("emphasis")).toBeInTheDocument();
      expect(screen.getByText("strong")).toBeInTheDocument();
    });
  });

  describe("CardAction Component", () => {
    it("renders correctly with default props", () => {
      render(<CardAction data-testid="action">Action content</CardAction>);
      const action = screen.getByTestId("action");
      
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute("data-slot", "card-action");
      expect(action).toHaveTextContent("Action content");
    });

    it("applies default styling classes", () => {
      render(<CardAction data-testid="action">Styled action</CardAction>);
      const action = screen.getByTestId("action");
      
      expect(action).toHaveClass(
        "col-start-2",
        "row-span-2",
        "row-start-1",
        "self-start",
        "justify-self-end"
      );
    });

    it("applies custom className", () => {
      render(<CardAction className="custom-action" data-testid="action">Custom action</CardAction>);
      const action = screen.getByTestId("action");
      
      expect(action).toHaveClass("custom-action");
      expect(action).toHaveClass("col-start-2"); // Should still have default classes
    });

    it("renders button actions", () => {
      render(
        <CardAction data-testid="action">
          <button>Edit</button>
          <button>Delete</button>
        </CardAction>
      );
      
      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });
  });

  describe("CardContent Component", () => {
    it("renders correctly with default props", () => {
      render(<CardContent data-testid="content">Content body</CardContent>);
      const content = screen.getByTestId("content");
      
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute("data-slot", "card-content");
      expect(content).toHaveTextContent("Content body");
    });

    it("applies default styling classes", () => {
      render(<CardContent data-testid="content">Styled content</CardContent>);
      const content = screen.getByTestId("content");
      
      expect(content).toHaveClass("px-6");
    });

    it("applies custom className", () => {
      render(<CardContent className="custom-content" data-testid="content">Custom content</CardContent>);
      const content = screen.getByTestId("content");
      
      expect(content).toHaveClass("custom-content");
      expect(content).toHaveClass("px-6"); // Should still have default classes
    });

    it("renders complex content", () => {
      render(
        <CardContent data-testid="content">
          <p>Paragraph content</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </CardContent>
      );
      
      expect(screen.getByText("Paragraph content")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("CardFooter Component", () => {
    it("renders correctly with default props", () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      const footer = screen.getByTestId("footer");
      
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("data-slot", "card-footer");
      expect(footer).toHaveTextContent("Footer content");
    });

    it("applies default styling classes", () => {
      render(<CardFooter data-testid="footer">Styled footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      
      expect(footer).toHaveClass("flex", "items-center", "px-6");
    });

    it("applies custom className", () => {
      render(<CardFooter className="custom-footer" data-testid="footer">Custom footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      
      expect(footer).toHaveClass("custom-footer");
      expect(footer).toHaveClass("flex"); // Should still have default classes
    });

    it("renders footer actions", () => {
      render(
        <CardFooter data-testid="footer">
          <button>Cancel</button>
          <button>Save</button>
        </CardFooter>
      );
      
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("handles border-top styling", () => {
      render(<CardFooter className="border-t" data-testid="footer">Border footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      
      expect(footer).toHaveClass("[.border-t]:pt-6");
    });
  });

  describe("Card Composition", () => {
    it("renders complete card with all components", () => {
      render(
        <Card data-testid="full-card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Card Title</CardTitle>
            <CardDescription data-testid="description">Card Description</CardDescription>
            <CardAction data-testid="action">
              <button>Action</button>
            </CardAction>
          </CardHeader>
          <CardContent data-testid="content">
            <p>This is the card content</p>
          </CardContent>
          <CardFooter data-testid="footer">
            <button>Cancel</button>
            <button>Save</button>
          </CardFooter>
        </Card>
      );
      
      // Verify all parts are present
      expect(screen.getByTestId("full-card")).toBeInTheDocument();
      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("title")).toBeInTheDocument();
      expect(screen.getByTestId("description")).toBeInTheDocument();
      expect(screen.getByTestId("action")).toBeInTheDocument();
      expect(screen.getByTestId("content")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      
      // Verify content
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card Description")).toBeInTheDocument();
      expect(screen.getByText("This is the card content")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("renders minimal card with just content", () => {
      render(
        <Card data-testid="minimal-card">
          <CardContent>Simple content only</CardContent>
        </Card>
      );
      
      expect(screen.getByTestId("minimal-card")).toBeInTheDocument();
      expect(screen.getByText("Simple content only")).toBeInTheDocument();
    });

    it("renders card with header and content only", () => {
      render(
        <Card data-testid="header-content-card">
          <CardHeader>
            <CardTitle>Just Title and Content</CardTitle>
          </CardHeader>
          <CardContent>Content without footer</CardContent>
        </Card>
      );
      
      expect(screen.getByText("Just Title and Content")).toBeInTheDocument();
      expect(screen.getByText("Content without footer")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("supports ARIA attributes on Card", () => {
      render(
        <Card 
          data-testid="accessible-card" 
          role="article" 
          aria-labelledby="card-title"
          aria-describedby="card-description"
        >
          <CardTitle id="card-title">Accessible Card</CardTitle>
          <CardDescription id="card-description">This card is accessible</CardDescription>
        </Card>
      );
      
      const card = screen.getByTestId("accessible-card");
      expect(card).toHaveAttribute("role", "article");
      expect(card).toHaveAttribute("aria-labelledby", "card-title");
      expect(card).toHaveAttribute("aria-describedby", "card-description");
    });

    it("supports keyboard navigation for interactive elements", () => {
      render(
        <Card>
          <CardHeader>
            <CardAction>
              <button data-testid="action-btn">More options</button>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <button data-testid="primary-btn">Primary Action</button>
          </CardFooter>
        </Card>
      );
      
      const actionBtn = screen.getByTestId("action-btn");
      const primaryBtn = screen.getByTestId("primary-btn");
      
      actionBtn.focus();
      expect(actionBtn).toHaveFocus();
      
      primaryBtn.focus();
      expect(primaryBtn).toHaveFocus();
    });
  });

  describe("Edge cases", () => {
    it("handles empty card", () => {
      render(<Card data-testid="empty-card" />);
      const card = screen.getByTestId("empty-card");
      
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent("");
    });

    it("handles null children", () => {
      render(<Card data-testid="null-card">{null}</Card>);
      const card = screen.getByTestId("null-card");
      
      expect(card).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <Card data-testid="mixed-card">
          <CardTitle>Title</CardTitle>
          Some text content
          <CardContent>Content</CardContent>
          More text
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      
      const card = screen.getByTestId("mixed-card");
      expect(card).toContainElement(screen.getByText("Title"));
      expect(card).toContainElement(screen.getByText("Content"));
      expect(card).toContainElement(screen.getByText("Footer"));
      expect(screen.getByText("Some text content")).toBeInTheDocument();
      expect(screen.getByText("More text")).toBeInTheDocument();
    });
  });
});