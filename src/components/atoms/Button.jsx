import React from 'react'
      import { motion } from 'framer-motion'

      const Button = ({ children, onClick, className = '', whileHover, whileTap, disabled, ...props }) => {
        return (
          <motion.button
            onClick={onClick}
            className={`transition-all duration-300 transform ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            disabled={disabled}
            {...props}
          >
            {children}
          </motion.button>
        )
      }

      export default Button