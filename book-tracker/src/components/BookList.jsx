import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', author: '', genre: '', status: 'unread' });

    const fetchBooks = async () => {
        const res = await axios.get('http://localhost:8000/books');
        setBooks(res.data);
    };

    const startEdit = (book) => {
        setEditingId(book.id);
        setEditForm(book);
    };

    const saveEdit = async () => {
        await axios.put(`http://localhost:8000/books/${editingId}`, editForm);
        setEditingId(null);
        fetchBooks();
    };

    const deleteBook = async (id) => {
        if (confirm("Are you sure you want to delete this book?")) {
            await axios.delete(`http://localhost:8000/books/${id}`);
            fetchBooks();
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-lg font-bold mb-3">Book List</h2>
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Title</th>
                        <th className="p-2">Author</th>
                        <th className="p-2">Genre</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id} className="border-t">
                            <td className="p-2">
                                {editingId === book.id ? <input className="input" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} /> : book.title}
                            </td>
                            <td className="p-2">
                                {editingId === book.id ? <input className="input" value={editForm.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} /> : book.author}
                            </td>
                            <td className="p-2">
                                {editingId === book.id ? <input className="input" value={editForm.genre} onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })} /> : book.genre}
                            </td>
                            <td className="p-2">
                                {editingId === book.id ? (
                                    <select className="input" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                                        <option value="unread">Unread</option>
                                        <option value="reading">Reading</option>
                                        <option value="read">Read</option>
                                    </select>
                                ) : book.status}
                            </td>
                            <td className="p-2 space-x-2">
                                {editingId === book.id ? (
                                    <button onClick={saveEdit} className="text-green-600 font-bold">Save</button>
                                ) : (
                                    <button onClick={() => startEdit(book)} className="text-blue-600">Edit</button>
                                )}
                                <button onClick={() => deleteBook(book.id)} className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
