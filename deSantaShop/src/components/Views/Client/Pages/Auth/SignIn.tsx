import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import instance from "../../../../../configs/axios";

type FieldType = {
    email: string;
    password: string;
};

const SignIn = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: async (user: FieldType) => {
            try {
                const response = await instance.post("/signin", user);
                console.log("API response:", response.data); // Log phản hồi từ API
                return response.data;
            } catch (error) {
                console.error("Login error:", error);
                throw new Error("Failed to login");
            }
        },
        onSuccess: (data) => {
            console.log("Login success:", data);
            if (data?.accessToken) {
                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("user", JSON.stringify(data.user));

                messageApi.success("Login successfully! You will be redirected to the home page.");
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } else {
                messageApi.error("Invalid login response. No accessToken received.");
            }
        },
        onError: () => {
            messageApi.error("Invalid username or password!");
        },
    });

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        mutate(values);
    };

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mb-8">
            {contextHolder}
            <div className="w-full max-w-lg bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">Sign In</h3>

                <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-500" />}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300"
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-500" />}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300"
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-between items-center">
                            <Checkbox>Remember me</Checkbox>
                            <a href="#" className="text-gray-900 font-semibold hover:underline">Forgot password?</a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full !bg-gray-900 !text-white !border !border-gray-900
                                    hover:!bg-white hover:!text-black
                                    active:!bg-gray-800 focus:!ring-2 focus:!ring-gray-500
                                    font-semibold py-3 rounded-md transition-all duration-300 ease-in-out"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-gray-600 text-sm">
                    Don't have an account? <a href="#" className="text-gray-900 font-semibold hover:underline">Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
