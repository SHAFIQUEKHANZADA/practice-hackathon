import Banner from "./components/Banner";
import BestSelling from "./components/BestSelling";
import Category from "./components/Category";
import Explore from "./components/Explore";
import FlashSale from "./components/FlashSale";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
     <Hero/>
     <FlashSale/>
     <Category/>
     <BestSelling/>
     <Banner/>
     <Explore/>
    </div>
  );
}
