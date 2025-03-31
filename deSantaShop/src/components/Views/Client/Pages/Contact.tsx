/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Form, Input, Button, message } from "antd";
import instance from "../../../../configs/axios";

// Định nghĩa FieldType
type FieldType = {
  name: string;
  email: string;
  telephone: string;
  content: string;
  createdAt?: string;
};

const Contact = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: Contacts, isLoading, isError } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await instance.get("/contacts");
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (formcontact: FieldType) => {
      const newContact = {
        ...formcontact,
        createdAt: new Date().toISOString(),
      };
      const response = await instance.post("/contacts", newContact);
      return response.data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Send message successfully",
      });
      form.resetFields();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Failed to send message",
      });
    },
  });

  const onFinish = (values: FieldType) => {
    mutate(values);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 uppercase">Contact Us</h2>
        <p className="text-gray-500 mt-2">We are always ready to support you!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          <p className="text-gray-700 mb-2">
            <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
            <strong>Address:</strong> 88 Lane 86 Dinh Quan
          </p>
          <p className="text-gray-700 mb-2">
            <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
            <strong>Email:</strong> nguyenduyhung3624@gmail.com
          </p>
          <p className="text-gray-700 mb-2">
            <i className="fa fa-phone mr-2" aria-hidden="true"></i>
            <strong>Phone:</strong> 0394879813
          </p>
          <p className="text-gray-700">
            <i className="fa fa-clock-o mr-2" aria-hidden="true"></i>
            <strong>Working time:</strong> 08:00 - 21:00 (MD - SD)
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {contextHolder}
          <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please input your full name!" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Telephone"
              name="telephone"
              rules={[{ required: true, message: "Please input your telephone number!" }]}
            >
              <Input placeholder="Enter your telephone number" />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please input your message content!" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter your content" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-center mb-4">Address on map</h3>
        <div className="w-full h-80 bg-gray-300 rounded-lg shadow-lg">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.3826838820105!2d105.74369407503202!3d21.04770468060632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454f1e79a83bb%3A0x43cd8c9da2b20503!2zODggTmfDtSA4NiwgQ-G6p3UgRGnhu4VuLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2sus!4v1743446974244!5m2!1svi!2sus"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
