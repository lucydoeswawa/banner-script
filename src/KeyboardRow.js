import React from 'react';

import { KeyboardKey } from './KeyboardKey';

function KeyboardRow({ row }) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        {
            row.map((key_config, i) => <KeyboardKey key={i} {...key_config}/>)
        }
    </div>;
}

export { KeyboardRow };