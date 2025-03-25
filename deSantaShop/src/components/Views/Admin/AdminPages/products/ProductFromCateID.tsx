/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import instance from '../../../../../configs/axios';

const ProductFromCateID = () => {
    const { id } = useParams();


    const { data: Category, isLoading, isError } = useQuery({
        queryKey: ["categories", id],
        queryFn: async () => {
            const response = await instance.get(`/categories/${id}`);
            return response.data;
        },
        enabled: !!id,
    });


    const { data: Products, isLoading: productsLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const response = await instance.get(`/products?categoriesID=${id}`);
            return response.data;
        },
        enabled: !!id,
    });

      console.log(Products);
      console.log(Category);



    if (isLoading || productsLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;


    const filteredProducts = Products?.filter((product: any) => product.categoryID == id);
    const columns = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (url: string) => (
            <img src={url} alt="Thumbnail" style={{ width: 50, height: 50, objectFit: 'cover' }} />
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price: number) => <span>${price}</span>,
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (date: string) => new Date(date).toLocaleDateString(),
    },
];

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">{Category?.name}</h3>
            <Table
                columns={columns}
                dataSource={filteredProducts}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                className="border border-gray-200 rounded-lg"
            />
        </div>
    );

};

export default ProductFromCateID;
