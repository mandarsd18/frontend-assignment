export default async function DogBreedPage({ params }) {
  const { id } = await params;

  const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
  const { data: breed } = await response.json();

  if (!breed) {
    return (
      <div className="text-center mt-10 text-red-500">
        Breed details not found!
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {breed.attributes.name}
      </h1>
      <p className="text-gray-500 mb-4">Breed ID: {breed.id}</p>

      <h2 className="text-lg font-semibold mb-2 text-gray-700">Description</h2>
      <p className="text-gray-600 mb-4">{breed.attributes.description}</p>

      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-gray-700">Life Expectancy</p>
        <p className="text-gray-600">
          {breed.attributes.life?.min} - {breed.attributes.life?.max} years
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Weight Range
        </h2>
        <div className="flex justify-between">
          <p className="text-gray-600">Male</p>
          <p className="text-gray-600">
            {breed.attributes.male_weight.min} -{" "}
            {breed.attributes.male_weight.max} kg
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Female</p>
          <p className="text-gray-600">
            {breed.attributes.female_weight.min} -{" "}
            {breed.attributes.female_weight.max} kg
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-gray-700">Hypoallergenic</p>
        <span
          className={
            "px-2 py-1 rounded text-white text-sm font-semibold bg-gray-400"
          }
        >
          {breed.attributes.hypoallergenic ? "Yes" : "No"}
        </span>
      </div>

      <p className="text-gray-600">
        <span className="font-semibold text-gray-700">Type:</span>{" "}
        {breed.type || "N/A"}
      </p>
    </div>
  );
}
