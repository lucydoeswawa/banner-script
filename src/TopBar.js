import React, { Component } from 'react';

import { generate_image } from './generate_image';

const SOURCE_URL = 'https://github.com/lucydoeswawa/banner-script';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
        };
    }

    render() {
        const { banners_string } = this.props;
        const { copied } = this.state;

        const copied_text = <p style={{
            fontFamily: 'Retro',
            fontSize: 12,
            margin: 0,
            marginTop: 2,
            alignSelf: 'center',
        }}>
            copied!
        </p>;

        return <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            height: 40,
            margin: 0,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 5,
            borderBottom: '2px solid black',
        }}>
            <p style={{
                fontFamily: 'Retro',
                fontSize: 20,
                alignSelf: 'center',
            }}>Banner Typer</p>
            <div style={{
                flexGrow: 1,
            }}></div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
            }}>
                <button style={{
                    fontFamily: 'Retro',
                    background: 'none',
                    fontSize: 14,
                    border: '3px solid black',
                    marginRight: 8,
                }} onClick={async () => {
                    const img_src = await generate_image(banners_string, 2);

                    try {
                        fetch(img_src)
                        .then(res => res.blob())
                        .then(blob => {
                            navigator.clipboard.write([
                                new ClipboardItem({
                                    'image/png': blob,
                                })
                            ]);
                            this.setState({
                                ...this.state,
                                copied: true,
                            })
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }}>IMAGE</button>
                { copied ? copied_text : null}
            </div>
            <button style={{
                fontFamily: 'Retro',
                background: 'none',
                fontSize: 14,
                border: '3px solid black',
                marginRight: 8,
            }} onClick={() => window.open(SOURCE_URL)}>SOURCE</button>
        </div>;
    }
}

export { TopBar };