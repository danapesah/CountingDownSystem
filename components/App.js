import React , {Component} from 'react';
import TrelloList from "./TrelloList"
import {connect } from 'react-redux'
class App extends Component {
  render ()
  {

    const {lists} = this.props;
    return (
      <div className="App">
        <h2>hello App.ls</h2>
       {lists.map(list =>  ( <TrelloList title = {list.title} cards = {list.cards}  />))}



      </div>
    );
  }
  
}

const mapStateToProps = state=> ({
  Lists: state.Lists
})

export default connect(mapStateToProps) (App);
