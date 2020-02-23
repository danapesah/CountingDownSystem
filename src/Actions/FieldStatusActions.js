import  {CONSTANTS} from "." 

export const deleteButtonFieldStatus = (cardID,buttonID,listID) => {
  return{
      type: CONSTANTS.DELETE_BUTTON_FIELDSTATUS,
      payload: {cardID,buttonID,listID}
  };
};