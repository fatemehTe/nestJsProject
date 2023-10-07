import React from 'react'
import * as api from '../API/Api.js';
import  {}  from "react-router-dom";
import { Home } from './Home.js';
import './Register.css';

export class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state ={userName:'', password:'',rePassword:'', showRegister:false, email:''}

      this.handleUserNameChange = this.handleUserNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    handleUserNameChange(event) {
        this.setState({userName: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handleRePasswordChange(event) {
        this.setState({rePassword: event.target.value});
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        let foundedUser = api.findUser({userName:this.state.userName, password:this.state.password}).then((res)=>{
            if(res.object.data.userName){
                alert(` welocome ${res.object.data.userName} `)
                window.location = '/home';
            }
            else if(!res.object.data.userName){
                alert(` user not found try again`)
            }
            
        })
        event.preventDefault();
    }

    render() {
        return (
                <div className="App">
                     {this.state.showRegister && (
                        <div style={{position:'absolute', top:'400px', height:'auto', padding:'20px',borderRadius:'10px', marginLeft:'40%', marginRight:'40%', backgroundColor:'gray'}}>
                            <div style={{fontWeight:'bold',fontSize:'24px', marginBottom:'10px'}}>Glad to have you here :)</div>
                            <div className='form-container'>
                                <div className='form-label' >userName:</div>
                                <input type="text" value={this.state.userName} onChange={this.handleUserNameChange}/>
                                <div className='form-label' >email:</div>
                                <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
                                <div className='form-label' >password:</div>
                                <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                                <div className='form-label' >rePassword:</div>
                                <input type="password" value={this.state.rePassword} onChange={this.handleRePasswordChange}/>
                            </div>
                        <button style={{marginTop:'20px'}} onClick={()=>{
                            
                            if(this.state.password === this.state.rePassword){
                                api.createUser({userName:this.state.userName, email:this.state.email, password:this.state.password}).then(()=>{
                                    alert(` ${this.state.userName} added `);
                                })
                                this.setState({showRegister:false})
                            }else{
                                alert(` password didnt match, try again `);
                            }
                            
                        }}>register</button>
                    </div>
                )}
                    <header className="App-header">
                    <form onSubmit={this.handleSubmit} style={{border:'1px solid white', padding:'5px'}}>
                        <div className='form-container'>
                            <div className='form-label' >UserName:</div>
                            <div>
                                <input type="text" value={this.state.userName} onChange={this.handleUserNameChange}/>
                            </div>
                            <div className='form-label' >Password:</div>
                            <div>
                                <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                        </div>
                        <input type="submit" value="LOGIN" />
                        <div>
                            <input type="button" value="not have an account, Register" onClick={()=>{
                                this.setState({showRegister:true})
                            }}/>
                        </div>
                    </form>
                    </header>
                </div>
              )
    }
}