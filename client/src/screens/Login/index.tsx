import { Content } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICustomButton } from '../../components/CustomButton/ICustomButton';
import CustomForm from '../../components/CustomForm';
import { ICustomInputGroup } from '../../components/CustomInputGroup/ICustomInputGroup';
import { loginAsync } from '../../features/userSession/asyncThunks';
import { ICredentials } from '../../features/userSession/IUserSession';
import { selectUserSession } from '../../features/userSession/userSessionSlice';
import styles from './styles';

const Login: React.FC = () => {

    const session = useAppSelector(selectUserSession);
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(session.loginStatus);
    }, [session.loginStatus]);

    const handleClicLoginButton = (credentials: ICredentials) => {
        dispatch(loginAsync(credentials))
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
            children: 'Login',
            loading: session.loginStatus === 'pending',
            htmlType: 'submit'
        }
    ]

    return (
        <>
            <Content style={styles.container}>
                <CustomForm onSubmit={handleClicLoginButton} fields={inputFields} buttons={btns} verticalButtons={false} loading={session.loginStatus === 'pending'} />
            </Content>
        </>
    );
};

export default Login;