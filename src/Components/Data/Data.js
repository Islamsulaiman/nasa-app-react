import { debounce } from 'lodash';
import { useState } from 'react';

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
                    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/search?q=${searchTerm}&pageNumber=7&limit=2`);
                    const data = await response.json();
                    setSearchResults(data);
                }
                else if (searchTerm === ''){
                    setSearchResults('');

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    };
    return ( 
        <>
            <div class="search-box">
            <input class="search-input" onChange={handleInputChange} type="text" placeholder="Search something.."/>
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
        
        <ul className="search_res">
                    {searchResults && searchResults.map((result) => (
                        <li className="row" key={result.id}>
                            <div style={{marginRight: '10px'}} className="col-md-4">
                                <img  height={50} width={60} src={`${result.href}`} alt="result.name" />
                                
                            </div>
                            <p className="col-md-5">{result.name}</p>

                        </li>
                    ))}
        </ul>
        </>

     );
}
 
export default Data;