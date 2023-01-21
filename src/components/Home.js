import { useNavigate } from "react-router-dom";
import AutoComplete from "../core/Autocomplete";

const Home = () => {
  const navigate = useNavigate();
  function handleOnSelect({ place_id }) {
    navigate("/restaurantsat/" + place_id);
  }
  return (
    <div>
      <h1>Home Page</h1>
      <AutoComplete placeSelect={handleOnSelect} />
    </div>
  );
};

export default Home;
