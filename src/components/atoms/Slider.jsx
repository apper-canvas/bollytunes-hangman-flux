import React from 'react'
      import Input from './Input'

      const Slider = ({ min, max, step, value, onChange, className = '', ...props }) => {
        return (
          <Input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className={`slider ${className}`}
            {...props}
          />
        )
      }

      export default Slider