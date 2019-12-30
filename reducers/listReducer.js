import {CONSTANTS} from "../actions"
let listID = 2;
let cardID = 4;
const initialState =[
    {
        title:  " list 1 ",
        id: 0,
        cards: [
        {   id: 0,
            text: "we created a static list&card 0 " ,
        },
        {   id: 1,
            text: "we created a static list&card 1 ",
        },
              ]
    },
    {
        title:  " list 2 ",
        id: 1,
        cards: [
        {   id: 0,
            text: "test 1 " ,
        },
        {   id: 1,
            text: "test 2 ",
        },
        {   id: 2,
            text: "test 3 ",
        },
        {   id: 3,
            text: "test 4 ",
        },
             ]
    }
];

const listReducer = (state = initialState, action)=> {
switch (action.type){
    case CONSTANTS.ADD_LIST:
        const newList = {
            title: action.payload,
            cards: [] , 
            id : listID, 
        }
        listID+=1;
        return[...state, newList] ;

        case CONSTANTS.ADD_CARD:
        const newCard = {
            text: action.payload.text,
            id : cardID, 
        }
        cardID +=1; 
       const newState=  state.map (list => {
            if(list.id ===action.payload.listID){
                return{
                    ...list,
                    cards:[...list.cards, newCard]
                }
            }else{
                return list;
            }
        });   

        return newState;

    default:
        return state;
    }
};


export default listReducer;