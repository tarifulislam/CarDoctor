
import { Link } from 'react-router-dom';
const Service = ({service}) => {
    const {_id, title, price, img} = service;
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
            <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body  ">
            <h2 className="card-title">{title}</h2>
            <p>{price}</p>
            <div className="card-actions">
            <Link to={`/servicedetails/${_id}`}> 
                <button className="btn btn-primary">see more</button>
            </Link>
            <Link to={`/checkout/${_id}`}> 
                <button className="btn btn-secondary">CheckOut</button>
            </Link>
            </div>
        </div>
        </div>
    );
};

export default Service;