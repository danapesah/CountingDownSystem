import React , {Component} from 'react'
import SizeOfT from'./SizeOfT'


class App extends Component {
  constructor(props) {
    super(props) 
  this.state = {
    // numofColumns: "1",
    // numofRows: "1",
    columns:[{name: "זמן"}],
    rows: [{time: "1"}],
  }
  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

}
// handleChange(event) {
//   this.setState({numofColumns: event.target.value});
// }
// handleSubmit(event) {
//   alert('numbers  of columns: ' + this.state.numofColumns);
//   event.preventDefault();
// }
  render()
  {
  console.log(this.state.columns[0].name);
  console.log(this.state);

  
     return (
    <div className="App">
      <SizeOfT/>
          {/* <form onSubmit={this.handleSubmit}>
        <label>
         enter the numbers of columns:
          <input type="text" value={this.state.numofColumns} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
 */}

      
            <table className="table" style={styles.forTable}>
            <tbody>
                    <tr>
                        <td>{this.state.columns[0].name}</td>
                        <td>{this.props.numofColumns}</td>
                    </tr>
                    <tr> 
                
                  <td>{this.state.rows[0].time}</td>
                </tr>
            </tbody>
                </table>

  
    </div>
  ); 
  }

}
const styles={
  forTable:{
    margin: "auto",   
    height:50,
    width: 50,  
    display:"flex", 
    marginRight: 50,  
    marginTop:8,
    borderRadius :"3" ,   
    backgroundColor: 'pink',
  }
}

export default App;
