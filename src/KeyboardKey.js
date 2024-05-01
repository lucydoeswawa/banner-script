import React from 'react';

import { colors as banner_colors, color_filters } from './banner_standard';

const colorFilters = [
    'brightness(0) saturate(100%) invert(27%) sepia(16%) saturate(3328%) hue-rotate(319deg) brightness(98%) contrast(97%)',
    'brightness(0) saturate(100%) invert(95%) sepia(48%) saturate(5901%) hue-rotate(336deg) brightness(115%) contrast(80%)',
];

function KeyboardKey(config) {
    if (config.type == 'pattern')
        return PatternKey(config);

    if (config.type == 'color')
        return ColorKey(config);

    if (config.type == 'modifier')
        return ModifierKey(config);

    const width = (config.width || 1.) * 80.;
    
    return <div style={{
        width,
        height: 80,
        margin: 4,
        fontSize: 16,
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
    const color = config.current_color;

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
            {config.patterns[0] ? patternImage(config.patterns[0], color) : null}
            {config.patterns[1] ? patternImage(config.patterns[1], color) : null}
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
            {config.patterns[2] ? patternImage(config.patterns[2], color) : null}
            {config.patterns[3] ? patternImage(config.patterns[3], color) : null}
        </div>
    </div>;
}

function ColorKey(config) {
    return <div style={{
        width: 80,
        height: 80,
        border: '1px solid white',
        display: 'flex',
        color: 'white',
        margin: 4,
    }}>
        <div style={{
            backgroundColor: banner_colors[config.color],
            height: 60,
            width: 60,
            marginLeft: 10,
            marginTop: 10,
        }}>
            <div style={{
                backgroundColor: 'black',
                height: 40,
                width: 40,
                marginLeft: 10,
                marginTop: 10,
                alignItems: 'center',
                display: 'flex',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    marginTop: 3,
                    fontSize: 30,
                }}>
                    {config.label}
                </div>
            </div>
        </div>
    </div>;
}

function ModifierKey(config) {
    return <div style={{
        width: 80,
        height: 80,
        border: '1px solid white',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        margin: 4,
    }}>
        <div style={{
            width: 80,
            textAlign: 'center',
            marginLeft: 5,
            marginTop: 3,
            fontSize: 30,
        }}>
            {config.label}
        </div>
    </div>;
}

function patternImage(name, color) {
    return <img src={require(`../res/banners/${name}.png`)} style={{
        filter: color_filters[color],
        imageRendering: 'pixelated',
    }}/>;
}

export { KeyboardKey };