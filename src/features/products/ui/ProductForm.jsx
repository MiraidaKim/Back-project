import { Form, Input, InputNumber, Button, Upload, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsApi } from "../../api/productsApi"; // твой API
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductForm = ({ initialValues }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState(
    (initialValues?.images || []).map((url, index) => ({
      uid: String(index),
      name: `image-${index}.jpg`,
      status: "done",
      url,
    }))
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleUploadChange = ({ fileList: newList }) => {
    const updatedList = newList.map(file => ({
      ...file,
      url: file.response?.url || file.url, // url должен вернуть бэк
    }));
    setFileList(updatedList);
  };

  const onFinish = async (values) => {
    try {
      const images = fileList.map(file => file.url);
      const payload = { ...values, images };

      if (initialValues) {
        await productsApi.update(initialValues.id, payload);
        messageApi.success("Товар успешно обновлён!");
      } else {
        await productsApi.create(payload);
        messageApi.success("Товар успешно создан!");
      }

      navigate("/shop");
    } catch (e) {
      console.error(e);
      messageApi.error("Ошибка при сохранении товара");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Название товара"
          name="title"
          rules={[{ required: true, message: "Введите название!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: "Введите описание!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Цена" name="price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Картинки">
          <Upload
            action={`${import.meta.env.VITE_API_URL}/api/products/upload`}
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onPreview={(file) => {
              const index = fileList.findIndex(f => f.uid === file.uid);
              setPreviewIndex(index);
              setPreviewVisible(true);
            }}
          >
            {fileList.length < 6 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Загрузить</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {fileList.map((file, idx) => (
            <img
              key={idx}
              src={file.url}
              alt="preview"
              style={{ width: 100, height: 100, objectFit: "cover", cursor: "pointer" }}
              onClick={() => {
                setPreviewIndex(idx);
                setPreviewVisible(true);
              }}
            />
          ))}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Сохранить
          </Button>
        </Form.Item>
      </Form>

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={600}
      >
        <Slider {...sliderSettings} initialSlide={previewIndex}>
          {fileList.map((file, idx) => (
            <div key={idx}>
              <img
                src={file.url}
                alt="slide"
                style={{ width: "100%", height: 400, objectFit: "contain" }}
              />
            </div>
          ))}
        </Slider>
      </Modal>
    </>
  );
};

export default ProductForm;
