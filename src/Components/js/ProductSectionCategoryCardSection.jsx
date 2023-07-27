import { useEffect, useState, useRef , useContext} from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { TfiMoreAlt } from "react-icons/tfi";
import { BiChevronRight, BiChevronLeft, BiChevronDown } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";



import { Fade , JackInTheBox, Hinge , Slide, Zoom, Roll, Bounce} from "react-awesome-reveal";

import "../scss/ProductSectionCategoryCardSection.scss"
import "../../GlobalStyles.scss"
import { PopupProductContext } from "./PopupProductModalContext";
import { TbVirusSearch } from "react-icons/tb";


// estado que va a manejar la cantidad de cards a renderizar, ya que varian dependiendo de la anchura de la pantalla y de si damos click en ver más.
let cardsQuantity = 0;


// funcion para el procentaje

let precioFinal;

function porcentaje(precio) { // esta funcion crea los porcentajes entre precio y fPrecio
    // Generar un porcentaje aleatorio entre 10 y 35
    const porcentaje = Math.floor(Math.random() * 26) + 10;

    // Calcular el incremento al precio original
    const incremento = (precio * porcentaje) / 100;

    // Calcular el nuevo precio
    precioFinal = precio + incremento;

    // Calcular el porcentaje de descuento en relación al precio original
    let porcentajeDescuento = ((precioFinal - precio) / precio) * 100;
    porcentajeDescuento = ((precio - precioFinal) / precioFinal) * 100;


    // Devolver el porcentaje de aumento y el precio final
    return (
        Math.abs(Math.ceil(porcentajeDescuento))

    );
}






export default function ProductSectionCategoryCardSectionLabel({ categoryProp }) {




   
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
    const [categoryProductState, setCategoryProductState] = useState();
    const [CardLabelExpandState, setCardLabelExpandState] = useState();

    useEffect(() => {
        setCategoryProductState(categoryProp.products);
        setCardLabelExpandState(categoryProp.products.length > 10);

        const manejarCambioTamaño = () => {
            setAnchoPantalla(window.innerWidth);
        };

        window.addEventListener('resize', manejarCambioTamaño);

        return () => {
            window.removeEventListener('resize', manejarCambioTamaño);
        };
    }, [categoryProp.products]);

    let breakpoints = {
        sss: [
            100, 4
        ],
        ssm: [
            400, 4
        ],
        mms: [
            500, 4
        ],
        mmm: [
            600, 4
        ],
        mml: [
            700, 4
        ],
        lls: [
            800, 4
        ],
        llm: [
            900, 4
        ],
        lll: [
            1000, 5
        ],
        xls: [
            1200, 5
        ],
        xlm: [
            1400, 5
        ],
        xll: [1600, 5]
    };

    const howManyCards = () => {
        let cardsQuantity = 0;
        let breakPointsArray = Object.entries(breakpoints);

        breakPointsArray.forEach((breakpoint) => {
            if (breakpoint[1][0] <= anchoPantalla) {
                cardsQuantity = breakpoint[1][1];
            }
        });

        return cardsQuantity;
    };

    const cardsQuantity = howManyCards();


        // Función para desplazarse hasta el inicio del componente

        const componentRef = useRef(null);
        
        const scrollToComponentTop = () => {
            if (componentRef.current) {
                window.scrollTo({
                    behavior: 'smooth',
                    top: componentRef.current.offsetTop,
                });
            }
        };

    return (
        <div ref={componentRef} className="category-product-section-main-container bg-A-W-50 font-color-40">
            <div className="flex-row-center ">
                <div className="category-product-section__category-txt-container flex-row-center">
                    <p className="font-500 category-product-section__category-name-txt bg-B-W-100">{
                        categoryProp.category_name
                    }</p>

                </div>
            </div>

            {
                <Cards categoryProp={
                    categoryProp
                }

                    scrollToComponentTop = {scrollToComponentTop}
                    cardsQuantity={
                        cardsQuantity
                    } />
            } </div>
    );
}


