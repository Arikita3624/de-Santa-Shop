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
  name?: string;
  description?: string;
};

const CategoryAdd = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const { mutate } = useMutation({
    mutationFn: async (category: FieldType) => {
      try {
        return await instance.post("/categories", category);
      } catch (error) {
        throw new Error("Failed to add category");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Category added successfully!",
      });
      form.resetFields();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Failed to add category",
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
        <h1 className="text-2xl font-bold">Add New Category</h1>
        <Link to="/admin/categories">
          <Button type="primary" icon={<RollbackOutlined />} size="large">
            Categories List
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form
        form={form}
        name="categoryForm"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <FormItem<FieldType>
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input className="w-full" />
        </FormItem>

        <FormItem<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} className="w-full" />
        </FormItem>

        {/* Submit Button */}
        <FormItem>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Category
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default CategoryAdd;
