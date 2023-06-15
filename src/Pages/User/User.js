// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { login } from '../../store/authSlice/login';
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import SingleCard from '../../Components/singleCard/SingleCard';
// import { useState } from 'react';
// import ClipLoader from "react-spinners/ClipLoader";
// import { useEffect, useCallback } from 'react';





// const User = () => {


//     let [isLoading, setIsloading] = useState(false)
//     const [searchResults, setSearchResults] = useState({collection:{items:[], links:[]}});

//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');


//     const getUserFavorite = useCallback(async () => {
//         console.log('in favorite');
//         try {

//             setIsloading(true)

//           const response = await axios.get(
//             `${process.env.REACT_APP_BASE_API_URL}/users/getFavorites?userId=${userId}`,
//             {
//               headers: {
//                 Authorization: `${token}`,
//               },
//             }
//           );

//           console.log('after response');
//           console.log(response)


//             const data = await response.json(); 
//             console.log('after data');
//             console.log(data)
//             setIsloading(false)


//             if(data.length >= 1){
//             setSearchResults(data);

//             }else{
//                 toast.error("Nothing found", {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 1000
//                 });
//             }


    
//           toast.success('Added to Favorite', {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         } catch (error) {
//           console.error(error.response.data['Error massage']);
//           toast.error(error.response.data['Error massage'], {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         }
//       }, [userId, token]);
    
//       useEffect(() => {
//         getUserFavorite();
//       }, [getUserFavorite]);
  




//     return (
//         <div id='Data'>
//         <div class="container mt-2">

//                 <div class="row mb-3searchResults.collection.items.">
//                         {isLoading ? (
//                             <div>
//                             <ClipLoader color={"#ffffff"} loading={isLoading} size={75} aria-label="Loading Spinner" data-testid="loader" />
//                             </div>
//                         ) : (
//                             searchResults ? (
//                             searchResults.collection.items.map((result) => {
//                                 <div >
//                                 </div>
//                                 return (
//                                 <div class="col-md-3 col-sm-6" key={result.data[0].nasa_id}>
//                                     <SingleCard result={result} />
//                                 </div>
//                                 );
//                             })
//                             ) : null
//                         )}
//                 </div>
             
//         </div>

//         <button >Next</button>
//         <button disabled={searchResults.collection.links.length <= 1}>Prev</button>


//     </div>
//     )
// }

// export default User;





import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleCard from '../../Components/singleCard/SingleCard';
import ClipLoader from 'react-spinners/ClipLoader';
import { remove } from 'lodash';

const User = () => {
  const [isLoading, setIsloading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    collection: { items: [], links: [''] },
  });
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const getUserFavorite = useCallback(async () => {
    console.log('in favorite');
    try {
      setIsloading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/getFavorites?userId=${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log('after response');
      console.log(response);

      const data = response.data;
      console.log('after data');
      console.log(data);
      setIsloading(false);

      if (data.length >= 1) {
        setSearchResults({ collection: { items: data, links: [''] } });
      } else {
        toast.error('Nothing found', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }

      toast.success('Fetch user favorite done', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error.response.data['Error massage']);
      toast.error(error.response.data['Error massage'], {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [userId, token]);

  useEffect(() => {
    getUserFavorite();
  }, [getUserFavorite]);

  return (
    <div id='Data'>
      <div class='container mt-2'>
        <div class='row mb-3'>
          {isLoading ? (
            <div>
              <ClipLoader
                color={'#ffffff'}
                loading={isLoading}
                size={75}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : searchResults ? (
            searchResults.collection.items.map((result) => (
              <div class='col-md-3 col-sm-6' key={result.data[0]?.nasa_id}>
                {result.data && result.data.length > 0 ? (
                  <SingleCard result={result} type={"remove"} />
                ) : (
                  <div>No data available</div>
                )}
              </div>
            ))
          ) : null}
        </div>
      </div>

      <button>Next</button>
      <button disabled={searchResults.collection.links.length <= 1}>
        Prev
      </button>
    </div>
  );
};

export default User;