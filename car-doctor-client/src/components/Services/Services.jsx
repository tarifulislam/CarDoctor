import { useEffect } from "react";
import { useState } from "react";
import Service from "./Service";

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
     
    return (
        <div>
            <h2 className=" text-2xl font-bold text-center py-6 ">All Services</h2>
            <div className=" grid grid-cols-3 py-3 gap-6">
                {
                    services.map(service => <Service key={service._id} service={service}></Service>)
                }
            </div>
            <div className=" text-center py-4">
                <button className="btn btn-primary">See All Product</button>
           
            </div>
            
        </div>
    );
};

export default Services;