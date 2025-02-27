import { useState, useEffect } from "react";
import { getNews } from "../services/news.get";
import NewsContent from "../components/contents/NewsContent";
import Loading from "../components/common/Loading";
import { message } from "antd";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (error) {
            message.error("Không thể tải tin tức: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (linkDetail) => {
        window.open(linkDetail, "_blank");
    };

    if (loading) {
        return <Loading />;
    }

    return <NewsContent news={news} onViewDetails={handleViewDetails} />;
};

export default NewsPage;
