import { Button, Card, Form, Input, message, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryApi } from "../../../features/category/api/categoryApi";
import { productApi } from "../../../features/products/api/productApi";
import { PlusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";


export function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(!!isEdit);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    (async () => setCats(await categoryApi.list()))();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const p = await productApi.byId(id);
        form.setFieldsValue({
          title: p.title,
          description: p.description,
          categoriesId: p.categoriesId,
        });
        if (p.images && Array.isArray(p.images)) {
          setFileList(
            p.images.map((url, idx) => ({
              uid: String(idx),
              url,
              name: `image-${idx}`,
              status: "done",
            }))
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, id, form]);

  const handleUploadChange = ({ fileList: newList }) => {
    setFileList(newList);
  };

  const onFinish = async (values) => {
    try {
      const images = fileList.map((f) => f.url || f.response?.url);
      const payload = { ...values, images };
      if (isEdit) await productApi.update(id, payload);
      else await productApi.create(payload);
      message.success(isEdit ? "Товар обновлен" : "Товар создан");
      navigate("/shop");
    } catch (e) {
      message.error("Ошибка сохранения");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Добавить</div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <Card loading={loading} title={isEdit ? "Редактировать товар" : "Создать товар"}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Название" name="title" rules={[{ required: true, message: "Введите название" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Описание" name="description" rules={[{ required: true, message: "Введите описание" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Категория" name="categoriesId" rules={[{ required: true, message: "Выберите категорию" }]}>
            <Select options={cats.map((c) => ({ value: c.id, label: c.title }))} />
          </Form.Item>

         <Form.Item label="Изображения">
            <Upload
                action={`${import.meta.env.VITE_API_URL}/api/upload`}  
                headers={{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
                }}
                name="file"          
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                multiple
                accept="image/*"
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            >
                {fileList.length < 6 && (
                <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Добавить</div>
                </div>
                )}
            </Upload>
        </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">Сохранить</Button>
            <Button style={{ marginLeft: 8 }} onClick={() => navigate("/shop")}>Отмена</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
