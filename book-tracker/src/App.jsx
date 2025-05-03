import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">📚 Book Tracker</h1>
      <BookForm onBookAdded={() => setRefresh(!refresh)} />
      <BookList key={refresh} />
    </div>
  );
}

export default App;
