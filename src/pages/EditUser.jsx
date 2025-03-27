import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const EditUser = ({ setUsers }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state || {};

    const [formData, setFormData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.put(
                `https://reqres.in/api/users/${user.id}`,
                formData
            );
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === user.id ? { ...u, ...formData } : u))
            );
            console.log('Updated Data:', response.data);
            alert('User updated successfully!');
            navigate('/users');
        } catch (err) {
            console.log(err);
            setError('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='h-screen flex justify-center items-center w-full'>
            <div className='p-5 w-[90%] md:w-[60%] lg:max-w-lg mx-auto'>
                <h2 className='text-xl font-extrabold mb-4 text-center'>
                    Edit User
                </h2>
                {error && <p className='text-red-500 text-center'>{error}</p>}
                <form onSubmit={handleUpdate} className='flex flex-col gap-3'>
                    <input
                        type='text'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleChange}
                        className='border p-2 rounded-lg'
                        placeholder='First Name'
                        required
                    />
                    <input
                        type='text'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleChange}
                        className='border p-2 rounded-lg'
                        placeholder='Last Name'
                        required
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='border p-2 rounded-lg'
                        placeholder='Email'
                        required
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 rounded-lg'
                        disabled={loading}>
                        {loading ? 'Updating...' : 'Update User'}
                    </button>
                </form>
                <button
                    onClick={() => navigate('/users')}
                    className='mt-3 bg-gray-500 text-white py-2 rounded-lg w-full'>
                    Cancel
                </button>
            </div>
        </section>
    );
};

export default EditUser;
