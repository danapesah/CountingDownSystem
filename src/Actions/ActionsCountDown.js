
import  {CONSTANTS} from "." 
export const addEventCountDown = (title,startHour,endHour,comments, entity) => {
  return{
      type: CONSTANTS.ADD_EVENT_COUNTDOWN,
      payload:{title,startHour,endHour,comments, entity}
  };
};

export const deleteEventCountDown = (id) => {
  return{
      type: CONSTANTS.DELETE_EVENT_COUNTDOWN,
      payload:{id}
  };
};

export const deleteEntityCountDown = (id) => {
  return{
      type: CONSTANTS.DELETE_ENTITY_COUNTDOWN,
      payload:{id}
  };
};

export const addEntityCountDown = (title) => {
  return{
      type: CONSTANTS.ADD_ENTITY_COUNTDOWN,
      payload:{title}
  };
};
