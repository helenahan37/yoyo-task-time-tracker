import React, { useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import app from '../firebase/config';
import { useNavigate } from 'react-router';

//create auth instance
const auth = getAuth(app);

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginLoading, setLoginLoading] = useState(false);
	const [registerLoading, setRegisterLoading] = useState(false);
	const [error, setError] = useState(null);

	//navigate instance
	const navigate = useNavigate();
	//google login instance
	const provider = new GoogleAuthProvider();
	// register
	const signUp = async () => {
		setRegisterLoading(true);
		setError(null);
		try {
			//make request to firebase
			await createUserWithEmailAndPassword(auth, email, password);
			alert('Account created successfully');
			navigate('/reports');
		} catch (error) {
			setError(error.message);
		}
	};

	// login
	const logIn = async () => {
		setLoginLoading(true);
		setError(null);
		try {
			//make request to firebase
			await signInWithEmailAndPassword(auth, email, password);
			alert('Login successfully');
			navigate('/reports');
		} catch (error) {
			setError(error.message);
		}
	};

	// login with google email
	const googleSignIn = async () => {
		setLoginLoading(true);
		setError(null);
		try {
			//make request to firebase
			await signInWithPopup(auth, provider);
			alert('Login successfully');
			navigate('/reports');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									onChange={(e) => setPassword(e.target.value)}
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							{error && <p className="text-red-500 text-sm">{error}</p>}{' '}
							<button
								disabled={registerLoading}
								onClick={signUp}
								type="button"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								{registerLoading ? 'Loading...' : 'Register'}
							</button>
							<button
								onClick={logIn}
								type="button"
								className="w-full flex mt-3 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								{loginLoading ? 'Loading...' : 'Login'}
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or continue with</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 gap-3">
							<div>
								<button
									disable={loginLoading}
									onClick={googleSignIn}
									type="button"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
									<FcGoogle className=" h-5 w-auto text-center" />
									Continue with Google
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
