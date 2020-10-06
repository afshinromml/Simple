import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import './css/style.css'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Admin from './components/auth/Admin'
import Sample from './components/product/Sample'
import Spinner from './components/alert/Spinners'
//import SampleSearch from './components/product/SampleSearch'
import SampleSearch from './components/product/SampleSearch'

const App = () => (
  <Router>
  <Fragment>
    <Navbar />
    
   <Route exact path = '/' component = {Landing} />
   <section className="container" >
   <Switch>
   <Route exact path = '/Register' component = {Register} />
   <Route exact path = '/Login' component = {Login} />
   <Route exact path = '/Admin' component = {Admin} />
   <Route exact path = '/Sample' component = {Sample} />
   <Route exact path = '/Spinner' component = {Spinner} />
   <Route exact path = '/SampleSearch' component = {SampleSearch} />
   </Switch>
   </section>

 </Fragment>
 </Router>
)
 
export default App;

   //<Route exact path = '/SampleSearch' component = {SampleSearch} />