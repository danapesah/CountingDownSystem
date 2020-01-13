import  {CONSTANTS} from "." 

export const addList = () => {
  return{
      type: CONSTANTS.ADD_LIST,
  };
};


export const addCard = (listID) => {
  return{
      type: CONSTANTS.ADD_CARD,
      payload: {listID},
  };
};