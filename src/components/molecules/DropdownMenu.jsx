import React from 'react'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'
      import Text from '../atoms/Text'

      const DropdownMenu = ({ triggerText, iconName, items, className = '', children }) => {
        return (
          <div className={`relative group ${className}`}>
            <Button className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-1">
              <Text as="span">{triggerText}</Text>
              {iconName && <Icon name={iconName} className="w-4 h-4" />}
            </Button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/20 z-50">
              <div className="p-4 text-center text-gray-300 text-sm">
                {children || items.map((item, index) => (
                  <div key={index} className="py-1">
                    <Text as="span">{item.label}</Text>
                    {item.status && <Text as="span" className="text-secondary font-medium ml-1">{item.status}</Text>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      export default DropdownMenu