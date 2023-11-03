import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const logout = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubsribe();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, googleSignIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
