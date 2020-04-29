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

export const deleteCardFieldStatus = (listID, cardID) => {
  return{
      type: CONSTANTS.DELETE_CARD_FIELDSTATUS,
      payload: {listID, cardID}
  };
};

export const deleteListFieldStatus = (listID) => {
  return{
      type: CONSTANTS.DELETE_LIST_FIELDSTATUS,
      payload: {listID}
  };
};

export const addListFieldStatus = (listTitle) => {
  return{
      type: CONSTANTS.ADD_LIST_FIELDSTATUS,
      payload: {listTitle}
  };
};
