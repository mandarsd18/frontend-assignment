'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Link from 'next/link';

export default function Home() {
  const [breeds, setBreeds] = useState([]); 
  const [filteredBreeds, setFilteredBreeds] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 6; 

  useEffect(() => {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then((res) => res.json())
      .then((data) => {
        setBreeds(data.data);
        setFilteredBreeds(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch dog breeds.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = breeds.filter((breed) =>
      breed.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBreeds(filtered);
    setCurrentPage(1); 
  }, [searchTerm, breeds]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBreeds.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredBreeds.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="w-[80%] mx-auto mt-3 mb-3">
    
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((breed) => (
            <Link key={breed.id} href={`/breeds/${breed.id}`}>
              <Card breed={breed} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No breeds found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {Math.ceil(filteredBreeds.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(filteredBreeds.length / itemsPerPage)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
