import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
	const { user, googleSignIn, logout, EmailSignIn } = UserAuth();

	const [loading, setLoading] = useState(true);

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
					<li className="p-2 cursor-pointer">
						<Link href="/sign-in-email">Login With Email</Link>
					</li>
					<li onClick={handleSignIn} className="p-2 cursor-pointer">
						Login
					</li>
					<li onClick={handleSignIn} className="p-2 cursor-pointer">
						Sign Up
					</li>
				</ul>
			) : (
				<div>
					<p>Welcome, {user.displayName}</p>
					<p onClick={handleSignOut} className="cursor-pointer">
						Sign Out
					</p>
				</div>
			)}
		</div>
	);
}

export default Navbar;
