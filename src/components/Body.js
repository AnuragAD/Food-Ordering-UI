import {
  IMG_CDN_URL,
  RECOMMENDED_ADDRESS_URL,
  RESTAURANT_LIST_BASED_ON_LOACTION,
} from "../core/constants";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlaceSharpIcon from "@mui/icons-material/PlaceSharp";
import {
  Chip,
  TextField,
  Drawer,
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import AutoComplete from "../core/Autocomplete";
import Shimmer from "../core/Shimmer";
import CarouselComponent from "../core/Carousel";

let timeOutTimer;
let selectedLoaction;
let location;
const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="card">
      <Card
        sx={{
          width: "100%",
          height: "350px",
          borderRadius: "15px",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={IMG_CDN_URL + restaurant.cloudinaryImageId}
          title={restaurant.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ mt: "4px" }}
          >
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "4px" }}>
            <b>Cuisines: </b> {restaurant.cuisines.join(", ")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "4px" }}>
            <b>Distance: </b>
            {restaurant.lastMileTravelString}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "4px" }}>
            <b>Ratings: </b>{" "}
            <Rating
              name="size-small"
              size="small"
              value={+restaurant.avgRating}
              readOnly
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
    // <div className="card">
    //   <img src={IMG_CDN_URL + cloudinaryImageId} />
    //   <h2>{name}</h2>
    //   <h3>{cuisines.join(", ")}</h3>
    //   <h4>{lastMileTravelString}</h4>
    // </div>
  );
};

async function fetchRestaurantList({ geometry }) {
  const getRestaurants = await fetch(
    RESTAURANT_LIST_BASED_ON_LOACTION +
      geometry.location.lat +
      "&lng=" +
      geometry.location.lng +
      "&page_type=DESKTOP_WEB_LISTING"
  );
  return await getRestaurants.json();
}

async function fetchSelectedPlace(place_id) {
  const fetchSelectedDetail = await (
    await fetch(RECOMMENDED_ADDRESS_URL + place_id)
  ).json();
  selectedLoaction = fetchSelectedDetail.data[0].formatted_address;
  const fetchRestaurantDetail = await fetchRestaurantList(
    fetchSelectedDetail.data[0]
  );
  location = fetchSelectedDetail.data[0].geometry.location;
  return fetchRestaurantDetail.data;
}

const Body = () => {
  let { place_id } = useParams();
  const [isShowPlaces, setIsShowPlaces] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [carousel, setCarousel] = useState([]);

  //  filter the restaurant from "restaurant" using debouncing
  function handleSearch(search) {
    if (timeOutTimer) {
      clearInterval(timeOutTimer);
    }
    timeOutTimer = setTimeout(() => {
      const rest = restaurant.filter((res) =>
        res.data.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRestaurant(rest);
    }, 750);
  }

  async function data() {
    const { cards } = await fetchSelectedPlace(place_id);
    let isFirst = true;
    cards.map(card=>{
      if(card.cardType === 'carousel' && isFirst){
        isFirst = false;
        setCarousel(card?.data?.data?.cards);
      }
      else if(card.cardType === 'seeAllRestaurants'){
        setRestaurant(card?.data?.data?.cards);
        setFilteredRestaurant(card?.data?.data?.cards);
      }
    })
  }

  async function selectedRestaurant(params) {
    if (!params) return;

    setFilteredRestaurant([]);
    selectedLoaction = params.description;
    place_id = params.place_id;
    data();
    setIsShowPlaces(false);
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div className="search-area">
        <div className="placeIcon">
          <Stack direction="row" spacing={1}>
            <Chip
              variant="outlined"
              color="success"
              icon={<PlaceSharpIcon />}
              label={selectedLoaction}
              onClick={(e) => {
                setIsShowPlaces(true);
              }}
            />
          </Stack>
          <Drawer
            anchor="left"
            open={isShowPlaces}
            onClose={() => setIsShowPlaces(false)}
          >
            <Box p={2} width="400px" textAlign="center" role="presentation">
              <Typography variant="h6" component="div">
                Search for places
              </Typography>
              <AutoComplete placeSelect={selectedRestaurant} />
            </Box>
          </Drawer>
        </div>
        <TextField
          id="outlined-basic"
          className="searchTextField"
          label="Search Restaurant"
          variant="outlined"
          size="small"
          onChange={(e) => {
            handleSearch(e.target.value.trim());
          }}
          sx={{
            width: "50vw",
          }}
        />
      </div>
      { carousel.length === 0 ?  <Shimmer loading/> :(
        <CarouselComponent data={carousel}/>
      )
      }
      {filteredRestaurant.length === 0 ? (
        <div className="restaurant-list">
          <Shimmer loading />
        </div>
      ) : (
        <div className="restaurant-list">
          {filteredRestaurant.map((res) => (
            <Link
              key={res.data.id}
              to={"/restaurantdetail/"}
              state={{ placeid: res.data.id, locations: location }}
            >
              <RestaurantCard restaurant={res.data} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
