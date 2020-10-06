import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
// const Landing =  ()=> {
//   return (
//     <section className="landing">
//       <div className="dark-overlay">
//         <div className="landing-inner">
//           <h1 className="x-large">AMA industrial company</h1>
//           <p className="lead">
//            We will send you certificate of products which you buy them from us 
//           </p>
//           <div className="buttons">
//             <a href="register.html" className="btn btn-primary">Sign Up</a>
//             <a href="login.html" className="btn btn-light">Login</a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

class Landing extends React.Component {
	render() {
		return (
			<div>
				<section className="landing">
					<div className="dark-overlay">
						<div className="landing-inner">
							<h1 className="x-large">Developer Connector</h1>
							<p className="lead">
              We will send you certificate of products which you buy them from us 
							</p>
							<div className="buttons">
								<Link to="/register" className="btn btn-primary">Sign Up</Link>
								<Link to="/login" className="btn btn-light">Login</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Landing;