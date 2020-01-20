
import  {CONSTANTS} from "." 
export const addListCountDown = (title) => {
  return{
      type: CONSTANTS.ADD_LIST_COUNTDOWN,
      payload:title
  };
};

export const sortCountDown = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
)=> {
  return {
    type: CONSTANTS.DRAG_HAPPENED_COUNTDOWN,
    payload:{
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    }
  };
};