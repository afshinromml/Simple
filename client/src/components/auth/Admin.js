import React,{Fragment,useState} from 'react';
import axios from 'axios';
 import {Link} from 'react-router-dom';
 //import Popup from 'react-popup';
// import Register from './Register'
// import Sample from '../product/Sample'
// import Spinner from '../alert/Spinners'

const Admin = ()=>{
    let [getData,assignData]=useState({
        email:'',
        password:'',
        name:'',
     //   token:''
        })

        let {email,password,name}= getData;
        let isRegistered = false
        let onChange = e=>assignData({...getData,[e.target.name]:e.target.value})
        let activate =()=>{
            if (isRegistered === true){

                window.open('/Sample')
          //      window.open(`/insert/your/path/here/${variableName}`); 
            }else{
          // Popup.alert('I am alert, nice to meet you');
                  // info
                  // just an alias to alert.show(msg, { type: 'info' })
                  window.open('/Spinner')
               // console.log("no")
            }
        }
        let onSubmit = async e => {
          e.preventDefault();
          localStorage.removeItem("token")  
            if(!password){
                console.log('you must enter password')
            }else{
                let admin = {
                    name,email,password
                      }
                      try{
                        const config ={
                          headers:{'Content-Type':'application/json'}
                        }
                        let body = JSON.stringify(admin)
                        let res = await axios.post('http://localhost:5000/api/admin',body,config)
                        console.log(res.data.token)
                      //  const { token } = res.data;
                      //  let token = res.data
                       localStorage.setItem('token', res.data.token);
                    //    localStorage.setItem('token', token);
                     //   console.log(localStorage.token)
                      isRegistered = true
                      }catch(err){
                      //  Popup.alert('I am alert, nice to meet you');
                          isRegistered = false
                        localStorage.removeItem("token")  
                        console.log(err.response.data)}
                        window.confirm("Your user name or password is wrong")
            }
        }
    return(
        <Fragment>
      <h1 className="large text-primary">Log in admin</h1>
      <form className="form" onSubmit={e=>(onSubmit(e))}>
  
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} 
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
        <input type="submit" className="btn btn-primary" value="Log in" />
      </form>
      <button onClick={activate}>
        go to product list</button>

        {/* <p className= 'my-1'>
		Sample Register? <Link to="/Sample">Sample Page</Link>
	  </p> */}

{/* {isRegistered === true
        ?<Link to="/Sample">Sample Page</Link> 
        :<Link to="/Login">Login Page</Link>
      } */}

     {/* if ({localStorage.token} === '' {
			        <p className= 'my-1'>
                    Sample Register? <Link to="/Sample">Sample Page</Link>
                  </p>
		}  */}
        </Fragment>
    )
}
export default Admin