import { useState, useEffect } from "react";
import { getNews } from "../services/news.get";
import NewsContent from "../components/contents/NewsContent";
import Loading from "../components/common/Loading";
import { message } from "antd";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await getNews(currentPage, 6);
            setNews(data);
            // Nếu số lượng items nhỏ hơn pageSize, nghĩa là đã hết data
            setHasMore(data.length === 6);
        } catch (error) {
            message.error("Không thể tải tin tức: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (linkDetail) => {
        window.open(linkDetail, "_blank");
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (hasMore) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Chỉ hiển thị loading lần đầu tiên
    if (loading && news.length === 0) {
        return <Loading />;
    }

    return (
        <NewsContent
            news={news}
            onViewDetails={handleViewDetails}
            currentPage={currentPage}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            hasMore={hasMore}
            loading={loading}
        />
    );
};

export default NewsPage;
