/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../../configs/axios";

type FieldType = {
    name: string;
    username: string;
    password: string;
    email: string;
    telephone: string;
};

const SignUp = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { mutate, isError } = useMutation({
        mutationFn: async (users: FieldType) => {
            try {
                const response = await instance.post("/signup", users);
                console.log("API response:", response.data);
                return response.data;
            } catch (error) {
                console.error("Signup error:", error);
                throw new Error("Failed to register");
            }
        },
        onSuccess: (data) => {
            if (data?.accessToken && data?.user) {
                const expiresInDays = 7;
                const expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + expiresInDays);

                const userWithRole = {
                    ...data.user,
                    role: data.user.roleID === 1 ? "admin" : "user"
                };

                console.log("User with role:", userWithRole);

                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(userWithRole));
                localStorage.setItem("expiresAt", expiresAt.toISOString());

                messageApi.success("Register successfully! Redirecting...");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                messageApi.success("Register successfully! Please sign in.");
                form.resetFields();
                setTimeout(() => {
                    navigate("/signin");
                }, 2000);
            }
        },
        onError: () => {
            messageApi.error("Failed to register account");
        },
    });

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        const newUser = {
            ...values,
            roleID: 2,
            role: "user" // Thêm role để nhất quán với SignIn
        };
        mutate(newUser);
    };

    if (isError) return <div>Error</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mb-6">
            {contextHolder}
            <div className="w-full max-w-lg bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">Sign Up</h3>

                <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
                    <Form.Item<FieldType>
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-500" />}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300"
                            placeholder="Your name"
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please enter your username!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-500" />}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300"
                            placeholder="Enter your username"
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-500" />}
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

                    <Form.Item<FieldType>
                        label="Telephone"
                        name="telephone"
                        rules={[
                            { required: true, message: "Please enter your telephone!" },
                            {
                                pattern: /^\d{10,15}$/,
                                message: "Telephone must be 10-15 digits!"
                            }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="text-gray-500" />}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300"
                            placeholder="Enter your phone number"
                        />
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
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-gray-600 text-sm">
                    Already have an account? <a href="signin" className="text-gray-900 font-semibold hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;