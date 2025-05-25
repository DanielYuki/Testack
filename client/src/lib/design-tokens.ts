/**
 * Design Tokens - CSS Variables accessible in TypeScript
 * This file provides type-safe access to CSS custom properties
 */

// Core color variables that can be used in JavaScript
export const cssVars = {
  // Core Colors
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  card: 'var(--color-card)',
  cardForeground: 'var(--color-card-foreground)',
  popover: 'var(--color-popover)',
  popoverForeground: 'var(--color-popover-foreground)',

  // Brand Colors
  primary: 'var(--color-primary)',
  primaryForeground: 'var(--color-primary-foreground)',
  secondary: 'var(--color-secondary)',
  secondaryForeground: 'var(--color-secondary-foreground)',
  accent: 'var(--color-accent)',
  accentForeground: 'var(--color-accent-foreground)',

  // UI Colors
  muted: 'var(--color-muted)',
  mutedForeground: 'var(--color-muted-foreground)',
  border: 'var(--color-border)',
  input: 'var(--color-input)',
  ring: 'var(--color-ring)',

  // Status Colors
  destructive: 'var(--color-destructive)',
  destructiveForeground: 'var(--color-destructive-foreground)',
  success: 'var(--color-success)',
  successForeground: 'var(--color-success-foreground)',
  warning: 'var(--color-warning)',
  warningForeground: 'var(--color-warning-foreground)',
  info: 'var(--color-info)',
  infoForeground: 'var(--color-info-foreground)',

  // Chart Colors
  chart1: 'var(--color-chart-1)',
  chart2: 'var(--color-chart-2)',
  chart3: 'var(--color-chart-3)',
  chart4: 'var(--color-chart-4)',
  chart5: 'var(--color-chart-5)',

  // Layout
  radiusSm: 'var(--radius-sm)',
  radiusMd: 'var(--radius-md)',
  radiusLg: 'var(--radius-lg)',
  radiusXl: 'var(--radius-xl)',
} as const

// Utility function to get CSS variable value at runtime
export function getCSSVar(variable: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

// Utility function to set CSS variable at runtime
export function setCSSVar(variable: string, value: string): void {
  if (typeof window === 'undefined') return
  document.documentElement.style.setProperty(variable, value)
}

// Type-safe CSS variable getter
export function getDesignToken(token: keyof typeof cssVars): string {
  return cssVars[token]
}

// Common color combinations for components
export const colorCombinations = {
  primary: {
    bg: cssVars.primary,
    text: cssVars.primaryForeground,
    border: cssVars.primary,
  },
  secondary: {
    bg: cssVars.secondary,
    text: cssVars.secondaryForeground,
    border: cssVars.border,
  },
  destructive: {
    bg: cssVars.destructive,
    text: cssVars.destructiveForeground,
    border: cssVars.destructive,
  },
  success: {
    bg: cssVars.success,
    text: cssVars.successForeground,
    border: cssVars.success,
  },
  warning: {
    bg: cssVars.warning,
    text: cssVars.warningForeground,
    border: cssVars.warning,
  },
  info: {
    bg: cssVars.info,
    text: cssVars.infoForeground,
    border: cssVars.info,
  },
  muted: {
    bg: cssVars.muted,
    text: cssVars.mutedForeground,
    border: cssVars.border,
  },
} as const

// Utility function to generate style objects
export function createColorStyle(
  variant: keyof typeof colorCombinations,
  properties: ('background' | 'color' | 'borderColor')[] = ['background', 'color']
) {
  const colors = colorCombinations[variant]
  const style: Record<string, string> = {}

  if (properties.includes('background')) {
    style.backgroundColor = colors.bg
  }
  if (properties.includes('color')) {
    style.color = colors.text
  }
  if (properties.includes('borderColor')) {
    style.borderColor = colors.border
  }

  return style
}

// Predefined component styles using CSS variables
export const componentStyles = {
  button: {
    primary: `bg-primary text-primary-foreground hover:bg-primary/90`,
    secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
    destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
    outline: `border border-input bg-background hover:bg-accent hover:text-accent-foreground`,
    ghost: `hover:bg-accent hover:text-accent-foreground`,
    link: `text-primary underline-offset-4 hover:underline`,
  },
  card: `bg-card text-card-foreground border border-border`,
  input: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
  badge: {
    default: `bg-primary text-primary-foreground`,
    secondary: `bg-secondary text-secondary-foreground`,
    destructive: `bg-destructive text-destructive-foreground`,
    outline: `text-foreground border border-input`,
    success: `bg-status-success text-status-success`,
    warning: `bg-status-warning text-status-warning`,
    info: `bg-status-info text-status-info`,
  },
} as const

// Theme detection utility
export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

// Type definitions for better TypeScript support
export type ColorVariant = keyof typeof colorCombinations
export type ButtonVariant = keyof typeof componentStyles.button
export type BadgeVariant = keyof typeof componentStyles.badge
export type DesignToken = keyof typeof cssVars
