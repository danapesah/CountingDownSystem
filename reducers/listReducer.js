const initialState =[
    {
        title:  " last epi",
        id: 0,
        cards: [
        {   id: 0,
            text: "we created a static list&card 0 " ,
        },
        {   id: 1,
            text: "we created a static list&card 1 ",
        },



        ]
    }
];

const listReducer = (state = initialState, action)=> {
switch (action.type){
    default:
        return state;
    }
};


export default listReducer;