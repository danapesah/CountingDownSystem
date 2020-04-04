import React, {Component} from 'react'

class LoginPage extends Component
{
    render(){
   return(
        <div class="container" >
            <h1 class="teal-text">Count Down System</h1>
        <form class="col s12">
        <div class="row">
            <div class="input-field col s6">
            <input id="Username" type="text" class="validate"></input>
            <label for="Username">Username</label>
            </div>
            <div class="input-field col s6">
            <input id="password" type="text" class="validate"></input>
            <label for="password">Password</label>
            </div>
        </div>
        </form>
        <a class="waves-effect waves-light btn">Enter</a>
      </div>
        )
        }
}

export default LoginPage;