import { useState } from 'react';
import axios from 'axios';

export default function BookForm({ onBookAdded }) {
    const [form, setForm] = useState({
        title: '',
        author: '',
        genre: '',
        status: 'unread',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) {
            newErrors.title = 'Title is required.';
        } else if (form.title.trim().length < 2) {
            newErrors.title = 'Title must be at least 2 characters.';
        }

        if (!form.author.trim()) {
            newErrors.author = 'Author is required.';
        } else if (form.author.trim().length < 2) {
            newErrors.author = 'Author must be at least 2 characters.';
        }

        if (form.genre && form.genre.trim().length < 2) {
            newErrors.genre = 'Genre must be at least 2 characters.';
        }

        const validStatuses = ['unread', 'reading', 'read'];
        if (!validStatuses.includes(form.status)) {
            newErrors.status = 'Invalid status selected.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post('http://localhost:8000/books', form);
            onBookAdded();
            setForm({ title: '', author: '', genre: '', status: 'unread' });
            setErrors({});
        } catch {
            setErrors({ submit: 'Failed to add book.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="text-lg font-bold">Add New Book</h2>
            {errors.submit && <p className="text-red-600 text-sm">{errors.submit}</p>}

            <div>
                <input
                    className="input w-full"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
                <input
                    className="input w-full"
                    placeholder="Author"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
                {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </div>

            <div>
                <input
                    className="input w-full"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                />
                {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
            </div>

            <div>
                <select
                    className="input w-full"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                    <option value="unread">Unread</option>
                    <option value="reading">Reading</option>
                    <option value="read">Read</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Add Book
            </button>
        </form>
    );
}
