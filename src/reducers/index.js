
import {combineReducers } from "redux"
import listReducerCountDown from "./listReducerCountDown"
import OperationReducer from "./OperationReducer";
import {CONSTANTS} from "../Actions";
import * as moment from 'moment';



// const initialState = {
//     title: "This is the title",
//     CountDownList:[
//         {
//             listID:0,
//            title: 'First List'
//         }
//     ],
//     OperationList: [
//        {
//            listID:0,
//            title: 'First List',
//            cards:[
//                {id:0},
//                {id:1}
//            ]
//        },
//        {
//         listID:1,
//         title: 'Second List',
//         cards:[
//             {id:0},
//             {id:1}
//         ]
//         }
//     ],
//     StatusList: [
//         {
//             listID:0,
//             listTitle: 'First List',
//             cards:[
//                 {
//                 cardTitle: 'First Card',
//                 cardID:0,
//                 buttons:[
//                         {id:1,titleButton:'1'},
//                         {id:2,titleButton:'2'},
//                         {id:1,titleButton:'1'},
//                         {id:2,titleButton:'2'},
//                         {id:1,titleButton:'1'},
//                         {id:2,titleButton:'2'},
//                     ]
//                 },
//                 {
//                     cardTitle: 'Second Card',
//                     cardID:0,
//                     buttons:[
//                             {id:1,titleButton:'3'},
//                             {id:2,titleButton:'4'},
//                         ]
//                     }
//                ]
//          },
//          {
//          listID:1,
//             listTitle: 'Second List',
//             cards:[
//                 {
//                 cardTitle: 'First Card',
//                 cardID:0,
//                 buttons:[
//                         {id:1,titleButton:'1'},
//                         {id:2,titleButton:'2'},
//                     ]
//                 },
//                 {
//                     cardTitle: 'Second Card',
//                     cardID:0,
//                     buttons:[
//                             {id:1,titleButton:'3'},
//                             {id:2,titleButton:'4'},
//                         ]
//                     }
//                ]
//          }
//      ],
 

    // {
    // startTimer: moment({hours: 19, minutes: 30}),
    // cardsLists: [
    // {
    //     title:  " list 1 ",
    //     id: 'list-${0}',
    //     cards: [
    //     {   id:'cards-${0}',
    //         text: "we created a static list&card 0 " ,
    //         duration: moment.duration(53, 'minutes'),
    //     },
    //     {   id: 'cards-${1}',
    //     text: "we created a static list&card 1 ",
    //     duration: moment.duration(30, 'minutes'),
    // },
    //     ]
    // },
    // {
    //     title:  " list 2 ",
    //     id: 'list-${1}',
    //     cards: [
    //         {   id: 'cards-${2}',
    //             text: "test 1 " ,
    //             duration: moment.duration(30, 'minutes'),
    //         },
    //         {   id: 'cards-${3}',
    //             text: "test 2 ",
    //             duration: moment.duration(30, 'minutes'),
    //         },
    //         {   id: 'cards-${4}',
    //             text: "test 3 ",
    //             duration: moment.duration(30, 'minutes'),
    //         },
    //         {   id: 'cards-${5}',
    //             text: "test 4 ",
    //             duration: moment.duration(30, 'minutes'),
    //         },
    //     ]
    // }
   
    // ]    
    // }
    
// }

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
            listTitle: 'First List',
            cards:[
                {
                cardTitle: 'First Card',
                cardID:0,
                buttons:[
                        {id:1,titleButton:'1'},
                        {id:2,titleButton:'2'},
                        {id:1,titleButton:'1'},
                        {id:2,titleButton:'2'},
                        {id:1,titleButton:'1'},
                        {id:2,titleButton:'2'},
                    ]
                },
                {
                    cardTitle: 'Second Card',
                    cardID:0,
                    buttons:[
                            {id:1,titleButton:'3'},
                            {id:2,titleButton:'4'},
                        ]
                    }
               ]
         },
         {
         listID:1,
            listTitle: 'Second List',
            cards:[
                {
                cardTitle: 'First Card',
                cardID:0,
                buttons:[
                        {id:1,titleButton:'1'},
                        {id:2,titleButton:'2'},
                    ]
                },
                {
                    cardTitle: 'Second Card',
                    cardID:0,
                    buttons:[
                            {id:1,titleButton:'3'},
                            {id:2,titleButton:'4'},
                        ]
                    }
               ]
         }
     ],
     lists:
        {
    startTimer: moment({hours: 19, minutes: 30}),
    cardsLists: [
    {
        title:  " list 1 ",
        id: 'list-${0}',
        cards: [
        {   id:'cards-${0}',
            text: "we created a static list&card 0 " ,
            duration: moment.duration(53, 'minutes'),
        },
        {   id: 'cards-${1}',
        text: "we created a static list&card 1 ",
        duration: moment.duration(30, 'minutes'),
    },
        ]
    },
    {
        title:  " list 2 ",
        id: 'list-${1}',
        cards: [
            {   id: 'cards-${2}',
                text: "test 1 " ,
                duration: moment.duration(30, 'minutes'),
            },
            {   id: 'cards-${3}',
                text: "test 2 ",
                duration: moment.duration(30, 'minutes'),
            },
            {   id: 'cards-${4}',
                text: "test 3 ",
                duration: moment.duration(30, 'minutes'),
            },
            {   id: 'cards-${5}',
                text: "test 4 ",
                duration: moment.duration(30, 'minutes'),
            },
        ]
    }
   
    ]   
    }
    
     
     
}

export default combineReducers ({
    lists : listReducerCountDown,
    operationReducer: OperationReducer

});