import { PassThrough } from "stream";

interface IConversationState {
    user_id: string,
    states: {
        application_id: string
        action: string,
        conversation?: number,
        opening?: number,
        questions?: number,
        awaiting_answer: boolean,
        awaiting_confirmation: boolean,
        payload: Object
    }[]
}



interface IConversationDefinition {
    use_localization: boolean,
    locale: string,
    localization_strings_file_path: string,
    actions: {
        [propName: string]: IAction
    }
}

interface ITokenActionMap {
    [propName: string]: string
}

interface IAction {
    task: IActionTask | null,
    conversation?: IConversation[],
    response?: {
        success?: IMessage[],
        error?: IMessage[],
    }
}

interface IConversation {
    field?: string | null;
    opening: IMessage[],
    questions?: IMessage[],
    closing?: IMessage[]
}

interface IActionTask {
    uri: string,
    method: string
}

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

interface IConfirmation {
    continue?: boolean;
    exit?: boolean;
    reset?: boolean;
    skip_opening?: boolean;
    reiterate?: boolean;
    message?: IMessage;
}




