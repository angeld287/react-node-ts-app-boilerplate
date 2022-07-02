import React, { useCallback, useState } from "react"
import CustomForm from "../../components/CustomForm"
import { Content } from 'antd/lib/layout/layout';
import styles from "./styles";
//import { useAppDispatch } from "../../app/hooks";
import { MessageApi } from "antd/lib/message";
import { IValidationError } from "../../interfaces/models/IBase";
import { ICustomInputGroup } from "../../components/CustomInputGroup/ICustomInputGroup";
import { ICustomButton } from "../../components/CustomButton/ICustomButton";


const Register: React.FC = () => {

    //const dispatch = useAppDispatch()
    const [message, setMessage] = useState<MessageApi>()
    const [error, setError] = useState<IValidationError>()

    const handleClicRegisterButton = useCallback(
        (message: MessageApi) => {
            setMessage(message);
        }
        , []
    );

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