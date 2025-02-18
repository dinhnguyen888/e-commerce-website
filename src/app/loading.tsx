"use client";

import React from "react";
import { Spin } from "antd";

function Loading() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <Spin size="large" className="text-blue-500" />
            <p className="mt-4 text-lg text-gray-600">
                Chờ xíu, đang loading...
            </p>
        </div>
    );
}

export default Loading;
