import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

// Similar to Tabs, Avatar from Radix UI uses hooks internally that make it difficult to test
// We'll just verify the component exports exist
describe("Avatar Component", () => {
  it("components are defined", () => {
    expect(Avatar).toBeDefined();
    expect(AvatarImage).toBeDefined();
    expect(AvatarFallback).toBeDefined();
  });
});
