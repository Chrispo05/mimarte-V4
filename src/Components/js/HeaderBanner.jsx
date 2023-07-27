import headerBannerImg from "../../Icons/beauty.jpg";
import "../scss/HeaderBanner.scss";
import {CgShoppingBag} from "react-icons/cg"
import {FaAngleDown} from "react-icons/fa";
import {MdKeyboardArrowDown} from "react-icons/md";
import {FiChevronDown} from "react-icons/fi";
import HeaderBannerSectionConnectorType from "./HeaderConnectorType";

export default function HeaderBanner(props) { /*    aqui decidimos si ponemos el conector de secciones o si usamos el filtro de busqueda de categorias */


    return (
        <div className="header-banner-container font-color-40">
            <div className="header-banner__glass-filter"></div>
            <img className="header-banner__img" alt="makeupbackground"
                src={headerBannerImg}/>
            <div className="header-banner__text-container flex-column-center ">
                <div className="flex-column-center header-banner-text1-container font-mobile-medium-A">
                    <p>La belleza no es superficial,</p>
                    <p className="header-banner__text2">es una expresión de tu ser.</p>
                    <FiChevronDown className="header-banner__text-icon font-color-40"/>

                </div>
                {HeaderBannerSectionConnectorType(props.connectorType)} </div>
            {/*  <div>
                <div>
                    <p>Descubre nuestra gama de productos,</p>
                    <p>Resalta lo mejor de ti misma.</p>
                </div>
            </div> */} </div>
    )

}



