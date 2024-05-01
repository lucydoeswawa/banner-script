import React from 'react';

const colorFilters = [
    'brightness(0) saturate(100%) invert(27%) sepia(16%) saturate(3328%) hue-rotate(319deg) brightness(98%) contrast(97%)',
    'brightness(0) saturate(100%) invert(95%) sepia(48%) saturate(5901%) hue-rotate(336deg) brightness(115%) contrast(80%)',
];

function KeyboardKey(config) {
    if (config.type == 'pattern')
        return PatternKey(config);

    const width = (config.width || 1.) * 80.;
    
    return <div style={{
        width,
        height: 80,
        margin: 4,
        fontSize: 24,
        textAlign: 'center',
        border: '1px solid white',
        display: 'flex',
        color: 'white',
    }}>
        <p style={{
            flexGrow: 1,
        }}>
        {config.label}
        </p>
    </div>;
}

function PatternKey(config) {
    return <div style={{
        width: 80,
        height: 80,
        border: '1px solid white',
        // boxSizing: 'border-box',
        display: 'flex',
        color: 'white',
        margin: 4,
    }}>
        <div style={{
            width: 20,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {config.patterns[0] ? patternImage(config.patterns[0], 0) : null}
            {config.patterns[1] ? patternImage(config.patterns[1], 0) : null}
        </div>
        <div style={{
            flexGrow: 1,
            fontSize: 30,
            alignSelf: 'center',
            textAlign: 'center',
            flexDirection: 'row',
        }}>
            <div style={{marginLeft: 3, marginTop: 2}}>
                {config.label}
            </div>
        </div>
        <div style={{
            width: 20,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {config.patterns[2] ? patternImage(config.patterns[2], 0) : null}
            {config.patterns[3] ? patternImage(config.patterns[3], 0) : null}
        </div>
    </div>;
}

function patternImage(name, color) {
    return <img src={require(`../res/banners/${name}.png`)} style={{
        filter: colorFilters[color],
        imageRendering: 'pixelated',
    }}/>;
}

export { KeyboardKey };