import { RollbackOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, Button, message } from "antd";
import Form, { FormProps, useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../../../../configs/axios";

type CategoryType = {
  name?: string;
  description?: string;
};

const CategoryEdit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const { id } = useParams();

  const { data: categoryResponse, isLoading, isError } = useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      const response = await instance.get(`/categories/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (categoryResponse) {
      form.setFieldsValue(categoryResponse);
    }
  }, [categoryResponse, form]);

  const { mutate } = useMutation({
    mutationFn: async (category: CategoryType) => {
      return await instance.put(`/categories/${id}`, category);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Category updated successfully!",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Failed to update category",
      });
    },
  });

  const onFinish: FormProps<CategoryType>["onFinish"] = (values) => {
    mutate({
      ...values,
      id: categoryResponse?.id,
      updatedAt: new Date().toISOString(),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading category...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Category: {categoryResponse?.name}</h1>
        <Link to="/admin/categories">
          <Button type="primary" icon={<RollbackOutlined />} size="large">
            Categories List
          </Button>
        </Link>
      </div>

      <Form form={form} name="category_edit" layout="vertical" autoComplete="off" onFinish={onFinish}>
        <FormItem<CategoryType>
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input className="w-full" />
        </FormItem>

        <FormItem<CategoryType>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} className="w-full" />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" className="w-full">
            Update Category
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default CategoryEdit;
