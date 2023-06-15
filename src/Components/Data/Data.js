import { debounce } from 'lodash';
import { useState, Fragment } from 'react';
import './Data.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../UI/card/Card"
import { useDispatch, useSelector } from "react-redux";
import { faHeart, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleCard from '../singleCard/SingleCard';




const Data = (props) => {
     // Search Logic //
    // Open
    const [searchResults, setSearchResults] = useState({collection:{items:[], links:[]}});
    let [isLoading, setIsloading] = useState(false)
    let [pageNumber, setPageNumber] = useState(1)


    let myData;


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

                    console.log("response")
                    console.log(response)

                    const data = await response.json();


                    setIsloading(false)
                        console.log(`islading: ${isLoading}`)

                    if(data.collection.items.length >= 1){
                        setSearchResults(data);

                    }else{
                        toast.error("Nothing found", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000
                          });
                    }

                    console.log("data")
                    console.log(data)
                
                    if(response.status !== 400){
                        myData=data.collection.items
                        console.log("myData")
                        console.log(myData)
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


    console.log("myData at the end")
    console.log(myData)

    console.log("searchResults");
    console.log(searchResults);
    return ( 
        <>
            <div class="search-box">
            <input class="search-input" onChange={handleInputChange} type="text" placeholder="Search something.."/>
            <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div id='Data'>
                <div class="container mt-2">

                        <div class="row mb-3">
                                {isLoading ? (
                                    <div>
                                    <ClipLoader color={"#ffffff"} loading={isLoading} size={75} aria-label="Loading Spinner" data-testid="loader" />
                                    </div>
                                ) : (
                                    searchResults ? (
                                    searchResults.collection.items.map((result) => {
                                        <div >
                                        </div>
                                        return (
                                        <div class="col-md-3 col-sm-6" key={result.data[0].nasa_id}>
                                            <SingleCard result={result} />
                                        </div>
                                        );
                                    })
                                    ) : null
                                )}
                        </div>
                     
                </div>

                <button >Next</button>
                <button disabled={searchResults.collection.links.length <= 1}>Prev</button>


            </div>
        </>

     );
}
 
export default Data;