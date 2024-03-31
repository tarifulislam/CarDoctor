import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Booking from "./Booking";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const axiosSecure = useAxiosSecure()

    // const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const url = `/bookings?email=${user?.email}`;

    useEffect(() => {
        // fetch(url, {credentials:'include'}) // if you use fech.
        //     .then(res => res.json())
        //     .then(data => setBookings(data))

        // axios.get(url, {withCredentials: true})
        // .then(res => {
        //      setBookings(res.data)
        // })

        // we use here axios custom hook --------------------------------
        axiosSecure.get(url)
        .then(res => setBookings(res.data))

    }, [url])


    const handleDelete = id => {
        // const proceed = confirm("delete sure")
        // if (proceed) {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount > 0) {
                    // alert("delete successful")
                    const remaining = bookings.filter(booking => booking._id !== id)
                    setBookings(remaining)
                }
            })
        // }
    }

    return (
        <div>
            {
                bookings.map(booking => <Booking key={booking._id} booking={booking} handleDelete={handleDelete}></Booking>)
            }
        </div>
    );
};

export default Bookings;