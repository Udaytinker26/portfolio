import { motion } from 'framer-motion'

export function GradientText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.span 
      className={`bg-gradient-to-r from-accent via-fg to-accent bg-clip-text text-transparent bg-300% animate-gradient ${className}`}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: '100% 50%' }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}