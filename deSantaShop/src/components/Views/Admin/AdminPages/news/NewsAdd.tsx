import { RollbackOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Input, Button, message } from "antd";
import Form, { FormProps, useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Link } from "react-router-dom";
import instance from "../../../../../configs/axios";

type FieldType = {
    title?: string;
    content?: string;
    image?: string;
};

const NewsAdd = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = useForm();

    const { mutate } = useMutation({
        mutationFn: async (news: FieldType) => {
            try {
                return await instance.post("/news", news);
            } catch (error) {
                throw new Error("Failed to add news");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "News added successfully!",
            });
            form.resetFields();
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Failed to add news",
            });
        },
    });

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        mutate(values);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {contextHolder}
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Add News</h1>
                <Link to="/admin/news">
                    <Button type="primary" icon={<RollbackOutlined />} size="large">
                        News List
                    </Button>
                </Link>
            </div>
            {/* Form */}
            <Form
                form={form}
                name="news-form"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <FormItem<FieldType>
                    label="News Title"
                    name="title"
                    rules={[{ required: true, message: "Please input news title!" }]}
                >
                    <Input className="w-full" />
                </FormItem>

                <FormItem<FieldType>
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: "Please input thumbnail URL!" }]}
                >
                    <Input className="w-full" />
                </FormItem>

                <FormItem<FieldType>
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: "Please input news content!" }]}
                >
                    <TextArea rows={6} className="w-full" />
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Add News
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};

export default NewsAdd;
