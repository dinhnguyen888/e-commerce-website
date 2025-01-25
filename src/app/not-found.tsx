import React from "react";

function NotFoundPage() {
    return (
        <div className="h-96 flex flex-col justify-between items-center bg-white">
            <div className="text-center mt-24">
                <h1 className="text-6xl font-bold mb-4 text-black">404</h1>
                <p className="text-2xl mb-8 text-black font-sans">
                    Hmm hình như bạn vào nhầm link rồi thì phải...
                </p>
                <a
                    href="/"
                    className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2 px-4 rounded-md"
                >
                    Quay lại trang chủ
                </a>
            </div>
        </div>
    );
}

export default NotFoundPage;
