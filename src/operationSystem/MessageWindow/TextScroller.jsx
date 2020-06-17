import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text, length }) => {
  const [key, setKey] = useState(1);
  let toPrecentege;
  if(length<=150)
    toPrecentege="100%";
  else if(length>150 && length<=300)
    toPrecentege="200%";
  else if(length>300 && length<=450)
    toPrecentege="300%";
  else if(length>450 && length<=600)
    toPrecentege="400%";  
  else
  toPrecentege="500%";  
  const scrolling = useSpring({
    from: { transform: "translate(100%,0)" },
    to: { transform: "translate(-"+toPrecentege+",0)"},
    config: { duration: 30000 },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    }
  });

  return (
    <div key={key}>
      <animated.div style={scrolling}>{text}</animated.div>
    </div>
  );
};

export default TextScroller;
    