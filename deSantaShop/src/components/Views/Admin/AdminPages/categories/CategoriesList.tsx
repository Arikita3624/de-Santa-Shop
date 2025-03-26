import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import instance from '../../../../../configs/axios';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, Table, message, Popconfirm, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const CategoriesList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await instance.get('/categories');
      return response.data;
    },
  });

  const filteredData = data
    ?.filter((category: any) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((category: any) =>
      selectedDate ? dayjs(category.createdAt).isSame(selectedDate, 'day') : true
    )
    ?.map((category: any, index: number) => ({
      key: category.id,
      stt: index + 1,
      ...category,
    }));

  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`/categories/${id}`);
      messageApi.success('Category deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    } catch (error) {
      messageApi.error('Failed to delete category.');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <div>
          <span>{dayjs(date).format('DD/MM/YYYY')}</span>
          <br />
          <span>{dayjs(date).format('HH:mm')}</span>
        </div>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <div>
          <span>{dayjs(date).format('DD/MM/YYYY')}</span>
          <br />
          <span>{dayjs(date).format('HH:mm')}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, cate: any) => (
        <div className="flex gap-2">
          <Link to={`/admin/categories/${cate.key}/edit`}>
            <Button type="primary" icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(cate.key)}
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
    {
      title: 'View Products',
      key: 'viewProducts',
      render: (_: any, record: any) => (
        <Link to={`/admin/categories/${record.key}/products`}>
          <Button type="default" icon={<EyeOutlined />} size="small">
            View Products
          </Button>
        </Link>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching categories.</div>;

  return (
    <div className="p-4">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Categories List</h1>
        <Link to="/admin/categories/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by category name"
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
      <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 5 }} bordered />
    </div>
  );
};

export default CategoriesList;
