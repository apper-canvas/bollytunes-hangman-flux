import React from 'react'
      import Icon from '../atoms/Icon'
      import Slider from '../atoms/Slider'

      const VolumeControl = ({ volume, onVolumeChange }) => {
        return (
          <div className="flex items-center space-x-3">
            <Icon name="Volume2" className="w-5 h-5 text-white" />
            <Slider
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={onVolumeChange}
              className="w-20 h-2 bg-white/20 rounded-full"
            />
          </div>
        )
      }

      export default VolumeControl