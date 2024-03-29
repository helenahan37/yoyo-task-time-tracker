import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login';
import CreateTaskPage from './pages/CreateTask';
import Reports from './components/Reports';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create-task" element={<CreateTaskPage />} />
				<Route
					path="/reports"
					element={
						<PrivateRoute>
							<Reports />
						</PrivateRoute>
					}
				/>
			</Routes>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

			<Footer />
		</BrowserRouter>
	);
}

export default App;
