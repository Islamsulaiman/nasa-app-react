import { debounce } from 'lodash';
import { useState } from 'react';
import './Data.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";


const Data = (props) => {
     // Search Logic //
    // Open
    const [searchResults, setSearchResults] = useState([]);
    let [isLoading, setIsloading] = useState(false)

    console.log(`islading: ${isLoading}`)
    
    const debouncedSearch = debounce((searchTerm) => {
        fetchData(searchTerm)
      }, 600); 
  
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        debouncedSearch(searchTerm);
    };
  
    const fetchData = async (searchTerm) => { 
            try {
                if(searchTerm){

                    setIsloading(true)
                    console.log(`islading: ${isLoading}`)
                    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/search?q=${searchTerm}&pageNumber=1&limit=8`);
                    const data = await response.json();
                    setIsloading(false)
                        console.log(`islading: ${isLoading}`)

                    if(data.length >= 1){
                        setSearchResults(data);
                    }else{
                        toast.error("Nothing found", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000
                          });
                    }
                }
                else if (searchTerm === ''){
                    setSearchResults('');

                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Network Error", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                  });
            }
    };
    console.log(searchResults);
    return ( 
        <>
            <div class="search-box">
            <input class="search-input" onChange={handleInputChange} type="text" placeholder="Search something.."/>
            <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div id='Data'>
                <div class="container mt-2">


                        <div class="row">

                            {isLoading ? (
                                <div>
                                    <ClipLoader color={"#ffffff"} loading={isLoading} size={75} aria-label="Loading Spinner" data-testid="loader" />
                                </div>
                            
                            ) : (
                            searchResults ? (
                                searchResults.map((result) => (
                                <div class="col-md-3 col-sm-6 item" key={result.data[0].nasa_id}>
                                    <div class="card item-card card-block">
                                    <h4 class="card-title text-right"><i class="material-icons">{result.data[0].title}</i></h4>
                                    <img src={`${result.links[0].href}`} alt="Photo of sunset"/>
                                    <h5 class="item-card-title mt-3 mb-3">{result.data[0].description}</h5>
                                    </div>
                                </div>  
                                ))
                            ) : null
                            )}

                                    
                        </div>
                     
                </div>

                <div class="flex flex-col items-center">
                <div class="inline-flex mt-2 xs:mt-0">
                    <button  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                        Prev
                    </button>
                    <button  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>

            </div>
        </>

     );
}
 
export default Data;