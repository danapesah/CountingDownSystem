import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './SystemManagement/UserManagement/Routes'

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}
export default App;

// React.useEffect(()=>{
//   localStorage.setItem('my-state', JSON.stringify(this.props.state));
// })