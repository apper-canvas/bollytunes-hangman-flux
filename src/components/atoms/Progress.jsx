import React from 'react'
      import { motion } from 'framer-motion'

      const Progress = ({ value, max, className = '', barClassName = '', onClick }) => {
        return (
          <div
            className={`h-3 bg-white/20 rounded-full cursor-pointer relative overflow-hidden ${className}`}
            onClick={onClick}
          >
            <motion.div
              className={`h-full bg-gradient-to-r from-primary to-secondary rounded-full ${barClassName}`}
              style={{ width: `${value}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )
      }

      export default Progress