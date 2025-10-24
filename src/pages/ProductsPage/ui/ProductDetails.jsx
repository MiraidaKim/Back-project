import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../utils/cartStore";
import { Button, Card, Image, Space, Typography } from "antd";
import { productApi } from "../../../features/products/api/productApi";


export function ProductDetails() {
    const { id } = useParams()
    const [p, setP] = useState(null)
    const [loading, setLoading] = useState(true)
    const { add } = useCartStore()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try { setP(await productApi.byId(id)); }
            finally { setLoading(false) }
        })()
    }, [id])

    if (loading) return <div style={{ padding: 24 }}>Загрузка...</div>
    if (!p) return <div style={{padding: 24}}>Товар не найден</div>

    const gallery = [p.image, ...(p.images || [])].filter(Boolean)

    return (
        <div style={{ padding: 24 }}>
            <Card>
                <Space align="start" size={24} wrap>
                    <Image.PreviewGroup>
                        <Image width={320} src={gallery[0] || 'https://cdn-icons-png.flaticon.com/512/1440/1440523.png'} />
                    </Image.PreviewGroup>
                    <div style={{ maxWidth: 600 }}>
                        <Typography.Title level={3}>{p.title}</Typography.Title>
                        <Typography.Paragraph>{p.description}</Typography.Paragraph>
                        {p.categories?.title && (
                            <Typography.Text type="secondary">Категория: {p.categories.title}</Typography.Text>
                        )}
                        <div style={{ marginTop: 16, display: 'flex', gap: 8}}>
                            <Button type="primary" onClick={() => add(p, 1)}>Добавить в корзину</Button>
                            <Button onClick={() => navigate('/shop')}>Назад в каталог</Button>
                        </div>
                    </div>
                </Space>
            </Card>
        </div>
    )
}