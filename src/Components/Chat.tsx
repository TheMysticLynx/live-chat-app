import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { db } from "..";
import { useAuth } from "../Hooks/AuthHooks";
import { RootState } from "../Redux/store";
import './Chat.scss'

let connector = connect((state: RootState) => ({
    currentChat: state.prefrence.viewedChat
}))

function Chat(props: ConnectedProps<typeof connector>) {
    let [messages, setMessages] = useState<{
        message: string;
        imageSrc: string;
        self: boolean;
    }[]>([]);

    let user = useAuth();

    let inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!props.currentChat) return;
        if (!/.+/.test(props.currentChat)) return

        
        let q = query(collection(db, 'chats', props.currentChat, 'messages'), orderBy('time', 'desc'), limit(25));
        let unsubscribe = onSnapshot(q, (snapshot) => {
            if(user == null) return;

            if(snapshot.docs.length == 0) {
                setMessages([]);
            } else {
                let messages = snapshot.docs.map(doc => {
                    return {
                        message: doc.data().message,
                        imageSrc: doc.data().imageSrc,
                        self: doc.data().user == user?.uid ? true : false
                    }
                });
                setMessages(messages);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [props.currentChat]);

    if (!props.currentChat) return null;

    return (
        <div className="Chat">
            <div className="ChatMessages">
                {messages.map(message => (
                    <div className={`ChatMessage ${message.self ? 'self' : ''}`}>
                        <img src={message.imageSrc} alt="" />
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
            <form className="ChatInput" onSubmit={
                (e) => {
                    e.preventDefault();
                    if(!inputRef.current) return;
                    let val = inputRef.current.value;
                    
                    addDoc(collection(db, 'chats', props.currentChat, 'messages'), {
                        message: val,
                        imageSrc: user?.photoURL,
                        time: serverTimestamp(),
                        user: user?.uid
                    })

                    inputRef.current.value = '';
                }
            }>
                <input type="text" ref={inputRef} placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default connector(Chat);