import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData } from "react-router-dom";

const CheckOut = () => {

    const { user } = useContext(AuthContext)
    // console.log(user);

    const serve = useLoaderData()
    const { _id, title, img, price } = serve

    const handleBooService = (e) => {
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const order = {
            customerName: name,
            email,
            date,
            img,
            service_id: _id,
            service: title,
            price: price,
        }
        console.log(order);
        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert("service book")
                }
            })

    }

    return (
        <div>
            <div className=" w-2/4 p-12 rounded-md border">
                <h1 className="text-4xl font-bold py-6 text-center">check out</h1>
                <form onSubmit={handleBooService} className=" space-y-3">

                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-secondary">Add to card</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CheckOut;