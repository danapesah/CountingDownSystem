
import  {CONSTANTS} from "../actions" 

export const addCard = (listID, text) => {
  return{
      type: CONSTANTS.ADD_CARD,
      payload:{text, listID} //the data we want to add
  };
};

