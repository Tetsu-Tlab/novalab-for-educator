import React from 'react';
import { motion } from 'framer-motion';

const Book = ({ title, color, icon: Icon, onClick }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -12 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="nova-card"
      style={{
        width: '100%',
        minHeight: '220px',
        borderRadius: '32px',
        cursor: 'pointer',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Blur Object */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '140px',
        height: '140px',
        background: color,
        filter: 'blur(60px)',
        opacity: 0.1,
        pointerEvents: 'none'
      }} />

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: '#fff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.03)'
          }}>
            <Icon size={28} strokeWidth={2.5} />
          </div>

          <div className="mono" style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            color: color,
            padding: '4px 12px',
            background: `${color}10`,
            borderRadius: '100px',
            textTransform: 'uppercase'
          }}>
            Module active
          </div>
        </div>

        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: '800',
          color: '#001220',
          lineHeight: '1.2',
          marginBottom: '8px'
        }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
          Educational Platform
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: 'auto'
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
        <span className="mono" style={{ fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
          Stable Release v4.0
        </span>
      </div>
    </motion.div>
  );
};

export default Book;

