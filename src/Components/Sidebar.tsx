import { connect, ConnectedProps } from 'react-redux';
import { setViewedChat, subscribeToChat, unsubscribeToChat } from '../Redux/Reducers/prefrenceSlice';
import { RootState } from '../Redux/store';
import './Sidebar.scss';
import plusSvg from '../source_icons_plus.svg';
import { showAddNewChat } from '../Redux/Reducers/popupSlice';
import { useEffect, useState } from 'react';
import { collection, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '..';

const connector = connect((state: RootState) => ({
    chats: state.prefrence.subscribedChats
}), {
    subscribeToChat,
    unsubscribeToChat,
    showAddNewChat
})

const connector2 = connect((state: RootState) => ({
    currentChat: state.prefrence.viewedChat
}), {
    unsubscribeToChat,
    setViewedChat
})

let SidebarChatItem = connector2(function(props: { chat: string } & ConnectedProps<typeof connector2>) {
    let chat = props.chat;

    let [state, setState] = useState({
        lastText: "",
        imageSrc: ""
    })

    useEffect(() => {
        const q = query(collection(db, `chats`, chat, 'messages'), orderBy('time', 'desc'), limit(1));
        console.log(chat)
        const unsubscribe = onSnapshot(q, snapshot => {
            console.log(snapshot)
            if (snapshot.docs.length > 0) {
                setState({
                    lastText: snapshot.docs[0].data().message,
                    imageSrc: snapshot.docs[0].data().imageSrc
                })
            } else {
                setState({
                    lastText: "No messages sent yet!",
                    imageSrc: ""
                })
            }
        });
        
        return () => {
            unsubscribe();
        }
    }, [chat])

    return (
        <div className="SidebarChatItem">
            <div onClick={
                () => {
                    props.setViewedChat(chat);
                }
            }>
                <h1 className={
                    props.currentChat == chat ? "current" : ""
                }>{chat}</h1>
                <div className='lastMessage'>
                    <img src={state.imageSrc} alt="" />
                    <p>{state.lastText}</p>
                </div>
            </div>
            <div className='delete-container' onClick={
                () => {
                    props.unsubscribeToChat(chat);
                    props.setViewedChat("");
                }
            }>
                <p>X</p>
            </div>
        </div>
    )
})

function Sidebar(props: ConnectedProps<typeof connector>) {
    return (
        <div className="Sidebar">
            {
                props.chats.map(chat => (
                    <SidebarChatItem chat={chat} />
                ))
            }
            <div className='add-button' onClick={
                () => {
                    props.showAddNewChat();
                }
            }>
                <img src={plusSvg} alt="" />    
            </div>
        </div>
    )
}

export default connector(Sidebar);