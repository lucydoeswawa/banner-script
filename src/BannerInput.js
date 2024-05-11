import React, { Component } from 'react';

import { BannerDisplay } from './BannerDisplay';
import { colors as banner_colors, color_to_key, key_to_color, key_to_patterns, modifier_keys, pattern_to_str, modifier_to_idx } from './banner_standard';
import { blank_banner, count_banners, count_pieces, remove_last_piece, split_banners, split_pieces, decode_piece } from './banner_lib';

const BACKSPACE_KEYCODE = 8;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;

const get_active_modifier = modifiers => {
    if (modifiers.length == 0) return '';
    return modifiers[0];
}

const apply_backspace = (banners_string, idx) => {
    const banners = split_banners(banners_string);

    if (idx == -1) return banners_string;

    if (count_pieces(banners[idx]) == 1) {
        banners.splice(idx, 1);
        return banners.join('');
    }
    else {
        banners[idx] = remove_last_piece(banners[idx]);
        return banners.join('');
    }
}

const add_piece = (banners_string, idx, piece) => {
    const banners = split_banners(banners_string);

    if (idx == -1) {
        const decoding = decode_piece(piece);
        const pattern = decoding[3];
        
        if (pattern == 'base') return piece + banners_string;
        else return blank_banner() + piece + banners_string;
    }

    banners[idx] += piece;
    return banners.join('');
}

class BannerInput extends Component {

    constructor() {
        super();
    }

    render() {
        const {
            current_color,
            modifiers,
            index,
            value,
            on_change,
        } = this.props;

        const banners_string = value;
        const banner_strings = split_banners(banners_string);
        const count = count_banners(banners_string);

        return <div>
            <div style={{
                width: 60 * 14,
                height: 120,
                margin: 20,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#242424',
            }}>
                <input ref={ref => {
                    if (ref != null)
                        ref.focus();
                }}
                onBlur={evt => {
                    setTimeout(() => {
                        evt.target.focus();
                    }, 20);
                }}
                style={{
                    border: 'none',
                    outline: 'none',
                    width: 60 * 14,
                    height: 120,
                    fontSize: 40,
                    position: 'absolute',
                    background: 'none',
                }} onPaste={evt => {
                    /* const pasted = evt.clipboardData.getData("Text") */
                }} onKeyDown={evt=> {
                    if (modifier_keys.includes(evt.key)) {
                        if (!modifiers.includes(evt.key)) {
                            on_change({
                                modifiers: [
                                    evt.key,
                                    ...modifiers,
                                ]
                            });
                        }
                    }

                    const maybe_color = key_to_color(evt.key);
                    if (maybe_color !== undefined) {
                        on_change({ current_color: maybe_color });
                    }

                    const maybe_patterns = key_to_patterns(evt.key);
                    if (maybe_patterns !== undefined) {
                        const modifier = get_active_modifier(modifiers);
                        const mod_idx = modifier_to_idx(modifier);
                        const piece = get_active_modifier(modifiers) + evt.key + color_to_key(current_color);
                        
                        if (maybe_patterns[mod_idx] !== null) {
                            const count_before = count_banners(banners_string);
                            const after = add_piece(banners_string, index, piece);
                            const count_after = count_banners(after);

                            const change = {value: after};
                            if (count_after > count_before) {
                                change.index = index + 1;
                            }
                            on_change(change);
                        }
                    }

                    if (evt.key == '.') {
                        on_change({
                            value: add_piece(banners_string, index, blank_banner()),
                            index: index + 1,
                        });
                    }

                    if (evt.keyCode == BACKSPACE_KEYCODE) {
                        const count_before = count_banners(banners_string);
                        const after = apply_backspace(banners_string, index);
                        const count_after = count_banners(after);

                        const change = { value: after };
                        if (count_after < count_before && index >= 0) {
                            change.index = index - 1;
                        }
                        on_change(change);
                    }

                    if (evt.keyCode == LEFT_ARROW_KEYCODE) {
                        if (index >= 0) {
                            on_change({ index: index - 1 });
                        }
                    }

                    if (evt.keyCode == RIGHT_ARROW_KEYCODE) {
                        if (index < count - 1) {
                            on_change({ index: index + 1 });
                        }
                    }
                }} onKeyUp={evt => {
                    if (modifier_keys.includes(evt.key)) {
                        on_change({
                            modifiers: modifiers.filter(modi => modi != evt.key),
                        });
                    }
                }}
                value=""/>
                {banner_strings.map((s, idx) => {
                    const position_style = {
                        position: 'absolute',
                        marginTop: 0,
                        marginLeft: (20 + 2) * 3 * idx,
                    };

                    return <BannerDisplay
                        key={idx}
                        banner_string={s}
                        color={current_color}
                        style={position_style}/>;
                })}
                <div className="blink" style={{
                    position: 'absolute',
                    marginLeft: (20 + 2) * 3 * (index + 1) - 2 * 3,
                    height: 120,
                    width: 2 * 3,
                    backgroundColor: banner_colors[8],
                }}></div>
            </div>
        </div>
    }

}

export { BannerInput };