import React from 'react';

function KeyboardKey(config) {
    const width = (config.width || 1.) * 70.;
    
    return <div style={{
        width,
        height: 70,
        fontSize: 36,
        border: '2px solid black',
        boxSizing: 'border-box',
        display: 'flex',
    }}>{config.label}</div>;
}

export { KeyboardKey };