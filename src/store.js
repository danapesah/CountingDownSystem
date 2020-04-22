import OperationReducer from './reducers/OperationReducer'
import { createStore , combineReducers} from 'redux';

function saveToLocalStorage(state){
    try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem('system-state', JSON.stringify(serializedState));
    }  
    catch(e){
    console.log(e)
    }   
}

function loadFromLocalStorage(state){
    try {
        const serializedState = localStorage.getItem(state); //''something 
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
}

const persistedState= loadFromLocalStorage();

const rootReducer = combineReducers({
  reducers: OperationReducer,
})
const store = createStore(
  OperationReducer , persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const unsubscribe =store.subscribe(() => {saveToLocalStorage({system_state: store.getState()});
      }
      ,
      );
     // unsubscribe()
 //store.subscribe(()=>saveToLocalStorage(store.getState()) )
export default store