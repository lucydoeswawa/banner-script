import React, { Component } from 'react';

import './style.css';

import { rows as keyboard_rows } from './keyboard_keys';
import { Keyboard } from './Keyboard';
import { key_to_color } from './banner_standard';

class App extends Component {

    constructor() {
        super();
        this.state = {
            current_color: 14,
        };
    }

    render() {
        const { current_color } = this.state;
        return <div>
            <input style={{
                border: 'none',
                width: 500,
                fontSize: 40,
                borderBottom: '2px solid black',
                margin: 20,
            }} onPaste={evt => {
                /* const pasted = evt.clipboardData.getData("Text") */
            }} onKeyDown={evt => {
                const maybe_color = key_to_color(evt.key);
                if (maybe_color !== undefined) {
                    this.setState({
                        ...this.state,
                        current_color: maybe_color,
                    })
                }
            }} value=""/>
            <Keyboard rows={keyboard_rows} current_color={current_color}/>
        </div>;
    }
}

export { App };