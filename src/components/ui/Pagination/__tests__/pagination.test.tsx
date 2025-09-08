import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../pagination";

describe("Pagination Component", () => {
  describe("Pagination", () => {
    it("renders correctly with default props", () => {
      render(<Pagination data-testid="test-pagination">Pagination content</Pagination>);
      const paginationElement = screen.getByTestId("test-pagination");
      
      expect(paginationElement).toBeInTheDocument();
      expect(paginationElement).toHaveAttribute("role", "navigation");
      expect(paginationElement).toHaveAttribute("aria-label", "pagination");
      expect(paginationElement).toHaveTextContent("Pagination content");
    });

    it("applies custom className", () => {
      render(<Pagination className="custom-pagination-class" data-testid="test-pagination" />);
      const paginationElement = screen.getByTestId("test-pagination");
      
      expect(paginationElement).toHaveClass("custom-pagination-class");
    });

    it("renders with correct data attribute", () => {
      render(<Pagination data-testid="test-pagination" />);
      const paginationElement = screen.getByTestId("test-pagination");
      
      expect(paginationElement).toHaveAttribute("data-slot", "pagination");
    });
  });

  describe("PaginationContent", () => {
    it("renders correctly with default props", () => {
      render(<PaginationContent data-testid="test-content">Content items</PaginationContent>);
      const contentElement = screen.getByTestId("test-content");
      
      expect(contentElement).toBeInTheDocument();
      expect(contentElement).toHaveTextContent("Content items");
    });

    it("applies custom className", () => {
      render(<PaginationContent className="custom-content-class" data-testid="test-content" />);
      const contentElement = screen.getByTestId("test-content");
      
      expect(contentElement).toHaveClass("custom-content-class");
    });

    it("renders with correct data attribute", () => {
      render(<PaginationContent data-testid="test-content" />);
      const contentElement = screen.getByTestId("test-content");
      
      expect(contentElement).toHaveAttribute("data-slot", "pagination-content");
    });
  });

  describe("PaginationItem", () => {
    it("renders correctly with default props", () => {
      render(<PaginationItem data-testid="test-item">Item content</PaginationItem>);
      const itemElement = screen.getByTestId("test-item");
      
      expect(itemElement).toBeInTheDocument();
      expect(itemElement).toHaveTextContent("Item content");
    });

    it("renders with correct data attribute", () => {
      render(<PaginationItem data-testid="test-item" />);
      const itemElement = screen.getByTestId("test-item");
      
      expect(itemElement).toHaveAttribute("data-slot", "pagination-item");
    });
  });

  describe("PaginationLink", () => {
    it("renders correctly with default props", () => {
      render(<PaginationLink href="#" data-testid="test-link">Link text</PaginationLink>);
      const linkElement = screen.getByTestId("test-link");
      
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveTextContent("Link text");
      expect(linkElement).toHaveAttribute("href", "#");
    });

    it("applies active state correctly", () => {
      render(<PaginationLink isActive href="#" data-testid="test-link">Active link</PaginationLink>);
      const linkElement = screen.getByTestId("test-link");
      
      expect(linkElement).toHaveAttribute("aria-current", "page");
      expect(linkElement).toHaveAttribute("data-active", "true");
    });

    it("applies custom className", () => {
      render(<PaginationLink className="custom-link-class" href="#" data-testid="test-link" />);
      const linkElement = screen.getByTestId("test-link");
      
      expect(linkElement).toHaveClass("custom-link-class");
    });

    it("renders with correct data attribute", () => {
      render(<PaginationLink href="#" data-testid="test-link" />);
      const linkElement = screen.getByTestId("test-link");
      
      expect(linkElement).toHaveAttribute("data-slot", "pagination-link");
    });
  });

  describe("PaginationPrevious", () => {
    it("renders correctly with default props", () => {
      render(<PaginationPrevious href="#" data-testid="test-prev" />);
      const prevElement = screen.getByTestId("test-prev");
      
      expect(prevElement).toBeInTheDocument();
      expect(prevElement).toHaveAttribute("aria-label", "Go to previous page");
    });

    it("contains 'Previous' text for non-mobile", () => {
      render(<PaginationPrevious href="#" />);
      const prevText = screen.getByText("Previous");
      
      expect(prevText).toBeInTheDocument();
      expect(prevText).toHaveClass("hidden sm:block");
    });
  });

  describe("PaginationNext", () => {
    it("renders correctly with default props", () => {
      render(<PaginationNext href="#" data-testid="test-next" />);
      const nextElement = screen.getByTestId("test-next");
      
      expect(nextElement).toBeInTheDocument();
      expect(nextElement).toHaveAttribute("aria-label", "Go to next page");
    });

    it("contains 'Next' text for non-mobile", () => {
      render(<PaginationNext href="#" />);
      const nextText = screen.getByText("Next");
      
      expect(nextText).toBeInTheDocument();
      expect(nextText).toHaveClass("hidden sm:block");
    });
  });

  describe("PaginationEllipsis", () => {
    it("renders correctly with default props", () => {
      render(<PaginationEllipsis data-testid="test-ellipsis" />);
      const ellipsisElement = screen.getByTestId("test-ellipsis");
      
      expect(ellipsisElement).toBeInTheDocument();
      expect(ellipsisElement).toHaveAttribute("aria-hidden");
    });

    it("contains screen reader text", () => {
      render(<PaginationEllipsis />);
      const srText = screen.getByText("More pages");
      
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveClass("sr-only");
    });

    it("renders with correct data attribute", () => {
      render(<PaginationEllipsis data-testid="test-ellipsis" />);
      const ellipsisElement = screen.getByTestId("test-ellipsis");
      
      expect(ellipsisElement).toHaveAttribute("data-slot", "pagination-ellipsis");
    });
  });

  describe("Pagination Integration", () => {
    it("renders a complete pagination component", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("1")).toHaveAttribute("aria-current", "page");
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("More pages")).toBeInTheDocument();
    });
  });
});
