import {CONSTANTS} from "../Actions";
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
    ]
}

const rootReducer = (state = initialState, action) =>{
    let listID=3;
    switch(action.type){
    case CONSTANTS.ADD_LIST:
        const newList = {
            listID : listIDNew, 
            title:"List num"+listIDNew,
            cards: [] , 
        }
        listIDNew++; 
    return {...state,OperationList: [...state.OperationList, newList]};
    
    case CONSTANTS.ADD_CARD:{
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


    }

    return state;
}

export default rootReducer;