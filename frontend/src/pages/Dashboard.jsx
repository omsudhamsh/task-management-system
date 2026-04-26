import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService, userService } from '../services/api';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'PENDING', userId: '' });
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchTasks();
        if (role === 'ADMIN') {
            fetchUsers();
        }
    }, [role]);

    const fetchTasks = async () => {
        try {
            const response = await taskService.getAll();
            setTasks(response.data);
        } catch (err) {
            console.error('Failed to fetch tasks');
        }
    };
    
    const fetchUsers = async () => {
        try {
            const response = await userService.getAll();
            setUsers(response.data);
        } catch (err) {
            console.error('Failed to fetch users');
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...newTask };
            if (payload.userId) {
                payload.user = { id: payload.userId };
            }
            await taskService.create(payload);
            setNewTask({ title: '', description: '', status: 'PENDING', userId: '' });
            fetchTasks();
        } catch (err) {
            alert('Failed to create task');
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'PENDING' ? 'IN_PROGRESS' : currentStatus === 'IN_PROGRESS' ? 'COMPLETED' : 'PENDING';
        const task = tasks.find(t => t.id === id);
        try {
            await taskService.update(id, { ...task, status: nextStatus });
            fetchTasks();
        } catch (err) {
            alert('Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await taskService.delete(id);
                fetchTasks();
            } catch (err) {
                alert('Failed to delete task');
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Welcome, {username} ({role})</h2>
                <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
            </div>

            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd' }}>
                <h3>Create New Task</h3>
                <form onSubmit={handleCreateTask}>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={newTask.title} 
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                        required 
                        style={{ marginRight: '10px' }}
                    />
                    <input 
                        type="text" 
                        placeholder="Description" 
                        value={newTask.description} 
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
                        style={{ marginRight: '10px' }}
                    />
                    {role === 'ADMIN' && (
                        <select 
                            value={newTask.userId} 
                            onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
                            style={{ marginRight: '10px' }}
                        >
                            <option value="">Assign to myself</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
                            ))}
                        </select>
                    )}
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <h3>Tasks List</h3>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created At</th>
                        {role === 'ADMIN' && <th>Assigned To</th>}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{new Date(task.createdAt).toLocaleString()}</td>
                            {role === 'ADMIN' && <td>{task.user?.username}</td>}
                            <td>
                                <button onClick={() => handleUpdateStatus(task.id, task.status)}>Next Status</button>
                                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
