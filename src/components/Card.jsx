import Link from "next/link";

export default function Card({ breed }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm border hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {breed.attributes.name}
      </h2>

      <p className="text-gray-700 font-semibold mb-4">Description</p>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {breed.attributes.description}
      </p>

      <hr className="my-2" />

      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-700">Life Expectancy</p>
        <p className="text-gray-600">
          {breed.attributes.life.min} - {breed.attributes.life.max} years
        </p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-700">Hypoallergenic</p>
        <span
          className={`px-2 py-1 rounded text-white text-sm font-semibold ${
            breed.attributes.hypoallergenic ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {breed.attributes.hypoallergenic ? "Yes" : "No"}
        </span>
      </div>

      <p className="text-gray-600">
        <span className="font-semibold text-gray-700">Type:</span> {breed.type}
      </p>

      <div className="mt-4">
        <Link
          href={`/breeds/${breed.id}`}
          className="block bg-black text-white text-center py-2 rounded hover:bg-gray-800 transition"
        >
          View More Details
        </Link>
      </div>
    </div>
  );
}
