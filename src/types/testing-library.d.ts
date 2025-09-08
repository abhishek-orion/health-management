import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveAttribute(attr: string, value?: string | RegExp): R;
      toBeVisible(): R;
      toBeChecked(): R;
      toHaveStyle(style: Record<string, any>): R;
      toHaveValue(value: any): R;
    }
  }
}
