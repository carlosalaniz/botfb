interface IMessage {
    field?: string;
    qs?: boolean;
    await_confirmation?: boolean;
    field_confirmation_messages: IMessage[][],
    await_response?: boolean;
    quick_replies?: any[];
    messages: string[][];
    confirm?: IConfirmation;
    decline?: IConfirmation;
}