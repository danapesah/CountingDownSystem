import  {CONSTANTS} from "." 

export const deleteButtonFieldStatus = (cardID,buttonID,listID) => {
  return{
      type: CONSTANTS.DELETE_BUTTON_FIELDSTATUS,
      payload: {cardID,buttonID,listID}
  };
};

export const addButtonFieldStatus = (cardID,listID,buttonTitle) => {
  return{
      type: CONSTANTS.ADD_BUTTON_FIELDSTATUS,
      payload: {cardID,listID, buttonTitle}
  };
};

export const addCardFieldStatus = (listID,cardTitle, cardComments) => {
  return{
      type: CONSTANTS.ADD_CARD_FIELDSTATUS,
      payload: {listID,cardTitle,cardComments}
  };
};