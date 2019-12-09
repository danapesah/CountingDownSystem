import React from 'react';
import  {Rnd}  from 'react-rnd';


function AddingColumn (probs) {

      return (
        <div>

            <Rnd
            style={style}
            default={{
                x: 500,
                y: 0,
                width: 200,
                height: 400
            }}
            >
          {probs.name}
            </Rnd>
    
        </div>
      );
  
  }
  
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    //background: "#f0f0f0"
  };
  
  
  
  export default AddingColumn;
  