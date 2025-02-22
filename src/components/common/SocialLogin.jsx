import { Button } from "antd";

const SocialLogin = () => (
    <div className="mt-4">
        <Button
            type="primary"
            htmlType="button"
            className="w-full mb-2"
            style={{ backgroundColor: "#3b5998", borderColor: "#3b5998" }}
        >
            Login with Facebook
        </Button>
    </div>
);

export default SocialLogin;
