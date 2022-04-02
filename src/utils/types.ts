export interface registerType {
  name?: string;
  email: string;
  password: string;
  password2?: string;
  identity?: string;
}

export interface registerRulesType {
    name?: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    email: {
        type: string;
        required: boolean;
        message: string;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    password2?: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    } | {
      validator: (rule: any, value: string, callback: any) => void,
      trigger: string
    })[];
}

export interface userType {
    avatar:string;
    exp:number;
    iat:number;
    id:string;
    identity:string;
    name:string;

}

export interface formDataType {
    type: string;
    describe: string;
    income: string;
    expend: string;
    cash: string;
    remark: string;
    _id?: string;
}

export interface formRulesType {
    describe: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    income: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    expend: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    cash: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
}