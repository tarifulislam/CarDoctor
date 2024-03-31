
const Booking = ({ booking, handleDelete }) => {
    const { _id } = booking;
    return (
        <div className="py-6">
            <h2>{booking?.customerName}</h2>
            <h2>{booking?.email}</h2>
            <h2>{booking?.date}</h2>
            <h2>{booking?.price}</h2>
            <button onClick={() => handleDelete(_id)}>delete</button>
        </div>
    );
};

export default Booking;