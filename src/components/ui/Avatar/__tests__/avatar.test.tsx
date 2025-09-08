import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

describe("Avatar Components", () => {
  describe("Component Definitions", () => {
    it("components are defined", () => {
      expect(Avatar).toBeDefined();
      expect(AvatarImage).toBeDefined();
      expect(AvatarFallback).toBeDefined();
    });
  });

  describe("Avatar Component", () => {
    it("renders correctly", () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      
      expect(avatar).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Avatar className="custom-avatar" data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      
      expect(avatar).toHaveClass("custom-avatar");
    });

    it("renders children content", () => {
      render(
        <Avatar data-testid="avatar">
          <span data-testid="child">Child content</span>
        </Avatar>
      );
      
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });
  });

  describe("AvatarImage Component", () => {
    it("renders with src and alt attributes", () => {
      render(<AvatarImage src="/test.jpg" alt="Test image" data-testid="avatar-image" />);
      const image = screen.getByTestId("avatar-image");
      
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });

    it("applies custom className", () => {
      render(<AvatarImage src="/test.jpg" alt="Test" className="custom-image" data-testid="avatar-image" />);
      const image = screen.getByTestId("avatar-image");
      
      expect(image).toHaveClass("custom-image");
    });
  });

  describe("AvatarFallback Component", () => {
    it("renders fallback content", () => {
      render(<AvatarFallback data-testid="avatar-fallback">FB</AvatarFallback>);
      const fallback = screen.getByTestId("avatar-fallback");
      
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent("FB");
    });

    it("applies custom className", () => {
      render(<AvatarFallback className="custom-fallback" data-testid="avatar-fallback">CF</AvatarFallback>);
      const fallback = screen.getByTestId("avatar-fallback");
      
      expect(fallback).toHaveClass("custom-fallback");
    });

    it("can render complex content", () => {
      render(
        <AvatarFallback data-testid="avatar-fallback">
          <span data-testid="icon">👤</span>
        </AvatarFallback>
      );
      
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Avatar Composition", () => {
    it("renders complete avatar with all components", () => {
      render(
        <Avatar data-testid="complete-avatar">
          <AvatarImage src="/profile.jpg" alt="Profile" data-testid="avatar-image" />
          <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
        </Avatar>
      );
      
      expect(screen.getByTestId("complete-avatar")).toBeInTheDocument();
      expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
      expect(screen.getByTestId("avatar-fallback")).toBeInTheDocument();
    });

    it("renders with fallback only", () => {
      render(
        <Avatar data-testid="fallback-only">
          <AvatarFallback>Fallback Only</AvatarFallback>
        </Avatar>
      );
      
      expect(screen.getByTestId("fallback-only")).toBeInTheDocument();
      expect(screen.getByText("Fallback Only")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("supports ARIA attributes", () => {
      render(<Avatar role="img" aria-label="User avatar" data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      
      expect(avatar).toHaveAttribute("role", "img");
      expect(avatar).toHaveAttribute("aria-label", "User avatar");
    });

    it("supports alt text on images", () => {
      render(<AvatarImage src="/test.jpg" alt="User profile picture" />);
      const image = screen.getByAltText("User profile picture");
      
      expect(image).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles empty components", () => {
      render(<Avatar data-testid="empty-avatar" />);
      const avatar = screen.getByTestId("empty-avatar");
      
      expect(avatar).toBeInTheDocument();
    });

    it("passes additional props", () => {
      render(<Avatar id="custom-id" data-testid="avatar" />);
      const avatar = screen.getByTestId("avatar");
      
      expect(avatar).toHaveAttribute("id", "custom-id");
    });
  });
});
