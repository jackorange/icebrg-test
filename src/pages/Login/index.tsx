import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { useForm } from 'antd/es/form/Form';
import { useApi } from '../../hooks/useApi';

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [form] = useForm<ILoginForm>();
  const { login } = useApi();

  const onFinish = async (values: ILoginForm) => {
    await login(values.email, values.password);
  };

  return (
    <Form
      form={form}
      name="loginForm"
      className={styles.loginForm}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.loginButton}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
