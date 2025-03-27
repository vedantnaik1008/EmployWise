import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useUserList = ({ users, setUsers }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUsers(page);
        }
    }, [navigate, page]);

    const fetchUsers = async (pageNumber) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(
                `https://reqres.in/api/users?page=${pageNumber}`
            );
            setUsers(response.data.data);
            setFilteredUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            alert('User deleted successfully!');
        } catch (err) {
            console.log(err);
            alert('Failed to delete user.');
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(query) ||
                user.last_name.toLowerCase().includes(query)
        );

        setFilteredUsers(filtered);
    };
    return {
        searchQuery,
        handleSearch,
        loading,
        error,
        filteredUsers,
        navigate,
        handleDelete,
        setPage,
        page,
        totalPages
    };
};
