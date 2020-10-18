import React, { useReducer, useRef } from "react";
import ReactDOM from "react-dom";
import { Fragment,useState } from "react";
import axios from "axios";

// import "./styles.css";

let SampleSearch = ()=> {
  // Use the useRef hook to store a mutable value inside a functional component for the counter
  
  let [getData, assignData] = useState({
    bachNumber: "",
  });
  let {product,bachNumber,lotNumber,UTS,Elongation,Impact,CPercent
    ,Yield,Ppercent,MnPercent,Spercent,result}= getData;

//   let result = {};  
  let countref = useRef(0);
  //let countref1 = useRef(1)
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
   
    countref.current++;
    console.log("Count = ", countref.current);
    forceUpdate(); // If you comment this out, the date and count in the screen will not be updated
  }
  let onChange = (e) =>
    assignData({ ...getData, [e.target.name]: e.target.value });
  let logout = () => {
    localStorage.token = "";
    console.log(localStorage.token);
  };

  let sendMail = async () => {
 
    const config ={
      headers:{
        'Content-Type':'application/json',
        'x-auth-token' : localStorage.token
    } 
    }
    await axios.post('http://localhost:5000/api/sendMail',config)

    //console.log(res.data.token)
    //  const { token } = res.data;
    //  let token = res.data
     //localStorage.setItem('token', res.data.token);
     window.confirm("Your certificate sent")
 
  };

  let onSubmit = async (e) => {

    assignData({ ...getData,
      lotNumber: '',
      product: '',
      UTS:'',
      Elongation:'',
      Impact:'',
      CPercent:'',
      Ppercent:'',
      Yield:'',
      MnPercent:'',
      Impact:'',
      Spercent:''
  });

    e.preventDefault();
    if (!bachNumber) {
      console.log("bachNumber is empty");
    } else {
      let userProduct = {
        bachNumber,
      };
      let body = JSON.stringify(userProduct);
       const config ={
        headers:{'Content-Type':'application/json',
        'x-auth-token':localStorage.token,
        'body':body
      }
      }
let url = "http://localhost:5000/api/profile/me/"
      const AuthStr = "Bearer ".concat(localStorage.token);
      axios.get(url,config)

        .then((response) => {
         // console.log(response.data);

         result = response.data
         
      //   assignData({ ...getData, product: result.product});
         
         console.log({getData})
         assignData({ ...getData,
        lotNumber: result.lotNumber,
        product: result.product,
        UTS:result.UTS,
        Elongation:result.Elongation,
        Impact:result.Impact,
        CPercent:result.CPercent,
        Ppercent:result.CPercent,
        Yield:result.Yield,
        MnPercent:result.MnPercent,
        Impact:result.Impact,
        Spercent:result.Spercent
    });

         console.log({getData})

        })
        .catch((error) => {
          console.log("error 3 " + error);
        });

    }
  }

  return (

    <Fragment>
    <h1 className="large text-primary">Product</h1>
    <p className="lead">
      <i className="fas fa-user"></i>Type Bach Number here
    </p>
    <form className="form" onSubmit={(e) => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="bachNumber"
          name="bachNumber"
          value={bachNumber}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <input type="submit" className="btn btn-primary" value="Search" />
      <button type="button" className="btn btn-primary" onClick={logout}>
        Log out
      </button>
      <button type="button" className="btn btn-primary" onClick={sendMail}>
        Send Mail
      </button>
    </form>

      <h1 className ='text-center'>Name of product ={product}</h1>
      <h2>Bach Number = {bachNumber}</h2>
      <h2>Lot Number ={lotNumber}</h2>
      <h2>Mn Percent ={MnPercent}</h2>
      <h2>C Percent ={CPercent}</h2>
      <h2>P Percent ={Ppercent}</h2>
      <h2>S Percent ={Spercent}</h2>
       <h2>Tensile Strength ={UTS}</h2>
       <h2>Elongation 30% ={Elongation}</h2>
       <h2>Imact energy ={Impact}</h2>
       <h2>Yield Strength ={Yield}</h2>

       <h1> {new Date().toLocaleString()} </h1>
      {/* <button
        onClick={() => {
          handleClick();
        }}
      >
        ClickToUpdateDateAndCount
      </button> */}
  </Fragment>

  );
}
export default SampleSearch;

    // <h2>You clicked {countref.current} times</h2> 