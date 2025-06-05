import React from 'react'
      import { motion } from 'framer-motion'

      const Text = ({ children, as: Component = 'p', className = '', ...props }) => {
        return (
          <Component className={className} {...props}>
            {children}
          </Component>
        )
      }

      export default Text