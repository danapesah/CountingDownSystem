import IndexReducers from './reducers/indexReducers'
import initialState from './reducers/MainWindowReducers'

import { createStore , combineReducers} from 'redux';

function saveToLocalStorage(state,state_name){
    try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem(state_name, JSON.stringify(serializedState));
    }  
    catch(e){
    console.log(e)
    }   
}

function loadFromLocalStorage(state_name){
    try {
        const serializedState = localStorage.getItem(state_name); //''something 
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
}

const persistedState= loadFromLocalStorage();

// const rootReducer = combineReducers({
//   initialState : MainWindowReducers,
// })
const store = createStore(
  IndexReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

//   store.subscribe(() => {
//     saveToLocalStorage( {system_state: store.getState()},'system_state');
//     saveToLocalStorage({_user_info: store.getState()._user_info},'_user_info')
// }
      // ,
      // );
     // unsubscribe()
 //store.subscribe(()=>saveToLocalStorage(store.getState(),"chosen_state") )
export default store
//i need to save the user login info and the other state separately
