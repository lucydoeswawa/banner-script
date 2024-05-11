import { color_to_key, modifier_keys, pattern_to_str, key_to_patterns, key_to_color } from "./banner_standard";

function split_banners(banners_string) {
    const all_pieces = split_pieces(banners_string);
    const banners_out = [];

    var last_banner_end = all_pieces.length;
    for (var i = all_pieces.length - 1; i >= 0; i--) {
        const decoding = decode_piece(all_pieces[i]);
        if (decoding[3] == 'base') {
            banners_out.push(all_pieces.slice(i, last_banner_end).join(''));
            last_banner_end = i;
        }
    }

    return banners_out.reverse();
}

function count_banners(banners_string) {
    return split_banners(banners_string).length;
}

function split_pieces(data_string) {
    const split = [];
    var idx = 0;
    while (idx < data_string.length) {
        const len = 
            modifier_keys.includes(data_string.substring(idx, idx + 1))
            ? 3 : 2;
        split.push(data_string.substring(idx, idx + len));
        idx += len;
    }
    return split;
}

function count_pieces(banner_string) {
    return split_pieces(banner_string).length;
}

function remove_last_piece(banner_string) {
    const pieces = split_pieces(banner_string);
    return pieces.slice(0, pieces.length - 1).join('');
}

function blank_banner() {
    return pattern_to_str("base") + color_to_key(0);
}

function decode_piece(piece) {
    var modifier_code = 0;
    var read_offset = 0;
    if (modifier_keys.includes(piece.substring(0, 1))) {
        modifier_code = 1 + modifier_keys.indexOf(piece.substring(0, 1));
        read_offset = 1;
    }

    const pattern_key = piece.substring(read_offset, read_offset + 1);
    const color_key = piece.substring(read_offset + 1, read_offset + 2);

    const pattern = key_to_patterns(piece.substring(read_offset, read_offset + 1))[modifier_code];
    const color = key_to_color(piece.substring(read_offset + 1, read_offset + 2));

    return [modifier_code, pattern_key, color_key, pattern, color];
}

export {
    split_pieces,
    count_pieces,
    remove_last_piece,
    blank_banner,
    split_banners,
    count_banners,
    decode_piece,
};