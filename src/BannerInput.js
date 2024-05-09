import React, { Component } from 'react';
import parse_color from 'parse-css-color';

import { BannerDisplay } from './BannerDisplay';
import { colors as banner_colors, color_to_key, key_to_color, key_to_patterns, modifier_keys, pattern_to_str, modifier_to_idx } from './banner_standard';
import { blank_banner, count_banners, count_pieces, remove_last_piece, split_banners, split_pieces } from './banner_lib';

const BACKSPACE_KEYCODE = 8;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;

const get_active_modifier = modifiers => {
    if (modifiers.length == 0) return '';
    return modifiers[0];
}

const apply_backspace = (banners_string, idx) => {
    const banners = split_banners(banners_string);

    if (count_pieces(banners[idx]) == 1) {
        if (banners.length == 1) {
            return blank_banner();
        }
        else {
            banners.splice(idx, 1);
            return banners.join('.');
        }
    }
    else {
        banners[idx] = remove_last_piece(banners[idx]);
        return banners.join('.');
    }
}

const add_piece = (banners_string, idx, pattern) => {
    const banners = split_banners(banners_string);
    banners[idx] += pattern;
    return banners.join('.');
}

function load_image(img_src) {
    return new Promise(resolve => {
        const img = new Image();
        img.src = img_src;
        img.onload = resolve(img);
    });
}

async function tint_img(img_src, r, g, b) {
    const img = await load_image(img_src);

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    const pixels = ctx.getImageData(0, 0, img.width, img.height);
    const data = pixels.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i    ] = data[i    ] * r / 255;
        data[i + 1] = data[i + 1] * g / 255;
        data[i + 2] = data[i + 2] * b / 255;
        data[i + 3] = data[i + 3];
    }

    ctx.putImageData(pixels, 0, 0);
    return canvas.toDataURL();
}

function generate_tinted_pattern_image(piece) {
    var modifier_code = 0;
    var read_offset = 0;
    if (modifier_keys.includes(piece.substring(0, 1))) {
        modifier_code = 1 + modifier_keys.indexOf(piece.substring(0, 1));
        read_offset = 1;
    }

    const pattern = key_to_patterns(piece.substring(read_offset, read_offset + 1))[modifier_code];
    const color = key_to_color(piece.substring(read_offset + 1, read_offset + 2));

    const parsed_color = parse_color(banner_colors[color]);

    return tint_img(
        require(`../res/banners/${pattern}.png`),
        parsed_color.values[0],
        parsed_color.values[1],
        parsed_color.values[2]);
}

async function generate_image(banners_string, scale) {
    const banners = split_banners(banners_string);

    const canvas = document.createElement('canvas');
    canvas.width = ((20 + 2) * banners.length - 2) * scale;
    canvas.height = 40 * scale;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    await Promise.all(banners.map(async (banner, idx) => {
        const pieces = split_pieces(banner);
        const imgs = await Promise.all(pieces.map(p => generate_tinted_pattern_image(p).then(load_image)));
        imgs.map(img => {
            ctx.drawImage(img, idx * (20 + 2) * scale, 0, img.width * scale, img.height * scale);
        });
    }));

    return canvas.toDataURL();
}

class BannerInput extends Component {

    constructor() {
        super();
        this.state = {
            banners_string: blank_banner(),
            out_image: null,
        };
    }

    render() {
        const { banners_string, out_image } = this.state;
        const {
            current_color,
            on_current_color,
            modifiers,
            on_modifiers,
            index,
            on_index,
        } = this.props;

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
                            on_modifiers([
                                evt.key,
                                ...modifiers,
                            ]);
                        }
                    }

                    const maybe_color = key_to_color(evt.key);
                    if (maybe_color !== undefined) {
                        on_current_color(maybe_color);
                    }

                    const maybe_patterns = key_to_patterns(evt.key);
                    if (maybe_patterns !== undefined) {
                        const modifier = get_active_modifier(modifiers);
                        const mod_idx = modifier_to_idx(modifier);

                        const piece = get_active_modifier(modifiers) + evt.key + color_to_key(current_color);
                        
                        if (maybe_patterns[mod_idx] !== null) {
                            this.setState({
                                ...this.state,
                                banners_string: add_piece(banners_string, index, piece),
                            });
                        }
                    }

                    if (evt.key == '.') {
                        this.setState({
                            ...this.state,
                            banners_string: banners_string + evt.key + blank_banner(),
                        });

                        on_index(index + 1);
                    }

                    if (evt.keyCode == BACKSPACE_KEYCODE) {
                        const count_before = count_banners(banners_string);
                        const after = apply_backspace(banners_string, index);
                        const count_after = count_banners(after);

                        this.setState({
                            ...this.state,
                            banners_string: after,
                        });

                        if (count_after < count_before && index > 0) {
                            on_index(index - 1);
                        }
                    }

                    if (evt.keyCode == LEFT_ARROW_KEYCODE) {
                        if (index > 0) {
                            on_index(index - 1);
                        }
                    }

                    if (evt.keyCode == RIGHT_ARROW_KEYCODE) {
                        if (index < count - 1) {
                            on_index(index + 1);
                        }
                    }
                }} onKeyUp={evt => {
                    if (modifier_keys.includes(evt.key)) {
                        on_modifiers(modifiers.filter(modifier => modifier != evt.key));
                    }
                }}
                value=""/>
                {banner_strings.map((s, idx) => {
                    var banner = 
                        <BannerDisplay
                        key={idx}
                        banner_string={s}
                        color={current_color}/>;

                    if (idx == index) {
                        banner = <div key={idx}>
                            <BannerDisplay
                            banner_string={s}
                            color={current_color}/>
                            <div className="blink" style={{
                                backgroundColor: 'black',
                                marginTop: 4,
                                height: 5,
                            }}/>
                        </div>;
                    }

                    return banner;
                })}
            </div>
            <button onClick={async () => {
                const img_src = await generate_image(banners_string, 2);

                try {
                    fetch(img_src)
                    .then(res => res.blob())
                    .then(blob => {
                        navigator.clipboard.write([
                            new ClipboardItem({
                                'image/png': blob,
                            })
                        ]);
                    });
                } catch (error) {
                    console.error(error);
                }
            }}>copy image</button>
            {out_image != null ? 
            <img src={out_image} style={{
                imageRendering: 'pixelated',
            }}/> :
            null}
        </div>
    }

}

export { BannerInput };