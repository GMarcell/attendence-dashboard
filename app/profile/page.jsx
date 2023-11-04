"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

function ProfilePage() {
	const { user } = UserAuth();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			await new Promise((resolve) => setTimeout(resolve, 50));
			setLoading(false);
		};
		checkAuthentication();
	}, [user]);

	return (
		<div className="p-4">
			{user ? (
				<p>Congrats, You are Logged In {user.email}</p>
			) : (
				<p>You need to Login</p>
			)}
		</div>
	);
}

export default ProfilePage;
