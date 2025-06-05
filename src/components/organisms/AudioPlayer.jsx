import React, { useRef, useEffect, useState } from 'react'
      import { motion } from 'framer-motion'
      import PlaybackControls from '../molecules/PlaybackControls'
      import AudioProgressBar from '../molecules/AudioProgressBar'
      import VolumeControl from '../molecules/VolumeControl'

      const AudioPlayer = ({ songFile, isPlaying, setIsPlaying }) => {
        const audioRef = useRef(null)
        const progressInterval = useRef(null)

        const [volume, setVolume] = useState(0.7)
        const [progress, setProgress] = useState(0)
        const [duration, setDuration] = useState(0)
        const [currentTime, setCurrentTime] = useState(0)

        useEffect(() => {
          if (audioRef.current) {
            audioRef.current.src = songFile
            audioRef.current.onloadedmetadata = () => {
              setDuration(audioRef.current.duration)
            }
            audioRef.current.volume = volume
          }
          // Reset playback state when song changes
          setIsPlaying(false)
          setProgress(0)
          setCurrentTime(0)

          return () => {
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }
          }
        }, [songFile])

        useEffect(() => {
          if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(error => console.error("Audio playback failed:", error))
            progressInterval.current = setInterval(() => {
              const audio = audioRef.current
              if (audio && audio.duration) {
                setCurrentTime(audio.currentTime)
                setProgress((audio.currentTime / audio.duration) * 100)
              }
            }, 100)
          } else {
            if (audioRef.current) audioRef.current.pause()
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }
          }

          return () => {
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }
          }
        }, [isPlaying])

        const toggleAudio = () => {
          setIsPlaying(!isPlaying)
        }

        const handleVolumeChange = (e) => {
          const newVolume = parseFloat(e.target.value)
          setVolume(newVolume)
          if (audioRef.current) {
            audioRef.current.volume = newVolume
          }
        }

        const handleProgressClick = (e) => {
          if (!audioRef.current || !duration) return

          const rect = e.currentTarget.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const newTime = (clickX / rect.width) * duration
          
          audioRef.current.currentTime = newTime
          setCurrentTime(newTime)
          setProgress((newTime / duration) * 100)
        }

        const replayAudio = () => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            setCurrentTime(0)
            setProgress(0)
            if (!isPlaying) {
              audioRef.current.play()
              setIsPlaying(true)
            }
          }
        }

        return (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-bollywood"
          >
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <PlaybackControls 
                isPlaying={isPlaying} 
                onTogglePlay={toggleAudio} 
                onReplay={replayAudio} 
              />
              <AudioProgressBar 
                currentTime={currentTime} 
                duration={duration} 
                progress={progress} 
                onProgressClick={handleProgressClick} 
              />
              <VolumeControl 
                volume={volume} 
                onVolumeChange={handleVolumeChange} 
              />
            </div>
            
            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </motion.div>
        )
      }

      export default AudioPlayer