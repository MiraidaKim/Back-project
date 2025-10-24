import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../../utils/authStore";
import { authApi } from "../../api/authApi";


const SignInForm = () => {

    const navigate = useNavigate();
    const { setSession } = useAuthStore()

    const onFinish = async (values) => {
        try {
            const res = await authApi.login(values);
            const { token, user } = res;
            setSession({ 
                accessToken: token.accessToken, 
                refreshToken: token.refreshToken, 
                user 
            })
            message.success('Вы успешно вошли в систему')
            navigate('/')
        } catch (e) {
            message.error(e?.response?.data?.message || 'Ошибка при входе')
        }
    }

    return (
        <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Form.Item label="Email" name={"email"} rules={[{ required: true, message: 'Введите email!' }, { type: 'email', message: 'Неккоректный email!'}]}>
                <Input placeholder="you@example.com" />
            </Form.Item>
            <Form.Item label="Пароль" name={"password"} rules={[{ required: true, message: 'Введите пароль!' }]}>
                <Input.Password placeholder="********" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignInForm