/* eslint-disable react/prop-types */
import { Avatar, Col, Row } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dataTestimoni from "../assets/data/dataTestimoni";

const CardTestimoni = () => {
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, fontSize: "3em", zIndex: 1 }} onClick={onClick}>
        <FaAngleLeft color="#2e40b6" />
      </div>
    );
  };
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, fontSize: "3em", zIndex: 1, right: -5 }} onClick={onClick}>
        <FaAngleRight color="#2e40b6" />
      </div>
    );
  };
  const settingCarousel = {
    dots: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 731,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          speed: 500,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <Row className="card-testimoni" justify={"center"} gutter={[0, 40]}>
      <Col className="testimoni-title" span={22}>
      <h1>What Our Clients Say</h1>
      </Col>
      <Col xs={18} sm={18} md={20} lg={20} xl={22}>
        <Slider {...settingCarousel}>
          {dataTestimoni.map((val) => {
            return (
              <div key={val.id}>
                <h3>{val.nama}</h3>
                <div className={parseInt(val.id) % 2 === 0 ? "item-carousel-style-1" : "item-carousel-style-2"}>
                  <Avatar size={130} src={val.image} />
                  <p>{val.testimoni}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </Col>
    </Row>
  );
};

export default CardTestimoni;
