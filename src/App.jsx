import './App.css'
import { FiSearch } from "react-icons/fi";
import axios from './api/axios';
import { useEffect, useState } from 'react';
import Content from './Content';
import Home from './Home';

function App() {
    const [firstLoad, setFirstLoad] = useState(false);

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(true);
    const [home, setHome] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setHome(true);
        // setFirstLoad(true);
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`/${search}`);
            setData(response.data);
            setError(false);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    const handleSearchBtn = () => {
        setLoading(true);
        setHome(false);
        getData();
    }

    return (
        <>

            <div className="flex">
                <div className='p-5 w-full md:mt-10 mx-auto bg-stone-10 shadow-lg shadow-stone-10/50 rounded-xl sm:w-3/4'>
                    <div className='flex center ml-3'>
                        <input type="text" placeholder='enter word' className=' w-full border-2 border-stone-100 rounded-lg text-lg py-2 px-5 text-stone-500' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className='bg-stone-700 hover:bg-stone-800 p-4 rounded cursor-pointer ml-3' onClick={() => handleSearchBtn()}>
                            <FiSearch className=' text-stone-100 text-xl' />
                        </div>
                    </div>
                    {
                        home ?
                        <Home/> :
                        !error ?
                        <Content data={data} error={error} loading={loading} />
                        : <div className="mt-10 mb-10 text-center text-stone-400">Sorry, We can't find what are you looking for :(</div>
                    }
                </div>
            </div>
        </>
    )
}

export default App