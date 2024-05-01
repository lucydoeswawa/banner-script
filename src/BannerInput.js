import React, { Component } from 'react';

import { BannerDisplay } from './BannerDisplay';
import { color_to_key, key_to_color, key_to_patterns, modifier_keys, pattern_to_str, modifier_to_idx } from './banner_standard';
import { blank_banner, count_banners, count_pieces, remove_last_piece, split_banners } from './banner_lib';

const BACKSPACE_KEYCODE = 8;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;

const get_active_modifier = modifiers => {
    if (modifiers.length == 0) return '';
    return modifiers[0];
}

const apply_backspace = banners_string => {
    const banners = split_banners(banners_string);
    const last_banner = banners[banners.length - 1];

    if (count_pieces(last_banner) == 1) {
        if (banners.length == 1) {
            return blank_banner();
        }
        else {
            return banners.slice(0, banners.length - 1).join('.');
        }
    }
    else {
        return banners.slice(0, banners.length - 1).join('.') + '.' + remove_last_piece(last_banner);
    }
}

class BannerInput extends Component {

    constructor() {
        super();
        this.state = {
            banners_string: blank_banner(),
        };
    }

    render() {
        const { banners_string } = this.state;
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

        return <div style={{
            width: 500,
            height: 120,
            margin: 20,
            display: 'flex',
            flexDirection: 'row',
        }}>
            <input style={{
                border: 'none',
                width: 500,
                height: 120,
                fontSize: 40,
                borderBottom: '2px solid black',
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
                    
                    if (maybe_patterns[mod_idx] !== null) {
                        this.setState({
                            ...this.state,
                            banners_string: banners_string + get_active_modifier(modifiers) + evt.key + color_to_key(current_color),
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
                    const after = apply_backspace(banners_string);
                    const count_after = count_banners(after);

                    this.setState({
                        ...this.state,
                        banners_string: after,
                    });

                    if (count_after < count_before) {
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
                            backgroundColor: 'white',
                            marginTop: 4,
                            height: 5,
                        }}/>
                    </div>;
                }

                return banner;
            })}
        </div>
    }

}

export { BannerInput };