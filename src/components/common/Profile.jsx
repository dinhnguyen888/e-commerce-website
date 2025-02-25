import PropTypes from "prop-types";
import { useState } from "react";

const Profile = () => {
    const [user, setUser] = useState({
        avatar: "https://placehold.co/100x100",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        joinDate: "02/07/2019",
    });

    const [activeTab, setActiveTab] = useState(null);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
    });

    // Xử lý input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === "editInfo") {
            setUser({ ...user, name: formData.name, email: formData.email });
        }
        setActiveTab(null);
    };

    const renderInput = (label, name, type = "text") => (
        <div className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
            />
        </div>
    );

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            {activeTab === "editInfo" && (
                <>
                    {renderInput("Tên", "name")}
                    {renderInput("Email", "email", "email")}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Lưu thay đổi
                    </button>
                </>
            )}
            {activeTab === "changePassword" && (
                <>
                    {renderInput("Mật khẩu mới", "password", "password")}
                    {renderInput(
                        "Xác nhận mật khẩu",
                        "confirmPassword",
                        "password"
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Đổi mật khẩu
                    </button>
                </>
            )}
        </form>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
            <div className="flex p-6">
                <div className="w-1/3 text-center">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <p className="mt-2 text-2xl text-black font-semibold">
                        {user.name}
                    </p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">
                        Ngày gia nhập: {user.joinDate}
                    </p>
                </div>
                <div className="w-2/3">
                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setActiveTab("editInfo")}
                        >
                            Chỉnh sửa thông tin
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => setActiveTab("changePassword")}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-4 my-4">{renderForm()}</div>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        joinDate: PropTypes.string,
    }),
};

export default Profile;
