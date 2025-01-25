"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
    useEffect(() => {
        console.error("Error occurred:", error);
    }, [error]);

    const reset = () => {
        window.location.reload();
    };
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 className="text-3xl text-center text-black font-bold mb-4">
                Oops! Something went wrong.
            </h1>
            <p>{error.message || "An unexpected error occurred."}</p>
            <button
                onClick={reset}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Try Again
            </button>
        </div>
    );
}
