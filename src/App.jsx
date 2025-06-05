import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-bollywood-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-float opacity-20">🎬</div>
        <div className="absolute top-32 right-20 text-3xl animate-float delay-1000 opacity-20">🎵</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float delay-2000 opacity-20">⭐</div>
<div className="absolute bottom-40 right-10 text-3xl animate-float delay-1500 opacity-20">🎭</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-float delay-500 opacity-20">🎪</div>
        <div className="absolute top-3/4 right-1/3 text-4xl animate-float delay-3000 opacity-20">🎨</div>
      </div>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="backdrop-blur-sm bg-surface-800/90 border border-primary/20"
        bodyClassName="text-white font-sans"
        progressClassName="bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  )
}

export default App