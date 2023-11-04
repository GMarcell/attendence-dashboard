"use client";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Home() {
	const [date, setDate] = useState("");
	const [man, setMan] = useState(0);
	const [woman, setWoman] = useState(0);
	const [child, setChild] = useState(0);

	const [toastShow, setToastShow] = useState(true);
	const [toastMesasge, setToastMesasge] = useState("");
	const [toastSucess, setToastSucess] = useState(true);

	const addData = () => {
		if (date == "") {
			setToastMesasge("Date is Required");
			setToastShow(true);
			setToastSucess(false);
			console.log("hello");
		} else {
			const data = {
				date: date,
				man: Number(man),
				woman: Number(woman),
				child: Number(child),
			};
			addDoc(collection(db, "attendence"), data).then(() => {
				setDate("");
				setMan(0);
				setWoman(0);
				setChild(0);
				setToastShow(true);
				setToastMesasge("Data Added Succesfully");
				setToastSucess(true);
			});
		}
	};

	return (
		<main className="p-4">
			{toastShow ? (
				<div className="toast toast-top toast-end">
					<div className={`alert alert-${toastSucess ? "success" : "error"}`}>
						<span>{toastMesasge}</span>
					</div>
				</div>
			) : null}

			<div className="flex justify-between">
				<div className="form-control w-full ml-4">
					<label className="label">
						<span className="label-text">Tanggal</span>
					</label>
					<input
						type="date"
						placeholder="Type here"
						className="input input-bordered w-full"
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div className="form-control w-full ml-4">
					<label className="label">
						<span className="label-text">Laki - Laki</span>
					</label>
					<input
						type="number"
						placeholder="Type here"
						className="input input-bordered w-full"
						onChange={(e) => setMan(e.target.value)}
					/>
				</div>
				<div className="form-control w-full ml-4">
					<label className="label">
						<span className="label-text">Perempuan</span>
					</label>
					<input
						type="Number"
						placeholder="Type here"
						className="input input-bordered w-full"
						onChange={(e) => setWoman(e.target.value)}
					/>
				</div>
				<div className="form-control w-full mx-4">
					<label className="label">
						<span className="label-text">Anak</span>
					</label>
					<input
						type="number"
						placeholder="Type here"
						className="input input-bordered w-full"
						onChange={(e) => setChild(e.target.value)}
					/>
				</div>
			</div>
			<button className="btn btn-primary m-4" onClick={() => addData()}>
				Submit
			</button>
		</main>
	);
}
