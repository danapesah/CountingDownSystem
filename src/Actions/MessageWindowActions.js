import  {CONSTANTS} from "." 

export const updateMessage = (message) => {
  return{
      type: CONSTANTS.UPDATE_MESSAGE_MESSAGEWINDOW,
      payload: {message}
  };
};
