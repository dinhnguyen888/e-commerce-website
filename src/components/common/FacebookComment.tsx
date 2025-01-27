"use client";
import { useEffect } from "react";

const BASE_URL = new URL(
    "do-an",
    process.env.NEXT_PUBLIC_FRONTEND_URL
).toString();

function FacebookComment({ id }: { id: string }) {
    const commentUrl = `${BASE_URL}/${id}`;

    useEffect(() => {
        if (typeof window !== "undefined" && window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <div
            className="fb-comments"
            data-href={commentUrl}
            data-width=""
            data-numposts="5"
        ></div>
    );
}

export default FacebookComment;
