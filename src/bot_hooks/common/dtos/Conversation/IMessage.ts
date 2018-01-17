
interface IMessage {
    field?: string;
    qs: boolean;
    await_confirmation?: boolean;
    await_response?: boolean;
    quick_reply?: any;
    messages: string[][];
    confirm?: IConfirmation;
    decline?: IConfirmation;
}