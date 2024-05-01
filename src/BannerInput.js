import React, { Component } from 'react';

import { BannerDisplay } from './BannerDisplay';
import { color_to_key, key_to_color, key_to_patterns, modifier_keys, pattern_to_str, modifier_to_idx } from './banner_standard';

const split_banners_string = banners_string =>
    banners_string.split('.').filter(v => v != '');

const get_active_modifier = modifiers => {
    if (modifiers.length == 0) return '';
    return modifiers[0];
}

class BannerInput extends Component {

    constructor() {
        super();
        this.state = {
            banners_string: '',
        };
    }

    render() {
        const { banners_string } = this.state;
        const {
            current_color,
            on_current_color,
            modifiers,
            on_modifiers,
        } = this.props;

        const banner_strings = split_banners_string(banners_string);

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
                        banners_string: banners_string + evt.key,
                    });
                }
            }} onKeyUp={evt => {
                if (modifier_keys.includes(evt.key)) {
                    on_modifiers(modifiers.filter(modifier => modifier != evt.key));
                }
            }}
            value=""/>
            {banner_strings.map((s, idx) => <BannerDisplay key={idx} banner_string={s} color={current_color}/>)}
        </div>
    }

}

export { BannerInput };