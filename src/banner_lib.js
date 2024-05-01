import { color_to_key, modifier_keys, pattern_to_str } from "./banner_standard";

function split_banners(banners_string) {
    return banners_string.split('.').filter(v => v != '');
}

function split_pieces(banner_string) {
    const split = [];
    var idx = 0;
    while (idx < banner_string.length) {
        const len = 
            modifier_keys.includes(banner_string.substring(idx, idx + 1))
            ? 3 : 2;
        split.push(banner_string.substring(idx, idx + len));
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

export {
    split_pieces,
    count_pieces,
    remove_last_piece,
    blank_banner,
    split_banners
};