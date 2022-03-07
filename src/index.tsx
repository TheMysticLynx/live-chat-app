import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArjrYSQoJoXVf9tkT1kIGfBKGSWyOeTTs",
  authDomain: "live-chat-app-2a37d.firebaseapp.com",
  projectId: "live-chat-app-2a37d",
  storageBucket: "live-chat-app-2a37d.appspot.com",
  messagingSenderId: "936118798710",
  appId: "1:936118798710:web:0f1e373b27911402bc1257",
  measurementId: "G-Y7X3VSBBQB"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/Login' element={<Login />} />
        </Routes>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
