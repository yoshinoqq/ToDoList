import React from "react";
import cl from "./MyModal.module.css"
import { useEffect } from "react";
import { Transition } from "react-transition-group";
function MyModal({children,visib,setVisible,}){
    const rootClasses = [cl.modal]
    useEffect(() =>{
        function handleEsc({key}){
            if (key === 'Escape'){
                setVisible('none')
            }
        }
        document.addEventListener('keydown',handleEsc);

        return () => document.removeEventListener('keydown', handleEsc)
    })
   
    if (visib === "visible"){
        rootClasses.push(cl.active)
    }
        
    
    return (
        
        
        
                    <div className={rootClasses.join(' ')} onClick={() => setVisible("none")}>
            
            <div className={cl.modalContent}>
                {children}
            </div>
      </div>
      
      
    )
}
export default MyModal;