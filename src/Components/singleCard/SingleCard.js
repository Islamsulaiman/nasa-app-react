import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SingleCard({ result }) {

    console.log("result")
    console.log(result)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        // dispatch(addItemToWishlist(product));
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 3000);
      };

      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');


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

    



    return (
      <div class="card item-card card-block">
        <button type="button" class="btn btn-outline-primary" onClick={addFavorite}>Add to Favorite</button>

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