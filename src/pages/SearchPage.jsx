import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/product.search";
import SearchContent from "../components/contents/SearchContent";
import { message } from "antd";
import BaseLayout from "../components/layout/BaseLayout";

import MiddleBar from "../components/sections/MiddleBar";
import Body from "../components/sections/Body";
import Filter from "../components/common/Filter";
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
function SearchPage() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!keyword.trim()) {
                setProducts([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = await searchProducts(keyword);
                setProducts(data);
            } catch (error) {
                message.error("Không thể tìm kiếm sản phẩm: " + error.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [keyword]);

    return (
        <BaseLayout>
            <MiddleBar />
            <Body
                Content={
                    <SearchContent
                        products={products}
                        loading={loading}
                        keyword={keyword}
                    />
                }
                Sidebar={<Filter filters={sampleFilters} />}
            />
        </BaseLayout>
    );
}

export default SearchPage;
