'use client'

import * as React from 'react'

import type { VariantProps } from 'class-variance-authority'

import { Button, buttonVariants } from '@/components/ui/button'
import { CraftButton, CraftButtonIcon, CraftButtonLabel } from '@/components/ui/craft-button'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'
import { PrimaryGrowButton, SecondaryGrowButton } from '@/components/ui/grow-button'
import { MatterButton } from '@/components/ui/matter-button'
import { NeuralButton } from '@/components/ui/neural-button'
import { RippleButton } from '@/components/ui/ripple-button'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

/** Presets alinhados aos demos em `components/shadcn-studio/button/`. */
export const studioButtonPresets = [
  'default',
  'ripple',
  'ring-hover',
  'shine-hover',
  'shimmer',
  'matter',
  'craft',
  'flow',
  'flow-secondary',
  'grow',
  'grow-secondary',
  'neural'
] as const

export type StudioButtonPreset = (typeof studioButtonPresets)[number]

const RING_HOVER_CLASS =
  'ring-offset-background hover:ring-primary/90 transition-all duration-300 hover:ring-2 hover:ring-offset-2'

const SHINE_HOVER_CLASS =
  "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]"

/** Props DOM comuns; evita misturar props do Base UI `Button` com Motion / wrappers. */
type StudioButtonDomProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'size' | 'children'
>

export type StudioButtonProps = StudioButtonDomProps & {
  /** Qual implementação de `@/components/ui/*` usar (equivalente aos demos em `shadcn-studio/button`). */
  preset?: StudioButtonPreset
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  className?: string
  children?: React.ReactNode
}

/** Motion redefine estes handlers; repassar os tipos do DOM quebra o assign para `motion.button`. */
const motionIncompatibleDomKeys = [
  'onAnimationStart',
  'onAnimationEnd',
  'onAnimationCancel',
  'onAnimationIteration'
] as const

function omitMotionIncompatibleDomProps<T extends Record<string, unknown>>(props: T): T {
  const next = { ...props }
  for (const key of motionIncompatibleDomKeys) {
    delete next[key]
  }
  return next
}

function StudioButton({
  preset = 'default',
  variant,
  size,
  className,
  children,
  ...rest
}: StudioButtonProps) {
  switch (preset) {
    case 'ripple':
      return (
        <RippleButton
          variant={variant}
          size={size}
          className={className}
          {...omitMotionIncompatibleDomProps(rest as Record<string, unknown>)}
        >
          {children}
        </RippleButton>
      )
    case 'ring-hover':
      return (
        <Button variant={variant} size={size} className={cn(RING_HOVER_CLASS, className)} {...rest}>
          {children}
        </Button>
      )
    case 'shine-hover':
      return (
        <Button variant={variant} size={size} className={cn(SHINE_HOVER_CLASS, className)} {...rest}>
          {children}
        </Button>
      )
    case 'shimmer':
      return (
        <ShimmerButton className={className} {...omitMotionIncompatibleDomProps(rest as Record<string, unknown>)}>
          {children}
        </ShimmerButton>
      )
    case 'matter':
      return (
        <MatterButton size={size} className={className} {...rest}>
          {children}
        </MatterButton>
      )
    case 'craft':
      return (
        <CraftButton size={size} className={className} {...rest}>
          {children}
        </CraftButton>
      )
    case 'flow':
      return (
        <PrimaryFlowButton size={size} className={className} {...rest}>
          {children}
        </PrimaryFlowButton>
      )
    case 'flow-secondary':
      return (
        <SecondaryFlowButton size={size} className={className} {...rest}>
          {children}
        </SecondaryFlowButton>
      )
    case 'grow':
      return (
        <PrimaryGrowButton size={size} className={className} {...rest}>
          {children}
        </PrimaryGrowButton>
      )
    case 'grow-secondary':
      return (
        <SecondaryGrowButton size={size} className={className} {...rest}>
          {children}
        </SecondaryGrowButton>
      )
    case 'neural':
      return (
        <NeuralButton size={size} className={className} {...rest}>
          {children}
        </NeuralButton>
      )
    case 'default':
    default:
      return (
        <Button variant={variant} size={size} className={className} {...rest}>
          {children}
        </Button>
      )
  }
}

export { StudioButton, CraftButtonLabel, CraftButtonIcon }
