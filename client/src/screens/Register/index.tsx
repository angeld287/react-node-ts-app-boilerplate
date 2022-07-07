import React, { useCallback, useEffect, useState } from "react"
import CustomForm from "../../components/CustomForm"
import { Content } from 'antd/lib/layout/layout';
import styles from "./styles";
//import { useAppDispatch } from "../../app/hooks";
import { MessageApi } from "antd/lib/message";
import { IValidationError } from "../../interfaces/models/IBase";
import { ICustomInputGroup } from "../../components/CustomInputGroup/ICustomInputGroup";
import { ICustomButton } from "../../components/CustomButton/ICustomButton";
import { selectUserRegister, setIsRegistering } from "../../features/userRegister/userRegisterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IRegisterUser } from "../../interfaces/models/IUser";
import { registerAsync } from "../../features/userRegister/asyncThunks";


const Register: React.FC = () => {

    const [message, setMessage] = useState<MessageApi>()
    const [error, setError] = useState<IValidationError>()

    const register = useAppSelector(selectUserRegister);
    const dispatch = useAppDispatch()

    useEffect(() => {

        const _register = () => {

            setError({
                message: '',
                error: false
            });

            let registerError = register.error;
            if (registerError) {
                if (!Array.isArray(registerError)) {
                    setError({
                        message: registerError.message,
                        error: true
                    })
                    return message?.error(registerError.message)
                }
                if (Array.isArray(registerError)) {
                    setError({
                        message: registerError[0].message,
                        error: true
                    })
                    return registerError.forEach(e => {
                        message?.error(e.message)
                    });
                }
            }
        }

        if (register.status === 'idle' && message) {
            _register()
        } else if (register.status === 'failed') {
            setError({
                message: 'Internal Error',
                error: true
            })
        }

    }, [register.status, register.error, message]);

    const handleClicRegisterButton = useCallback(
        (user: IRegisterUser, message: MessageApi) => {
            setMessage(message);
            dispatch(registerAsync(user))
        }
        , []
    );

    const closeRegisterScreen = useCallback(() => {
        dispatch(setIsRegistering(false));
    }, [dispatch])

    let inputFields: Array<ICustomInputGroup> = [
        {
            name: 'email',
            label: 'Email',
            defaultValue: '',
            disabled: false,
        },
        {
            name: 'username',
            label: 'Username',
            defaultValue: '',
            disabled: false,
        },
        {
            name: 'phonenumber',
            label: 'Phone Number',
            defaultValue: '',
            disabled: false,
        },
        {
            name: 'password',
            label: 'Password',
            defaultValue: '',
            disabled: false,
            type: 'password'
        },
        {
            name: 'confirmpassword',
            label: 'Confirm your password',
            defaultValue: '',
            disabled: false,
            type: 'password'
        },
        {
            name: 'fullname',
            label: 'Fullname',
            defaultValue: '',
            disabled: false,
        },
        {
            name: 'gender',
            label: 'Gender',
            defaultValue: '',
            disabled: false,
        }
    ]

    let btns: Array<ICustomButton> = [
        {
            color: 'blue',
            _key: 'login_btn',
            children: 'Login',
            htmlType: 'button',
            name: "login",
            onClick: closeRegisterScreen
        },
        {
            color: 'blue',
            _key: 'register_btn',
            children: 'Sign Up',
            loading: false,
            htmlType: 'submit',
            name: "register",
        }
    ]

    return (
        <>
            <Content style={styles.container}>
                <CustomForm error={error} onSubmit={handleClicRegisterButton} fields={inputFields} buttons={btns} verticalButtons={false} loading={false} />
            </Content>
        </>
    )
}

export default Register