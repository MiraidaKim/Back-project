import { Button, Drawer, Empty, InputNumber, List } from "antd";
import { useCartStore } from "../../utils/cartStore";
import { cartApi } from "../../features/cart/api/cartApi";


export default function CartDrawer({open, onClose}) {

    const { items, setQty, remove, clear } = useCartStore()

    const syncServer = async () => {
        try {
            await Promise.all(items.map(i => cartApi.add({ productId: i.id, quantity: i.qty })))
        } catch (e) {console.log(e);
        }
    }


    

    return (
        <Drawer title="Корзина" open={open} onClose={onClose} width={420}>
            {items.length === 0 ? (
                <Empty description="Корзина пуста" />
            ) : (
                <>
                    <List 
                        dataSource={items}
                        renderItem={(i) => (
                            <List.Item
                                actions={[
                                    <InputNumber min={1} value={i.qty} onChange={(v) => setQty(i.id, Number(v || 1))} />,
                                    <Button danger onClick={() => remove(i.id)}>Удалить</Button>
                                ]}  
                            >
                                <List.Item.Meta 
                                    avatar={<img src={i.image || 'https://cdn-icons-png.flaticon.com/512/1440/1440523.png'} alt={i.title} width={60} height={60} style={{objectFit: 'cover'}} />}
                                    title={i.title}
                                    description={i.product?.categories?.title}
                                />
                            </List.Item>
                        )}
                    />
                    <div style={{ display: 'flex', gap: 8, marginTop: 12}}>
                        <Button onClick={syncServer}>Синхронизировать</Button>
                        <Button danger onClick={clear}>Очистить</Button>
                    </div>
                </>
            )}
        </Drawer>
    )
} 