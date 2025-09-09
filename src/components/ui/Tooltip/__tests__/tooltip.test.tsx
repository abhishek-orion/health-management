import React from "react";
import { render, screen, fireEvent, waitFor } from "../../../../utils/test-utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../tooltip";

describe("Tooltip Component", () => {
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
    <TooltipProvider>{children}</TooltipProvider>
  );

  it("renders tooltip trigger correctly", () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>
    );

    expect(screen.getByRole("button", { name: /hover me/i })).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    
    // Hover over the trigger
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
  });

  it("hides tooltip content on mouse leave", async () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    
    // Show tooltip
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
    
    // Hide tooltip
    fireEvent.mouseLeave(trigger);
    
    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  it("supports custom tooltip content", async () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Info button</button>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <strong>Important</strong>
              <p>This is important information</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>
    );

    const trigger = screen.getByRole("button", { name: /info button/i });
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText("Important")).toBeInTheDocument();
      expect(screen.getByText("This is important information")).toBeInTheDocument();
    });
  });

  it("works without asChild prop", async () => {
    render(
      <TooltipWrapper>
        <Tooltip>
          <TooltipTrigger>
            <span>Trigger text</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Simple tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipWrapper>
    );

    const trigger = screen.getByText("Trigger text");
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText("Simple tooltip")).toBeInTheDocument();
    });
  });
});