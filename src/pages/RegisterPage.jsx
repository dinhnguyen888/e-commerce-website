import AuthLayout from "../components/layout/AuthLayout";
import GenericForm from "../components/common/GenericForm";
import SocialLogin from "../components/common/SocialLogin";

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const fields = [
        {
            label: "Email",
            name: "email",
            type: "text",
            required: true,
            message: "Please input your email!",
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            required: true,
            message: "Please input your password!",
        },
        {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            required: true,
            message: "Please confirm your password!",
        },
    ];

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
            <GenericForm
                fields={fields}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
            <SocialLogin />
            <p
                className="text-left cursor-pointer text-red-500 "
                onClick={() => (window.location.href = "/dang-nhap")}
            >
                Đã có tài khoản? Đăng nhập thôi
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
