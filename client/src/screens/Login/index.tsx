import { Button, Form, Input, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICustomButton } from '../../components/CustomButton/ICustomButton';
import CustomForm from '../../components/CustomForm';
import { ICustomInputGroup } from '../../components/CustomInputGroup/ICustomInputGroup';
import { getSessionAsync } from '../../features/userSession/asyncThunks';
import { selectUserSession } from '../../features/userSession/userSessionSlice';
import styles from './styles';

const Login: React.FC = () => {

    const session = useAppSelector(selectUserSession);
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(session);
    }, [session.sessionStatus]);

    const handleClicLoginButton = () => {
        console.log('clicked');

    }

    let inputFields: Array<ICustomInputGroup> = [
        {
            name: 'username',
            label: 'User Name',
            defaultValue: '',
            disabled: false
        },
        {
            name: 'password',
            label: 'Password',
            defaultValue: '',
            disabled: false,
            type: 'password'
        }
    ]

    let btns: Array<ICustomButton> = [
        {
            color: 'blue',
            _key: 'login_btn',
            onClick: handleClicLoginButton,
            children: 'Login',
            loading: false,
        }
    ]

    return (
        <>
            <Content style={styles.container}>
                <CustomForm onSubmit={handleClicLoginButton} fields={inputFields} buttons={btns} verticalButtons={false} loading={session.status === 'pending'} />
            </Content>
        </>
    );
};

export default Login;