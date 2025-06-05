import React from 'react'
      import { motion } from 'framer-motion'

      const Image = ({ src, alt, className = '', whileHover, ...props }) => {
        return (
          <motion.img
            src={src}
            alt={alt}
            className={className}
            whileHover={whileHover}
            {...props}
          />
        )
      }

      export default Image