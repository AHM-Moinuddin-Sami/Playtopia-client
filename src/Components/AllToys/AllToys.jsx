import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ToyEntry from "./ToyEntry/ToyEntry";

const AllToys = () => {

    const [toys, setToys] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 20;

    const allToys = useLoaderData();

    const totalPages = Math.ceil(allToys.length / itemsPerPage);

    const pageNo = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNo.push(i);
    }

    useEffect(() => {
        async function fetchData() {
            let url;
            if (searchTerm) {
                url = `http://localhost:5000/toys?page=${currentPage}&limit=${itemsPerPage}&searchedToy=${searchTerm}`;
            }
            else {
                url = `http://localhost:5000/toys?page=${currentPage}&limit=${itemsPerPage}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setToys(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage, searchTerm]);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.search.value;
        setSearchTerm(searchTerm);
        setCurrentPage(0);
    };

    console.log(toys);

    return (
        <div>
            <div>
                <h3>Search a toy</h3>
                <form className="form-control" onSubmit={handleSearch}>
                    <input name="search" type="text" className="input input-bordered" />
                    <button className="btn" type="submit"></button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Seller</th>
                            <th>Toy</th>
                            <th>Sub-category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            toys.map((toy, index) => <ToyEntry
                                key={toy._id}
                                no={index}
                                name={toy.toyName}
                                seller={toy.sellerName}
                                subCategory={toy.subCategory}
                                price={toy.price}
                                quantity={toy.quantity}
                                id={toy._id}
                            >

                            </ToyEntry>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <div className="btn-group">
                    {
                        pageNo.map(number => <button
                            key={number}
                            className={`btn active:bg-purple-700 ${currentPage + 1 === number ? 'selected btn-disabled' : ''}`}
                            onClick={() => setCurrentPage(number)}
                        >{number}</button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllToys;