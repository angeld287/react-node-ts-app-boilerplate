import { FormProps } from "antd";
import { IValidationError } from "../../interfaces/models/IBase";
import { ICustomButton } from "../CustomButton/ICustomButton";
import { ICustomInputGroup } from "../CustomInputGroup/ICustomInputGroup";
import { ICustomSelect } from "../CustomSelect/ICustomSelect";

export interface ICustomForm extends FormProps {
    onSubmit: any,
    fields: Array<ICustomFields>,
    buttons: Array<ICustomButton>,
    verticalButtons: boolean,
    error?: IValidationError,
    loading: boolean,
}

export interface ICustomFields {
    input?: ICustomInputGroup;
    select?: ICustomSelect;
    name: string;
}