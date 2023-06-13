import SearchBar from "../../Components/Search-Bar/Search";
import Typewriter from "typewriter-effect";
import "./Home.css"
import Data from "../../Components/Data/Data";

const Home = () => {
    return ( 
        <>
        <div id="home">
            <div className="typing">
                <Typewriter
    
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Welcome to GalaxyGalleria")
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString("Here you can discover marvelous collection of assets, images, videos, ..etc")
                            .start();
                    }}
                />
            </div>
            <Data/>
        </div>
        
        </>

     );
}
 
export default Home;