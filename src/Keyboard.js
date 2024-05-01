import React from 'react';

import { KeyboardRow } from './KeyboardRow';

function Keyboard({ rows, current_color }) {
    return rows.map((row, i) => <KeyboardRow current_color={current_color} key={i} row={row}/>);
}

export { Keyboard };