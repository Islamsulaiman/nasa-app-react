import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useCallback } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SingleCard({ result, type }) {

    console.log("type")
    console.log(type)

    console.log("result")
    console.log(result._id)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isAnimating, setIsAnimating] = useState(false);


      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const favoriteId = result._id;


      const addFavorite = async () => {
        console.log("in favorite")
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/favorite/add?userId=${userId}`,
                result,{
                    headers: {
                        Authorization: `${token}`
                      }
                }
              );

              console.log("In addfavorite")
            
              toast.success("Added to Favorite", {
                position: toast.POSITION.TOP_RIGHT,
              });

            
        } catch (error) {
            console.error(error.response.data["Error massage"]);
            toast.error(error.response.data["Error massage"], {
                position: toast.POSITION.TOP_RIGHT,
              });

        }
      }


      const removeFromFavorite = async () => {
        console.log("in remove favorite")
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BASE_API_URL}/favorite/remove?userId=${userId}&favoriteId=${favoriteId}`,
                {
                    headers: {
                        Authorization: `${token}`
                      }
                }
              );
            
              toast.success("Removed from Favorite", {
                position: toast.POSITION.TOP_RIGHT,
              });

            
        } catch (error) {
            console.error(error.response.data["Error massage"]);
            toast.error(error.response.data["Error massage"], {
                position: toast.POSITION.TOP_RIGHT,
              });

        }
      }


    return (
      <div class="card item-card card-block">
        {
            type ==="remove" ? (<button type="button" class="btn btn-outline-danger" onClick={removeFromFavorite}>Remove from Favorite</button>) : (<button type="button" class="btn btn-outline-primary" onClick={addFavorite}>Add to Favorite</button>)
        }
        

        <div>
          <div>
            <h4 class="card-title text-right"><i class="material-icons">{result.data[0].title.slice(0, 10)}</i></h4>
          </div>
        </div>
        <img src={`${result.links[0].href}`} alt="Photo of sunset" />
        <h5 class="item-card-title mt-3 mb-3">{result.data[0].description.slice(0, 200)}...</h5>
      </div>
    );
  }
  
  export default SingleCard;