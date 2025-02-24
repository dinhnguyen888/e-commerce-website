import AuthLayout from "../components/layout/AuthLayout";
import GenericForm from "../components/common/GenericForm";
import SocialLogin from "../components/common/SocialLogin";
import RegisterLink from "../components/common/AuthLink";
import { loginUser } from "../services/login.api";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();

    const onFinish = async (values) => {
        console.log("Form values:", values);
        var token = await loginUser(values.email, values.password);
        if (token) {
            console.log("Account:", token.accessToken);
            login(token.accessToken);
            window.location.href = "/";
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Form submission failed:", errorInfo);
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
    ];

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
            <GenericForm
                fields={fields}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                checkboxContent={"Remember me"}
            />
            <SocialLogin />

            <RegisterLink />
        </AuthLayout>
    );
};

export default LoginPage;
