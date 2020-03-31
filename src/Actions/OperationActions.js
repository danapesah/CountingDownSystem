import  {CONSTANTS} from "." 

export const addListOperation = () => {
  return{
      type: CONSTANTS.ADD_LIST_OPERATION,
  };
};


export const addCardOperation = (listID, cardTitle, cardType) => {
  return{
      type: CONSTANTS.ADD_CARD_OPERATION,
      payload: {listID, cardTitle, cardType},
  };
};


export const deleteCardOperation = (cardID,listID) => {
  return{
      type: CONSTANTS.DELETE_CARD_OPERATION,
      payload: {cardID,listID},
  };
};


export const addRowOperation = (rowTitle) => {
  return{
      type: CONSTANTS.ADD_ROW_OPERATION,
      payload: {rowTitle},
  };
};

export const deleteRowOperation = (rowPlace) => {
  return{
      type: CONSTANTS.DELETE_ROW_OPERATION,
      payload: {rowPlace},
  };
};

export const deleteListOperation = (ListID) => {
  return{
      type: CONSTANTS.DELETE_LIST_OPERATION,
      payload: {ListID},
  };
};