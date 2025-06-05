import React from 'react'

      const Input = ({ type, value, onChange, className = '', ...props }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`appearance-none cursor-pointer ${className}`}
            {...props}
          />
        )
      }

      export default Input