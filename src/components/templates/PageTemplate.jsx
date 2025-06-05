import React from 'react'
      import { motion } from 'framer-motion'
      import Navbar from '../organisms/Navbar'
      import FeatureSection from '../organisms/FeatureSection'

      const PageTemplate = () => {
        return (
          <div className="min-h-screen relative">
            <Navbar />

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-7xl mx-auto">
                <FeatureSection />
              </div>
            </main>

            {/* Decorative Film Reels */}
            <div className="absolute top-20 left-4 opacity-10 pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-secondary rounded-full relative"
              >
                <div className="absolute inset-2 border-2 border-secondary rounded-full"></div>
                <div className="absolute inset-4 bg-secondary rounded-full"></div>
              </motion.div>
            </div>
            
            <div className="absolute bottom-20 right-4 opacity-10 pointer-events-none">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-4 border-primary rounded-full relative"
              >
                <div className="absolute inset-2 border-2 border-primary rounded-full"></div>
                <div className="absolute inset-4 bg-primary rounded-full"></div>
              </motion.div>
            </div>
          </div>
        )
      }

      export default PageTemplate