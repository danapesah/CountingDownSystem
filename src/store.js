import OperationReducer from './reducers/OperationReducer'
import { createStore } from 'redux';

function saveToLocalStorage(state){
    try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem('my-state', JSON.stringify(serializedState));
    }  
    catch(e){
    console.log(e)
    }   
}

function loadFromLocalStorage(state){
    try {
        const serializedState = localStorage.getItem(); //''something 
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
}

const persistedState= loadFromLocalStorage()
const store = createStore(
    OperationReducer , persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


    store.subscribe(() => {
        saveToLocalStorage({
            user_info: store.getState()._user_info
        });
      });

// store.subscribe(()=>saveToLocalStorage(store.getState()) )

export default store