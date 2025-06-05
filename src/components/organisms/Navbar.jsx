import React from 'react'
      import { motion } from 'framer-motion'
      import AppLogo from '../molecules/AppLogo'
      import DropdownMenu from '../molecules/DropdownMenu'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'
      import Text from '../atoms/Text'

      const Navbar = () => {
        return (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <AppLogo />

                <div className="hidden md:flex items-center space-x-8">
                  <a href="#" className="text-white hover:text-secondary transition-colors font-medium">
                    Home
                  </a>
                  <DropdownMenu triggerText="Difficulty" iconName="ChevronDown">
                    <Text as="span">Choose your challenge<br /></Text>
                    <Text as="span" className="text-secondary font-medium">Coming Soon!</Text>
                  </DropdownMenu>
                  <DropdownMenu triggerText="Leaderboard" iconName="Trophy">
                    <Text as="span">Track your stardom<br /></Text>
                    <Text as="span" className="text-secondary font-medium">Launching Soon!</Text>
                  </DropdownMenu>
                  <DropdownMenu triggerText="Achievements" iconName="Award">
                    <Text as="span">Collect badges<br /></Text>
                    <Text as="span" className="text-secondary font-medium">In Development!</Text>
                  </DropdownMenu>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <Button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20"
                    >
                      <Icon name="Settings" className="w-5 h-5 text-white" />
                    </Button>
                    <div className="absolute top-full right-0 mt-2 w-64 bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/20 z-50">
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Text className="text-gray-300 text-sm">Sound Effects</Text>
                          <Text className="text-secondary text-xs">Coming Soon!</Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text className="text-gray-300 text-sm">Themes</Text>
                          <Text className="text-secondary text-xs">In Production!</Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text className="text-gray-300 text-sm">Languages</Text>
                          <Text className="text-secondary text-xs">Planned!</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:hidden">
                    <Button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20"
                    >
                      <Icon name="Menu" className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )
      }

      export default Navbar