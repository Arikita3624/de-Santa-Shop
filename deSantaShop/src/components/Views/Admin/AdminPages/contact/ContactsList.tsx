/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import instance from '../../../../../configs/axios';
import { Button, message, Popconfirm, Table } from 'antd';

const ContactsList = () => {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: Contacts, isLoading, isError } = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
          const response = await instance.get("/contacts");
          return response.data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (id: number | string) => {
            const response = await instance.delete(`/contacts/${id}`);
            return response.data;
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Delete message successfully",
            });
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Failed to delete message",
            });
        },
    });

    const columns = [
        {
            title: "STT",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Telephone",
            key: "telephone",
            dataIndex: "telephone",
        },
        {
            title: "Content",
            key: "content",
            dataIndex: "content",
        },
        {
            title: "Created At",
            key: "createdAt",
            dataIndex: "createdAt",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Popconfirm
                    title="Are you sure to delete this contact?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => mutate(record.id)}
                >
                    <div>
                        <Button type='primary' danger className="px-4 py-2 rounded-lg shadow-md hover:shadow-lg">Delete</Button>
                    </div>
                </Popconfirm>
            ),
        }
    ];

    if (isLoading) return <div className="text-center py-8">Loading...</div>;
    if (isError) return <div className="text-center py-8 text-red-500">Error loading contacts</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Contact List</h1>
            </div>

            {contextHolder}

            <Table
                dataSource={Contacts}
                columns={columns}
                pagination={{ pageSize: 5 }}
                bordered
                className="rounded-lg overflow-hidden shadow-lg"
                rowClassName="hover:bg-gray-50 transition-all"
            />
        </div>
    );
}

export default ContactsList;
