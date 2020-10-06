import React,{Fragment,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Register from './Register'
const Login = ()=>{

    let [getData,assignData]=useState({
        firma:'',
        email:'',
        password:'',
        token:''
        })
        let {firma,email,password}= getData;
        let isRegistered = false;
        let onChange = e=>assignData({...getData,[e.target.name]:e.target.value})
        let activate =()=>{
          if (isRegistered === true){
              window.open('/SampleSearch')
        //      window.open(`/insert/your/path/here/${variableName}`); 
          }else{
                window.open('/Spinner')
          }
      }

        let onSubmit = async e => {
          e.preventDefault();
            if(!password){
                console.log('type your password')
            }else{
            let user = {
           firma,email,password
            }
            try{
              const config ={
                headers:{'Content-Type':'application/json'}
              }
              let body = JSON.stringify(user)
              let res = await axios.post('http://localhost:5000/api/auth',body,config)

              console.log(res.data.token)
              //  const { token } = res.data;
              //  let token = res.data
               localStorage.setItem('token', res.data.token);
               window.confirm("You log in successfully")
              isRegistered = true
       
            }catch(err){
              window.confirm("Your information is not correct")
              console.log(err.response.data)}
            }
        }
    return(
        <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <form className="form" onSubmit={e=>(onSubmit(e))}>
  
        <div className="form-group">
          <input type="text" placeholder="Firma" name="firma" value={firma} 
          onChange ={e=>(onChange(e))}
          required />
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} name="email" 
             onChange ={e=>(onChange(e))}
          />
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
        <input type="submit" className="btn btn-primary" value="Sign in" />

        <button onClick={activate}>
        go to product search</button>
      </form>
      
      <p className="my-1">
       Not register? <Link to='/Register'>Register</Link>
      </p>
        </Fragment>
    )
}
export default Login