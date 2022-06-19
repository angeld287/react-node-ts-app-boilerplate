import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSessionAsync } from '../../features/userSession/asyncThunks';
import { selectUserSession } from '../../features/userSession/userSessionSlice';

const Login: React.FC = () => {

    const session = useAppSelector(selectUserSession);
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(session);
    }, [session.sessionStatus]);

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={() => dispatch(getSessionAsync())}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;