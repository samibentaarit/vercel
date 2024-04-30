import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import React, { Fragment } from "react";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	console.log(param.id, param.token);

	useEffect(() => {
		const verifyEmailUrl = async () => {

			try {
				const url = `http://localhost:4000/user/users/${param.id}/verify/${param.token}`;
				console.log("Verification URL:", url);

				const { data } = await axios.get(url);
				console.log(data);

				setValidUrl(true);
			} catch (error) {
				console.log(error.response.status, error.response.data);
								setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (

				<div className={styles.container}>
				
					<h1>Email verified successfully</h1>
					<Link to="/login">
					<button type="submit" className="button-gg mb33">Login</button>
					</Link>
					<div className={styles.footer}>

				</div>
						
							</div>



			) : (
				<div className={styles.container}>
				<h1>404 Not Found</h1><div className={styles.footer}>
				</div>
					</div>
			)}
		</Fragment>
	);
};

export default EmailVerify;