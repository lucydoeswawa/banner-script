import React from 'react';

import { colors as banner_colors, color_filters } from './banner_standard';

const colorFilters = [
    'brightness(0) saturate(100%) invert(27%) sepia(16%) saturate(3328%) hue-rotate(319deg) brightness(98%) contrast(97%)',
    'brightness(0) saturate(100%) invert(95%) sepia(48%) saturate(5901%) hue-rotate(336deg) brightness(115%) contrast(80%)',
];

const KEYCAP_BLACK = '#000000';
const KEYCAP_GRAY = '#bfbfbf';
const KEYCAP_LIGHT_GRAY = '#e5e5e5';
const KEYCAP_DARK_GRAY = '#808080';
const KEYCAP_WHITE = '#ffffff';

const KEYCAP_DEPTH = 20;

function KeyBase({ keycap_height, keycap_width, crosshair }) {
    const keycap_height_half = keycap_height / 2;
    const keycap_width_half = keycap_width / 2;
    const bars_width = 2;
    const bars_gap = 4;
    const bars_gap_half = bars_gap / 2;
    const exterior_thick = 4;
    const border_thick = 2;

    return <div style={{
        margin: 4,
        height: keycap_height,
        width: keycap_width,
    }}>
        <div style={{
            height: keycap_height + border_thick + KEYCAP_DEPTH,
            width: keycap_width,
            marginTop: 0,
            marginLeft: 0,
            border: `${border_thick}px solid ${KEYCAP_BLACK}`,
        }}>
            <div style={{
                position: 'absolute',
                height: keycap_height,
                width: keycap_width,
                marginLeft: 0,
                marginTop: 0,
                backgroundColor: KEYCAP_GRAY,
            }}></div>

            {crosshair ? [<div style={{
                position: 'absolute',
                marginTop: 0,
                marginLeft: keycap_width_half - bars_width - bars_gap_half,
                height: keycap_height,
                width: bars_width,
                backgroundColor: KEYCAP_WHITE,
            }}></div>,
            <div style={{
                position: 'absolute',
                marginTop: 0,
                marginLeft: keycap_width_half + bars_gap_half,
                height: keycap_height,
                width: bars_width,
                backgroundColor: KEYCAP_WHITE,
            }}></div>,
            <div style={{
                position: 'absolute',
                marginTop: keycap_height_half - bars_width - bars_gap_half,
                marginLeft: 0,
                height: bars_width,
                width: keycap_width,
                backgroundColor: KEYCAP_WHITE,
            }}></div>,
            <div style={{
                position: 'absolute',
                marginTop: keycap_height_half + bars_gap_half,
                marginLeft: 0,
                height: bars_width,
                width: keycap_width,
                backgroundColor: KEYCAP_WHITE,
            }}></div>]
            : null}

            <div style={{
                position: 'absolute',
                marginTop: exterior_thick,
                marginLeft: exterior_thick,
                height: keycap_height - exterior_thick * 2,
                width: keycap_width - exterior_thick * 2,
                backgroundColor: KEYCAP_WHITE,
            }}></div>

            { crosshair ? 
                [<div style={{
                    position: 'absolute',
                    marginTop: exterior_thick,
                    marginLeft: keycap_width_half - bars_gap_half,
                    height: keycap_height - exterior_thick * 2,
                    width: bars_gap,
                    backgroundColor: KEYCAP_LIGHT_GRAY,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height_half - bars_gap_half,
                    marginLeft: exterior_thick,
                    height: bars_gap,
                    width: keycap_width - exterior_thick * 2,
                    backgroundColor: KEYCAP_LIGHT_GRAY,
                }}></div>]
            : null}

            <div style={{
                position: 'absolute',
                marginTop: keycap_height + 2,
                marginLeft: -2,
                height: 20,
                width: keycap_width + 4,
                backgroundColor: KEYCAP_BLACK,
                zIndex: -1,
            }}></div>

            <div style={{
                position: 'absolute',
                marginTop: keycap_height,
                marginLeft: 0,
                height: border_thick,
                width: keycap_width,
                backgroundColor: KEYCAP_BLACK,
            }}></div>
            <div style={{
                position: 'absolute',
                marginTop: keycap_height + border_thick,
                marginLeft: 0,
                height: KEYCAP_DEPTH,
                width: keycap_width,
                backgroundColor: KEYCAP_DARK_GRAY,
                zIndex: -1,
            }}></div>

            {crosshair ? [
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick,
                    marginLeft: keycap_width_half - bars_width - bars_gap_half,
                    height: KEYCAP_DEPTH,
                    width: bars_width,
                    backgroundColor: KEYCAP_LIGHT_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick,
                    marginLeft: keycap_width_half + bars_gap_half,
                    height: KEYCAP_DEPTH,
                    width: bars_width,
                    backgroundColor: KEYCAP_LIGHT_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick + KEYCAP_DEPTH / 2 - bars_width - bars_gap_half,
                    marginLeft: 0,
                    height: bars_width,
                    width: keycap_width,
                    backgroundColor: KEYCAP_LIGHT_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick + KEYCAP_DEPTH / 2 + bars_gap_half,
                    marginLeft: 0,
                    height: bars_width,
                    width: keycap_width,
                    backgroundColor: KEYCAP_LIGHT_GRAY,
                    zIndex: -1,
                }}></div>
            ] : null}

            <div style={{
                position: 'absolute',
                marginTop: keycap_height + border_thick + exterior_thick,
                marginLeft: exterior_thick,
                height: KEYCAP_DEPTH - exterior_thick * 2,
                width: keycap_width - exterior_thick * 2,
                backgroundColor: KEYCAP_LIGHT_GRAY,
                zIndex: -1,
            }}></div>

            {crosshair ? [
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick + KEYCAP_DEPTH / 2 - bars_gap_half,
                    marginLeft: exterior_thick,
                    height: bars_gap,
                    width: keycap_width - exterior_thick * 2,
                    backgroundColor: KEYCAP_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick + exterior_thick,
                    marginLeft: keycap_width_half - bars_gap_half,
                    height: KEYCAP_DEPTH - exterior_thick * 2,
                    width: bars_gap,
                    backgroundColor: KEYCAP_GRAY,
                    zIndex: -1,
                }}></div>
            ] : null}
        </div>;
    </div>;
}

function KeyboardKey(config) {
    if (config.type == 'pattern')
        return PatternKey(config);

    if (config.type == 'color')
        return ColorKey(config);

    if (config.type == 'modifier')
        return ModifierKey(config);

    const width = (config.width || 1.) * 80.;

    return KeyBase({
        keycap_height: 80,
        keycap_width: 80. * (config.width || 1),
        crosshair: false,
    });
    
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
    return KeyBase({
        keycap_width: 80,
        keycap_height: 80,
        crosshair: true,
    });

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
    return KeyBase({
        keycap_width: 80,
        keycap_height: 80,
        crosshair: true,
    });

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