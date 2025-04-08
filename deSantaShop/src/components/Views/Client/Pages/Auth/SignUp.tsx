import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import React from "react";
import instance from "../../../../../configs/axios";

type FieldType = {
    name: string;
    username: string;
    password: string;
    email: string;
    telephone: number | string;
};

const SignUp = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: async (users: FieldType) => {
            try {
                const response = await instance.post("/signup", users);
                return response.data;
            } catch (error) {
                throw new Error("Failed to register");
            }
        },
        onSuccess: () => {
            messageApi.success("Register successfully!");
            form.resetFields();
        },
        onError: () => {
            messageApi.error("Failed to register account");
        },
    });

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        const newUser = {...values, roleID: 2}
        mutate(newUser);
    };

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mb-6">
            {contextHolder}
            <div className="w-full max-w-lg bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">Sign Up</h3>

                <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-500" />}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-500 focus:ring focus:ring-gray-300"
                            placeholder="Ur name"
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
                        rules={[{ required: true, message: "Please enter your telephone!" }]}
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
