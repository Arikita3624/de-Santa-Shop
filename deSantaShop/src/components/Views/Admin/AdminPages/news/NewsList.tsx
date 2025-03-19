import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import instance from "../../../../../configs/axios";
import { Button, message, Popconfirm, Input, DatePicker, Table } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const NewsList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch danh sách tin tức
  const { data: News, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await instance.get("/news");
      return response.data;
    },
  });

  // Mutation xóa tin tức
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/news/${id}`);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "News deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Failed to delete news",
      });
    },
  });

  // Lọc dữ liệu
  const filteredData = News?.filter((news: any) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
    ?.filter((news: any) =>
      selectedDate ? dayjs(news.createdAt).isSame(selectedDate, "day") : true
    )
    ?.map((news: number | string) => ({
      key: news.id,
      ...news,
    }));

  // Cấu hình cột của bảng
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image: string) => (
        <img src={image} alt="news thumbnail" className="w-12 h-12 object-cover" />
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (date ? dayjs(date).format("DD/MM/YYYY") : "No updates"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, news: any) => (
        <div className="flex gap-2">
          <Link to={`/admin/news/${news.id}/edit`}>
            <Button type="primary" icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this news?"
            onConfirm={() => mutate(news.id)}
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

  if (isLoading)
    return (
      <div className="text-center text-lg">
        <LoadingOutlined />
      </div>
    );
  if (isError)
    return <div className="text-center text-red-500">Error fetching news.</div>;

  return (
    <div className="p-4">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">News List</h1>
        <Link to="/admin/news/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add News
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by news title"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <DatePicker onChange={(date) => setSelectedDate(date)} placeholder="Filter by date" />
        <Button
          onClick={() => {
            setSearchTerm("");
            setSelectedDate(null);
          }}
        >
          Reset Filters
        </Button>
      </div>
      <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 5 }} bordered />
    </div>
  );
};

export default NewsList;
