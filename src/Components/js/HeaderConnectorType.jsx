import { CgShoppingBag } from "react-icons/cg"
import { MdFilterListAlt } from "react-icons/md";
import "../scss/HeaderConnectorType.scss";
import { useState, useContext } from "react";
import { ProductsContext } from "../../App";
import { reorganizeArrayByCategoryAndMoveUp } from "./ContextFilteringHelpers";


const HeaderBannerSectionConnectorType = (connectorType) => {


    //estado para controlar el filtro desplegable
    const [filterExpandedState, setFilterExpandedState] = useState(false);
    function hanldeFilterExpandedState() {
        setFilterExpandedState(filterExpandedState ? false : true)
    }



    if (connectorType === "homeConnector") {
        return (
            <div className="header-banner__down-text-container flex-row-center font-color-40 font-mobile-small-B shadow-A">
                <div>
                    <p>Descubre nuestra gama de productos,</p>
                    <p>Resalta lo mejor de ti misma.</p>
                </div>
                <CgShoppingBag className="header-banner__down-text__icon" />
            </div>
        )

    }






    if (connectorType === "productSectionConnector") {
        return (
            <div className="product-section__category__filter-main-container flex-row-center">
                <div className="category-filter-container flex-column-center">
                    <div onClick={hanldeFilterExpandedState} className="product-section__category__filter-container bg-B-W-100 shadow-A" >
                        <p className="font-500">Nuestro Catálogo.</p>
                        <div className="flex-row-center"><p>Filtrar.</p> <MdFilterListAlt className="product-section__category-filter__icon" /> </div>
                    </div>

                    <div className={`product-section__category__filter__category-results-container flex-row-center ${filterExpandedState ? "result-container-show" : "result-container-hide"} `}>
                        {/* aqui tenemos una cantidad variable que va a depender de la cantidad de categorias que se encuentren en la base de datos. */}
                        <div className="product-section-_category__filter__categories-main-container">
                            <div className="product-senction__category__filter__categories-container">
                                <GetCategoriesFromMainContextArray setExpandState={setFilterExpandedState} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderBannerSectionConnectorType;





//esta funcion es para traer la lista de las categorias que vienen de la base de datos

function GetCategoriesFromMainContextArray(props) {
    const { products, updateProducts } = useContext(ProductsContext);

    function moveCategoryToTop(categoryName) {
        const updatedProducts = products.map((category) => {
            if (category.category_name === categoryName) {
                return {
                    ...category,
                };
            }
            return category;
        });

        const categoryIndex = updatedProducts.findIndex(
            (category) => category.category_name === categoryName
        );

        if (categoryIndex > 0) {
            const [category] = updatedProducts.splice(categoryIndex, 1);
            updatedProducts.unshift(category);
        }

        updateProducts(updatedProducts);
        //finalmente contraemos la ventana de filtro
        props.setExpandState(false);
    }

    return products.map((category, index) => {
        return (
            <p
                className="font-color-100 font-500"
                key={index}
                onClick={() => moveCategoryToTop(category.category_name)}
            >
                {category.category_name}
            </p>
        );
    });
}