import { ICustomButton } from "../CustomButton/ICustomButton";
import { ICustomInputGroup } from "../CustomInputGroup/ICustomInputGroup";

export interface ICustomForm {
    onSubmit: any,
    fields: Array<ICustomInputGroup>,
    buttons: Array<ICustomButton>,
    verticalButtons: boolean,
    loading: boolean,

}