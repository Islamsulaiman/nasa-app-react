import { debounce } from 'lodash';
import { useState } from 'react';
import './Data.css'
const Data = (props) => {
     // Search Logic //
    // Open
    const [searchResults, setSearchResults] = useState([]);
    
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
                    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/search?q=${searchTerm}&pageNumber=1&limit=8`);
                    const data = await response.json();
                    if(data.length >= 1)
                        setSearchResults(data);
                }
                else if (searchTerm === ''){
                    setSearchResults('');

                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
                    {searchResults && searchResults.map((result) => (

                   <div class="col-md-3 col-sm-6 item" key={result.data[0].nasa_id}>
                     <div class="card item-card card-block">
                     <h4 class="card-title text-right"><i class="material-icons">{result.data[0].title}</i></h4>
                   <img src={`${result.links[0].href}`} alt="Photo of sunset"/>
                       <h5 class="item-card-title mt-3 mb-3">{result.data[0].description}</h5>
                 </div>
                   </div>    
                    ))}
                    </div>
                 
                 </div>
            </div>
        </>

     );
}
 
export default Data;