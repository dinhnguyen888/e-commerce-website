"use client";

import React from "react";
import { Spin } from "antd";

function Loading() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Spin size="large" />
            <p style={{ marginTop: 16, fontSize: "16px", color: "#555" }}>
                Loading, please wait...
            </p>
        </div>
    );
}

export default Loading;