function Cards({ categoryProp, cardsQuantity, scrollToComponentTop }) {
    const [cardQuantityState, setCardQuantityState] = useState(cardsQuantity);
    const [expandedCardsState, setExpandedCardsState] = useState(false);
    let cardsRemaining = 0;

    useEffect(() => {
        setCardQuantityState(cardsQuantity);
    }, [cardsQuantity]);

    function handleCardsQuiantityExpanded() {
        setExpandedCardsState(true)
    }

    if (!expandedCardsState) {

        
        return (
            <div className="category-product-section-card-outside-main-container font-mobile-small-A font-color-40">
                <div className="category-product-section-card-grid-container position-relative">
                    {categoryProp.products.length > 5 ? <p className="category-product-section__category-seemore-button-up bg-B-W-100 font-mobile-small-B " onClick={handleCardsQuiantityExpanded}>Ver más.</p> : ""}
                    {
                        categoryProp.products.map((product, index) => {
                            if (index < cardQuantityState) {
                                return <Cardlabel  key={product.product_id} product={product}/>
                            } else {
                                cardsRemaining = cardQuantityState - categoryProp.products.length;

                                return null; // Se agrega un return null para el caso en que no se renderice ninguna tarjeta
                            }
                        })
                    } </div>
                <div className="category-product-section__seemore-container flex-row-center">
                    <div className="category-product-section__seemore-flex-container">
                        {
                            Math.abs(cardsRemaining) > 4 && <div>
                                <p className="category-product-section__category-seemore-button " onClick={handleCardsQuiantityExpanded}> <BiChevronDown className="category-product-section__seemore-icon" /> </p>
                                {/* icon */} </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    if (expandedCardsState) {
       

        return (
            <CardsPaginated products={
                categoryProp.products
                
            } 
            scrollToComponentTop = {scrollToComponentTop}
            categoryName = {categoryProp.category_name}
            />
        )
    }
}


// logica para las label de tarjetas que tienen pagianción


function CardsPaginated({ products, categoryName , scrollToComponentTop}) {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    

    // Calcular el índice inicial y final de los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calcular la cantidad total de páginas
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Función para cambiar a la página siguiente
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            scrollToComponentTop();
        }
    };

    // Función para cambiar a la página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            scrollToComponentTop();
        }
    };

    // Función para cambiar a una página específica
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        scrollToComponentTop();
    };





    return (
        
        <div >
           
            <div className="category-product-section-card-grid-container">
                {currentProducts.map((product,index) => <Cardlabel key={index} cardAnimated={true} duration={1000} product={product}/>)}
            </div>
            <div className="flex-row-center category-product-section__card__pagination-button-container">
                <button className="flex-row-center" onClick={prevPage} disabled={currentPage === 1}>
                    <BiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button className="flex-row-center"
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="flex-row-center" onClick={nextPage} disabled={currentPage === totalPages}>
                    <BiChevronRight />
                </button>
            </div>
        </div>
        
    );
}




