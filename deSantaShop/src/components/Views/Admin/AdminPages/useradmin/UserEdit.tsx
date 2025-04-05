import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import instance from "../../../../../configs/axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    // Fetch user information
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["users", id],
        queryFn: async () => {
            const response = await instance.get(`/users/${id}`);
            return response.data;
        },
    });

    console.log(user);

    const { data: roles } = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const response = await instance.get(`/roles`);
            return response.data;
        },
    });
    console.log(roles);

    const updateRoleMutation = useMutation({
        mutationFn: async (newRoleID: number) => {
            await instance.patch(`/users/${id}`, { roleID: newRoleID });
        },
        onSuccess: () => {
            message.success("Update role successfully!");
            queryClient.invalidateQueries(["users", id]);
        },
        onError: () => {
            message.error("Error when updating role!");
        },
    });


    const updatePasswordMutation = useMutation({
        mutationFn: async (newPassword: string) => {
            await instance.patch(`/users/${id}`, { password: newPassword });
        },
        onSuccess: () => {
            message.success("Update password successfully!");
            setShowPasswordForm(false);
        },
        onError: () => {
            message.error("Error when updating password!");
        },
    });



    if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Error when loading data</div>;

    const handleRoleChange = (newRoleID: number) => {
        updateRoleMutation.mutate(newRoleID);
    };

    const handlePasswordChange = (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("Confirm password does not match!");
            return;
        }
        updatePasswordMutation.mutate(values.newPassword);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Edit User</h3>

            {/* Form to update role */}
            <Form layout="vertical" className="mb-6">
                <Form.Item label="Username">
                    <Input value={user.username} disabled />
                </Form.Item>

                <Form.Item label="Select new role">
                    <Select
                        defaultValue={user.roleID}
                        onChange={handleRoleChange}
                        className="w-full"
                        loading={updateRoleMutation.isLoading}
                    >
                        {roles?.map((role: any) => (
                            <Option key={role.id} value={role.id}>
                                {role.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
            <Button
                type="dashed"
                className="w-full mb-4"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
                {showPasswordForm ? "❌ Cancel password update" : "🔑 Update password"}
            </Button>

            {/* Form to update password (only show if showPasswordForm = true) */}
            {showPasswordForm && (
                <Form layout="vertical" onFinish={handlePasswordChange}>
                    <Form.Item
                        label="New password"
                        name="newPassword"
                        rules={[{ required: true, message: "Please enter new password!" }]}
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm password"
                        name="confirmPassword"
                        rules={[{ required: true, message: "Please confirm password!" }]}
                    >
                        <Input.Password placeholder="Enter new password again" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={updatePasswordMutation.isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-700"
                    >
                        Update password
                    </Button>
                </Form>
            )}
            <Button
                className="mt-4 w-full"
                onClick={() => navigate("/admin/users")}
            >
                Back to list
            </Button>
        </div>
    );
};

export default UserEdit;

