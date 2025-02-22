import PropTypes from "prop-types";
import { Table } from "antd";

const CustomTable = ({ data, className, isPagination }) => {
    const columns = Object.keys(data[0]).map((key) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        align: "center", // Thêm thuộc tính align để căn giữa
        render: (text) => (
            <span>
                {text.split(",").map((item, index) => (
                    <span key={index} className={"block"}>
                        {item.trim()}
                    </span>
                ))}
            </span>
        ),
    }));

    return (
        <Table
            columns={columns}
            dataSource={data}
            className={className}
            pagination={isPagination}
        />
    );
};

CustomTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    isPagination: PropTypes.bool,
};

export default CustomTable;
