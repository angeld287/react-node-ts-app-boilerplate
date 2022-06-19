import { Button, Form, Input } from 'antd';
import React, { useMemo } from 'react';
import CustomButton from '../CustomButton';
import CustomInputGroup from '../CustomInputGroup';
import { ICustomForm } from './ICustomForm';

const CustomForm: React.FC<ICustomForm> = ({ onSubmit, fields, buttons }) => {

    const _buttons = useMemo(() => buttons.map(b => (
        <CustomButton customStyle={{ marginRight: 5 }} htmlType={b.htmlType} key={'btn_' + b.name} loading={b.loading} {...b} />
    )), [buttons])

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
        >
            {fields.map(
                _ => {
                    return <div key={'form_' + _.name} >
                        {(_.type === undefined || _.type === 'input' || _.type === 'password') &&
                            <CustomInputGroup type={_.type} disabled={_.disabled} defaultValue={_.defaultValue} name={_.name} label={_.label} />
                        }
                    </div>
                }
            )}
            <div style={{ textAlign: 'right' }}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    {_buttons}
                </Form.Item>
            </div>
        </Form>
    );
};

export default CustomForm;