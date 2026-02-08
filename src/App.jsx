import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Bookshelf from './components/Bookshelf';
import './index.css';

function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Bookshelf />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;

