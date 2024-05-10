import React, { Component } from 'react';

import './style.css';

import { rows as keyboard_rows } from './keyboard_keys';
import { Keyboard } from './Keyboard';
import { key_to_color, modifiers } from './banner_standard';
import { BannerInput } from './BannerInput';
import { blank_banner } from './banner_lib';
import { TopBar } from './TopBar';

class App extends Component {

    constructor() {
        super();
        this.state = {
            current_color: 14,
            modifiers: [],
            index: 0,
            value: blank_banner(),
        };
    }

    render() {
        const { current_color, modifiers, index, value } = this.state;
        return <div style={{margin: 0}}>
            <TopBar banners_string={value}/>
            <BannerInput
                value={value}
                current_color={current_color}
                modifiers={modifiers}
                index={index}
                on_change={val => {
                    this.setState({
                        ...this.state,
                        ...val,
                    });
                }}/>
            <Keyboard rows={keyboard_rows} current_color={current_color}/>
        </div>;
    }
}

export { App };