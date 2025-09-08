import React from "react";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import { Modal } from "../Modal";

// Mock createPortal to render directly in test environment
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: any) => node,
}));

describe("Modal Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: "Test Modal",
    children: <div>Modal content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body styles
    document.body.style.overflow = "";
  });

  afterEach(() => {
    // Clean up body styles after each test
    document.body.style.overflow = "";
  });

  describe("Rendering", () => {
    it("renders when isOpen is true", () => {
      render(<Modal {...defaultProps} />);
      
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Test Modal")).toBeInTheDocument();
      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
      render(<Modal {...defaultProps} isOpen={false} />);
      
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    });

    it("renders with correct title", () => {
      render(<Modal {...defaultProps} title="Custom Title" />);
      
      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /custom title/i })).toBeInTheDocument();
    });

    it("renders children content", () => {
      const customContent = <div data-testid="custom-content">Custom content here</div>;
      render(<Modal {...defaultProps}>{customContent}</Modal>);
      
      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByText("Custom content here")).toBeInTheDocument();
    });
  });

  describe("Size variants", () => {
    it("renders with default (md) size", () => {
      render(<Modal {...defaultProps} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("max-w-lg");
    });

    it("renders with small size", () => {
      render(<Modal {...defaultProps} size="sm" />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("max-w-md");
    });

    it("renders with large size", () => {
      render(<Modal {...defaultProps} size="lg" />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("max-w-2xl");
    });

    it("renders with extra large size", () => {
      render(<Modal {...defaultProps} size="xl" />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("max-w-4xl");
    });
  });

  describe("Interaction handling", () => {
    it("calls onClose when close button is clicked", () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      const closeButton = screen.getByRole("button", { name: /close modal/i });
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when overlay is clicked (default behavior)", () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      // Click the backdrop/overlay
      const backdrop = screen.getByRole("dialog").parentElement?.firstChild;
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it("does not call onClose when overlay is clicked if closeOnOverlayClick is false", () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);
      
      // Click the backdrop/overlay
      const backdrop = screen.getByRole("dialog").parentElement?.firstChild;
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it("calls onClose when Escape key is pressed", () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when other keys are pressed", () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
      fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Body scroll management", () => {
    it("sets body overflow to hidden when modal opens", () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body overflow when modal closes", () => {
      const { rerender } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe("hidden");
      
      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe("");
    });

    it("restores body overflow on unmount", () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe("hidden");
      
      unmount();
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(<Modal {...defaultProps} />);
      
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-modal", "true");
      expect(modal).toHaveAttribute("aria-labelledby", "modal-title");
    });

    it("has correct heading structure", () => {
      render(<Modal {...defaultProps} title="Modal Heading" />);
      
      const heading = screen.getByRole("heading", { name: /modal heading/i });
      expect(heading).toHaveAttribute("id", "modal-title");
    });

    it("close button has proper accessibility attributes", () => {
      render(<Modal {...defaultProps} />);
      
      const closeButton = screen.getByRole("button", { name: /close modal/i });
      expect(closeButton).toHaveAttribute("aria-label", "Close modal");
      expect(closeButton).toHaveAttribute("type", "button");
    });
  });

  describe("Styling and theming", () => {
    it("applies theme-based styling", () => {
      render(<Modal {...defaultProps} />);
      
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(
        "bg-background",
        "border",
        "border-border",
        "rounded-lg"
      );
    });

    it("applies elevation shadow styling", () => {
      render(<Modal {...defaultProps} />);
      
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveStyle({ boxShadow: 'var(--elevation-modal)' });
    });

    it("applies backdrop blur effect", () => {
      render(<Modal {...defaultProps} />);
      
      // Check for backdrop element
      const backdrop = screen.getByRole("dialog").parentElement?.querySelector('.bg-black\\/50');
      expect(backdrop).toHaveClass("backdrop-blur-sm");
    });
  });

  describe("Event cleanup", () => {
    it("removes event listeners on unmount", () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<Modal {...defaultProps} />);
      
      // Should add keydown listener
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      unmount();
      
      // Should remove keydown listener
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Edge cases", () => {
    it("handles rapid open/close state changes", () => {
      const onClose = jest.fn();
      const { rerender } = render(<Modal {...defaultProps} onClose={onClose} />);
      
      // Rapidly toggle state
      rerender(<Modal {...defaultProps} onClose={onClose} isOpen={false} />);
      rerender(<Modal {...defaultProps} onClose={onClose} isOpen={true} />);
      rerender(<Modal {...defaultProps} onClose={onClose} isOpen={false} />);
      
      expect(document.body.style.overflow).toBe("");
    });

    it("handles missing onClose gracefully", () => {
      // @ts-ignore - Intentionally passing undefined for onClose to test error handling
      render(<Modal {...defaultProps} onClose={undefined} />);
      
      const closeButton = screen.getByRole("button", { name: /close modal/i });
      
      // Should not throw error when clicking close button
      expect(() => {
        fireEvent.click(closeButton);
      }).not.toThrow();
    });
  });
});