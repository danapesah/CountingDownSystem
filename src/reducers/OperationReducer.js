import {CONSTANTS} from "../Actions";
import * as moment from 'moment';
import axios from 'axios';
import MainWindow from '../operationSystem/MainWindow' 
import { Link } from "react-router-dom";


const initialState = {
     _user_info:{_name:"" , _permissions:"", _logged:false  },
   // _user_info:[{key:1 ,_name:'' }, {key:2 ,_permissions:'' } , {key:3 ,_logged:false }],


    title: "This is the title of the state ",
    hours_before_target: '',
    hours_after_target: '',
    MessageWindow:"",
    OperationRows: ["אישור ירידה", "אישור המראה", "המראה"],
    OperationList: [
    //    {
    //        listID:0,
    //        cards:[
    //            {id:0, title: 'First Card', picture:0, checkBox:[1,0,0]},
    //            {id:1,title: 'Second Card', picture:0, checkBox:[0,0,0]}
    //        ]
    //    },
    //    {
    //     listID:1,
    //     title: 'Second List',
    //     cards:[
    //         {id:0, title: 'First Card', picture:0, checkBox:[0,1,1]}
    //     ]
    //     }
    ],
    StatusList: [
        {
            listID:0,
            listTitle: 'שדה',
            cards:[
                {
                cardTitle: ' אדרת 5',
                cardID:0,
                cardComments:'הי שלום מה נשמע?',
                buttons:[
                        {id:0,titleButton:'5י'},
                        {id:1,titleButton:'2.4'},
                        {id:2,titleButton:'5ח\''}
                    ]
                },
                {
                    cardTitle: 'אדרת 3',
                    cardID:1,
                    cardComments:'sharon dana sharon',
                    buttons:[
                            {id:0,titleButton:'5'},
                            {id:1,titleButton:'2.4'},
                        ]
                    }
               ]
         },
         {
         listID:1,
            listTitle: 'מערכות חיצוניות',
            cards:[
                {
                cardTitle: 'יארד',
                cardID:0,
                cardComments:' דנה דנה דנה',
                buttons:[
                        {id:1,titleButton:'1'},
                    ]
                },

               ]
         }
     ],
     CountDownlists:  
     {
       
        resources:[
            {title: "משימה 1", key:"0"},
            {title: "משימה 2", key:"1"},
            {title: "משימה 3", key:"2"},
            {title: "משימה 4", key:"3"},
            {title: "משימה 5", key:"4"},
            {title: "משימה 6", key:"5"},
        ],
        events:[
            // {id:1,title:"sharon",startHour:3,endHour:4, columID:0, comments:"Dana"},
            // {id:2,title:"dana",startHour:5,endHour:7, columID:3, comments:"Shoky"},
            // {id:3,title:"lior",startHour:1,endHour:2, columID:4, comments: "Tooffee"}
        ]
     }
    
    
    
     
}

