import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = ({ calendarId, onSaveId, schedule = [] }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [tempId, setTempId] = React.useState(calendarId);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="desk-calendar"
            style={{
                width: '280px',
                background: '#fff',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                position: 'relative',
                borderTop: '10px solid #d32f2f',
                marginTop: '20px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', color: '#333' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon size={18} style={{ marginRight: '8px' }} />
                    <span style={{ fontWeight: 'bold' }}>Google Calendar</span>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#666' }}
                >
                    {isEditing ? '完了' : '設定'}
                </button>
            </div>

            {isEditing ? (
                <div style={{ padding: '10px 0' }}>
                    <input
                        type="text"
                        value={tempId}
                        onChange={(e) => setTempId(e.target.value)}
                        onBlur={() => onSaveId(tempId)}
                        placeholder="カレンダーIDを入力"
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '0.8rem'
                        }}
                    />
                </div>
            ) : (
                <div style={{ fontSize: '0.85rem' }}>
                    {schedule.length > 0 ? (
                        schedule.map((item, idx) => (
                            <div key={idx} style={{
                                borderBottom: '1px dashed #eee',
                                padding: '6px 0',
                                color: '#555'
                            }}>
                                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{item.time}</span>
                                {item.title}
                            </div>
                        ))
                    ) : (
                        <div style={{ color: '#999', textAlign: 'center', padding: '10px' }}>
                            {calendarId ? '予定はありません' : 'カレンダーIDが未設定です'}
                            <div style={{ fontSize: '0.7rem', marginTop: '5px' }}>
                                {calendarId ? calendarId : '右上の「設定」からIDを入力'}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* Wooden stand effect */}
            <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: '10%',
                width: '80%',
                height: '8px',
                background: '#5d4037',
                borderRadius: '0 0 4px 4px'
            }} />
        </motion.div>
    );
};

export default Calendar;
