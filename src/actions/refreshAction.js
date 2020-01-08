
import  {CONSTANTS} from "../actions" 

export const refresh = () => {
  return{
      type: CONSTANTS.REFRESH,
      payload: ''
  };
};
