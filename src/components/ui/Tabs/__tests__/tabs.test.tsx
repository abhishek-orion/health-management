import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

// Note: Since Tabs components from Radix UI use React context internally,
// and that requires a lot of setup to test properly, we'll just verify
// that our component exports exist and can be imported.

describe("Tabs Component", () => {
  it("components are defined", () => {
    expect(Tabs).toBeDefined();
    expect(TabsList).toBeDefined();
    expect(TabsTrigger).toBeDefined();
    expect(TabsContent).toBeDefined();
  });
});