function Cardlabel(props) {

//product, cardAnimated = true, duration = 1000
   const {popupState, setPopupState} = useContext(PopupProductContext);

   function handlePopUpProductModal(id){
    console.log("............." + popupState)
    setPopupState(true)
   }


   if (props.cardAnimated) {
     return (
         
        <Fade 
       
        cascade="false" delay={70} duration={1000} className="category-product-section__card-main-container bg-B-W-100 " key={props.product.product_id}>
        <div  onClick={()=> handlePopUpProductModal(props.product.product_id)}  className="flex-column-center">
            <div className="category-product-section__card__percentage__container font-mobile-small-B font-600">
                <p className="font-mobile-small-B " >{porcentaje(props.product.price)}% <span className="font-mobile-small-C font-500">off</span> </p>
            </div>
            <div className="category-product-section__image-container flex-row-center ">
                <img src={props.product.image} draggable="false" alt={props.product.name} />
            </div>
            <div className="category-product-section__name-container font-600 font-mobile-small-B">
                <p>{props.product.name}</p>

            </div>
            <div className="category-product-section__prices-container ">
                <p className="font-mobile-small-B font-600 font-color-B">${props. product.price}</p> <p className="underlined-decoration font-mobile-small-C">${precioFinal}</p>
            </div>




        </div>
    </Fade>
         
     )
   }else{
    return(
        <div 
       
        cascade="false" delay={70} duration={1000} className="category-product-section__card-main-container bg-B-W-100 " key={props.product.product_id}>
        <div  onClick={()=> handlePopUpProductModal(props.product.product_id)} className="flex-column-center">
            <div className="category-product-section__card__percentage__container font-mobile-small-B font-600">
                <p className="font-mobile-small-B " >{porcentaje(props.product.price)}% <span className="font-mobile-small-C font-500">off</span> </p>
            </div>
            <div className="category-product-section__image-container flex-row-center ">
                <img src={props.product.image} draggable="false" alt={props.product.name} />
            </div>
            <div className="category-product-section__name-container font-600 font-mobile-small-B">
                <p>{props.product.name}</p>

            </div>
            <div className="category-product-section__prices-container ">
                <p className="font-mobile-small-B font-600 font-color-B">${props. product.price}</p> <p className="underlined-decoration font-mobile-small-C">${precioFinal}</p>
            </div>




        </div>
    </div>
    )
   }
}


export { Cardlabel }
/* export default function ProductSectionCategoryCardSectionLabel({categoryProp}) {

    console.log(categoryProp.products)
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        const manejarCambioTamaño = () => {
            setAnchoPantalla(window.innerWidth);
        };

        // Agregar un listener para escuchar los cambios en el tamaño de la ventana
        window.addEventListener('resize', manejarCambioTamaño);

        // Eliminar el listener cuando el componente se desmonte
        return() => {
            window.removeEventListener('resize', manejarCambioTamaño);
        };
    }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente


    //creamos los breakpoints para las cards
    let breakpoints = {
        ssm: [400, 3],
        mms: [500, 3],
        mmm: [600, 3],
        mml: [700, 4],
        lls: [800, 4],
        llm: [900, 4],
        lll: [1000, 5],
        xls: [1200, 5],
        xlm: [1400, 5],
        xll: [1600, 5] 
    }



    //tambien haria falta crear un estado por componente label de cards
            //con el fin de hacer el renderizado de cantidad de tarjetas, dinamico.
        const [categoryProductState, setCategoryProductState] = useState();

        setCategoryProductState(categoryProp.products)

 
    //tambien un estado para controlar la expandibilidad del label de cards
        const [CardLabelExpandState, setCardLabelExpandState] = useState();

        //aqui nos aseguramos que no se tengan mas de 10 productos , si los tiene, el componente se pone modo expandido para la paginación
        setCardLabelExpandState(categoryProp.products.length > 10 );



    //esta funcion dedicirá la cantidad de tarjetas a renderizar dependiendo del tamaño de la pantalla;
    

    const howManyCards = () => {
        let breakPointsArray = Object.entries(breakpoints);
      
        breakPointsArray.forEach((breakpoint)=>{
            if (breakpoint[1][0] <= anchoPantalla) {
                
                cardsQuantity = (breakpoint[1][1]);
            }
        })
    
    }

    howManyCards();
    




    
    return (
        <div>
           
            <div>
                <p className="font-500">
                    Categoría: {
                    categoryProp.categoria
                }</p>
            </div>

            <div> {
                    categoryProp.products.map((product, index) => {
                    
                        if (index < cardsQuantity) {
                            return (
                                <p>{
                                    product.name
                                } </p>
                            )
                        }

                    

                   

                })
            }</div>

            <div>
                <p>Ver más.</p>
                icon</div>
        </div>
    )
}
 */
