import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "antd";
import { updateProfile } from "../../services/profile.update";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import useLogout from "../../hooks/useLogout";

const EditProfileForm = ({ userProfile, setUserProfile }) => {
    const { accessToken } = useAuth();
    const logout = useLogout();
    const [formValues, setFormValues] = useState({
        username: userProfile.username,
        email: userProfile.email,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = await updateProfile(
                accessToken,
                formValues.email,
                formValues.username
            );
            setUserProfile({
                ...userProfile,
                username: updatedProfile.username,
                email: updatedProfile.email,
            });
            toast.custom(
                (t) => (
                    <div className="bg-white px-6 py-4 shadow-md rounded-lg transform transition-all duration-300 hover:scale-105">
                        <div className="flex items-center">
                            <div className="ml-3 animate-fadeIn">
                                <p className="text-sm font-medium text-gray-900">
                                    Chỉnh sửa thành công, vui lòng đăng nhập lại
                                </p>
                            </div>
                            <div className="ml-4 flex">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        logout();
                                        window.location.reload();
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transform transition-all duration-200 hover:scale-105 active:scale-95"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                ),
                {
                    duration: 5000,
                    position: "top-center",
                    className: "animate-slideIn",
                }
            );
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Không thể cập nhật thông tin. Vui lòng thử lại.", {
                className: "animate-shake",
                duration: 3000,
            });
        }
    };

    const renderInputField = (label, name, type = "text") => (
        <div className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={formValues[name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required // Added required to ensure new values are entered
            />
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
            {renderInputField("Tên người dùng", "username")}
            {renderInputField("Email", "email", "email")}
            <br />
            <Button
                type="primary"
                size="small"
                className="w-full mb-4"
                onClick={() => toast.success("This is a success message!")}
            >
                Chỉnh sửa ảnh đại diện
            </Button>
            <Button
                type="primary"
                size="small"
                htmlType="submit"
                className="w-full"
            >
                Lưu thay đổi
            </Button>
        </form>
    );
};

EditProfileForm.propTypes = {
    userProfile: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    setUserProfile: PropTypes.func.isRequired,
};

export default EditProfileForm;
