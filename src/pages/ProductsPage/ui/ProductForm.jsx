import { Button, Card, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryApi } from "../../../features/category/api/categoryApi";
import { productApi } from "../../../features/products/api/productApi";

export function ProductForm() {

    const { id } = useParams()
    const isEdit = Boolean(id)
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(!!isEdit)

    useEffect(() => { (async () => setCats(await categoryApi.list()))(); }, [])

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try { const p = await productApi.byId(id); form.setFieldsValue({ title: p.title, description: p.description, categoriesId: p.categoriesId}); }
            finally { setLoading(false)}
        })()
    }, [isEdit, id, form])

    const onFinish = async (values) => {
        try {
            if (isEdit) await productApi.update(id, values)
            else await productApi.create(values)
            message.success(isEdit ? 'Товар обновлен' : 'Товар создан')
            navigate('/shop')
        } catch (e) {
            message.error('Ошибка сохранения', e)
        }
    }

    return (
        <div style={{padding: 24}}>
            <Card loading={loading} title={isEdit ? 'Редактировать товар' : 'Создать товар'}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Название" name={"title"} rules={[{required: true, message: 'Введите название'}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Описание" name={"description"} rules={[{required: true, message: 'Введите описание'}]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Категория" name={"categoriesId"} rules={[{required: true, message: 'Выберите категорию'}]}>
                        <Select options={cats.map(c => ({ value: c.id, label: c.title}))} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                        <Button style={{marginLeft: 8}} onClick={() => navigate('/shop')}>Отмена</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}