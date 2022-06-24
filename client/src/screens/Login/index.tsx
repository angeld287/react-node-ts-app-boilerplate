import { Content } from 'antd/lib/layout/layout';
import { MessageApi } from 'antd/lib/message';
import React, { useEffect, useState } from 'react';
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
    const [message, setMessage] = useState<MessageApi>()

    useEffect(() => {

        const login = () => {
            if (session.loginStatus !== 'idle' && !message) {
                return false
            }

            let sessionError = session.error;
            if (sessionError) {

                let isArray = Array.isArray(sessionError);
                if (!isArray) {
                    //return message?.error(sessionError.message)
                }

                if (isArray) {

                    return null
                }
            }

            let sessionUser = session.user;
            if (sessionUser) {

                return null
            }

            if (session.loginStatus === 'idle') {
                if (sessionError && message) {
                    if (Array.isArray(sessionError)) {
                        sessionError.forEach(e => {
                            message.error(e.message)
                        });
                    } else {

                    }
                } else if (sessionUser) {

                }
            }
        }

        login()

    }, [session.loginStatus, session.error, message]);

    const handleClicLoginButton = (credentials: ICredentials, message: MessageApi) => {
        setMessage(message);
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