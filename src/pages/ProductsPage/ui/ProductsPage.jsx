import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartDrawer from "../../../components/CartDrawer/CartDrawer";
import { productApi } from "../../../features/products/api/productApi";
import { categoryApi } from "../../../features/category/api/categoryApi";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";


export function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])
    const [cats, setCats] = useState([ ])
    const [q, setQ] = useState('')
    const [cat, setCat] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const [p, c] = await Promise.all([productApi.list(), categoryApi.list() ])
                setList(p); setCats(c)
            } finally { setLoading(false) }
        })()
    }, [])

    const filtered = useMemo(() => {
        const ql = q.trim().toLowerCase();
        return list.filter(p => {
            const byCat = !cat || p.categoriesId === cat;
            const byQ = !ql || p.title?.toLowerCase().includes(ql) || p.description?.toLowerCase().includes(ql)
            return byCat && byQ
        })
    }, [list, q, cat])

    if (loading) return <div style={{padding: 24}}>Загрузка...</div>

    return (
        <div style={{ padding: 24 }}>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between'}} wrap>
                <Space>
                    <Typography.Title level={3} style={{ margin: 0, color: 'white'}}>Каталог</Typography.Title>
                    <Input placeholder="Поиск" value={q} onChange={e => setQ(e.target.value)} allowClear />
                    <Select 
                        allowClear
                        placeholder="Категория"
                        options={cats.map(c => ({ value: c.id, label: c.title }))}
                        style={{minWidth: 200 }}
                        value={cat}
                        onChange={setCat}
                    />
                </Space>
                <Space>
                    <Button icon={<PlusOutlined />} onClick={() => navigate('/admin/products/new')}>Добавить товар</Button>
                    <Button icon={<ShoppingCartOutlined />} type="primary" onClick={() => setCartOpen(true)}>Корзина</Button>
                </Space>
            </Space>

            <Row gutter={[16, 16]}>
                {filtered.map(p => (
                    <Col  key={p.id}>
                        <ProductCard p={p} />
                    </Col>
                ))}
            </Row>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
    )
}