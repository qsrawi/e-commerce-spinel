export interface MessageModal
{
    name: string;
    email: string;
    subject: string;
    message: string;
}


export const initMessageModal:MessageModal={
    name: '',
    email: '',
    subject: '',
    message: '',
}