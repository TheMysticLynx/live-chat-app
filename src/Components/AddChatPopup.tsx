import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { hideAddNewChat } from "../Redux/Reducers/popupSlice";
import { subscribeToChat } from "../Redux/Reducers/prefrenceSlice";
import { RootState } from "../Redux/store";

import './AddChatPopup.scss';


const connector = connect((state: RootState) => ({

}), {
    subscribeToChat,
    hideAddNewChat
})




class AddChatPopup extends React.Component<ConnectedProps<typeof connector>, {text: string}> {
    constructor(props: ConnectedProps<typeof connector>) {
        super(props);
        this.state = {
            text: ""
        }
    }

    render() {
        return (
            <div className="AddChatPopup">
                <div className="content">
                    <h1>Add new chat</h1>   
                    <input type="text" placeholder="Chat name" onChange={
                        (e) => {
                            this.setState({text: e.target.value})
                        }
                    } />
                    <div>
                        <button onClick={()=> {
                            this.props.subscribeToChat(this.state.text);
                            this.props.hideAddNewChat();
                        }}>Add</button> 
                        <button onClick={() => {
                            this.props.hideAddNewChat();
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connector(AddChatPopup);