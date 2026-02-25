import React from 'react';
import { motion } from 'framer-motion';

const Book = ({ title, description, color, icon: Icon, onClick }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -12, boxShadow: `0 30px 60px -12px ${color}20` }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="nova-card"
      style={{
        width: '100%',
        minHeight: '240px',
        borderRadius: '32px',
        cursor: 'pointer',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)'
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
            width: '60px',
            height: '60px',
            background: `${color}10`,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            boxShadow: `0 8px 16px -4px ${color}10`,
            border: `1px solid ${color}20`
          }}>
            <Icon size={32} strokeWidth={2} />
          </div>

          <div className="mono" style={{
            fontSize: '0.65rem',
            fontWeight: '800',
            color: color,
            padding: '6px 14px',
            background: `${color}15`,
            borderRadius: '100px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            ACTIVE
          </div>
        </div>

        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '900',
          color: '#001220',
          lineHeight: '1.2',
          marginBottom: '10px',
          letterSpacing: '-0.02em'
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: '#64748b',
          fontWeight: '600',
          lineHeight: '1.5'
        }}>
          {description || "教育支援プラットフォーム"}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '24px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 10px ${color}`
        }} />
        <span className="mono" style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>
          VER 5.0.4 / OPTIMIZED
        </span>
      </div>
    </motion.div>
  );
};

export default Book;

