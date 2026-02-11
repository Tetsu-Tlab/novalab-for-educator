import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Book from './Book';
import Calendar from './Calendar';
import {
    BookOpen,
    Calendar as CalendarIcon,
    CheckSquare,
    Clock,
    FileText,
    Settings,
    PlusCircle,
    Link2,
    Zap,
    BarChart3,
    X,
    Activity,
    Workflow,
    Map,
    Key
} from 'lucide-react';

const Bookshelf = () => {
    const [selectedApp, setSelectedApp] = useState(null);
    const [viewingApp, setViewingApp] = useState(null);
    const [calendarId, setCalendarId] = useState(localStorage.getItem('googleCalendarId') || '');
    const [apiKey, setApiKey] = useState(localStorage.getItem('geminiApiKey') || '');
    const [connections, setConnections] = useState(JSON.parse(localStorage.getItem('appConnections') || '{}'));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const handleSaveCalendarId = (id) => {
        setCalendarId(id);
        localStorage.setItem('googleCalendarId', id);
    };

    const handleSaveApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem('geminiApiKey', key);
    };

    const handleToggleConnection = (appId, target) => {
        const newConnections = { ...connections };
        if (!newConnections[appId]) newConnections[appId] = [];

        if (newConnections[appId].includes(target)) {
            newConnections[appId] = newConnections[appId].filter(t => t !== target);
        } else {
            newConnections[appId].push(target);
        }

        setConnections(newConnections);
        localStorage.setItem('appConnections', JSON.stringify(newConnections));
    };

    const managementApps = [
        { id: 'weekly', title: '週案作成', color: '#6366f1', icon: FileText },
        { id: 'progress', title: '進捗管理', color: '#8b5cf6', icon: Clock },
        { id: 'homework', title: '宿題配布', color: '#f59e0b', icon: CheckSquare },
        { id: 'ocr-sync', title: '出張読取', color: '#f43f5e', icon: Link2 },
    ];

    const supportApps = [
        { id: 'curriculum', title: '授業づくり', color: '#10b981', icon: BookOpen },
        { id: 'unit-plan', title: '単元計画', color: '#3b82f6', icon: Map, url: 'https://unit-plan.vercel.app/' },
        { id: 'snapsync', title: 'SnapSync AI', color: '#06b6d4', icon: Zap, url: 'https://snapsync-ai.vercel.app/' },
        { id: 'gradeshare', title: 'GradeShare Pro', color: '#f97316', icon: BarChart3, url: 'https://grade-share-pro-7qcq.vercel.app/' },
        { id: 'tokugaku', title: '自立活動支援', color: '#fbbf24', icon: Activity, url: 'https://tokugaku-tsl3.vercel.app/' },
    ];

    return (
        <div className="nova-wrapper" style={{ padding: '100px 40px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="mesh-bg" />

            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '120px', maxWidth: '800px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '2px', background: '#cbd5e1' }} />
                    <span className="mono" style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase' }}>
                        Nova Lab for Educators v5.0
                    </span>
                </div>

                <h1 style={{
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: '850',
                    color: '#001220',
                    lineHeight: '0.9',
                    marginBottom: '32px'
                }}>
                    Next-Gen Learning <br />
                    <span style={{ color: '#6366f1' }}>Orchestration .</span>
                </h1>

                <p style={{
                    color: '#64748b',
                    fontSize: '1.25rem',
                    lineHeight: '1.6',
                    fontWeight: '500'
                }}>
                    先生の知性と情熱を加速させる、次世代の教育OS。
                    <br />
                    各モジュールをシームレスに連携し、創造的な教育時間を生み出します。
                </p>

                {/* API Key Configuration */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'rgba(99, 102, 241, 0.05)',
                        padding: '12px 24px',
                        borderRadius: '100px',
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                        width: 'fit-content',
                        transition: 'all 0.3s'
                    }} className="api-key-input-container">
                        <Key size={16} color="#6366f1" />
                        <input
                            type="password"
                            placeholder="Gemini API Key..."
                            value={apiKey}
                            onChange={(e) => handleSaveApiKey(e.target.value)}
                            style={{
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.85rem',
                                color: '#001220',
                                width: '220px',
                                fontWeight: '600',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: apiKey ? '#10b981' : '#f43f5e' }} />
                        <span className="mono" style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>
                            {apiKey ? 'AI Core Active' : 'AI Core Required'}
                        </span>
                    </div>
                </motion.div>
            </motion.header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Section 1: Core Operations */}
                <motion.section variants={itemVariants} style={{ marginBottom: '120px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <h2 className="mono" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#001220', textTransform: 'uppercase' }}>
                            01. Core Operations
                        </h2>
                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '32px'
                    }}>
                        {managementApps.map(app => (
                            <Book
                                key={app.id}
                                {...app}
                                onClick={() => setSelectedApp(app)}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Section 2: Creative Delivery */}
                <motion.section variants={itemVariants} style={{ marginBottom: '120px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <h2 className="mono" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#001220', textTransform: 'uppercase' }}>
                            02. Creative Delivery
                        </h2>
                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '32px'
                    }}>
                        {supportApps.map(app => (
                            <Book
                                key={app.id}
                                {...app}
                                onClick={() => setSelectedApp(app)}
                            />
                        ))}

                        <motion.div
                            whileHover={{ scale: 1.02, borderColor: '#6366f1' }}
                            className="nova-card"
                            style={{
                                minHeight: '220px',
                                borderRadius: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: '2px dashed #e2e8f0',
                                color: '#94a3b8',
                                transition: 'all 0.4s ease'
                            }}
                        >
                            <PlusCircle size={40} strokeWidth={1.5} />
                            <span className="mono" style={{ fontSize: '0.75rem', fontWeight: '800', marginTop: '16px' }}>DEPLOY MODULE</span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Section 3: Ecosystem Utilities */}
                <motion.section variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <h2 className="mono" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#001220', textTransform: 'uppercase' }}>
                            03. Ecosystem Utilities
                        </h2>
                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gap: '40px'
                    }}>
                        <div className="nova-card" style={{ padding: '48px', borderRadius: '48px' }}>
                            <Calendar calendarId={calendarId} onSaveId={handleSaveCalendarId} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="nova-card"
                                style={{
                                    flex: 1,
                                    borderRadius: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#001220',
                                    background: '#f8fafc'
                                }}
                            >
                                <Settings size={48} strokeWidth={1.5} />
                            </motion.div>
                            <div className="nova-card" style={{ padding: '40px', borderRadius: '40px', background: '#001220', color: '#fff' }}>
                                <div className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.5, marginBottom: '8px' }}>SYSTEM HEALTH</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6366f1' }}>OPTIMIZED</div>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>All systems operational.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </motion.main>

            {/* Application Configuration Overlay */}
            <AnimatePresence>
                {selectedApp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 18, 32, 0.4)',
                            backdropFilter: 'blur(12px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="nova-card"
                            style={{
                                width: '90%',
                                maxWidth: '540px',
                                borderRadius: '48px',
                                padding: '56px',
                                position: 'relative',
                                background: '#fff'
                            }}
                        >
                            <button
                                onClick={() => setSelectedApp(null)}
                                style={{
                                    position: 'absolute',
                                    top: '32px',
                                    right: '32px',
                                    border: 'none',
                                    background: '#f1f5f9',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: `${selectedApp.color}10`,
                                    borderRadius: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: selectedApp.color,
                                    border: `1px solid ${selectedApp.color}20`
                                }}>
                                    <selectedApp.icon size={40} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <div className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', color: selectedApp.color, opacity: 0.8, marginBottom: '4px' }}>UNIT ID: {selectedApp.id?.toUpperCase()}</div>
                                    <h2 style={{ fontSize: '2.2rem', color: '#001220', fontWeight: '900', lineHeight: 1 }}>{selectedApp.title}</h2>
                                </div>
                            </div>

                            <div style={{ marginBottom: '48px' }}>
                                <h3 className="mono" style={{ fontSize: '0.8rem', marginBottom: '24px', color: '#64748b', fontWeight: '800' }}>
                                    // WORKFLOW CONFIGURATION
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { id: 'weekly', label: '週案作成モジュールとの同期' },
                                        { id: 'homework', label: '宿題生成エンジンへの反映' },
                                        { id: 'calendar', label: 'カレンダー同期プロトコル' },
                                        { id: 'progress', label: '進捗データベースの更新' }
                                    ].map((item) => (
                                        <label key={item.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '20px 24px',
                                            background: connections[selectedApp.id]?.includes(item.id) ? '#f8fafc' : '#fff',
                                            borderRadius: '24px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            border: '1px solid',
                                            borderColor: connections[selectedApp.id]?.includes(item.id) ? '#6366f1' : '#f1f5f9'
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={connections[selectedApp.id]?.includes(item.id) || false}
                                                onChange={() => handleToggleConnection(selectedApp.id, item.id)}
                                                style={{ width: '22px', height: '22px', accentColor: '#6366f1' }}
                                            />
                                            <span style={{
                                                fontSize: '1rem',
                                                color: connections[selectedApp.id]?.includes(item.id) ? '#001220' : '#64748b',
                                                fontWeight: '600'
                                            }}>
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (selectedApp.url) {
                                        setViewingApp(selectedApp);
                                        setSelectedApp(null);
                                    }
                                }}
                                className="btn-primary"
                                style={{ width: '100%', padding: '24px', fontSize: '1.1rem', background: selectedApp.color }}
                            >
                                {selectedApp.url ? 'LAUNCH MODULE' : 'INITIALIZE SYSTEM'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Portal Interaction View */}
            <AnimatePresence>
                {viewingApp && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 2000,
                            background: '#fff',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{
                            padding: '24px 48px',
                            background: '#001220',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ color: viewingApp.color }}>
                                    <viewingApp.icon size={28} strokeWidth={2.5} />
                                </div>
                                <div style={{ height: '32px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900' }}>{viewingApp.title}</h3>
                            </div>
                            <button
                                onClick={() => setViewingApp(null)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    padding: '12px 32px',
                                    borderRadius: '100px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            >
                                <X size={20} strokeWidth={2.5} /> TERMINATE PORTAL
                            </button>
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <iframe
                                src={apiKey ? `${viewingApp.url}${viewingApp.url.includes('?') ? '&' : '?'}apiKey=${encodeURIComponent(apiKey)}` : viewingApp.url}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                title={viewingApp.title}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Bookshelf;
