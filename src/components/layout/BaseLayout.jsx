import PropTypes from "prop-types";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

function BaseLayout({ children }) {
    return (
        <main className=" w-full flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto md:px-2 lg:px-28">
                <div className="w-full bg-white shadow-lg min-h-screen">
                    {children}
                </div>
            </div>
            <Footer />
        </main>
    );
}

BaseLayout.propTypes = {
    children: PropTypes.node,
};

export default BaseLayout;
