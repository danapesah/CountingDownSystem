import React from 'react';
import LoginPage from './LoginPage'
import MainWindow from './operationSystem/MainWindow'
import InputSelect from 'react-select-input';
import NumberFormat from 'react-number-format';
import TestScheduler from './operationSystem/countDownWindow/TestScheduler';
import FirstPage from './FirstPage'
import "bootstrap/dist/css/bootstrap.min.css";


function App() {


  return (

<div>
    {/* <FirstPage/> */}

    {/* {console.log(window.location.pathname) } */}
       {/* <MainWindow  /> */}
       <MainWindow  />
       <FirstPage  />
       </div>
  );
}

export default App;

