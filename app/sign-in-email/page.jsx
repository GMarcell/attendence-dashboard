'use client'
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";

function SignInEmail() {
	const { EmailSignIn } = UserAuth();

	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");
  const [successLogin, setSuccessLogin] = useState(false)

	const handleSignIn = async () => {
		try {
			await EmailSignIn(email, password).then(() => {
        setSuccessLogin(true)
      });
		} catch (error) {
			console.log(error);
		}
	};

  console.log(typeof password)

	return (
		<div className="p-4">
			SignInEmail
			<div className="my-4">
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
            onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
            onChange={e => setpassword(e.target.value)}
					/>
				</div>
			</div>
			<button className="btn btn-active btn-primary" onClick={() => handleSignIn()}>Submit</button>
      {successLogin ? (
        <p>
          Sucess Login Email
        </p>
      ) : null}
		</div>
	);
}

export default SignInEmail;
