import React from 'react';

import './style.css';

import { rows as keyboard_rows } from './keyboard_keys';
import { Keyboard } from './Keyboard';

function App() {
    return <div>
        <input style={{
            border: 'none',
            width: 500,
            fontSize: 40,
            borderBottom: '2px solid black',
            margin: 20,
        }}/>
        <Keyboard rows={keyboard_rows}/>
    </div>;
}

export { App };