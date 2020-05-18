import {CONSTANTS} from "../Actions";
import axios from 'axios';
let initialState = {
    StatusList: []
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
const FieldStatusReducers = (state = initialState, action) =>{
    switch(action.type){
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
                color: "green"
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
        case CONSTANTS.CHANGE_COLOR_BUTTON_FIELDSTATUS:
        {
            if(window.location.pathname ==='/display')
            { //able to change color only at this pathname

                let list;
                let card;
                let button = -1;

                for(let i=0;i<state.StatusList.length; i++)
                    if(state.StatusList[i].listID == action.payload.listID)
                    list = i;
                for(let i=0;i<state.StatusList[list].cards.length; i++)
                    if(state.StatusList[list].cards[i].cardID == action.payload.cardID)
                    card = i;

                for(let i=0;i<state.StatusList[list].cards[card].buttons.length; i++)
                    if(state.StatusList[list].cards[card].buttons[i].id == action.payload.buttonID)
                        button = i;      
                        
                let newStatusList = [...state.StatusList];
                // console.log(newStatusList[list].cards[card].buttons[button].color)
                if(button !== -1)
                {
                if( newStatusList[list].cards[card].buttons[button].color === "green")
                    newStatusList[list].cards[card].buttons[button].color="orange";
                else if( newStatusList[list].cards[card].buttons[button].color === "orange")
                    newStatusList[list].cards[card].buttons[button].color="red";
                else if( newStatusList[list].cards[card].buttons[button].color === "red")
                    newStatusList[list].cards[card].buttons[button].color="black";
                else if( newStatusList[list].cards[card].buttons[button].color === "black")
                    newStatusList[list].cards[card].buttons[button].color="green";
                }
                // console.log(newStatusList);
                //alert( newStatusList[list].cards[card].buttons[button].color)

                /////for every change of color in 'display' /////
                // the local storage should be cleared and the new state need to save to it and to the DB
                try {
                    const serializedState = localStorage.getItem("chosen_state"); //''something 
                    
                    if (serializedState === null) {
                        //  do nothing
                    }
                    else{
                        let chosen_state = JSON.parse(JSON.parse(serializedState ))
                        let newState={...chosen_state}
                        newState.StatusList={...newStatusList}
                        localStorage.removeItem("chosen_state") 

                        const serializedState2 = JSON.stringify(newState)
                        localStorage.setItem("chosen_state", JSON.stringify(serializedState2));
                        //alert( newState.StatusList[list].cards[card].buttons[button].color)
                    }
                    
                } 
                catch (err) 
                {
                    console.log(err)
                }

                // axios.post('http://localhost:5000/counts/add',  newState)
                // .then(res => console.log(res.data  ),  );//
                return {...state,StatusList:newStatusList};
            } 
        }
        default:return state;
    }
}

export default FieldStatusReducers;
