import React from 'react';

type InputProps = any;
function Input(props: InputProps) {
    const onClickSendStickerMessage = () => {
        typeof props.sendNewStickerMessage === 'function' &&
            props.sendNewStickerMessage();
    };
    const onClickSendTextMessage = () => {
        typeof props.sendNewTextMessage === 'function' &&
            props.sendNewTextMessage();
    };

    const onClickSimulate = () => {
        onClickSendStickerMessage();
    };
    return (
        <div className="input">
            <button onClick={onClickSimulate}>
                Simulate Animate Send Sticker
            </button>
            <button onClick={onClickSendStickerMessage}>Send sticker</button>
            <button onClick={onClickSendTextMessage}>Send text</button>
        </div>
    );
}

export default Input;
