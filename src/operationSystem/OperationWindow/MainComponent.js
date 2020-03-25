
import React,{Component} from 'react'
import { connect  } from 'react-redux'
import OperationList from './OperationList'
import OperationAddListButton from './OperationAddListButton'
import planePic from './plane.jpeg'
import helicopterPic from './helicopter.jpeg'



const picArray=[
    planePic,
    helicopterPic
]
let picIndex=1;
class MainWindow extends Component
{
     
   changePic = (e) =>
   {


        e.target.src=picArray[picIndex];
        if(picIndex === 1)
            picIndex=0;
        else
            picIndex++;
       
   }


    render()
    {  
        const {lists} = this.props;
        return(
        <div>
        <div class="center">חלון אופרציה</div>
        <div style={styles.blockStyle}>
        <div style={styles.lineContainer}>
            <p style={ {marginBottom:"10%"}}> שם משימה </p>
            <p> אישור ירידה</p>
            <p> אישור המראה </p>
            <p> המראה </p>
        </div  >
        <div style={styles.listsContainer}>
        {lists.map(list => 
          ( <OperationList listID={list.listID} key ={list.id} title = {list.title} cards = {list.cards} changePic={this.changePic} />))}
          <OperationAddListButton/>
          </div> 
        </div>
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        lists: state.OperationList
    }
}

const styles = {
    listsContainer:
    {
     //display:"flex",
     display:"inline",
     float:"right",
     backgroundColor:"#1aa3ff", 
     margin:"auto",
    },
    lineContainer:
    {   
     //paddingBottom:"3",
     width:"auto",
     float:"right",
    flexDirection:"column",
     backgroundColor:"#66c2ff", 
     marginTop:"7%"
     // marginLeft: 450,
      //margin:"auto"
    },
    blockStyle:
    {   
    //display:"inline"
    },
}

export default connect(mapStateToProps)(MainWindow)