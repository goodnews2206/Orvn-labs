import React from 'react';
import { motion } from 'framer-motion';

export default function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      {children}
    </motion.main>
  );
}
