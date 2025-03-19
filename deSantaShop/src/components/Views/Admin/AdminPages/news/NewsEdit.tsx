import { RollbackOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, Button, message } from "antd";
import Form, { FormProps, useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../../../../configs/axios";

type FieldType = {
    title?: string;
    content?: string;
    image?: string;
};

const NewsEdit = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = useForm();
    const { id } = useParams();

    const { data: newsResponse } = useQuery({
        queryKey: ["news", id],
        queryFn: async () => {
            const response = await instance.get(`/news/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (newsResponse) {
            form.setFieldsValue(newsResponse);
        }
    }, [newsResponse, form]);

    const { mutate } = useMutation({
        mutationFn: async (news: FieldType) => {
            return await instance.put(`/news/${id}`, news);
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "News updated successfully!",
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Failed to update news",
            });
        },
    });

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        mutate({
            ...values,
            id: newsResponse?.id,
            updatedAt: new Date().toISOString(),
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {contextHolder}
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit News: {newsResponse?.title}</h1>
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
                        Update News
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};

export default NewsEdit;
