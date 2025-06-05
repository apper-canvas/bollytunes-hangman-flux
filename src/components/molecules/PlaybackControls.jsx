import React from 'react'
      import { motion } from 'framer-motion'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'

      const PlaybackControls = ({ isPlaying, onTogglePlay, onReplay }) => {
        return (
          <div className="flex items-center space-x-4">
            <Button
              onClick={onTogglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse-glow' 
                  : 'bg-gradient-to-br from-primary to-secondary hover:shadow-bollywood'
              }`}
            >
              <Icon 
                name={isPlaying ? "Pause" : "Play"} 
                className="w-8 h-8 text-white" 
              />
            </Button>
            
            <Button
              onClick={onReplay}
              whileHover={{ scale: 1.05, rotate: 360 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              <Icon name="RotateCcw" className="w-5 h-5 text-white" />
            </Button>
          </div>
        )
      }

      export default PlaybackControls