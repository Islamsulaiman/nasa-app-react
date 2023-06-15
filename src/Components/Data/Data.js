// import { debounce } from 'lodash';
// import { useState, Fragment } from 'react';
// import './Data.css'
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ClipLoader from "react-spinners/ClipLoader";
// import SingleCard from '../singleCard/SingleCard';
// import { useRef } from 'react';




// const Data = (props) => {
//      // Search Logic //
//     // Open
//     const [searchResults, setSearchResults] = useState({collection:{items:[], links:[]}});
//     let [isLoading, setIsloading] = useState(false)
//     let [pageNumber, setPageNumber] = useState(1)
//     const searchTermRef = useRef("");

//     console.log("searchTermRef")
//     console.log(searchTermRef)


//     let myData;


//     console.log(`islading: ${isLoading}`)
    
//     const debouncedSearch = debounce((searchTerm) => {
//         fetchData(searchTerm)
//       }, 600); 
  
//     const handleInputChange = (e) => {
//         const searchTerm = e.target.value;
//         searchTermRef.current = searchTerm;
//         debouncedSearch(searchTerm);
//     };
  
//     const fetchData = async (searchTerm) => { 
//             try {
//                 if(searchTerm){

//                     setIsloading(true)
//                     console.log(`islading: ${isLoading}`)
//                     const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/search?q=${searchTerm}&pageNumber=1&limit=8`);

//                     console.log("response")
//                     console.log(response)

//                     const data = await response.json();

//                     console.log("data")
//                     console.log(data)


//                     setIsloading(false)
//                         console.log(`islading: ${isLoading}`)

//                     if(data.collection.items.length >= 1){
//                         setSearchResults(data);

//                     }else{
//                         toast.error("Nothing found", {
//                             position: toast.POSITION.TOP_RIGHT,
//                             autoClose: 1000
//                           });
//                     }

//                     console.log("data")
//                     console.log(data)
                
//                     if(response.status !== 400){
//                         myData=data.collection.items
//                         console.log("myData")
//                         console.log(myData)
//                     } 


//                 }
//                 else if (searchTerm === ''){
//                     setSearchResults('');

