
import  {CONSTANTS} from "." 

export const save_new_table_state = (id) => {
  return{
      type: CONSTANTS.SAVE_STATE,
      payload: {id}
  };
};
export const change_to_show_chosen_table_state = (chosen_table_state) => {
    return{
        type: CONSTANTS.CHANGE_STATE,
        payload:{chosen_table_state}
    };
  };
  export const set_new_table = (title, down_count , up_count,message) => {
    return{
        type: CONSTANTS.SET_NEW_TABLE,
        payload:{title, down_count , up_count,message}
    };
  };
  

  export const edit_title_hours = (title, down_count , up_count, id) => {
  /*save the new title and  hours if there was an update/edit */
    return{
        type: CONSTANTS.SET_EDIT_TABLE,
        payload:{title, down_count , up_count, id }
    };
  };





  