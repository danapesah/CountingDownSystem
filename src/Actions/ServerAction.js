
import  {CONSTANTS} from "." 

export const save_new_table_state = (id) => {
  return{
      type: CONSTANTS.SAVE_STATE,
      payload: {id}
  };
};
export const change_to_show_chosen_table_state = (res, eve) => {
    return{
        type: CONSTANTS.CHANGE_STATE,
        payload:{res, eve}
    };
  };
  export const set_new_table = () => {
    return{
        type: CONSTANTS.SET_NEW_TABLE,
        
    };
  };




  