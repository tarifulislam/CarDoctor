import { useLoaderData } from "react-router-dom";

const ServiceDetails = () => {
    const singleService = useLoaderData()
    console.log(singleService);

    return (
        <div className=" container mx-auto">

            <div className="card w-2/4 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={singleService?.img} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body  ">
                        <h2 className="card-title">{singleService?.title}</h2>
                        <p>{singleService?.price}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                    </div>

        </div>
    );
};

export default ServiceDetails;