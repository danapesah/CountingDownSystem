import {CONSTANTS} from "../Actions";
import * as moment from 'moment';

let listIDNew=3;
const initialState = {
    title: "This is the title",
    OperationList: [
       {
           listID:0,
           title: 'First List',
           cards:[
               {id:0},
               {id:1}
           ]
       },
       {
        listID:1,
        title: 'Second List',
        cards:[
            {id:0},
            {id:1}
        ]
        }
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
            {id:1,title:"Event",startHour:3,endHour:4, columID:0, comments:"Dana"},
            {id:2,title:"Event",startHour:5,endHour:7, columID:3, comments:"Shoky"},
            {id:3,title:"Event",startHour:1,endHour:2, columID:4, comments: "Tooffee"}
        ]
     }
    
    
     
     
}

const OperationReducer = (state = initialState, action) =>{
    let listID=3;
    switch(action.type){
    case CONSTANTS.ADD_LIST_OPERATION:
    {
        const newList = {
            listID : listIDNew, 
            title:"List num"+listIDNew,
            cards: [] , 
        }
        listIDNew++; 
            return {...state,OperationList: [...state.OperationList, newList]};
    }

    case CONSTANTS.ADD_CARD_OPERATION:
    {
        const newCard = {
            id:4
        } 
       
       const newOperationList= state.OperationList.map (list => {
            if(list.listID === action.payload.listID){
                return{
                    ...list,
                    cards:[...list.cards, newCard]
                }
            }else{
                return list;
            }
        });   
        return {...state, OperationList: newOperationList};
        }

        case CONSTANTS.ADD_EVENT_COUNTDOWN:{
            const CountDownlistsNew = {
                resources:[...state.CountDownlists.resources],
                events:[
                    ...state.CountDownlists.events,
                    {
                        id:4,
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
        case CONSTANTS.DELETE_EVENT_COUNTDOWN:
        {
            const deleteID = action.payload.id.id;
               const newEventsList = state.CountDownlists.events.filter( event=>
                {
                  if(event.id != deleteID)      
                   return event
                }
               )
            const CountDownlistsNew = {
                resources:[...state.CountDownlists.resources],
                events:newEventsList
            } 
            return {...state,CountDownlists: CountDownlistsNew };
        };

        case CONSTANTS.DELETE_ENTITY_COUNTDOWN:
        {
            const deleteID = action.payload.id;
            //console.log(action.payload.id);
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
                    if(button.id != action.payload.buttonID)
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

        default: return state;
    }
    
}

export default OperationReducer;