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
    const [customApps, setCustomApps] = useState(JSON.parse(localStorage.getItem('customApps') || '[]'));
    const [isAddingApp, setIsAddingApp] = useState(false);
    const [newApp, setNewApp] = useState({ title: '', url: '', color: '#6366f1', description: '', inputs: [], outputs: [] });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

    const handleAddApp = () => {
        if (!newApp.title || !newApp.url) return;
        const appToAdd = {
            ...newApp,
            id: `custom-${Date.now()}`,
            icon: PlusCircle, // Default icon for custom apps
            isCustom: true
        };
        const updatedApps = [...customApps, appToAdd];
        setCustomApps(updatedApps);
        localStorage.setItem('customApps', JSON.stringify(updatedApps));
        setIsAddingApp(false);
        setNewApp({ title: '', url: '', color: '#6366f1', description: '', inputs: [], outputs: [] });
    };

    const handleDeleteApp = (id) => {
        const updatedApps = customApps.filter(app => app.id !== id);
        setCustomApps(updatedApps);
        localStorage.setItem('customApps', JSON.stringify(updatedApps));
    };

    const managementApps = [
        { id: 'weekly', title: '週案作成', description: '授業の羅針盤を創り、教育の質を高める', color: '#6366f1', icon: FileText },
        { id: 'progress', title: '進捗管理', description: '学びの歩みを可視化し、最適な導きを支援', color: '#8b5cf6', icon: Clock },
        { id: 'homework', title: '宿題配布', description: '家庭と学校をシームレスに繋ぐ架け橋', color: '#f59e0b', icon: CheckSquare },
        { id: 'newsletter', title: '学級通信', description: 'にじいろ日記 - 先生の想いを届ける虹の架け橋', color: '#10b981', icon: BookOpen, url: 'https://gakkyuu-tuushin.vercel.app/' },
        { id: 'ocr-sync', title: '出張読取', description: '紙の情報を瞬時にデジタル知財へと変換', color: '#f43f5e', icon: Link2 },
    ];

    const supportApps = [
        { id: 'curriculum', title: '授業づくり', description: '創造性と情熱を引き出す授業デザイン', color: '#10b981', icon: BookOpen },
        { id: 'unit-plan', title: '単元計画', description: '長期的な視点で学びのストーリーを描く', color: '#3b82f6', icon: Map, url: 'https://unit-plan.vercel.app/' },
        { id: 'snapsync', title: 'SnapSync AI', description: '教室の決定的な瞬間をAIで価値化', color: '#06b6d4', icon: Zap, url: 'https://snapsync-ai.vercel.app/' },
        { id: 'gradeshare', title: 'GradeShare Pro', description: '評価の時間を子どもと向き合う感動へ', color: '#f97316', icon: BarChart3, url: 'https://grade-share-pro-7qcq.vercel.app/' },
        { id: 'tokugaku', title: '自立活動支援', description: '一人ひとりの無限の可能性を解き放つ', color: '#fbbf24', icon: Activity, url: 'https://tokugaku-tsl3.vercel.app/' },
    ];

    return (
        <div className="nova-wrapper" style={{ padding: '100px 40px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="mesh-bg" />

            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}
            >
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            background: '#001220',
                            color: 'white',
                            padding: '6px 14px',
                            borderRadius: '12px',
                            fontSize: '0.65rem',
                            fontWeight: '950',
                            letterSpacing: '1px'
                        }} className="mono">T-LAB PROJECT</div>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
                        <span className="mono" style={{ fontSize: '0.65rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase' }}>
                            Nova Lab v5.0.5 (Update: Link Fixes)
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: '900',
                        color: '#001220',
                        lineHeight: '1.2',
                        letterSpacing: '-0.04em',
                        margin: 0
                    }}>
                        教育者の知性を、<br />
                        <span style={{ color: '#6366f1' }}>加速させる翼 .</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                    {/* API Key Configuration - More Discrete */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'rgba(255, 255, 255, 0.5)',
                        padding: '10px 20px',
                        borderRadius: '100px',
                        border: '1px solid #f1f5f9',
                        transition: 'all 0.3s',
                        backdropFilter: 'blur(10px)'
                    }} className="api-key-input-container">
                        <Key size={14} color="#6366f1" />
                        <input
                            type="password"
                            placeholder="Gemini APIキー..."
                            value={apiKey}
                            onChange={(e) => handleSaveApiKey(e.target.value)}
                            style={{
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.8rem',
                                color: '#001220',
                                width: '160px',
                                fontWeight: '600',
                                fontFamily: 'inherit'
                            }}
                        />
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: apiKey ? '#10b981' : '#f43f5e' }} />
                    </div>

                    <p style={{
                        color: '#94a3b8',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        textAlign: 'right',
                        margin: 0,
                        maxWidth: '300px',
                        lineHeight: '1.4'
                    }} className="mono">
                        ARCHITECTURED BY T-LAB STUDIO<br />
                        FOR NEXT-GEN EDUCATION.
                    </p>
                </div>
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
                            01. Core Operations / 基幹業務
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
                            02. Creative Delivery / 教育創造
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

                        {customApps.map(app => (
                            <Book
                                key={app.id}
                                {...app}
                                icon={app.icon || PlusCircle}
                                onClick={() => setSelectedApp(app)}
                            />
                        ))}

                        <motion.div
                            whileHover={{ scale: 1.02, borderColor: '#6366f1' }}
                            onClick={() => setIsAddingApp(true)}
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
                            <span className="mono" style={{ fontSize: '0.8rem', fontWeight: '900', marginTop: '16px', color: '#6366f1' }}>モジュールを追加</span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Section 3: Ecosystem Utilities */}
                <motion.section variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <h2 className="mono" style={{ fontSize: '0.9rem', fontWeight: '800', color: '#001220', textTransform: 'uppercase' }}>
                            03. Ecosystem Utilities / 支援ツール
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
                                onClick={() => setIsSettingsOpen(true)}
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
                                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6366f1' }}>稼働中</div>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px', fontWeight: '600' }}>すべてのシステムが正常に動作しています。</p>
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
                                    <div className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', color: selectedApp.color, opacity: 0.8, marginBottom: '4px' }}>VERSION 5.0 / MODULE ID: {selectedApp.id?.toUpperCase()}</div>
                                    <h2 style={{ fontSize: '2.5rem', color: '#001220', fontWeight: '900', lineHeight: 1.1 }}>{selectedApp.title}</h2>
                                    <p style={{ marginTop: '8px', color: '#64748b', fontWeight: '600' }}>{selectedApp.description || "次世代教育プラットフォーム"}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '48px' }}>
                                <h3 className="mono" style={{ fontSize: '0.8rem', marginBottom: '24px', color: '#64748b', fontWeight: '800' }}>
                                    {"// ARCHITECTURE & WORKFLOW"}
                                </h3>

                                {selectedApp.isCustom && (selectedApp.description || (selectedApp.inputs?.length > 0) || (selectedApp.outputs?.length > 0)) && (
                                    <div style={{
                                        padding: '32px',
                                        background: 'rgba(99, 102, 241, 0.03)',
                                        borderRadius: '32px',
                                        border: '1px solid rgba(99, 102, 241, 0.1)',
                                        marginBottom: '32px',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: selectedApp.color, opacity: 0.05, filter: 'blur(30px)' }} />

                                        <div className="mono" style={{ fontSize: '0.65rem', color: selectedApp.color, fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Workflow size={14} /> システム連携の設計 (ブループリント)
                                        </div>

                                        {(selectedApp.inputs?.length > 0 || selectedApp.outputs?.length > 0) && (
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                                                    {selectedApp.inputs?.map(id => {
                                                        const app = [...managementApps, ...supportApps, ...customApps].find(a => a.id === id);
                                                        return app ? <span key={id} style={{ fontSize: '0.7rem', fontWeight: '800', color: app.color, background: `${app.color}10`, padding: '2px 8px', borderRadius: '4px' }}>{app.title}</span> : null;
                                                    })}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                                                    <div style={{ width: '40px', height: '1px', background: 'currentColor' }} />
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedApp.color }} />
                                                    <div style={{ width: '40px', height: '1px', background: 'currentColor' }} />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    {selectedApp.outputs?.map(id => {
                                                        const app = [...managementApps, ...supportApps, ...customApps].find(a => a.id === id);
                                                        return app ? <span key={id} style={{ fontSize: '0.7rem', fontWeight: '800', color: app.color, background: `${app.color}10`, padding: '2px 8px', borderRadius: '4px' }}>{app.title}</span> : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {selectedApp.description && (
                                            <p style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '500', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
                                                "{selectedApp.description}"
                                            </p>
                                        )}
                                    </div>
                                )}

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

                                {selectedApp.isCustom && (
                                    <button
                                        onClick={() => {
                                            handleDeleteApp(selectedApp.id);
                                            setSelectedApp(null);
                                        }}
                                        style={{
                                            marginTop: '32px',
                                            width: '100%',
                                            padding: '16px',
                                            background: 'transparent',
                                            border: '1px solid #fecaca',
                                            color: '#ef4444',
                                            borderRadius: '16px',
                                            fontSize: '0.85rem',
                                            fontWeight: '900',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                        className="mono"
                                        onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                    >
                                        このカスタムモジュールを削除
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    if (selectedApp.url) {
                                        setViewingApp(selectedApp);
                                        setSelectedApp(null);
                                    }
                                }}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '24px',
                                    fontSize: '1.2rem',
                                    background: selectedApp.color,
                                    fontWeight: '900',
                                    borderRadius: '24px',
                                    boxShadow: `0 20px 40px -10px ${selectedApp.color}40`
                                }}
                            >
                                {selectedApp.url ? 'モジュールを起動' : 'システムを初期化'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add App Modal */}
            <AnimatePresence>
                {isAddingApp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 18, 32, 0.6)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 60 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 60 }}
                            className="nova-card"
                            style={{
                                width: '90%',
                                maxWidth: '640px',
                                borderRadius: '48px',
                                padding: '64px',
                                background: '#fff'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#001220', marginBottom: '12px', letterSpacing: '-0.02em' }}>新しい翼を広げる.</h2>
                                    <p style={{ color: '#64748b', fontWeight: '600', fontSize: '1.1rem' }}>仲間のツールをあなたのエコシステムに統合しましょう。</p>
                                </div>
                                <button onClick={() => setIsAddingApp(false)} style={{ background: '#f8fafc', border: 'none', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxHeight: '600px', overflowY: 'auto', paddingRight: '12px', paddingBottom: '24px' }}>
                                <div className="input-group">
                                    <label className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '12px' }}>MODULE TITLE & COLOR / 名称とテーマカラー</label>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <input
                                            type="text"
                                            placeholder="アプリ名を入力..."
                                            value={newApp.title}
                                            onChange={(e) => setNewApp({ ...newApp, title: e.target.value })}
                                            style={{ flex: 1, padding: '20px 24px', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: '600' }}
                                        />
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            {['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6'].map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setNewApp({ ...newApp, color: c })}
                                                    style={{ width: '32px', height: '32px', borderRadius: '50%', background: c, border: newApp.color === c ? '3px solid #001220' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '12px' }}>VERCEL DEPLOYMENT URL / 連携URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={newApp.url}
                                        onChange={(e) => setNewApp({ ...newApp, url: e.target.value })}
                                        style={{ width: '100%', padding: '20px 24px', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: '600' }}
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '12px' }}>CONNECTION DESIGN (連携モジュールの選択)</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '12px' }}>INPUT FROM (データを受け取る):</span>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {[...managementApps, ...supportApps].map(app => (
                                                    <button
                                                        key={`in-${app.id}`}
                                                        onClick={() => setNewApp({ ...newApp, inputs: newApp.inputs.includes(app.id) ? newApp.inputs.filter(id => id !== app.id) : [...newApp.inputs, app.id] })}
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '12px',
                                                            border: '1px solid',
                                                            borderColor: newApp.inputs.includes(app.id) ? app.color : '#f1f5f9',
                                                            background: newApp.inputs.includes(app.id) ? `${app.color}10` : '#fff',
                                                            color: newApp.inputs.includes(app.id) ? app.color : '#64748b',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '700',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {app.title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '12px' }}>OUTPUT TO (データを渡す):</span>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {[...managementApps, ...supportApps].map(app => (
                                                    <button
                                                        key={`out-${app.id}`}
                                                        onClick={() => setNewApp({ ...newApp, outputs: newApp.outputs.includes(app.id) ? newApp.outputs.filter(id => id !== app.id) : [...newApp.outputs, app.id] })}
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '12px',
                                                            border: '1px solid',
                                                            borderColor: newApp.outputs.includes(app.id) ? app.color : '#f1f5f9',
                                                            background: newApp.outputs.includes(app.id) ? `${app.color}10` : '#fff',
                                                            color: newApp.outputs.includes(app.id) ? app.color : '#64748b',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '700',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {app.title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="mono" style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '12px' }}>ARCHITECTURE NOTES / 設計メモ</label>
                                    <textarea
                                        placeholder="他のアプリとどう繋げたいか、ビジョンをメモしてください..."
                                        value={newApp.description}
                                        onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                                        style={{ width: '100%', minHeight: '100px', padding: '20px 24px', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: '600', resize: 'none' }}
                                    />
                                </div>

                                <button onClick={handleAddApp} className="btn-primary" style={{ padding: '24px', borderRadius: '24px', background: '#001220', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', marginTop: '16px', fontSize: '1.1rem' }}>
                                    モジュールを有効化する
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* System Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 2500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 18, 32, 0.7)',
                            backdropFilter: 'blur(30px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                            className="nova-card"
                            style={{
                                width: '90%',
                                maxWidth: '600px',
                                borderRadius: '48px',
                                padding: '64px',
                                background: '#fff',
                                border: '1px solid rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
                                <div>
                                    <div className="mono" style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: '800', marginBottom: '8px' }}>SYSTEM SETTINGS</div>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#001220', letterSpacing: '-0.03em' }}>統合管理パネル.</h2>
                                </div>
                                <button onClick={() => setIsSettingsOpen(false)} style={{ background: '#f8fafc', border: 'none', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {/* API Key Status */}
                                <div style={{ padding: '24px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                    <div className="mono" style={{ fontSize: '0.65rem', marginBottom: '12px', color: '#64748b', fontWeight: '800' }}>AI CORE STATUS</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: apiKey ? '#10b981' : '#f43f5e' }} />
                                        <span style={{ fontWeight: '800', color: '#001220' }}>{apiKey ? 'オンライン / 正常' : 'オフライン / 未設定'}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '12px', lineHeight: 1.6, fontWeight: '600' }}>
                                        Gemini AIコアは現在正常に動作しています。教育データの分析や生成プロセスが利用可能です。
                                    </p>
                                </div>

                                {/* Storage Info */}
                                <div style={{ padding: '24px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                    <div className="mono" style={{ fontSize: '0.65rem', marginBottom: '12px', color: '#64748b', fontWeight: '800' }}>LOCAL ARCHIVE / 内部データ</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>カスタムモジュール:</span>
                                        <span style={{ fontWeight: '800' }}>{customApps.length} ユニット</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>有効な連携設定:</span>
                                        <span style={{ fontWeight: '800' }}>{Object.keys(connections).length} アクティブ</span>
                                    </div>
                                </div>

                                {/* Reset Options */}
                                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <button
                                        onClick={() => {
                                            if (confirm('すべてのカスタムモジュールと連携設定をリセットしますか？この操作は取り消せません。')) {
                                                localStorage.clear();
                                                window.location.reload();
                                            }
                                        }}
                                        style={{ width: '100%', padding: '20px', borderRadius: '20px', border: '1px solid #fee2e2', color: '#ef4444', fontWeight: '900', background: '#fff', cursor: 'pointer', transition: 'all 0.2s', fontSize: '1rem' }}
                                        onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                                        onMouseLeave={(e) => e.target.style.background = '#fff'}
                                    >
                                        システム全体を初期化する
                                    </button>
                                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>
                                        Nova Lab for Educators v5.0.4 "ANTIGRAVITY"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
                                    {viewingApp.icon ? <viewingApp.icon size={28} strokeWidth={2.5} /> : <PlusCircle size={28} strokeWidth={2.5} />}
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
                                    fontWeight: '900',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            >
                                <X size={20} strokeWidth={2.5} /> ポータルを閉じる
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
