import React from "react";
import ListProduct from "./components/layout/ListProduct";
import SlideShow from "./components/layout/SlideShow";

function HomePage() {
    return (
        <div>
            <SlideShow />
            <ListProduct />
        </div>
    );
}

export default HomePage;
