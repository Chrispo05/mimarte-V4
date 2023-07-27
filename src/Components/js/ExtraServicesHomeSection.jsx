import { BsGift } from "react-icons/bs";
import { BiMapPin } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";

import "../scss/ExtraServicesHomeSection.scss" ;
export default function ExtraServicesHomeSection (){

    return(
        <section className="font-color-40 extra-services-home-section-main-container" >
            <div className="extra-services-home-secton__services-container">
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-long bg-B-W-100"> <p>Empaquetado de regalo.</p> <BsGift  className="extra-services-home-section__service__icons"/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Envíos a toda colombia.</p> <BiMapPin className="extra-services-home-section__service__icons"/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Devolución gratis.</p> <TbTruckReturn className="extra-services-home-section__service__icons"/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Productos de alta calidad.</p> <BsGift className="extra-services-home-section__service__icons"/> </div>
                <div className="shadow-A extra-services-home-section__service-container extra-services-home-section__service-container-short bg-B-W-100"> <p>Atención al cliente.</p> <BsGift className="extra-services-home-section__service__icons"/> </div>
               {/*  <div> <div><p>Envíos a toda colombia.</p></div> <div><BiMapPin/></div>  </div>
                <div> <div><p>Devolución gratis.</p></div> <div><TbTruckReturn/></div>  </div> */}
            </div>
        </section>
    )
}