import { useUserList } from "../hooks/useUserList";

const UsersList = ({ users, setUsers }) => {
    const {
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
    } = useUserList({ users, setUsers });

    return (
        <section className='bg-black'>
            <div className='p-5 max-w-4xl mx-auto'>
                <h1 className='text-2xl text-white font-extrabold text-center mb-4'>
                    Users List
                </h1>

                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder='Search users by name...'
                    className='border p-2 rounded-lg w-full mb-4'
                />

                {loading && <p className='text-center'>Loading...</p>}
                {error && <p className='text-red-500 text-center'>{error}</p>}

                {!loading && filteredUsers.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className='p-4 border rounded-lg shadow-md flex flex-col items-center bg-white'>
                                <img
                                    src={user.avatar}
                                    alt={user.first_name}
                                    className='w-16 h-16 rounded-full mb-2 object-cover'
                                />
                                <p className='font-semibold'>
                                    {user.first_name} {user.last_name}
                                </p>
                                <p className='text-gray-500'>{user.email}</p>

                                {/* Edit & Delete Buttons */}
                                <div className='flex gap-2 mt-3'>
                                    <button
                                        className='px-3 py-1 bg-green-500 text-white rounded-lg font-semibold'
                                        onClick={() =>
                                            navigate(`/edit-user/${user.id}`, {
                                                state: user
                                            })
                                        }>
                                        Edit
                                    </button>
                                    <button
                                        className='px-3 py-1 bg-red-500 text-white rounded-lg font-semibold'
                                        onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <p className='text-center font-semibold text-white'>
                            No users found.
                        </p>
                    )
                )}

                <div className='flex justify-center gap-4 mt-5'>
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50'
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={page === 1}>
                        Previous
                    </button>
                    <span className='self-center text-white font-semibold'>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50'
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page === totalPages}>
                        Next
                    </button>
                </div>

                {/* logout button just incase if you want to test if its redirect properly */}
                <div className='w-[90%] mx-auto my-5'>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/');
                        }}
                        className='bg-red-500 rounded-lg font-semibold text-white px-4 py-2 rounded w-full'>
                        Logout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UsersList;
