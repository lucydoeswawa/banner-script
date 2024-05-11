import React from 'react';

import { key_to_patterns, key_to_color, color_filters, modifier_keys } from './banner_standard';
import { split_pieces } from './banner_lib';

function BannerDisplay({ banner_string }) {
    const pieces = split_pieces(banner_string);

    return <div style={{
        color: 'white',
        height: 120,
        width: 60,
    }}>
        {pieces.map((piece, idx) => {
            var modifier_code = 0;
            var read_offset = 0;
            if (modifier_keys.includes(piece.substring(0, 1))) {
                modifier_code = 1 + modifier_keys.indexOf(piece.substring(0, 1));
                read_offset = 1;
            }

            const pattern = key_to_patterns(piece.substring(read_offset, read_offset + 1))[modifier_code];
            const color = key_to_color(piece.substring(read_offset + 1, read_offset + 2));
            return pattern_image(pattern, color, idx);
        })}
    </div>;
}

function pattern_image(pattern, color, idx) {
    return <img key={idx} src={require(`../res/banners/${pattern}.png`)} style={{
        filter: color_filters[color],
        imageRendering: 'pixelated',
        height: 120,
        position: 'absolute',
    }}/>;
}

export { BannerDisplay };