import Banner from "./components/Banner";
import Jewelery from "./components/Jewelery";
import Category from "./components/Category";
import CustomerSupport from "./components/CustomerSupport";
import Featured from "./components/Featured";
import OurProducts from "./components/ourProducts";
import FlashSale from "./components/FlashSale";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
     <Hero/>
     <FlashSale/>
     <Category/>
     <Jewelery/>
     <Banner/>
     <Featured/>
     <OurProducts/>
     <CustomerSupport/>
    </div>
  );
}
