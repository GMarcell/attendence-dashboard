import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
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

	const EmailSignIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
	}

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
		<AuthContext.Provider value={{ user, googleSignIn, logout, EmailSignIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
