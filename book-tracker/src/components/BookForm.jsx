import { useState } from 'react';
import axios from 'axios';

export default function BookForm({ onBookAdded }) {
    const [form, setForm] = useState({
        title: '',
        author: '',
        genre: '',
        status: 'unread',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.author.trim()) {
            setError('Title and author are required.');
            return;
        }
        try {
            await axios.post('http://localhost:8000/books', form);
            onBookAdded();
            setForm({ title: '', author: '', genre: '', status: 'unread' });
            setError('');
        } catch {
            setError('Failed to add book.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="text-lg font-bold">Add New Book</h2>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="input" placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <input className="input" placeholder="Genre" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="unread">Unread</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Book</button>
        </form>
    );
}
