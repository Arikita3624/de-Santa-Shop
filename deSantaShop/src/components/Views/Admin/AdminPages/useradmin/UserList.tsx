/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import instance from "../../../../../configs/axios";
import { Button, message, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const UserList = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    // Call API Users & Roles concurrently to optimize loading speed
    const { data: Users, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await instance.get("/users");
            return response.data;
        },
    });

    const { data: Roles } = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const response = await instance.get("/roles");
            return response.data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            const response = await instance.delete(`/users/${id}`);
            return response.data;
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Delete user successfully",
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Failed to delete user",
            });
        }
    });

    const columns = [
        {
            title: "Index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar: string) => (
                <img src={avatar} className="w-12 h-12 rounded-full shadow-md" alt="avatar" />
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email: string) => <span className="text-blue-500">{email}</span>,
        },
        {
            title: "Phone",
            dataIndex: "telephone",
            key: "telephone",
            render: (phone: string) => <span className="text-purple-500">{phone}</span>,
        },
        {
            title: "Role",
            dataIndex: "roleID",
            key: "roleID",
            render: (roleID: number) => {
                const role = Roles?.find((r: any) => r.id === roleID);
                return (
                    <span className={`px-3 py-1 rounded-md text-white ${role?.name === "Admin" ? "bg-red-500" : "bg-green-500"}`}>
                        {role ? role.name : "No role"}
                    </span>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, user: any) => (
                <div className="flex gap-2">
                    <Link to={`/admin/users/${user.id}/edit`}>
                        <Button type="primary" icon={<EditOutlined />} size="small" className="bg-blue-500 hover:bg-blue-700">
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => mutate(user.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" className="bg-red-500 hover:bg-red-700">
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button
                        type="default"
                        icon={<StopOutlined />}
                        size="small"
                        className="bg-white hover:bg-gray-700"
                    >
                    </Button>
                </div>
            ),
        },
    ];

    if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Error loading data</div>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            {contextHolder}
            <h3 className="text-2xl font-bold mb-4">User List</h3>
            <Table
                bordered
                columns={columns}
                dataSource={Users}
                pagination={{ pageSize: 5 }}
                rowKey="id"
            />
        </div>
    );
};

export default UserList;

