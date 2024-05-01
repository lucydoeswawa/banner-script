const num_row = [
    {
        label: '1',
    },
    {
        label: '2',
    },
    {
        label: '3',
    },
    {
        label: '4',
    },
    {
        label: '5',
    },
    {
        label: '6',
    },
    {
        label: '7',
    },
    {
        label: '8',
    },
    {
        label: '9',
    },
    {
        label: '0',
    },
];

const q_row = [
    {
        label: '',
        width: 0.5,
    },
    {
        label: 'Q',
        type: 'pattern',
        patterns: ['base'],
    },
    {
        label: 'W',
        type: 'pattern',
        patterns: ['border', null, 'curly_border'],
    },
    {
        label: 'E',
        type: 'pattern',
        patterns: ['half_horizontal', 'half_horizontal_bottom', 'half_vertical', 'half_vertical_right'],
    },
    {
        label: 'R',
        type: 'pattern',
        patterns: ['stripe_top', 'stripe_bottom', 'stripe_left', 'stripe_right'],
    },
    {
        label: 'T',
        type: 'pattern',
        patterns: ['stripe_center', 'stripe_downleft', 'stripe_middle', 'stripe_downright'],
    },
    {
        label: 'y',
    },
    {
        label: 'u',
    },
    {
        label: 'i',
    },
    {
        label: 'o',
    },
    {
        label: 'p',
    },
];

const a_row = [
    {
        label: '',
        width: 1.0,
    },
    {
        label: 'A',
        type: 'pattern',
        patterns: ['triangles_top', 'triangles_bottom'],
    },
    {
        label: 'S',
        type: 'pattern',
        patterns: ['triangle_top', 'triangle_bottom'],
    },
    {
        label: 'D',
        type: 'pattern',
        patterns: ['straight_cross', 'cross', 'small_stripes'],
    },
    {
        label: 'F',
        type: 'pattern',
        patterns: ['square_top_left', 'square_bottom_left', 'square_top_right', 'square_bottom_right'],
    },
    {
        label: 'g',
    },
    {
        label: 'h',
    },
    {
        label: 'j',
    },
    {
        label: 'k',
    },
    {
        label: 'l',
    },
];

const z_row = [
    {
        label: '',
        width: 1.5,
    },
    {
        label: 'Z',
        type: 'pattern',
        patterns: ['creeper', 'piglin', 'skull', 'mojang'],
    },
    {
        label: 'X',
        type: 'pattern',
        patterns: ['circle', 'flower', 'rhombus', 'globe'],
    },
    {
        label: 'c',
        type: 'pattern',
        patterns: ['bricks', 'gradient_up', 'gradient'],
    },
    {
        label: 'v',
        type: 'pattern',
        patterns: ['diagonal_left', 'diagonal_up_left', 'diagonal_right', 'diagonal_up_right'],
    },
    {
        label: 'b',
    },
    {
        label: 'n',
    },
    {
        label: 'm',
    },
];

const rows = [num_row, q_row, a_row, z_row];

export { rows };