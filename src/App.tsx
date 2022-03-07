import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header';
import { useAuth } from './Hooks/AuthHooks';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Popup from './Components/Popup';
import AddChatPopup from './Components/AddChatPopup';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './Redux/store';
import Chat from './Components/Chat';

const connector = connect((state: RootState) => ({
  addChatPopup: state.popup.AddNewChat
}))

function App(props: ConnectedProps<typeof connector>) {
  let user = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }
  }, [user]);


  return (<>
    {props.addChatPopup && (<Popup>
      <AddChatPopup />
    </Popup>)}
    <div className="App">
      <Header />
      <div className="content">
        <Sidebar />
        <Chat />
      </div>
    </div>
  </>);
}

export default connector(App);
