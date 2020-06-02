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

export const changeCheckBoxStateOperation = (cardID,listID,checkBoxID) => {
  return{
      type: CONSTANTS.CHANGE_CHECKBOX_STATE_OPERATION,
      payload: {cardID,listID,checkBoxID},
  };
};

export const updateRealTimeClock = (cdrcClock, todClock) =>{
    return{
      type: CONSTANTS.UPDATE_REAL_TIME_CLOCK,
      payload: {cdrcClock, todClock},
  };
};