//                 }

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 toast.error("Network Error", {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 1000
//                   });
//             }
//     };

//     // const handleNext =() =>{

//     //     console.log(searchResults.collection.links[0])
//     //     const next = searchResults.collection.links[0];
//     //     fetchData(searchTerm, )

//     // }

//     const handleNext = () => {
//         const nextLink = searchResults.collection.links.find((link) => link.rel === "next");
//         console.log("nextLink.href")
//         console.log(nextLink.href)

//         if (nextLink) {
//           const nextPageNumber = nextLink.href.split("=")[1];
//         //   fetchData(props.searchTerm, nextPageNumber);
//         fetchData(searchTermRef.current, 2);
//           console.log(props.searchTerm)
//         }
//       };

//     const handlePrev = () => {

//     }


//     console.log("myData at the end")
//     console.log(myData)

//     console.log("searchResults");
//     console.log(searchResults);
//     return ( 
//         <>
//             <div class="search-box">
//             <input class="search-input" onChange={handleInputChange} type="text" placeholder="Search something.."/>
//             <button class="search-btn"><i class="fas fa-search"></i></button>
//             </div>
//             <div id='Data'>
//                 <div class="container mt-2">

//                         <div class="row mb-3">
//                                 {isLoading ? (
//                                     <div>
//                                     <ClipLoader color={"#ffffff"} loading={isLoading} size={75} aria-label="Loading Spinner" data-testid="loader" />
//                                     </div>
//                                 ) : (
//                                     searchResults ? (
//                                     searchResults.collection.items.map((result) => {
//                                         <div >
//                                         </div>
//                                         return (
//                                         <div class="col-md-3 col-sm-6" key={result.data[0].nasa_id}>
//                                             <SingleCard result={result} type={"add"}/>
//                                         </div>
//                                         );
//                                     })
//                                     ) : null
//                                 )}
//                         </div>
                     
//                 </div>


//                 <button type="button" class="btn btn-primary" disabled={searchResults.collection.links.length <= 1}>Prev</button>
//                 <button type="button" class="btn btn-primary" onClick={handleNext}>Next</button>
                


//             </div>
//         </>

//      );
// }
 
// export default Data;



import { useState, useRef } from 'react';
import { debounce } from 'lodash';
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import SingleCard from '../singleCard/SingleCard';

const Data = (props) => {
  const [searchResults, setSearchResults] = useState({collection:{items:[], links:[]}});
  const [isLoading, setIsloading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const searchTermRef = useRef("");

  const debouncedSearch = debounce((searchTerm) => {
    fetchData(searchTerm);
  }, 600);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    searchTermRef.current = searchTerm;
    debouncedSearch(searchTerm);
  };

  const fetchData = async (searchTerm) => { 
    try {
      if (searchTerm) {
        setIsloading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/search?q=${searchTerm}&pageNumber=${pageNumber}&limit=8`);
        const data = await response.json();
        setIsloading(false);

        if (data.collection.items.length >= 1) {
          setSearchResults(data);
        } else {
          toast.error("Nothing found", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          });
        }

        if (response.status !== 400) {
          setPageNumber(pageNumber + 1);
        } 
      } else {
        setSearchResults({collection:{items:[], links:[]}});
        setPageNumber(1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Network Error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
      });
    }
  };

//   const handleNext = () => {
//     const nextLink = searchResults.collection.links.find((link) => link.rel === "next");
//     if (nextLink) {
//       const nextPageNumber = nextLink.href.split("=")[1];
//       fetchData(searchTermRef.current, nextPageNumber);
//     }
//   };

const handleNext = () => {
    const nextLink = searchResults.collection.links.find((link) => link.rel === "next");
    if (nextLink) {
      const nextPageNumber = nextLink.href.split("=")[1];
      fetchData(searchTermRef.current, nextPageNumber);
    }
  };


//   const handlePrev = () => {
//     const prevLink = searchResults.collection.links.find((link) => link.rel === "prev");
//     if (prevLink) {
//       const prevPageNumber = prevLink.href.split("=")[1];
//       fetchData(searchTermRef.current, prevPageNumber);
//     }
//   };

const handlePrev = () => {
    const prevLink = searchResults.collection.links.find((link) => link.rel === "prev");
    if (prevLink) {
      const prevPageNumber = prevLink.href.split("=")[1];
      fetchData(searchTermRef.current, prevPageNumber);
    }
  };

  return ( 
    <>
      <div className="search-box">
        <input className="search-input" onChange={handleInputChange} type="text" placeholder="Search something.."/>
        <button className="search-btn"><i className="fas fa-search"></i></button>
      </div>
      <div id='Data'>
        <div className="container mt-2">
          <div className="row mb-3">
            {isLoading ? (
              <div>
                <ClipLoader color={"#ffffff"} loading={isLoading} size={75} aria-label="Loading Spinner" data-testid="loader" />
              </div>
            ) : (
              searchResults.collection.items.map((result) => (
                <div className="col-md-3 col-sm-6" key={result.data[0].nasa_id}>
                  <SingleCard result={result} type={"add"}/>
                </div>
              ))
            )}
          </div>
        </div>
        {/* <button type="button" className="btn btn-primary" onClick={handlePrev} disabled={!searchResults.collection.links.find((link) => link.rel === "prev")}>Prev</button> */}
        <button type="button" className="btn btn-primary" onClick={handlePrev} disabled={!searchResults.collection.links.find((link) => link.rel === "prev")}>Prev</button>
        {/* <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!searchResults.collection.links.find((link) => link.rel === "next")}>Next</button> */}
        <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!searchResults.collection.links.find((link) => link.rel === "next")}>Next</button>
      </div>
    </>
  );
}
 
export default Data;