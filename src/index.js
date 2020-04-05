import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import OperationReducer from './reducers/OperationReducer'
import { BrowserRouter } from 'react-router-dom';
import store from './store'


// function saveToLocalStorage(state){
//     try{
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem('my-state', JSON.stringify(serializedState));
//     }  
//     catch(e){
//     console.log(e)
//     }   
// }

// function loadFromLocalStorage(state){
//     try{
//     const serializedState = localStorage.getItem('state')
//     if(serializedState===null) 
//         alert("kkk")
//     else
//         JSON.parse(serializedState)
//     }  
//     catch(e){
//         console.log(e)
//         //return undefined
//     }   
// }

// const persistedState= loadFromLocalStorage()
// const store = createStore(OperationReducer , persistedState);
// store.subscribe(()=>saveToLocalStorage(store.getState()) )

const app =<Provider store={store}>
<BrowserRouter><App /></BrowserRouter></Provider> 
ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
