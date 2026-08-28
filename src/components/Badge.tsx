import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'warm'
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  const tones = {
    neutral: 'bg-sand text-slate-700',
    accent: 'bg-lime text-ink',
    warm: 'bg-light text-ink',
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>
}
