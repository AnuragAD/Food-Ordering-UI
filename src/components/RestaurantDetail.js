import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RESTAURANT_MENU } from "../core/constants";

const RestaurantDetail = () => {
  const { state } = useLocation();
  //const [restaurantDetails, setRestaurantDetails] = useState([]);

  async function fetchRestaurantDetails(state) {
    console.log(state);
    const fetchRes = await fetch(
      `${RESTAURANT_MENU}${state.locations.lat}&lng=${state.locations.lng}&menuId=${state.placeid}`
    );
    const fetchResJson = await fetchRes.json();
    return fetchResJson.data;
  }
  useEffect(() => {
  fetchRestaurantDetails(state);
  }, []);
  //------------------------------JSX-----------------------------------------------
  return(<h1>Restaurant Details</h1>
  )
};

export default RestaurantDetail;
