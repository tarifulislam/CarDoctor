import Services from "../../components/Services/Services";
import Banner from "./Banner";

const Home = () => {
    return (
        <div className=" container mx-auto">
            <Banner></Banner>
            <Services></Services>
        </div>
    );
};

export default Home;