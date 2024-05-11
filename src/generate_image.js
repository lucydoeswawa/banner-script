import parse_color from 'parse-css-color';

import { modifier_keys } from './banner_standard';
import { split_banners, split_pieces } from './banner_lib';
import { modifier_to_idx, key_to_patterns, key_to_color, colors as banner_colors } from './banner_standard';

function load_image(img_src) {
    return new Promise(resolve => {
        const img = new Image();
        img.src = img_src;
        img.onload = resolve(img);
    });
}

async function tint_img(img_src, r, g, b) {
    const img = await load_image(img_src);

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    const pixels = ctx.getImageData(0, 0, img.width, img.height);
    const data = pixels.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i    ] = data[i    ] * r / 255;
        data[i + 1] = data[i + 1] * g / 255;
        data[i + 2] = data[i + 2] * b / 255;
        data[i + 3] = data[i + 3];
    }

    ctx.putImageData(pixels, 0, 0);
    return canvas.toDataURL();
}

function generate_tinted_pattern_image(piece) {
    var modifier_idx = 0;
    var read_offset = 0;
    if (modifier_keys.includes(piece.substring(0, 1))) {
        modifier_idx = modifier_to_idx(piece.substring(0, 1));
        read_offset = 1;
    }

    const pattern = key_to_patterns(piece.substring(read_offset, read_offset + 1))[modifier_idx];
    const color = key_to_color(piece.substring(read_offset + 1, read_offset + 2));

    const parsed_color = parse_color(banner_colors[color]);

    return tint_img(
        require(`../res/banners/${pattern}.png`),
        parsed_color.values[0],
        parsed_color.values[1],
        parsed_color.values[2]);
}

async function generate_image(banners_string, scale) {
    const banners = split_banners(banners_string);

    const canvas = document.createElement('canvas');
    canvas.width = ((20 + 2) * banners.length - 2) * scale;
    canvas.height = 40 * scale;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    await Promise.all(banners.map(async (banner, idx) => {
        const pieces = split_pieces(banner);
        const imgs = await Promise.all(pieces.map(p => generate_tinted_pattern_image(p).then(load_image)));
        imgs.map(img => {
            ctx.drawImage(img, idx * (20 + 2) * scale, 0, img.width * scale, img.height * scale);
        });
    }));

    return canvas.toDataURL();
}

export {
    generate_image,
};