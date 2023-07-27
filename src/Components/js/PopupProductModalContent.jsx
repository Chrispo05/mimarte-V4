
// PopupProductContext.js
import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom'
import { PopupProductContext, usePopupProductContext } from './PopupProductModalContext';

function PopupProductModal() {

    const {popupState, setPopupState} = useContext(PopupProductContext);
    const portalRoot = document.getElementById('portal-root'); // Selecciona un elemento en el DOM donde renderizar el portal
  
    if (popupState) {
        return ReactDOM.createPortal(
            <div>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
              <p>hola</p>
            </div>,
            portalRoot // Renderiza el contenido en el nodo del portal
          );
    }
  }

  export default PopupProductModal;




