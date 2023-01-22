import Carousel from "react-material-ui-carousel";
import { CardMedia, Card, Grid, SubCategory } from "@mui/material";
import { CAROUSEL_IMG_CDN_URL } from "./constants";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
//import {RandomIcon} from "@mui/icons-material";
//import RandomIcon from '@mui/icons-material/Random';
const CarouselComponent = ({ data }) => {
  const Item = ({ item }) => {
    return (
      <Card>
        <img
          src={CAROUSEL_IMG_CDN_URL + item?.data?.creativeId}
          width="100%"
          height="350px"
        />
      </Card>
    );
  };
  return (
    <div className="carouselContainer">
      <Carousel
        animation="slide"
        cycleNavigation
        timeout={300}
        sx={{
          width: "100%",
          height: "350px",
        }}
        NextIcon={<ArrowForwardIosOutlinedIcon />}
        PrevIcon={<ArrowBackIosOutlinedIcon />}
      >
        {data.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
