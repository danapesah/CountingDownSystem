 import {CONSTANTS} from "../Actions";
 import * as moment from 'moment';

 //all the changes are made from here
let listID = 2;
let cardID = 6;
// const previnitialState = {
//     startTimer: moment({hours: 19, minutes: 30}),
//     cardsLists: [
//     {
//         title:  " list 1 ",
//         id: 'list-${0}',
//         cards: [
//         {   id:'cards-${0}',
//             text: "we created a static list&card 0 " ,
//             duration: moment.duration(53, 'minutes'),
//         },
//         {   id: 'cards-${1}',
//         text: "we created a static list&card 1 ",
//         duration: moment.duration(30, 'minutes'),
//     },
//         ]
//     },
//     {
//         title:  " list 2 ",
//         id: 'list-${1}',
//         cards: [
//             {   id: 'cards-${2}',
//                 text: "test 1 " ,
//                 duration: moment.duration(30, 'minutes'),
//             },
//             {   id: 'cards-${3}',
//                 text: "test 2 ",
//                 duration: moment.duration(30, 'minutes'),
//             },
//             {   id: 'cards-${4}',
//                 text: "test 3 ",
//                 duration: moment.duration(30, 'minutes'),
//             },
//             {   id: 'cards-${5}',
//                 text: "test 4 ",
//                 duration: moment.duration(30, 'minutes'),
//             },
//         ]
//     }
// ]
// }

// const getCurrentCardIndex = (startTime, cardsList, currentTime=moment()) => {
//     const totalDuration = moment.duration(currentTime.diff(startTime));
//     let timePassed = moment.duration();
//     for (let i = 0; i < cardsList.length; i++) {
//         timePassed = timePassed.add(cardsList[i].duration)
//         if (timePassed > totalDuration) {
//             const timePassedInCard = timePassed.subtract(totalDuration);
//             const percentage = 1 - (timePassedInCard / cardsList[i].duration);
            
//             return [i, percentage];
//         }
//     }
//     return [-1, 0];
// }
// const getNewState = (prevState) => {
//     const newState = {...prevState};
//     newState.cardsLists = newState.cardsLists.map(cardList => {
//         const [idx, percentage] = getCurrentCardIndex(prevState.startTimer, cardList.cards);
//             const newCardList = {...cardList};
//             newCardList.cards = newCardList.cards.map((card, i) => ({...card, 
//                 flag: i === idx,
//                 percentage: i === idx ? percentage : (idx === -1 || i < idx ? 1 : 0),
//                 passed: idx === -1 || i < idx}));
//             return newCardList;
//     });
//     return newState;
// }
// const initialState = getNewState(previnitialState)




const listReducerCountDown = (state = initialState, action)=> {
switch (action.type){
    case CONSTANTS.REFRESH:
        return getNewState(state);

    case CONSTANTS.ADD_LIST_COUNTDOWN:
        const newList = {
            title: action.payload,
            cards: [] , 
            id : 'list-${listID}', 
        }
        listID+=1;
        return{...state, cardsLists: [...state.cardsLists, newList]} ;

    case CONSTANTS.ADD_CARD_COUNTDOWN:{
        const newCard = {
            text: action.payload.text,
            id : 'card-${cardID}', 
        }
        cardID +=1; 
       const newCardsList= state.cardsLists.map (list => {
            if(list.id === action.payload.listID){
                return{
                    ...list,
                    cards:[...list.cards, newCard]
                }
            }else{
                return list;
            }
        });   

        return {...state, cardsLists: newCardsList};
        }
    case CONSTANTS.DRAG_HAPPENED:
        const {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            }= action.payload;
            const newState = {...state};

            if (droppableIdStart === droppableIdEnd){
              const list =newState.cardsLists.find(list=> droppableIdStart === list.id); 
              const card = list.cards.splice(droppableIndexStart,1)
              list.cards.splice(droppableIndexEnd, 0 , ...card)            
            }
            return newState;

    default:
        return state;
    }
};


export default listReducerCountDown;