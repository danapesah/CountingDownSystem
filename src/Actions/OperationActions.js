import  {CONSTANTS} from "." 

export const addListOperation = () => {
  return{
      type: CONSTANTS.ADD_LIST_OPERATION,
  };
};


export const addCardOperation = (listID) => {
  return{
      type: CONSTANTS.ADD_CARD_OPERATION,
      payload: {listID},
  };
};