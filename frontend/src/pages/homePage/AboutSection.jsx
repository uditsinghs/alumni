/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'


const AboutSection = () => {
  return (
    <section className="w-full  py-20 px-6 md:px-12 lg:px-20">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          About <span className="text-blue-600">AlumniConnect</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
          AlumniConnect is a platform designed to bridge the gap between alumni and current students. 
          We believe in building a strong, helpful community where guidance, mentorship, and opportunities flow freely.
        </p>
        
      </motion.div>
    </section>
  )
}

export default AboutSection