const OperationReducer = (state = initialState, action) =>{
  //  let listID=3;
    switch(action.type){

        // case CONSTANTS.SAVE_USER_INFO:{ //save/delete the user info after login/logout
        //     const _info=[{id:1 ,_name:action.payload.name },
        //          {id:2 ,_permissions:action.payload.permissions } , 
                
        //         {id:3 ,_logged:action.payload.bool }]
       
        //   return{...state, _user_info:_info}
    case CONSTANTS.SAVE_USER_INFO:{ //save/delete the user info after login/logout
      const _info={
        _name: action.payload.name, 
        _permissions:action.payload.permissions ,
        _logged:action.payload.bool}
    return{...state, _user_info:_info}
    }
    case CONSTANTS.SET_NEW_TABLE:{
        //set a new "clean" state for a new table
        const StatusListNew=[]
        const CountDownlistsNew = {
            events:  [],
            resources:[...state.CountDownlists.resources], //we will always need the default resources
          }
         
        return {
            ...state,
            title: action.payload.title, 
            hours_before_target: action.payload.down_count,
            hours_after_target:  action.payload.up_count ,
            MessageWindow:action.payload.message,
            OperationRows:state.OperationRows,
            OperationList:[] ,
            StatusList: [] ,

            CountDownlists: CountDownlistsNew
           
        }
    }
    case CONSTANTS.SAVE_STATE:{
        //for the save new/edit table btn
        const count = {...state}
   
        if (action.payload.id === -1 )
        {
            console.log("count: SAVE_STATE " , count);
            axios.post('http://localhost:5000/counts/add', count)
            .then(res => console.log(res.data  ),  );//promise, after its posted well console our the res.data

           
            window.location = '/list';
            return state;
        }
        else {
         
            console.log("count edit: SAVE_STATE " , count);
          // console.log(  action.payload.id) 
            axios.post('http://localhost:5000/counts/edit/' + 
            action.payload.id, count)
            .then(res => console.log(res.data));
            
           window.location = '/list';
        return state;
        }

    }
    case CONSTANTS.SET_EDIT_TABLE:{
        return{...state, title: action.payload.title ,
            hours_before_target:  action.payload.down_count,
            hours_after_target: action.payload.up_count,
            
        }
    }


    case CONSTANTS.ADD_LIST_OPERATION:
    {
        let newID;
         if(state.OperationList.length === 0)
            newID = 0;
        else
            newID = (state.OperationList[state.OperationList.length-1].listID+1)
        const newOperationList = 
        {
            listID : newID, 
            cards: [] 
        }
            return {...state,OperationList: [...state.OperationList, newOperationList]};
    }

    case CONSTANTS.ADD_CARD_OPERATION:
    {
        console.log("ADD_CARD_OPERATION")
        let newOperationList =[...state.OperationList]
        for (let i=0;i<newOperationList.length;i++)
            {
                if(newOperationList[i].listID === action.payload.listID)
                { 
                    let newID;
                    if(newOperationList[i].cards.length === 0)
                    newID = 0;
                    else
                    newID = (newOperationList[i].cards[newOperationList[i].cards.length-1].id+1)
                    let newCard=
                    {
                    id:newID, 
                    title:action.payload.cardTitle,
                    picture:action.payload.cardType, 
                    checkBox:Array(state.OperationRows.length).fill(0)
                    }
                    newOperationList[i].cards.push(newCard);
                    console.log(newOperationList[i].cards)
                 }   
            }
        return {...state, OperationList: newOperationList};
    }

    case CONSTANTS.ADD_EVENT_COUNTDOWN:
    {
            const CountDownlistsNew = {
                resources:[...state.CountDownlists.resources],
                events:[
                    ...state.CountDownlists.events,
                    {
                        id:state.CountDownlists.events.length+1,
                        title:action.payload.title,
                        startHour:action.payload.startHour,
                        endHour:action.payload.endHour, 
                        columID:action.payload.entity,
                        comments:action.payload.comments
                    }
                ]
       
            } 
            return {...state,CountDownlists: CountDownlistsNew };
        }


        
    case CONSTANTS.CHANGE_STATE:
    {
        //
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


        case CONSTANTS.DELETE_EVENT_COUNTDOWN:
        {
            
            const deleteID = action.payload.id;
               const newEventsList = state.CountDownlists.events.filter( event=>
                {
                  if(event.id != deleteID.id)      
                    return event
                }
               )
            const CountDownlistsNew = {
                resources:[...state.CountDownlists.resources],
                events:newEventsList
            } 
            console.log(CountDownlistsNew);
            return {...state,CountDownlists: CountDownlistsNew };
        };

        case CONSTANTS.DELETE_ENTITY_COUNTDOWN:
        {
            const deleteID = action.payload.id;
            let newResourcesList = [];
            let newEventsList = [];
            for(let i=0;i<state.CountDownlists.resources.length;i++)
                {
                    if(state.CountDownlists.resources[i].key != deleteID)
                    {
                        if(state.CountDownlists.resources[i].key>deleteID)
                        {
                            let temp = parseInt(state.CountDownlists.resources[i].key)-1;
                            state.CountDownlists.resources[i].key="" + temp;
                        }
                        newResourcesList.push(state.CountDownlists.resources[i]);
                    }
                }
                for(let i=0;i<state.CountDownlists.events.length;i++)
                {
                    if(state.CountDownlists.events[i].columID != deleteID)
                    {
                        if(state.CountDownlists.events[i].columID >deleteID)
                        {
                            state.CountDownlists.events[i].columID = state.CountDownlists.events[i].columID-1;
                        }
                        newEventsList.push(state.CountDownlists.events[i]);
                    }
                }
          
          
             const CountDownlistsNew = {
                resources:newResourcesList,
                events:newEventsList
             } 
             return {...state,CountDownlists: CountDownlistsNew };    
        };
        case CONSTANTS.ADD_ENTITY_COUNTDOWN:{
            const CountDownlistsNew = {
                resources:[
                    ...state.CountDownlists.resources,
                    {
                        title: action.payload.title,
                        key: state.CountDownlists.resources.length
                    }
                ],
                events:[...state.CountDownlists.events],       
            } 
            return {...state,CountDownlists: CountDownlistsNew };
        }

        case CONSTANTS.DELETE_BUTTON_FIELDSTATUS:
        {
            console.log("ADD_CARD_OPERATION")
            let list;
            let card;

            for(let i=0;i<state.StatusList.length; i++)
                if(state.StatusList[i].listID == action.payload.listID)
                   list = i;
            for(let i=0;i<state.StatusList[list].cards.length; i++)
                if(state.StatusList[list].cards[i].cardID == action.payload.cardID)
                   card = i;

            let newStatusList = [...state.StatusList];
            newStatusList[list].cards[card].buttons= state.StatusList[list].cards[card].buttons.filter(button =>
                {
                    if(button.id !== action.payload.buttonID)
                        return button;
                });
            return {...state,StatusList:newStatusList};
        
        }
        case CONSTANTS.ADD_BUTTON_FIELDSTATUS:
        {
            //INPUT FIRST BUTTON CASE
            let list;
            let card;
            let newButton =[];
            for(let i=0;i<state.StatusList.length; i++)
                if(state.StatusList[i].listID == action.payload.listID)
                   list = i;
            for(let i=0;i<state.StatusList[list].cards.length; i++)
                if(state.StatusList[list].cards[i].cardID == action.payload.cardID)
                   card = i;

            let newStatusList = [...state.StatusList];
            let newID;
            if(newStatusList[list].cards[card].buttons.length == 0)
                 newID=0;
            else
                 newID=(newStatusList[list].cards[card].buttons[(newStatusList[list].cards[card].buttons.length-1)].id)+1
            newButton =
            {
                id: newID,
                titleButton: action.payload.buttonTitle,
            }

            newStatusList[list].cards[card].buttons.push(newButton);
            return {...state,StatusList:newStatusList};
        
        }

        case CONSTANTS.ADD_CARD_FIELDSTATUS:
        {
            //INPUT FIRST BUTTON CASE
            let list;
            for(let i=0;i<state.StatusList.length; i++)
                if(state.StatusList[i].listID == action.payload.listID)
                   list = i;
            let newStatusList = [...state.StatusList];
            let newID;
            if(newStatusList[list].cards.length == 0)
                 newID=0;
            else
                 newID=(newStatusList[list].cards[(newStatusList[list].cards.length-1)].cardID)+1
            const newCard =
            {
                cardTitle: action.payload.cardTitle,
                cardID: newID,
                cardComments: action.payload.cardComments,
                buttons: [],
            }
            newStatusList[list].cards.push(newCard);
            return {...state,StatusList:newStatusList};
        
        }
        case CONSTANTS.DELETE_CARD_FIELDSTATUS:
        {
            let list;
            for(let i=0;i<state.StatusList.length; i++)
                if(state.StatusList[i].listID == action.payload.listID)
                   list = i;
            let newStatusList = [...state.StatusList];
            newStatusList[list].cards= state.StatusList[list].cards.filter(card =>
                {
                    if(card.cardID != action.payload.cardID)
                        return card;
                });
            return {...state,StatusList:newStatusList};
        
        }

        case CONSTANTS.DELETE_LIST_FIELDSTATUS:
        {
            let newStatusList = [...state.StatusList];
            newStatusList= state.StatusList.filter(list =>
                {
                    if(list.listID != action.payload.listID)
                        return list;
                });
            return {...state,StatusList:newStatusList};
        }

        case CONSTANTS.ADD_LIST_FIELDSTATUS:
        {
                let newStatusList = [...state.StatusList];
                let newList={}
                if(state.StatusList.length===0)
                {
                   newList = 
                    {
                        listID: 0,
                        listTitle: action.payload.listTitle,
                        cards:[],
                    }

                }
                else{

                     newList = 
                    {
                        listID: ((newStatusList[newStatusList.length-1].listID)+1),
                        listTitle: action.payload.listTitle,
                        cards:[],
                    }
                }

                newStatusList.push(newList);
                return {...state,StatusList:newStatusList};
        }

        case CONSTANTS.DELETE_CARD_OPERATION:
            {
                let list;
                for(let i=0;i<state.OperationList.length; i++)
                    if(state.OperationList[i].listID == action.payload.listID)
                    list = i;
                let newOperationList = [...state.OperationList];
                newOperationList[list].cards= state.OperationList[list].cards.filter(card =>
                    {
                        if(card.id != action.payload.cardID)
                            return card;
                    });
                return {...state,OperationList:newOperationList};
            }
        case CONSTANTS.ADD_ROW_OPERATION:
            {
                let newOperationRows = [...state.OperationRows];
                newOperationRows.push(action.payload.rowTitle);
                let newOperationList = [...state.OperationList];
                for(let i=0;i<state.OperationList.length; i++)
                    for(let j=0; j<state.OperationList[i].cards.length; j++)
                            newOperationList[i].cards[j].checkBox.push(0);
                return {...state,OperationRows:newOperationRows, OperationList:newOperationList};
            }
         case CONSTANTS.DELETE_ROW_OPERATION:
                {
                    let newOperationRows = [...state.OperationRows];
                    if(action.payload.rowPlace == 0)
                        newOperationRows.shift();
                    else
                        newOperationRows.splice(action.payload.rowPlace,action.payload.rowPlace);
                    let newOperationList = [...state.OperationList];
                    for(let i=0;i<state.OperationList.length; i++)
                        for(let j=0; j<state.OperationList[i].cards.length; j++)
                                newOperationList[i].cards[j].checkBox.pop();
                    return {...state,OperationRows:newOperationRows, OperationList:newOperationList};
                }
          case CONSTANTS.DELETE_LIST_OPERATION:
                {       
                    let newOperationRows = [...state.OperationList];
                    if(state.OperationList.length == 1)
                    {
                        newOperationRows = []
                    }
                    else
                    {
                        newOperationRows= state.OperationList.filter(list =>
                            {
                                 if(list.listID != action.payload.ListID)
                                     return list;
                             });   
                    }
                    return {...state,OperationList:newOperationRows};
                }
                case CONSTANTS.UPDATE_MESSAGE_MESSAGEWINDOW:
                    {       
        
                        let newMessageWindow = action.payload.message;
                        return {...state,MessageWindow:newMessageWindow};
                    }
            
            


        default: return state;
    }
    
}

export default OperationReducer;