import Loader from 'react-loader-spinner';
import React from 'react';
import {Link} from 'react-router-dom';
export default class Spinner extends React.Component {
	//other logic
	render() {
		return(
            <div>

            <Loader
				type='Oval'
				color="#00BFFF"
				height={200}
				width={200}
				timeout={99000} //3 secs
			/>
            <Link to="/Admin">Try again</Link>
            </div>

		);
	}
}
