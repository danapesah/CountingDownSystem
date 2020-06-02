import {CONSTANTS} from "../Actions";
import io from "socket.io-client";
import axios from 'axios';

// const socket = io.connect('http://localhost:4000')
let initialState = {
    MessageWindow:"",
}
// try {
   
//     // if(window.location.pathname ==='/display')
//     // {

//         for (let i = 0 ; i < 2 ; i ++ )
//         {

       
//         socket.on("message", data => {
//          //   alert("1")
//         let chosen_state_id=null
//         let DB_info = null
//         let data_len = null 
//         try {
//             const serializedStateID = localStorage.getItem("chosen_state_id"); 
//             if (serializedStateID !== null) {
//                  chosen_state_id = JSON.parse(JSON.parse(serializedStateID ))
//             }
//         } 
//         catch (err) 
//         {
//             console.log(err)
//         }
//         axios.get('http://localhost:5000/counts/') //GET REQUEST
//         .then(response => {
//         if (response.data.length===0) return;
//         data_len= response.data.length
//         DB_info={...response.data}
//         if(DB_info!== null &&  chosen_state_id!==null )
//          {  
//             for(let i = 0 ; i <data_len ; i++)
//             {   
//                 if( DB_info[i]._id===chosen_state_id ) 
//                 {
//                     localStorage.removeItem("chosen_state") 
//                    let serializedState1 = JSON.stringify(DB_info[i]._system_info_object)
//                     localStorage.setItem("chosen_state", JSON.stringify(serializedState1));
//                     console.log("local storage has changed")
//                     // this.props.dispatch(change_to_show_chosen_table_state
//                     //     (DB_info[i]._system_info_object))
//                  //   console.log(JSON.parse(JSON.parseserializedState1).MessageWindow)
//                   //  window.location.reload()
             
//                 }
//             }
          
//           }
   
//          })
  
//     })
//    }
// // }
   let serializedState = localStorage.getItem("chosen_state");  
    if (serializedState === null) {
        //  do nothing
    }
    else{
        let chosen_state = JSON.parse(JSON.parse(serializedState ))
        initialState={...chosen_state}
    }
   
 
    
// } 
// catch (err) 
// {
//     console.log(err)
// }


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
