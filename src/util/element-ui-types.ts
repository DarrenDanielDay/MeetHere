import ElementUI from 'element-ui';

export function isElForm(obj: any): obj is ElementUI.Form {
    return obj && obj.validate !== undefined && obj.resetFields !== undefined;
}

export interface ElFormRule {
    required?: boolean;
    trigger?: "blur" | "change";
    message?: string;
    min?: number;
    max?: number;
    type?: string;
    validator?: (rule: ElFormRule, value: any, callback: (result: string | Error | undefined) => void) => void;
}
