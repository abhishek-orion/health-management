/**
 * Design token utilities for consistent UI styling
 * Usage examples:
 * - import { spacing, borderRadius, borderWidth } from "@/lib/design-tokens";
 * - <div className={`${spacing.md} ${borderRadius.md} border-${borderWidth.thin}`}></div>
 */

export const spacing = {
  '2xs': 'p-2xs',   // 4px
  xs: 'p-xs',       // 8px  
  sm: 'p-sm',       // 12px
  md: 'p-md',       // 16px
  lg: 'p-lg',       // 24px
  xl: 'p-xl',       // 32px
  '2xl': 'p-2xl',   // 48px
  '3xl': 'p-3xl',   // 64px
} as const;

export const margin = {
  '2xs': 'm-2xs',
  xs: 'm-xs',
  sm: 'm-sm',
  md: 'm-md',
  lg: 'm-lg',
  xl: 'm-xl',
  '2xl': 'm-2xl',
  '3xl': 'm-3xl',
} as const;

export const marginX = {
  '2xs': 'mx-2xs',
  xs: 'mx-xs',
  sm: 'mx-sm',
  md: 'mx-md',
  lg: 'mx-lg',
  xl: 'mx-xl',
  '2xl': 'mx-2xl',
  '3xl': 'mx-3xl',
} as const;

export const marginY = {
  '2xs': 'my-2xs',
  xs: 'my-xs',
  sm: 'my-sm',
  md: 'my-md',
  lg: 'my-lg',
  xl: 'my-xl',
  '2xl': 'my-2xl',
  '3xl': 'my-3xl',
} as const;

export const paddingX = {
  '2xs': 'px-2xs',
  xs: 'px-xs',
  sm: 'px-sm',
  md: 'px-md',
  lg: 'px-lg',
  xl: 'px-xl',
  '2xl': 'px-2xl',
  '3xl': 'px-3xl',
} as const;

export const paddingY = {
  '2xs': 'py-2xs',
  xs: 'py-xs',
  sm: 'py-sm',
  md: 'py-md',
  lg: 'py-lg',
  xl: 'py-xl',
  '2xl': 'py-2xl',
  '3xl': 'py-3xl',
} as const;

export const borderWidth = {
  thin: 'border-thin',    // 1px
  medium: 'border-medium', // 2px
  thick: 'border-thick',   // 4px
} as const;

export const borderRadius = {
  none: 'rounded-none',  // 0px
  sm: 'rounded-sm',      // 4px
  md: 'rounded-md',      // 8px
  lg: 'rounded-lg',      // 12px
  xl: 'rounded-xl',      // 16px
  full: 'rounded-full',  // Circle
} as const;

export const elevation = {
  none: '[box-shadow:var(--elevation-none)]',
  raised: '[box-shadow:var(--elevation-raised)]',     // For subtle elevation like cards, inputs
  floating: '[box-shadow:var(--elevation-floating)]', // For floating elements like buttons, tabs
  modal: '[box-shadow:var(--elevation-modal)]',       // For modals, popovers, dropdowns
  overlay: '[box-shadow:var(--elevation-overlay)]',   // For overlays, tooltips, top-level modals
} as const;

// Component-specific tokens for common patterns
export const card = {
  default: `${borderRadius.md} border-thin ${paddingY.md} ${paddingX.lg}`,
  compact: `${borderRadius.sm} border-thin ${paddingY.sm} ${paddingX.md}`,
  elevated: `${borderRadius.lg} border-thin ${paddingY.lg} ${paddingX.xl} ${elevation.raised}`,
  floating: `${borderRadius.lg} border-thin ${paddingY.lg} ${paddingX.xl} ${elevation.floating}`,
} as const;

export const button = {
  sm: `${borderRadius.sm} ${paddingY.xs} ${paddingX.sm}`,
  md: `${borderRadius.md} ${paddingY.sm} ${paddingX.md}`,
  lg: `${borderRadius.lg} ${paddingY.md} ${paddingX.lg}`,
} as const;

export const input = {
  default: `${borderRadius.md} border-thin ${paddingY.xs} ${paddingX.sm}`,
  large: `${borderRadius.md} border-thin ${paddingY.sm} ${paddingX.md}`,
} as const;
