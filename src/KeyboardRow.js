import React from 'react';

import { KeyboardKey } from './KeyboardKey';

function KeyboardRow({ row, current_color }) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        {
            row.map((key_config, i) => <KeyboardKey key={i} {...key_config} current_color={current_color}/>)
        }
    </div>;
}

export { KeyboardRow };