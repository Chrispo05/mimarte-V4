import {useEffect, createContext, useState} from "react";
import React from 'react';





import Header from "./Header";
import "../../GlobalStyles.scss"
import HeaderBanner from './HeaderBanner';
import CategoryHomeSlider from  './categorýHomeSlider';
import ExtraServicesHomeSection from './ExtraServicesHomeSection';
import Footer from './Footer';
import ProductSectionCategoryCards from './ProductSectionCategoryCards';
import reorganizeByCategory from "./ContextFilteringHelpers";




export default function ProductsSection() {
  

  

  return (
    <div>
      {/* Proporcionamos el contexto a los componentes hijos */}
      
        <Header />
        <HeaderBanner connectorType="productSectionConnector" />
        <ProductSectionCategoryCards />
      
      <Footer/>
    </div>
  );
}




