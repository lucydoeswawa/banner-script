import React from 'react';

import { colors as banner_colors, color_filters, modifier_to_idx } from './banner_standard';

const colorFilters = [
    'brightness(0) saturate(100%) invert(27%) sepia(16%) saturate(3328%) hue-rotate(319deg) brightness(98%) contrast(97%)',
    'brightness(0) saturate(100%) invert(95%) sepia(48%) saturate(5901%) hue-rotate(336deg) brightness(115%) contrast(80%)',
];

const KEYCAP_BLACK = '#000000';
const KEYCAP_GRAY = '#bfbfbf';
const KEYCAP_LIGHT_GRAY = '#e5e5e5';
const KEYCAP_LIGHTISH_GRAY = '#d4d4d4';
const KEYCAP_DARK_GRAY = '#808080';
const KEYCAP_WHITE = '#ffffff';

const KEYCAP_DEPTH = 24;

function KeyBase({ keycap_height, keycap_width, crosshair, children }) {
    const keycap_height_half = keycap_height / 2;
    const keycap_width_half = keycap_width / 2;
    const bars_width = 3;
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
                    backgroundColor: KEYCAP_LIGHTISH_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick,
                    marginLeft: keycap_width_half + bars_gap_half,
                    height: KEYCAP_DEPTH,
                    width: bars_width,
                    backgroundColor: KEYCAP_LIGHTISH_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick + KEYCAP_DEPTH / 2 - bars_width - bars_gap_half,
                    marginLeft: 0,
                    height: bars_width,
                    width: keycap_width,
                    backgroundColor: KEYCAP_LIGHTISH_GRAY,
                    zIndex: -1,
                }}></div>,
                <div style={{
                    position: 'absolute',
                    marginTop: keycap_height + border_thick + KEYCAP_DEPTH / 2 + bars_gap_half,
                    marginLeft: 0,
                    height: bars_width,
                    width: keycap_width,
                    backgroundColor: KEYCAP_LIGHTISH_GRAY,
                    zIndex: -1,
                }}></div>
            ] : null}

            <div style={{
                position: 'absolute',
                marginTop: keycap_height + border_thick + exterior_thick,
                marginLeft: exterior_thick,
                height: KEYCAP_DEPTH - exterior_thick * 2,
                width: keycap_width - exterior_thick * 2,
                backgroundColor: KEYCAP_LIGHTISH_GRAY,
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

            {children}
        </div>
    </div>;
}

function KeyboardKey(config) {
    if (config.type == 'pattern')
        return PatternKey(config);

    if (config.type == 'color')
        return ColorKey(config);

    if (config.type == 'modifier')
        return ModifierKey(config);

    if (config.type == 'plain')
        return PlainKey(config);

    const width = (config.width || 1.) * 80.;

    return <div style={{
        height: 80.,
        width: 80. * (config.width || 1.),
    }}>

    </div>

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

const PATTERN_FRAME_BORDER_THICK = 2;

const PATTERN_FRAME_COLOR_DEFAULT = "#E5E5E5";
const PATTERN_FRAME_COLOR_MOD1 = "#80C8DF";
const PATTERN_FRAME_COLOR_MOD2 = "#C77974";
const PATTERN_FRAME_COLOR_MOD3 = "#D38CCE";

const MODIFIER_COLORS = [
    "#E5E5E5",
    "#80C8DF",
    "#C77974",
    "#D38CCE",
];

const MODIFIER_ICONS = [
    null,
    'arrow_right',
    'arrow_down',
    'arrow_diag',
];

function PatternFrame({height, width, top, left, frame_color, pattern, color}) {
    return <div style={{
        position: 'absolute',
        height,
        width,
        marginTop: top,
        marginLeft: left,
        border: `${PATTERN_FRAME_BORDER_THICK}px solid ${frame_color}`,
        boxSizing: 'border-box',
    }}>
        {patternImage(pattern, color, height - 4, width - 4)}
    </div>;
}

function PatternKey(config) {
    return <KeyBase
        keycap_height={80}
        keycap_width={80}
        crosshair>
        {config.patterns[0] ? <PatternFrame
            top={2}
            left={20 - 10}
            width={19}
            height={38}
            frame_color={PATTERN_FRAME_COLOR_DEFAULT}
            pattern={config.patterns[0]}
            color={config.current_color}/> : null}
        {config.patterns[1] ? <PatternFrame
            top={2}
            left={40 + 20 - 10}
            width={19}
            height={38}
            frame_color={PATTERN_FRAME_COLOR_MOD1}
            pattern={config.patterns[1]}
            color={config.current_color}/> : null}
        {config.patterns[2] ? <PatternFrame
            top={40}
            left={20 - 10}
            width={19}
            height={38}
            frame_color={PATTERN_FRAME_COLOR_MOD2}
            pattern={config.patterns[2]}
            color={config.current_color}/> : null}
        {config.patterns[3] ? <PatternFrame
            top={40}
            left={40 + 20 - 10}
            width={19}
            height={38}
            frame_color={PATTERN_FRAME_COLOR_MOD3}
            pattern={config.patterns[3]}
            color={config.current_color}/> : null}
        <p style={{
            position: 'absolute',
            marginTop: 40 - 14,
            marginLeft: 40 - 14,
            fontSize: 28,
            }}>
            {config.label}
        </p>
    </KeyBase>;
}

function ColorKey(config) {
    const banner_color = banner_colors[config.color];

    const label_color = config.color == 0 ? KEYCAP_BLACK : KEYCAP_WHITE;

    return <KeyBase
        keycap_height={80}
        keycap_width={80}
        crosshair>
        <div style={{
            position: 'absolute',
            marginTop: 20,
            marginLeft: 20,
            width: 40,
            height: 40,
            backgroundColor: banner_color,
            border: `2px solid ${KEYCAP_BLACK}`,
            boxSizing: 'border-box',
        }}/>
        <p style={{
            position: 'absolute',
            marginTop: 40 - 14,
            marginLeft: 40 - 14,
            fontSize: 28,
            color: label_color,
            }}>
            {config.label}
        </p>
    </KeyBase>;
}

function ModifierKey(config) {
    const modifier_idx = modifier_to_idx(config.label);
    const icon = MODIFIER_ICONS[modifier_idx];

    return <KeyBase
        keycap_width={80}
        keycap_height={80}
        crosshair>
        <div style={{
            position: 'absolute',
            width: 66,
            height: 66,
            marginLeft: 7,
            marginTop: 7,
            border: `2px solid ${MODIFIER_COLORS[modifier_idx]}`,
            boxSizing: 'border-box',
        }}/>
        <img style={{
            position: 'absolute',
            width: 60,
            height: 60,
            marginLeft: 10,
            marginTop: 10,
            filter: 'brightness(2.4)',
            imageRendering: 'pixelated',
        }}
        src={require(`../res/icons/${icon}.png`)}/>
        <p style={{
            position: 'absolute',
            marginTop: 40 - 14,
            marginLeft: 40 - 14,
            fontSize: 28,
            }}>
            {config.label}
        </p>
    </KeyBase>;
}

function PlainKey(config) {
    return <KeyBase
        keycap_width={80}
        keycap_height={80}
        crosshair>
        <p style={{
            position: 'absolute',
            marginTop: 40 - 14,
            marginLeft: 40 - 14,
            fontSize: 28,
            }}>
            {config.label}
        </p>
        <p style={{
            position: 'absolute',
            marginTop: 10,
            marginLeft: 10,
            fontSize: 14,
            }}>
            {config.comment}
        </p>
    </KeyBase>;
}

function patternImage(name, color, height, width) {
    return <img src={require(`../res/banners/${name}.png`)} style={{
        position: 'absolute',
        filter: color_filters[color],
        height,
        width,
        // imageRendering: 'pixelated',
    }}/>;
}

export { KeyboardKey };