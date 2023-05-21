import useTitle from "../CustomHooks/useTitle";
import Banner from "./Banner/Banner";
import Gallery from "./Gallery/Gallery";
import ToyCategory from "./ToyCategory/ToyCategory";

const Main = () => {
    useTitle("Home");
    return (
        <div>
            <Banner></Banner>
            <Gallery></Gallery>
            <ToyCategory></ToyCategory>
        </div>
    );
};

export default Main;