import React from 'react'
      import Progress from '../atoms/Progress'
      import Text from '../atoms/Text'

      const AudioProgressBar = ({ currentTime, duration, progress, onProgressClick }) => {
        const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60)
          const secs = Math.floor(seconds % 60)
          return `${mins}:${secs.toString().padStart(2, '0')}`
        }

        return (
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex items-center space-x-3 text-white text-sm mb-2">
              <Text>{formatTime(currentTime)}</Text>
              <Text className="text-gray-300">|</Text>
              <Text>{formatTime(duration)}</Text>
            </div>
            <Progress
              value={progress}
              onClick={onProgressClick}
            />
          </div>
        )
      }

      export default AudioProgressBar