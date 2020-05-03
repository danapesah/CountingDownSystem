import {CONSTANTS, save_user_info_after_login} from "../Actions";

let initialState = {
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
        console.log(chosen_state.MessageWindow)
        console.log(chosen_state)
        initialState={...chosen_state}
    }
    
} 
catch (err) 
{
    console.log(err)
}


const OperationWindowReducers = (state = initialState, action) =>{
    switch(action.type){
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
                case CONSTANTS. CHANGE_CHECKBOX_STATE_OPERATION:
                {       
                    
                    let newOperationRows = [...state.OperationList];
                    for(let i=0; i<newOperationRows.length;i++)
                    {
                        if(newOperationRows[i].listID == action.payload.listID)
                        {
                            for(let j=0;j<newOperationRows[i].cards.length;j++)
                            {
                                if(newOperationRows[i].cards[j].id == action.payload.cardID)
                                {
                                    console.log(action.payload.checkBoxID);
                                    if(newOperationRows[i].cards[j].checkBox[action.payload.checkBoxID] == "0")
                                        newOperationRows[i].cards[j].checkBox[action.payload.checkBoxID] =1;
                                    else
                                        newOperationRows[i].cards[j].checkBox[action.payload.checkBoxID] =0;
                                }
                            }
                        }
                    }
                return {...state,OperationList:newOperationRows};
                }
        default:return state;
    }
}

export default OperationWindowReducers;
