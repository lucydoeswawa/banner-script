const colors = [
    '#FFFFFF', // 0  white
    '#D87F33', // 1  orange
    '#B24CD8', // 2  magenta
    '#6699D8', // 3  light blue
    '#E5E533', // 4  yellow
    '#7FCC19', // 5  lime
    '#F27FA5', // 6  pink
    '#4C4C4C', // 7  gray
    '#999999', // 8  light gray
    '#4C7F99', // 9  cyan
    '#7F3FB2', // 10 purple
    '#334CB2', // 11 blue
    '#664C33', // 12 brown
    '#667F33', // 13 green
    '#993333', // 14 red
    '#191919', // 15 black
];

const color_filters = [
    '',
    'brightness(0) saturate(100%) invert(72%) sepia(61%) saturate(3494%) hue-rotate(340deg) brightness(91%) contrast(84%)',
    'brightness(0) saturate(100%) invert(52%) sepia(91%) saturate(4215%) hue-rotate(256deg) brightness(88%) contrast(91%)',
    'brightness(0) saturate(100%) invert(52%) sepia(100%) saturate(249%) hue-rotate(173deg) brightness(92%) contrast(88%)',
    'brightness(0) saturate(100%) invert(95%) sepia(48%) saturate(5901%) hue-rotate(336deg) brightness(115%) contrast(80%)',
    'brightness(0) saturate(100%) invert(76%) sepia(19%) saturate(3682%) hue-rotate(38deg) brightness(100%) contrast(80%)',
    'brightness(0) saturate(100%) invert(79%) sepia(43%) saturate(3580%) hue-rotate(295deg) brightness(99%) contrast(91%)',
    'brightness(0) saturate(100%) invert(23%) sepia(0%) saturate(1049%) hue-rotate(187deg) brightness(93%) contrast(71%)',
    'brightness(0) saturate(100%) invert(66%) sepia(33%) saturate(0%) hue-rotate(285deg) brightness(85%) contrast(97%)',
    'brightness(0) saturate(100%) invert(48%) sepia(6%) saturate(3290%) hue-rotate(156deg) brightness(94%) contrast(84%)',
    'brightness(0) saturate(100%) invert(28%) sepia(80%) saturate(1230%) hue-rotate(248deg) brightness(87%) contrast(91%)',
    'brightness(0) saturate(100%) invert(22%) sepia(82%) saturate(1995%) hue-rotate(219deg) brightness(87%) contrast(86%)',
    'brightness(0) saturate(100%) invert(29%) sepia(4%) saturate(6224%) hue-rotate(348deg) brightness(85%) contrast(76%)',
    'brightness(0) saturate(100%) invert(42%) sepia(80%) saturate(299%) hue-rotate(38deg) brightness(92%) contrast(91%)',
    'brightness(0) saturate(100%) invert(27%) sepia(16%) saturate(3328%) hue-rotate(319deg) brightness(98%) contrast(97%)',
    'brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(4467%) hue-rotate(355deg) brightness(99%) contrast(80%)',
];

const modifier_keys = ['1', '2', '3'];

const idx_to_modifier = idx => {
    if (idx == 0) return '';
    return modifier_keys[idx - 1];
}

const modifier_to_idx = modifier => {
    if (modifier == '') return 0;
    return modifier_keys.indexOf(modifier) + 1;
}

const patterns = {
    'q': ['base', null, null, null],
    'w': ['border', null, 'curly_border', null],
    'e': ['half_horizontal', 'half_horizontal_bottom', 'half_vertical', 'half_vertical_right'],
    'r': ['stripe_top', 'stripe_bottom', 'stripe_left', 'stripe_right'],
    't': ['stripe_center', 'stripe_downleft', 'stripe_middle', 'stripe_downright'],
    
    'a': ['triangles_top', 'triangles_bottom', null, null],
    's': ['triangle_top', 'triangle_bottom', null, null],
    'd': ['straight_cross', 'cross', 'small_stripes', null],
    'f': ['square_top_left', 'square_bottom_left', 'square_top_right', 'square_bottom_right'],

    'z': ['creeper', 'piglin', 'skull', 'mojang'],
    'x': ['circle', 'flower', 'rhombus', 'globe'],
    'c': ['bricks', null, 'gradient', 'gradient_up'],
    'v': ['diagonal_left', 'diagonal_up_left', 'diagonal_right', 'diagonal_up_right'],
};

const patterns_inverted = {};
Object.keys(patterns).map(key => {
    patterns[key].map((pattern, idx) => {
        if (pattern !== null) {
            patterns_inverted[pattern] = idx_to_modifier(idx) + key;
        }
    });
});

const key_to_patterns = key => patterns[key];
const pattern_to_str = pattern => patterns_inverted[pattern];

const key_color_mapping = {
    '8': 0,
    '9': 8,
    '0': 7,
    'y': 14,
    'u': 1,
    'i': 4,
    'o': 13,
    'p': 5,
    'g': 9,
    'h': 11,
    'j': 3,
    'k': 10,
    'l': 2,
    'b': 6,
    'n': 12,
    'm': 15,
}

const color_key_mapping = new Array(16);
Object.keys(key_color_mapping).map(key => {
    color_key_mapping[key_color_mapping[key]] = key;
})

const key_to_color = key => key_color_mapping[key];
const color_to_key = color => color_key_mapping[color];

export {
    colors,
    color_filters,
    key_to_patterns,
    pattern_to_str,
    color_to_key,
    key_to_color,
    modifier_keys,
    modifier_to_idx,
    idx_to_modifier,
};