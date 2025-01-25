"use client";

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loading() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                className="text-blue-500"
            >
                <p className="mt-4 text-lg text-gray-600">
                    Loading, please wait...
                </p>
            </Spin>
        </div>
    );
}

export default Loading;
