import React from 'react';

import { KeyboardRow } from './KeyboardRow';

function Keyboard({ rows }) {
    return rows.map((row, i) => <KeyboardRow key={i} row={row}/>);
}

export { Keyboard };