import { RollbackOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, InputNumber, Select, Button, message } from "antd";
import Form, { FormProps, useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Link } from "react-router-dom";
import instance from "../../../../../configs/axios";

type FieldType = {
  title?: string;
  price?: number;
  thumbnail?: string;
  description?: string;
  categoryID?: number;
  quantity?: number;
  count?: number;
};

const ProductAdd = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [ form ] = useForm();

  const { data: categoriesData, isLoading, isError } = useQuery({
      queryKey:["categories"],
      queryFn: async () => {
        const data = await instance.get('/categories');
        return data;
      },
  })
  console.log(categoriesData);

  const { mutate } = useMutation({
    mutationFn: async (product:FieldType) => {
      try {
        return await instance.post("/products", product);
      } catch (error) {
        throw new Error('Failed to add product');
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Product added successfully!'
      });
      form.resetFields();
    },

    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Failed to add product'
    })}
  });
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values);
  };

  if( isLoading ) return <div>Loading...</div>;
  if( isError ) return <div>Error...</div>;
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {contextHolder}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <Link to="/admin/products">
          <Button type="primary" icon={<RollbackOutlined />} size="large">
            Products List
          </Button>
        </Link>
      </div>
      {/* Form */}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
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
              <Select.Option value={1}>Category 1</Select.Option>
              <Select.Option value={2}>Category 2</Select.Option>
              <Select.Option value={3}>Category 3</Select.Option>
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
            label="Count"
            name="count"
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

        {/* Submit Button */}
        <FormItem>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Product
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default ProductAdd;
