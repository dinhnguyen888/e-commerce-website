import { useState } from "react";
import Filter from "../components/common/Filter";
import MainTitle from "../components/common/MainTitle";
import MiniNavBar from "../components/common/MiniNavBar";
import BaseLayout from "../components/layout/BaseLayout";
import Body from "../components/sections/Body";
import MiddleBar from "../components/sections/MiddleBar";
import WrappedBody from "../components/sections/WrappedBody";

const sampleFilters = [
    { label: "Category 1", link: "#category1" },
    { label: "Category 2", link: "#category2" },
    { label: "Category 3", link: "#category3" },
];

const sampleLink = [
    { label: "Sản phẩm", key: "ProductPage" },
    { label: "Bài viết", key: "ArticlePage" },
    { label: "Tin tức", key: "NewsPage" },
];

const Content = () => {
    const [activeBar, setActiveBar] = useState(sampleLink[0].key);
    const handleMiniBarClick = (key) => {
        setActiveBar(key);
    };

    return (
        <div className="w-full container ">
            <MiniNavBar
                items={sampleLink}
                onClickActiveBar={handleMiniBarClick}
            />

            <WrappedBody caseKey={activeBar.toString()} caseProp={sampleLink} />
        </div>
    );
};

function HomePage() {
    return (
        <BaseLayout>
            <MiddleBar />
            <Body
                Content={<Content />}
                Sidebar={<Filter filters={sampleFilters} />}
                Title={<MainTitle text="Trang Chủ" className={"font-light"} />}
            />
        </BaseLayout>
    );
}

export default HomePage;
