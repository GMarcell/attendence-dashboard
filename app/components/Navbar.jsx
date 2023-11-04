import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
	const { user, googleSignIn, logout, EmailSignIn } = UserAuth();

	const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");

	const handleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignOut = async () => {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	};

  const handleSignInEmail = async () => {
		try {
			await EmailSignIn(email, password)
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const checkAuthentication = async () => {
			await new Promise((resolve) => setTimeout(resolve, 50));
			setLoading(false);
		};
		checkAuthentication();
	}, [user]);

	return (
		<div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
			<ul className="flex ">
				<li className="p-2 cursor-pointer">
					<Link href="/">Home</Link>
				</li>
				<li className="p-2 cursor-pointer">
					<Link href="/about">About</Link>
				</li>
				<li className="p-2 cursor-pointer">
					<Link href="/profile">Profile</Link>
				</li>
			</ul>
			{loading ? null : !user ? (
				<ul className="flex">
					<li
						className="p-2 cursor-pointer"
						onClick={() => document.getElementById("my_modal_3").showModal()}
					>
						Login
					</li>
					{/* <li onClick={handleSignIn} className="p-2 cursor-pointer">
						Login With Google
					</li> */}
					{/* <li onClick={handleSignIn} className="p-2 cursor-pointer">
						Sign Up
					</li> */}
				</ul>
			) : (
				<div>
					<p>Welcome, {user.email}</p>
					<p onClick={handleSignOut} className="cursor-pointer">
						Sign Out
					</p>
				</div>
			)}

			<dialog id="my_modal_3" className="modal">
				<div className="modal-box">
					<form method="dialog">
						Sign In With Email
						<div className="my-4">
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full"
									onChange={(e) => setpassword(e.target.value)}
								/>
							</div>
						</div>
						<button
							className="btn btn-active btn-primary"
							onClick={() => handleSignInEmail()}
						>
							Submit
						</button>
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
				</div>
			</dialog>
		</div>
	);
}

export default Navbar;
