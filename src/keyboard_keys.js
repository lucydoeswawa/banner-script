import { key_to_patterns, key_to_color } from './banner_standard';

const num_row = [
    {
        label: '1',
        type: 'modifier',
    },
    {
        label: '2',
        type: 'modifier',
    },
    {
        label: '3',
        type: 'modifier',
    },
    {
        label: '',
    },
    {
        label: '',
    },
    {
        label: '',
    },
    {
        label: '',
    },
    {
        label: '8',
        type: 'color',
        color: key_to_color('8'),
    },
    {
        label: '9',
        type: 'color',
        color: key_to_color('9'),
    },
    {
        label: '0',
        type: 'color',
        color: key_to_color('0'),
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
        patterns: key_to_patterns('q'),
    },
    {
        label: 'W',
        type: 'pattern',
        patterns: key_to_patterns('w'),
    },
    {
        label: 'E',
        type: 'pattern',
        patterns: key_to_patterns('e'),
    },
    {
        label: 'R',
        type: 'pattern',
        patterns: key_to_patterns('r'),
    },
    {
        label: 'T',
        type: 'pattern',
        patterns: key_to_patterns('t'),
    },
    {
        label: 'Y',
        type: 'color',
        color: key_to_color('y'),
    },
    {
        label: 'U',
        type: 'color',
        color: key_to_color('u'),
    },
    {
        label: 'I',
        type: 'color',
        color: key_to_color('i'),
    },
    {
        label: 'O',
        type: 'color',
        color: key_to_color('o'),
    },
    {
        label: 'P',
        type: 'color',
        color: key_to_color('p'),
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
        patterns: key_to_patterns('a'),
    },
    {
        label: 'S',
        type: 'pattern',
        patterns: key_to_patterns('s'),
    },
    {
        label: 'D',
        type: 'pattern',
        patterns: key_to_patterns('d'),
    },
    {
        label: 'F',
        type: 'pattern',
        patterns: key_to_patterns('f'),
    },
    {
        label: 'G',
        type: 'color',
        color: key_to_color('g'),
    },
    {
        label: 'H',
        type: 'color',
        color: key_to_color('h'),
    },
    {
        label: 'J',
        type: 'color',
        color: key_to_color('j'),
    },
    {
        label: 'K',
        type: 'color',
        color: key_to_color('k'),
    },
    {
        label: 'L',
        type: 'color',
        color: key_to_color('l'),
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
        patterns: key_to_patterns('z'),
    },
    {
        label: 'X',
        type: 'pattern',
        patterns: key_to_patterns('x'),
    },
    {
        label: 'C',
        type: 'pattern',
        patterns: key_to_patterns('c'),
    },
    {
        label: 'V',
        type: 'pattern',
        patterns: key_to_patterns('v'),
    },
    {
        label: 'B',
        type: 'color',
        color: key_to_color('b'),
    },
    {
        label: 'N',
        type: 'color',
        color: key_to_color('n'),
    },
    {
        label: 'M',
        type: 'color',
        color: key_to_color('m'),
    },
    {
        label: '.',
        type: 'modifier',
    },
];

const rows = [num_row, q_row, a_row, z_row];

export { rows };