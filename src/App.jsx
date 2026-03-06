import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Platform from './components/Platform';
import './index.css';

function App() {
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Platform />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;

