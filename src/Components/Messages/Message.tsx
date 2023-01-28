import './message.css'


type MessageProps = {
    text: string,
    sender: string,
    position: string
}

export default function Message({text, sender, position}: MessageProps){

    return <div className={`message__message message__message--${position === 'left'? 'other' : 'mine'}`}>
        <span className='message__sender'>{sender}</span> <span>{text}</span>
    </div>
}