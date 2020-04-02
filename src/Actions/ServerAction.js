
import  {CONSTANTS} from "." 

export const save_new_table_state = (id) => {
  return{
      type: CONSTANTS.SAVE_STATE,
      payload: {id}
  };
};
export const change_to_show_chosen_table_state = (res, eve) => {
export const change_to_show_chosen_table_state = (chosen_table_state) => {
    return{
        type: CONSTANTS.CHANGE_STATE,
        payload:{res, eve}
        payload:{chosen_table_state}
    };
  };
  export const set_new_table = () => {
  export const set_new_table = (title, down_count , up_count) => {
    return{
        type: CONSTANTS.SET_NEW_TABLE,
        
        payload:{title, down_count , up_count}
    };
  };




  