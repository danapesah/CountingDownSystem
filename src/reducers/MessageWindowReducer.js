import {CONSTANTS} from "../Actions";

let initialState = {
    MessageWindow:"",
}
try {
    const serializedState = localStorage.getItem("chosen_state"); //''something 
    
    if (serializedState === null) {
        //  do nothing
    }
    else{
        let chosen_state = JSON.parse(JSON.parse(serializedState ))
        initialState={...chosen_state}
    }
    
} 
catch (err) 
{
    console.log(err)
}


const MessageWindowReducer = (state = initialState, action) =>{
    switch(action.type){
        case CONSTANTS.UPDATE_MESSAGE_MESSAGEWINDOW:
            {       

                let newMessageWindow = action.payload.message;
                return {...state,MessageWindow:newMessageWindow};
            }
        default:return state;
    }
}

export default MessageWindowReducer;
