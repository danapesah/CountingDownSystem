import React from 'react';
import  {Rnd}  from 'react-rnd';


class AddingState extends React.Component {

    render()
    {
      return (
        <div>

            <Rnd
            style={style}
            default={{
                x: 0,
                y: 0,
                width: 100,
                height: 100
            }}
            >
              state 
            </Rnd>
    
        </div>
      );
  
    }
  }
  
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };
  
  
  
  export default AddingState;
  