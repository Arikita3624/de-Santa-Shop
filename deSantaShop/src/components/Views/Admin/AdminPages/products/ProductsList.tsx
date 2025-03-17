import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import instance from '../../../../../configs/axios';
import Table from 'antd/es/table/Table';
import { Link } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

const ProductsList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await instance.get('/products');
      return response.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await instance.get('/categories');
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/products/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Product deleted successfully!',
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Failed to delete product',
      });
    },
  });
  const filteredData = data
    ?.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((product: any) =>
      selectedDate
        ? dayjs(product.createdAt).isSame(selectedDate, 'day')
        : true
    )
    ?.map((product: any) => ({
      key: product.id,
      ...product,
    }));

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <img src={thumbnail} alt="product thumbnail" className="w-12 h-12 object-cover" />
      ),
    },
    {
      title: 'Categories',
      dataIndex: 'categoryID',
      key: 'categoryID',
      render: (categoryID: number) => {
        const category = Array.isArray(categories)
          ? categories.find((cate: any) => cate.id === categoryID)
          : null;

        return category ? category.name : 'Unknown';
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) =>
        date ? dayjs(date).format("DD/MM/YYYY") : "No updates",
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, product: any) => (
        <div className="flex gap-2">
          <Link to={`/admin/products/${product.id}/edit`}>
            <Button type="primary" icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => mutate(product.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="text-center text-lg"><LoadingOutlined /></div>;
  if (isError) return <div className="text-center text-red-500">Error fetching products.</div>;

  return (
    <div className="p-4">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Products List</h1>
        <Link to="/admin/products/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by product name"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <DatePicker
          onChange={(date) => setSelectedDate(date)}
          placeholder="Filter by date"
        />
        <Button onClick={() => { setSearchTerm(''); setSelectedDate(null); }}>
          Reset Filters
        </Button>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ProductsList;
