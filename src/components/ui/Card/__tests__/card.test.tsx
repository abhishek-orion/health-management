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
  it("components are defined", () => {
    expect(Card).toBeDefined();
    expect(CardHeader).toBeDefined();
    expect(CardFooter).toBeDefined();
    expect(CardTitle).toBeDefined();
    expect(CardDescription).toBeDefined();
    expect(CardAction).toBeDefined();
    expect(CardContent).toBeDefined();
  });
});