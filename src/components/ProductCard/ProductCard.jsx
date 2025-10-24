import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../utils/cartStore";

export default function ProductCard({ p }) {

    const navigate = useNavigate();
    const { add } = useCartStore()
    const img = p.image || p.images?.[0] || 'https://cdn-icons-png.flaticon.com/512/1440/1440523.png'
 
    return (
        <Card
            hoverable
            cover={<img alt={p.title} src={img} style={{ objectFit: 'cover', height: 180 }} />}
            actions={[<Button type="link" onClick={() => navigate(`/shop/${p.id}`)}>Подробнее</Button>]}
        >
            <Typography.Title level={5} style={{marginBottom: 8}}>{p.title}</Typography.Title>
            <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>{p.description}</Typography.Paragraph>
            <div style={{ display: 'flex', gap: 8 }}>
                <Button type="primary" onClick={() => add(p, 1)}>В корзину</Button>
                <Button onClick={() => navigate(`/shop/${p.id}`)}>Открыть</Button>
            </div>
        </Card>
    )
}
