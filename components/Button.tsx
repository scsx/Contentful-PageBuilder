'use client'

interface CTAButtonProps {
  readonly text: string
  readonly href?: string
  readonly target?: '_blank' | '_self' | '_parent' | '_top'
  readonly onClick?: () => void
  readonly className?: string
}

export function CTAButton({
  text,
  href,
  target = '_blank',
  onClick,
  className = ''
}: CTAButtonProps) {
  const baseClasses = 'bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200'
  const finalClassName = `${baseClasses} ${className}`.trim()

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={finalClassName}>
        {text}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={finalClassName}>
      {text}
    </button>
  )
}
