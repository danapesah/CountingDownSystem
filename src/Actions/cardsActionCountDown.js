
import  {CONSTANTS} from "." 

export const addCardCountDown = (listID, text) => {
  return{
      type: CONSTANTS.ADD_CARD_COUNTDOWN,
      payload:{text, listID} //the data we want to add
  };
};

