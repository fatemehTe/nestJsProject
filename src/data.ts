export enum ReportType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

interface Data {
    report:{
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
        type: ReportType
    }[]
}

interface Users {
    user:{
        id: string;
        userName: string;
        email: string;
        created_at: Date;
        updated_at: Date;
        password: string
    }[]
}

export const data : Data = {
    report : [{
        id: 'a4aa5058-e913-4d89-af38-07f245623a3c',
        source: 'income',
        amount: 2000,
        created_at: new Date(),
        updated_at: new Date(),
        type : ReportType.INCOME
    },
    {
        id: '186d7d09-91a8-431c-bf00-154e62d82dc3',
        source: 'income',
        amount: 2000,
        created_at: new Date(),
        updated_at: new Date(),
        type : ReportType.INCOME
    }]
}

data.report.push({
    id: '61ec0dc0-2418-4183-a128-c6febc676134',
    source: 'expense',
    amount: 2000,
    created_at: new Date(),
    updated_at: new Date(),
    type : ReportType.EXPENSE
})



export const user : Users = {
    user : [{
        id: 'uId0',
        userName: 'user0',
        email: 'user0@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
        password: '11111'
    },
    {
        id: 'uId1',
        userName: 'user1',
        email: 'user1@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
        password: '11111'
    }]
}

user.user.push({
    id: 'uId2',
    userName: 'user2',
    email: 'user2@gmail.com',
    created_at: new Date(),
    updated_at: new Date(),
    password: '11111'
})