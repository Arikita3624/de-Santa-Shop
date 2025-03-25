import { RollbackOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, InputNumber, Select, Button, message } from "antd";
import Form, { FormProps, useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../../../../configs/axios";

type FieldType = {
  title?: string;
  price?: number;
  thumbnail?: string;
  description?: string;
  categoryID?: number;
  quantity?: number;
  discount?: number;
};

const ProductEdit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const { id } = useParams();

  const { data: categoriesResponse, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await instance.get("/categories");
      return response.data;
    },
  });

  const { data: productResponse } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await instance.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (productResponse) {
      form.setFieldsValue(productResponse);
    }
  }, [productResponse, form]);

  const { mutate } = useMutation({
    mutationFn: async (product: FieldType) => {
      return await instance.put(`/products/${id}`, product);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Product updated successfully!",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Failed to update product",
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate({
      ...values,
      id: productResponse?.id,
      createdAt: productResponse?.createdAt,
      updatedAt: new Date().toISOString(),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Product: {productResponse?.title}</h1>
        <Link to="/admin/products">
          <Button type="primary" icon={<RollbackOutlined />} size="large">
            Products List
          </Button>
        </Link>
      </div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormItem<FieldType>
            label="Title Product"
            name="title"
            rules={[{ required: true, message: "Please input title product!" }]}
          >
            <Input className="w-full" />
          </FormItem>

          <FormItem<FieldType>
            label="Price Product"
            name="price"
            rules={[{ required: true, message: "Please input price product!" }]}
          >
            <InputNumber className="w-full" />
          </FormItem>

          <FormItem<FieldType>
            label="Thumbnail Product"
            name="thumbnail"
            rules={[{ required: true, message: "Please input thumbnail URL!" }]}
          >
            <Input className="w-full" />
          </FormItem>

          <FormItem<FieldType>
            label="Category"
            name="categoryID"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select placeholder="Choose category" className="w-full">
              {categoriesResponse?.map((category: string | any) => (
                <Select.Option key={category.id} value={category.id}> {category.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          <FormItem<FieldType>
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input quantity!" }]}
          >
            <InputNumber className="w-full" />
          </FormItem>

          <FormItem<FieldType>
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Please input count!" }]}
          >
            <InputNumber className="w-full" />
          </FormItem>
        </div>

        <FormItem<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} className="w-full" />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" className="w-full">
            Update Product
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default ProductEdit;
