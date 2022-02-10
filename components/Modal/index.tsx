import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const Modal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    closeModal: VoidFunction
  }
> = ({ children, closeModal, className }) => {
  const modalContent = useRef<HTMLInputElement>(null)

  const clickOutsideContent = (e: MouseEvent) => {
    if (
      modalContent.current &&
      !modalContent.current.contains(e.target as Node)
    ) {
      closeModal()
    }
  }

  document.addEventListener('mousedown', clickOutsideContent)

  return (
    <>
      <motion.div
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
        animate={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        className="flex absolute top-0 left-0 z-10 justify-center items-center w-full h-full bg-black bg-opacity-20"
      >
        <motion.div
          ref={modalContent}
          className={`w-full min-w-sm prose ${className}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  )
}

export default Modal
