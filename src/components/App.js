import React , {Component} from 'react'
import TrelloList from "./TrelloList"
import {connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import {DragDropContext} from "react-beautiful-dnd"
import {sort} from "../actions"
import {refresh} from '../actions'

class App extends Component {
  onDragEnd = (result)=>{
    //a function that will run when dragging ends
    const {destination, source, draggableId }= result;
    if (!destination){
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  componentDidMount() {
    setInterval(() => {
      this.props.dispatch(refresh())
    }, 1000);
  }

  render ()
  {
    const {lists} = this.props;

    return (
      <DragDropContext   onDragEnd= {this.onDragEnd} > 
      <div>
        <h2>COUNTDOWN WINDOW</h2>
    <div>{lists.startTimer.calendar()}</div>
         <div style={styles.listsContainer}>
            {lists.cardsLists.map(list => 
          ( <TrelloList listID={list.id} key ={list.id} title = {list.title} cards = {list.cards}  />))}
          <TrelloActionButton list />

       </div>
      </div>
      </DragDropContext>
    );
  }
  
}
const styles = {
  listsContainer:
  {
    display:"flex",
    flexDirection:"row",
  }
};
const mapStateToProps = state=> ({
  lists: state.lists
})

export default connect(mapStateToProps) (App);
