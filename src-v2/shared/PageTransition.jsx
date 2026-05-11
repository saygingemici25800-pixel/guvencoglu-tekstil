import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from './ReducedMotion.jsx'

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export default function PageTransition({ children }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : 'initial'}
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}
