import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Book from './Book';
import Calendar from './Calendar';
import {
    LayoutDashboard,
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
    Key,
    Bell,
    ChevronRight,
    Search,
    User,
    LogOut
} from 'lucide-react';

const Platform = () => {
    const [selectedApp, setSelectedApp] = useState(null);
    const [viewingApp, setViewingApp] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [apiKey, setApiKey] = useState(localStorage.getItem('geminiApiKey') || '');
    const [customApps, setCustomApps] = useState(JSON.parse(localStorage.getItem('customApps') || '[]'));
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAddingApp, setIsAddingApp] = useState(false);
    const [newAppForm, setNewAppForm] = useState({ title: '', url: '', description: '', category: 'myapps', color: '#6366f1' });

    const COLOR_PRESETS = ['#6366f1', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

    const handleAddApp = () => {
        if (!newAppForm.title || !newAppForm.url) return;
        const newApp = { id: `custom-${Date.now()}`, ...newAppForm, icon: Link2 };
        const updated = [...customApps, newApp];
        setCustomApps(updated);
        localStorage.setItem('customApps', JSON.stringify(updated));
        setIsAddingApp(false);
        setNewAppForm({ title: '', url: '', description: '', category: 'myapps', color: '#6366f1' });
    };

    const handleDeleteApp = (id) => {
        const updated = customApps.filter(a => a.id !== id);
        setCustomApps(updated);
        localStorage.setItem('customApps', JSON.stringify(updated));
    };

    // Sidebar items mapping
    const sidebarItems = [
        { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
        { id: 'management', label: '校務管理', icon: FileText },
        { id: 'creative', label: '教育創造', icon: Zap },
        { id: 'calendar', label: '行事予定', icon: CalendarIcon },
        { id: 'settings', label: '設定・連携', icon: Settings },
    ];

    const managementApps = [
        { id: 'weekly', title: '週案作成', description: '授業のの羅針盤を設計', color: '#6366f1', icon: FileText },
        { id: 'progress', title: '学習進捗', description: '学びの歩みを可視化', color: '#8b5cf6', icon: Clock },
        { id: 'newsletter', title: '学級通信', description: '想いを届ける虹の架け橋', color: '#10b981', icon: BookOpen, url: 'https://gakkyuu-tuushin.vercel.app/' },
    ];

    const supportApps = [
        { id: 'unit-plan', title: '単元計画', description: '物語としての学びを構築', color: '#3b82f6', icon: Map, url: 'https://unit-plan.vercel.app/' },
        { id: 'snapsync', title: '瞬間記録 AI', description: '教室の奇跡を資産化', color: '#06b6d4', icon: Zap, url: 'https://snapsync-ai.vercel.app/' },
        { id: 'tokugaku', title: '特別支援', description: '個別の可能性を最大化', color: '#fbbf24', icon: Activity, url: 'https://tokugaku-tsl3.vercel.app/' },
    ];

    return (
        <div className="app-container">
            <div className="mesh-bg" />

            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div style={{ padding: '0 24px', marginBottom: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--accent-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Nova Lab <span style={{ color: 'var(--accent-primary)' }}>Pro</span></h2>
                    </div>
                </div>

                <nav style={{ flex: 1 }}>
                    {sidebarItems.map(item => (
                        <div
                            key={item.id}
                            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: '600' }}>
                        <User size={18} />
                        <span>T-LAB ユーザー</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                    <div>
                        <p style={{ color: 'var(--text-dim)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>2026年3月6日 金曜日</p>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>
                            こんにちは、先生。🚀
                        </h1>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Search size={18} color="var(--text-dim)" />
                            <input type="text" placeholder="機能を検索..." style={{ background: 'none', border: 'none', outline: 'none', fontWeight: '600' }} />
                        </div>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setIsAddingApp(true)}>
                            <PlusCircle size={18} />
                            <span>新規作成</span>
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="dashboard-grid">
                                <div>
                                    <h3 className="section-title">基幹業務センター</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                        {managementApps.map(app => (
                                            <Book key={app.id} {...app} onClick={() => setSelectedApp(app)} />
                                        ))}
                                    </div>

                                    <h3 className="section-title" style={{ marginTop: '48px' }}>教育創造ツール</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                        {supportApps.map(app => (
                                            <Book key={app.id} {...app} onClick={() => setSelectedApp(app)} />
                                        ))}
                                    </div>

                                    {customApps.length > 0 && (
                                        <>
                                            <h3 className="section-title" style={{ marginTop: '48px' }}>マイアプリ</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                                {customApps.map(app => (
                                                    <div key={app.id} style={{ position: 'relative' }}>
                                                        <Book {...app} icon={Link2} onClick={() => setSelectedApp(app)} />
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteApp(app.id); }}
                                                            style={{
                                                                position: 'absolute', top: '12px', right: '12px',
                                                                width: '28px', height: '28px', borderRadius: '50%',
                                                                background: 'rgba(0,0,0,0.15)', border: 'none',
                                                                color: 'white', cursor: 'pointer', display: 'flex',
                                                                alignItems: 'center', justifyContent: 'center',
                                                                zIndex: 10
                                                            }}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    <div className="nova-card" style={{ padding: '32px' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Bell size={20} color="var(--accent-primary)" />
                                            お知らせ
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>学級通信の更新時期です</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>前回の発行から5日が経過しました。</p>
                                            </div>
                                            <div style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>システムアップデート v5.1</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>AIによる単元計画の補助機能が向上しました。</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="nova-card" style={{ padding: '32px', background: 'var(--text-main)', color: 'white' }}>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.7, fontWeight: '800' }}>AI システム連携</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: apiKey ? '#10b981' : '#f43f5e' }} />
                                            <span style={{ fontWeight: '800' }}>{apiKey ? 'AIコア 稼働中' : 'キー未設定'}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', marginTop: '16px', opacity: 0.8 }}>
                                            Gemini AIが現在の校務をサポートする準備ができています。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* アプリ追加モーダル */}
            <AnimatePresence>
                {isAddingApp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0, 18, 32, 0.4)', backdropFilter: 'blur(12px)'
                        }}
                        onClick={() => setIsAddingApp(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            className="nova-card"
                            style={{ width: '90%', maxWidth: '480px', borderRadius: '32px', padding: '40px', background: '#fff' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>アプリを追加</h2>
                                <button onClick={() => setIsAddingApp(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                                    <X size={22} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>アプリ名 *</label>
                                    <input
                                        type="text"
                                        value={newAppForm.title}
                                        onChange={e => setNewAppForm(f => ({ ...f, title: e.target.value }))}
                                        placeholder="例: 成績管理ツール"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', fontWeight: '600', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>URL *</label>
                                    <input
                                        type="url"
                                        value={newAppForm.url}
                                        onChange={e => setNewAppForm(f => ({ ...f, url: e.target.value }))}
                                        placeholder="https://xxx.vercel.app"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', fontWeight: '600', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>説明文</label>
                                    <input
                                        type="text"
                                        value={newAppForm.description}
                                        onChange={e => setNewAppForm(f => ({ ...f, description: e.target.value }))}
                                        placeholder="簡単な説明（任意）"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', fontWeight: '600', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block', marginBottom: '8px' }}>カラー</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {COLOR_PRESETS.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setNewAppForm(f => ({ ...f, color: c }))}
                                                style={{
                                                    width: '32px', height: '32px', borderRadius: '50%', background: c,
                                                    border: newAppForm.color === c ? '3px solid #1e293b' : '3px solid transparent',
                                                    cursor: 'pointer', transition: 'transform 0.15s',
                                                    transform: newAppForm.color === c ? 'scale(1.2)' : 'scale(1)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                                <button
                                    className="btn-primary"
                                    style={{ flex: 1, padding: '16px', opacity: (!newAppForm.title || !newAppForm.url) ? 0.5 : 1 }}
                                    onClick={handleAddApp}
                                    disabled={!newAppForm.title || !newAppForm.url}
                                >
                                    追加する
                                </button>
                                <button
                                    className="glass-card"
                                    style={{ padding: '16px 24px', border: '1px solid #e2e8f0', fontWeight: '700' }}
                                    onClick={() => setIsAddingApp(false)}
                                >
                                    キャンセル
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal & Overlays would go here - simplified for initial refresh */}
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
                            className="nova-card"
                            style={{ width: '90%', maxWidth: '540px', borderRadius: '40px', padding: '48px', background: '#fff' }}
                        >
                            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '16px' }}>{selectedApp.title}</h2>
                            <p style={{ color: 'var(--text-dim)', marginBottom: '32px', fontWeight: '600' }}>{selectedApp.description}</p>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button className="btn-primary" style={{ flex: 1, padding: '20px' }} onClick={() => {
                                    if (selectedApp.url) window.open(selectedApp.url, '_blank');
                                    setSelectedApp(null);
                                }}>
                                    起動する
                                </button>
                                <button className="glass-card" style={{ padding: '20px', border: '1px solid #e2e8f0', fontWeight: '700' }} onClick={() => setSelectedApp(null)}>
                                    閉じる
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Platform;
