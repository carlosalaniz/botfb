"use strict"
interface IMessangerWebhookEvent {
    object: string,
    entry: IEntry[]
}

interface IEntry {
    id: string,
    time: number,
    messaging: IMessaging[]
}

interface IMessaging {
    sender: {
        id: string
    },
    recipient: {
        id: string
    },
    timestamp: number,
    read?: any,
    message?: any,
    delivery?: any
}

/*Webhook Messages-READ START*/
interface IReadEvent extends IMessaging {
    read: {
        watermark: number,
        seq: number
    }
}
/*Webhook Messages-READ END*/


/*Webhook Messages START*/
interface IMessageEvent extends IMessaging {
    message: {
        mid: string,
        seq: number,
        text: string,
        attachments?: IMessageAttachment[]
        nlp?: {
            entities: any
        },
        quick_reply?: IQuickReply
    }
}
interface IMessageAttachment {
    type: string,
    payload: string
    fallback?: {
        title: string,
        url: string,
        payload: null,
        type: string
    }
}
interface IQuickReply {
    payload: {
        //image, audio, video or file payload
        url?: string,
        coordinates?: {
            lat: number,
            long: number
        }
    },
}

/*Webhook Messages-DELIVERIES START*/
interface IMessageDeliveryEvent extends IMessaging {
    delivery: {
        mids: string[],
        watermark: number,
        seq: number
    }
}
/*Webhook Messages-DELIVERIES END*/

