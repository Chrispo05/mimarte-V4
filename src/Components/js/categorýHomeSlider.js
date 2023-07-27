


import { useState, useEffect } from "react";
import "../scss/CategoryHomeslider.scss"
import "../../GlobalStyles.scss";

import { Cardlabel } from "./ProductSectionCategoryCardSection";
import  { getTop10MostSoldProducts, getTop10NewProducts } from "./ContextFilteringHelpers";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CategoryhomeSlider = ({ categoryType, categoryTitle, specialClass }) => {



  const [productList, setproductList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-mimarte.azurewebsites.net/api/Product/Lista');
        const json = await response.json();
        const productlist = json.list[0];

        // Almacenamos la lista de productos en el estado
        if (categoryType === 1) {
          setproductList(getTop10MostSoldProducts(productlist))
        }

        if (categoryType === 2) {
          setproductList(getTop10NewProducts(productlist))
        }
        

      } catch (error) {
        console.error('Error al llamar a la API:', error);
      }
    };

    fetchData();
  }, []);







  const carouselSettings = {
    additionalTransfrom: 0,
    arrows: true,
    autoPlay: false,
    autoPlaySpeed: 5000, // Cambia el intervalo de reproducción automática aquí
    centerMode: false,
    className: '',
    containerClass: 'home-category-carousel-container bg-A-W-50',
    dotListClass: 'home-category-carousel__dots',
    draggable: true,
    focusOnSelect: false,
    infinite: true,
    itemClass: '',
    keyBoardControl: true,
    minimumTouchDrag: 80,
    renderButtonGroupOutside: false,
    renderDotsOutside: false,
    
    
    responsive: {
      desktopL: {
        breakpoint: {
          max: 5000,
          min: 1600,
        },
        items: 6,
      },
      desktop: {
        breakpoint: {
          max: 1599,
          min: 1200,
        },
        items: 5,
      },
      laptop: {
        breakpoint: {
          max: 1199,
          min: 992,
        },
        items: 4,
      },
      tabletL: {
        breakpoint: {
          max: 991,
          min: 768,
        },
        items: 4,
      },
      tabletS: {
        breakpoint: {
          max: 767,
          min: 576,
        },
        items: 4,
      },
      mobileL: {
        breakpoint: {
          max: 575,
          min: 421,
        },
        items: 3,
      },
      mobileM: {
        breakpoint: {
          max: 420,
          min: 376,
        },
        items: 2,
      },
      mobileS: {
        breakpoint: {
          max: 375,
          min: 0,
        },
        items: 2,
      },
    },
    showDots: true,
    sliderClass: '',
    slidesToSlide: 1,
    swipeable: true,
  };

  return (
    <div className="category-home-slider__carousell-main-container bg-A-W-50 font-color-30 flex-column-center">
      <div className="category-home-slider-carousel-title-fix-container">
      <div className="category-home-slide__carousell-title-container "> 
        <p className="category-home-slide__carousell-title bg-B-W-100 ">{categoryTitle}</p>
      </div>
      </div>
      <Carousel  {...carouselSettings }>
      {productList.map((product,index) => <Cardlabel  key={index} product={product}  cardAnimated={false}  /> )}
    </Carousel>
    </div>
  );
};

export default CategoryhomeSlider;