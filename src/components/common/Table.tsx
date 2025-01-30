import React, { useState, useEffect } from "react";

type TableProps<T> = {
    columns: { key: keyof T; label: string }[];
    handleFetchData: () => Promise<T[]>;
};

function Table<T extends Record<string, unknown>>({
    columns,
    handleFetchData,
}: TableProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await handleFetchData();
                setData(result);
            } catch {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [handleFetchData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key as string}
                                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col) => (
                                <td
                                    key={col.key as string}
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {row[col.key] as string}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
