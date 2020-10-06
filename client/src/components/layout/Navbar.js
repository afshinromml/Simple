import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Login from '../auth/Login'
import Register from '../auth/Register'
import Admin from '../auth/Admin'
class Navbar extends Component {
	render() {
		return (
            <nav className="navbar bg-dark">
            <h1>
              <Link to="index.html"><i className= "">
                </i>Request certificate</Link>
            </h1>
            <ul>
              <li><Link to="/Admin">Admin</Link></li>
              <li><Link to='/register'>Register</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
		);
	}
}

export default Navbar;