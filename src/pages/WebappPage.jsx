import BaseLayout from "../components/layout/BaseLayout";

import MiddleBar from "../components/sections/MiddleBar";
import RelatedContent from "../components/contents/RelatedContent";
import Body from "../components/sections/Body";
import Filter from "../components/common/Filter";
import MainTitle from "../components/common/MainTitle";
const sampleFilters = [
    { label: "Đồ án mới nhất", link: "#category1" },
    { label: "Tool mới nhất", link: "#category2" },
    { label: "Đồ án ASP.Net", link: "#category3" },
    { label: "Đồ án ASP.Net Core", link: "#category4" },
    { label: "Acc ref Facebook", link: "#category5" },
    { label: "kèo Airdrop", link: "#category6" },
    { label: "key window bản quyền", link: "#category77" },
    { label: "Iso ghost window 11 ", link: "#category8" },
];

function WebappPage() {
    return (
        <BaseLayout>
            <MiddleBar />
            <Body
                Content={<RelatedContent tag={"webapp"} />}
                Sidebar={<Filter filters={sampleFilters} />}
                Title={
                    <MainTitle
                        text="Web vs App"
                        className={"font-semibold uppercase p-8 "}
                    />
                }
            />
        </BaseLayout>
    );
}

export default WebappPage;
