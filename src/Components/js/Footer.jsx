import "../scss/Footer.scss";
import logoImg from "../../Icons/mimarteLogo.jpg"
import pestanaImg from "../../Icons/pestaña.png";
import { FaShoppingBag, FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa"

export default function Footer() {
    return (

        <section>


            <div className="footeer-prev-transparent-container bg-A-W-50"></div>
            <footer className="footer-container font-color-40 ">

                <div className="footer__bg-filter-container"></div>
                <div className="footer__img-absolute-container">
                    <img alt="mimartelogo" className="footer__mimarte-logo shadow-A"
                        src={logoImg} />
                    {/* <div className="footer__pestana-container"><img alt="pestanalogo" className="footer__pestanaimg"
                        src={pestanaImg}/></div> */}
                </div>
                <div className="footer__text-info-container">
                    <div className="footer__text__main-info-container">
                        <p className="font-600">Salento Quindío.</p>
                        <p>mimarte@mimarte.com</p>
                        <p className="underline font-mobile-small-B">318548654</p>
                    </div>
                    <div className="footer__text__follow-us-container">
                        <p className="font-600">Síguenos.</p>
                        <div>
                            <FaInstagramSquare className="footer__follow-us__icons" />
                            <FaFacebookSquare className="footer__follow-us__icons" />
                            <FaWhatsappSquare className="footer__follow-us__icons" /></div>
                    </div>
                </div>
            </footer>
        </section>
    )
}
