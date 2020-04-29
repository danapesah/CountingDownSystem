import  {CONSTANTS} from "." 

export const save_user_info_after_login = (name, permissions, islogged , prevState) => {
    return{
        type: CONSTANTS.SAVE_USER_INFO,
        payload: {name, permissions, islogged,prevState}
    };
  };
