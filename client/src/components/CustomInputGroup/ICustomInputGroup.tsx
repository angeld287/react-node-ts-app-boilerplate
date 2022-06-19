export interface ICustomInputGroup {
    name: string;
    label: string;
    defaultValue: string;
    disabled: boolean;
    type?: 'input' | 'select' | 'password';
}