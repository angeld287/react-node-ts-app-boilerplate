import React, { memo } from 'react';

import { Input, Form } from 'antd';
import { ICustomInputGroup } from './ICustomInputGroup';

const CustomInputGroup: React.FC<ICustomInputGroup> = ({ name, label, defaultValue, disabled }) => {
    return <Form.Item name={name} label={label} initialValue={defaultValue} ><Input disabled={disabled} /></Form.Item>;
}

export default memo(CustomInputGroup);