import React, { Component } from 'react';

import './style.css';

import { rows as keyboard_rows } from './keyboard_keys';
import { Keyboard } from './Keyboard';
import { key_to_color, modifiers } from './banner_standard';
import { BannerInput } from './BannerInput';

class App extends Component {

    constructor() {
        super();
        this.state = {
            current_color: 14,
            modifiers: [],
            index: 0,
        };
    }

    render() {
        const { current_color, modifiers, index } = this.state;
        return <div>
            <BannerInput
                current_color={current_color}
                on_current_color={cc => {
                    this.setState({
                    ...this.state,
                    current_color: cc,
                    });
                }}
                modifiers={modifiers}
                on_modifiers={mod => {
                    this.setState({
                        ...this.state,
                        modifiers: mod,
                    });
                }}
                index={index}
                on_index={idx => {
                    this.setState({
                        ...this.state,
                        index: idx,
                    });
                }}/>
            <Keyboard rows={keyboard_rows} current_color={current_color}/>
        </div>;
    }
}

export { App };