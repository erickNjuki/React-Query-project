import { PlusIcon, RefreshIcon } from '@heroicons/react/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function App() {
  const { isLoading, isError, data, error } = useQuery(['notes'], fetchNotes)

  function fetchNotes () {
    return fetch('http://localhost:3001/notes')
    .then((response) => response.json())
    .then(({ success, data }) => {
      if (!success) {
        throw new Error ('An error occurred while fetching notes');
      }
      return data;
    })
  }

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-red-400 flex flex-col justify-center items-center">
      <div className='bg-white w-full md:w-1/2 p-5 text-center rounded shadow-md text-gray-800 prose'>
        <h1>Notes</h1>
        {isLoading && <RefreshIcon className="w-10 h-10 animate-spin mx-auto"></RefreshIcon>}
        {isError && <span className='text-red'>{error.message ? error.message : error}</span>}
        {!isLoading && !isError && data && !data.length && <span className='text-red-400'>You have no notes</span>}
        {data && data.length > 0 && data.map((note, index) => (
          <div key={note.id} className={`text-left ${index !== data.length - 1 ? 'border-b pb-2' : ''}`}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <span>
              <button className='link text-gray-400'>Delete</button>
            </span>
          </div>
        ))}
      </div>
      <button className="mt-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white p-3">
        <PlusIcon className='w-5 h-5'></PlusIcon>
      </button>
    </div>
  );
}

export default App;