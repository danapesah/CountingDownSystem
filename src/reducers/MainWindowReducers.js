import {CONSTANTS} from "../Actions";


let initialState = {
    _user_info:{_name:"" , _permissions:"", _logged: false },
    title: "This is the title of the state ",
    hours_before_target: '',
    hours_after_target: '',
    CountDownlists:  
    {  
        resources:[],
        events:[]
    },
    OperationRows: ["אישור ירידה", "אישור המראה", "המראה"],
    OperationList: [ ],

} 
try {
    const serializedState = localStorage.getItem("chosen_state"); //''something 
    
    if (serializedState === null) {
        //  do nothing
    }
    else{
        let chosen_state = JSON.parse(JSON.parse(serializedState ))
       // console.log(chosen_state.MessageWindow)
        console.log(chosen_state)
        initialState={...chosen_state}
    }
    
} 
catch (err) 
{
    console.log(err)
}
const MainWindowReducers = (state = initialState, action) =>{
  //  let listID=3;
 
    switch(action.type){
    case CONSTANTS.SAVE_USER_INFO:{ //save/delete the user info after login/logout
      const _info={
        _name: action.payload.name, 
        _permissions:action.payload.permissions ,
        _logged: action.payload.islogged}
    return{...state, _user_info:_info}
    }
    case CONSTANTS.SET_NEW_TABLE:{
        //set a new "clean" state for a new table
    //  alert("SET_NEW_TABLE")
        const StatusListNew=[]
        const CountDownlistsNew = {
            events:  [],
            resources:[], //we will always need the default resources
          }
         const newState= {
             ...state,
            title: action.payload.title, 
            hours_before_target: action.payload.down_count,
            hours_after_target:  action.payload.up_count ,
            MessageWindow:"",
            OperationRows: ["אישור ירידה", "אישור המראה", "המראה"],
            OperationList:[] ,
            StatusList: [] ,
            CountDownlists: CountDownlistsNew
         }
         try{
            //create local storage of the chosen table when path is  '/edit'  that saves a copy of the table
         let chosen_state = {...newState}
         const serializedState = JSON.stringify(chosen_state)
         localStorage.setItem("chosen_state", JSON.stringify(serializedState));
         console.log(JSON.stringify(serializedState))
         }  
         catch(e){
         console.log(e)
         }
        return {
            ...state,
            title: action.payload.title, 
            hours_before_target: action.payload.down_count,
            hours_after_target:  action.payload.up_count ,
            MessageWindow:[],
            OperationRows:[],
            OperationList:[] ,
            StatusList: [] ,
            CountDownlists: CountDownlistsNew
        }
    }
    
    case CONSTANTS.SET_EDIT_TABLE:{
        //edit the title ,hours_before_target,hours_after_target, 
    //    alert("SET_EDIT_TABLE")    
        return{...state, 
            title: action.payload.title ,
            hours_before_target:  action.payload.down_count,
            hours_after_target: action.payload.up_count,     
        }
    }        
    case CONSTANTS.CHANGE_STATE:
    {
        let chosen = action.payload.chosen_table_state

        return {
            ...state,
            title: chosen.title, 
            hours_before_target: chosen.hours_before_target,
            hours_after_target:chosen.hours_after_target ,
            MessageWindow:chosen.MessageWindow,
            OperationRows: chosen.OperationRows ,
            OperationList:chosen.OperationList ,
            StatusList: chosen.StatusList ,
            CountDownlists: chosen.CountDownlists, 
           
        }
    };
        default: 
        {
        return state  
        }
    }
    
}

export default MainWindowReducers;