import React, { useState } from 'react';

import { AiOutlineFieldTime } from 'react-icons/ai';
import app from '../firebase/config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import createtaskimg from '../images/createtaskimg.jpg';
//create firestore instance
const db = getFirestore(app);

//create auth instance
const auth = getAuth(app);

function CreateTaskPage() {
	const [task, setTask] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	//create task handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			setError('  ');
			setSuccess(false);
			// Save task into db
			addDoc(collection(db, 'tasks'), {
				task: task.trim(),
				status: 'unstarted',
				startTime: null,
				endTime: null,
				userId: auth.currentUser.uid,
			});
			setSuccess(true);
			setTask('');
			navigate('/reports');
		} catch (error) {
			setError('Error adding task: ' + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center"
			style={{
				backgroundImage: `url('${createtaskimg}')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className="bg-white bg-opacity-10 p-10 rounded-lg backdrop-filter backdrop-blur-lg shadow-lg max-w-md w-full">
				<h1 className="text-4xl font-bold text-white mb-4 text-shadow flex items-center space-x-2">
					<AiOutlineFieldTime />
					<span>Create a new task</span>
				</h1>
				<p className="text-white text-opacity-80 mb-8">
					Turn your plans into achievable tasks. Start by naming your task below.
				</p>
				<form onSubmit={handleSubmit}>
					<div className="mb-8">
						<label htmlFor="task" className="block font-bold text-white mb-2">
							Task description
						</label>
						<input
							value={task}
							onChange={(e) => setTask(e.target.value)}
							type="text"
							id="task"
							required
							className="w-full bg-transparent bg-opacity-50 text-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white placeholder-white"
							placeholder="e.g. Complete React Project"
							style={{
								color: 'white',
								textShadow: '0 0 10px rgba(0,0,0,0.25)',
							}}
						/>
					</div>
					<div className="flex justify-end">
						<button
							disable={loading}
							type="submit"
							className="w-full bg-gradient-to-r from-pink-500 to-purple-500 bg-opacity-50 hover:bg-opacity-75 text-white py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-white">
							{loading ? 'Loading please wait' : 'Create Task'}{' '}
						</button>
					</div>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					{success && <p className="text-white text-sm mt-2">Congratulations, task created successfully</p>}
				</form>
			</div>
		</div>
	);
}

export default CreateTaskPage;
