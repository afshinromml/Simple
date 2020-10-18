import React,{Fragment,useState} from 'react';
import axios from 'axios'
const Sample = ()=>{

    let [getData,assignData]=useState({
        product:'',
        bachNumber:'',
        lotNumber:'',
        UTS:'',
        Elongation:'',
        Impact:'',
        Ppercent:'',
        Spercent:'',
        MnPercent:'',
        CPercent:'',
        Yield:''
        })
        let {product,bachNumber,lotNumber,UTS,Elongation,Impact,CPercent
            ,Yield,Ppercent,MnPercent,Spercent}= getData;
        let onChange = e=>assignData({...getData,[e.target.name]:e.target.value})
        let logout = ()=>{
       // localStorage.removeItem({token});
       localStorage.token = ''
       console.log(localStorage.token)
        };
        let onSubmit = async e => {
          e.preventDefault();
            if(!product){
                console.log('product is empty')
            }else{
            let userProduct = {
                product,bachNumber,lotNumber,UTS,Elongation,Impact,CPercent
                ,Yield,Ppercent,MnPercent,Spercent
            }
            try{
              const config ={
                headers:{'Content-Type':'application/json',
                'x-auth-token':localStorage.token}
              }
              let body = JSON.stringify(userProduct)
              let res = await axios.post('http://localhost:5000/api/profile/',body,config)
              window.confirm("All data registered successfully")
            //  console.log(res.data)
            }catch(err){console.log(err.response.data)
              window.confirm("Can not registered")
            }
            }
        }
    return(
        <Fragment>
      <h1 className="large text-primary">Product</h1>
      <p className="lead"><i className="fas fa-user"></i>Register Specification of product</p>
      <form className="form" onSubmit={e=>(onSubmit(e))}>
        <div className="form-group">
          <input type="text" placeholder="Product" name="product" value={product} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="bachNumber" name="bachNumber" value={bachNumber} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="lotNumber" name="lotNumber" value={lotNumber} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="UTS" name="UTS" value={UTS}
             onChange ={e=>(onChange(e))}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Elongation" name="Elongation" value={Elongation} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Impact" name="Impact" value={Impact} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Ppercent" name="Ppercent" value={Ppercent} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="MnPercent" name="MnPercent" value={MnPercent} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="CPercent" name="CPercent" value={CPercent} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Yield" name="Yield" value={Yield} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Spercent" name="Spercent" value={Spercent} 
          onChange ={e=>(onChange(e))}
          required />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
        <button type="button" 
        className="btn btn-primary"
        onClick={logout}
        >Log out</button>
      </form>
        </Fragment>
    )
}
export default Sample