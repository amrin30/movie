import axios from 'axios';
import React, { useRef, useState } from 'react';
import Style from './Movie.module.css';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';

const Movie = () => {
    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false); // Add loading state
    const searchRef = useRef();

    const fetchApi = async (page) => {
        const searchValue = searchRef.current.value.trim();
        if (!searchValue) {
            setData([]);
            setTotalPage(0);
            return;
        }

        setLoading(true); // Set loading to true before fetching
        try {
            const apiData = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=aa78b246`);
            setData(apiData.data.Search || []);
            const pageCount = Math.ceil((apiData.data.totalResults || 0) / 10);
            setTotalPage(pageCount);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setTotalPage(0);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const search = () => {
        fetchApi(1); // Start search from the first page
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        fetchApi(selectedPage);
    };

    return (
        <div className={Style.main}>
            <div className={Style.cont}>
                <div className={Style.cont2}>
                    <div className={Style.inp}>
                        <input
                            type="search"
                            ref={searchRef}
                            placeholder="Search here..."
                            onKeyDown={(e) => e.key === 'Enter' && search()} // Trigger search on Enter key
                        />
                        <button onClick={search}>Search</button>
                    </div>
                    <br />
                    
                </div>
                {loading && ( // Display loader when loading is true
                        <div className={Style.load}>
                            <Loader />
                        </div>
                    )}
                {!loading && data.length > 0 ? ( // Ensure results are shown only when not loading
                    data.map((m) => (
                        <div key={m.imdbID} className={Style.box}>
                            <div className={Style.align}>
                                <img src={m.Poster} alt={m.Title} />
                                <div>
                                    <h1>{m.Title}</h1>
                                </div>
                                <div className={Style.cont3}>
                                    <h2>{m.Year}</h2>
                                    <h2>{m.Type}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No results found. Please try another search term.</p> // Show message only when not loading
                )}
            </div>
            {!loading && totalPage > 1 && ( // Ensure pagination is hidden during loading
                <div className={Style.page}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )}
        </div>
    );
};

export default Movie;
