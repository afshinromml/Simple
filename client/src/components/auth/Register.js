import React,{Fragment,useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
const Register = ()=>{

    let [getData,assignData]=useState({
        name:'',
        firma:'',
        date:'',
        email:'',
        password:'',
        password2:'',
        faxNumber:''
        })
        let {name,firma,date,email,password,password2,faxNumber}= getData;
        let onChange = e=>assignData({...getData,[e.target.name]:e.target.value})
        let onSubmit = async e => {
          e.preventDefault();
            if(password !== password2){
                console.log('passwords are not match')
                window.confirm("Passwords must be same")
            }else{
            let userNew = {
              name,firma,date,email,password,password2,faxNumber
            }
            try{
              const config ={
                headers:{'Content-Type':'application/json'}
              }
              let body = JSON.stringify(userNew)
              let res = await axios.post('http://localhost:5000/api/users',body,config)
              window.confirm("All data registered successfully")
              // const { token } = res.data;
              // localStorage.setItem('token', token);
              // console.log(localStorage.token)
            }catch(err){
              window.confirm("Your information is not correct")
              console.log(err.response.data)}
            }
        }
    return(
        <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i>Register yours</p>
      <form className="form" onSubmit={e=>(onSubmit(e))}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Firma" name="firma" value={firma} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Fax Number" name="faxNumber" value={faxNumber} 
          onChange ={e=>(onChange(e))}
          required />
        </div>

        <div className="form-group">
          <input type="date" placeholder="Date"  value={date} name="date"
             onChange ={e=>(onChange(e))}
          />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} name="email" 
             onChange ={e=>(onChange(e))}
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
            value={password} 
            onChange ={e=>(onChange(e))}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="8"
            value={password2} 
            onChange ={e=>(onChange(e))}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
       Have you registered? <Link to='/Login'>Sign In</Link>
      </p>
        </Fragment>
    )
}
export default Register