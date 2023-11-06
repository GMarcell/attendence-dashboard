"use client";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Home() {
	const [date, setDate] = useState("");
	const [man, setMan] = useState(0);
	const [woman, setWoman] = useState(0);
	const [child, setChild] = useState(0);

	const addData = () => {
		if (date == "") {
			Swal.fire({
				icon: 'error',
				text: 'Date is Required',
				timer: 1500,
			})
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
				Swal.fire({
					icon: 'success',
					text: 'Data Added Succesfully',
					timer: 1500,
				})
			}).catch((error) => {
				Swal.fire({
					icon: 'error',
					text: error,
					timer: 1500,
				})
			});
		}
	};

	return (
		<main className="p-4">

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
