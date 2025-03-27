import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Hardcoded correct email and password (since Reqres doesn't validate passwords)
        const correctEmail = 'eve.holt@reqres.in';
        const correctPassword = 'cityslicka';

        if (email !== correctEmail || password !== correctPassword) {
            setError('Invalid email or password');
            return;
        }

        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/users');
        } catch (err) {
            console.log(err);
            setError('Invalid email or password.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <form
                onSubmit={handleLogin}
                className='p-6 bg-black text-white rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
                {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full p-2 border bg-white rounded mb-3 text-black'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='w-full p-2 border bg-white rounded mb-3 text-black'
                />

                <button
                    type='submit'
                    className='w-full bg-blue-500 rounded-md text-white p-2  font-semibold'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
