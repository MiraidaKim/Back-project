import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";

const SignUpForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await authApi.register(values);
      message.success("Регистрация прошла успешно!");
      navigate("/signin"); 
    } catch (e) {
      message.error(e?.response?.data?.message || "Ошибка при регистрации");
    }
  };

  return (
    <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Введите ваше имя!" }]}
      >
        <Input placeholder="Мира" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Введите email!" },
          { type: "email", message: "Некорректный email!" },
        ]}
      >
        <Input placeholder="qwer@example.com" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password placeholder="********" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Зарегистрироваться
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="link" block onClick={() => navigate("/signin")}>
          Уже есть аккаунт? Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
