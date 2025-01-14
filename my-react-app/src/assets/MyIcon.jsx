import React from 'react';
import {CgProfile} from "react-icons/cg";


const MyIcon = () => {
    return (
        <CgProfile style={{color:"white", fontSize: "30px", marginBottom: "10px"}} />

    );

};



const Icon = () => {
    return (
        <div>
            <MyIcon />
        </div>
        
    );
};


export default Icon;