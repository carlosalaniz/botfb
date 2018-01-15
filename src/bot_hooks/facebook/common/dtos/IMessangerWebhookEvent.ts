"use strict"
interface IMessangerWebhookEventDto {
    object: string,
    entry: IEntryDto[]
}

interface IEntryDto {
    id: string,
    time: number,
    messaging: IMessagingDto[]
}

interface IMessagingDto {
    sender: {
        id: string
    },
    recipient: {
        id: string
    },
    timestamp?: number,
    read?: any,
    message?: any,
    delivery?: any
}

/*Webhook Messages-READ START*/
interface IReadDto extends IMessagingDto {
    read: {
        watermark: number,
        seq: number
    }
}
/*Webhook Messages-READ END*/


/*Webhook Messages START*/
interface IMessageDto extends IMessagingDto {
    message: {
        text?: string,
        attachments?: IMessageAttachmentDto[]
        attachment?: IMessageAttachmentDto,
        nlp?: {
            entities: any
        },
        mid?: string,
        seq?: number,
        quick_reply?: IQuickReplyDto
    }
}
interface IMessageAttachmentDto {
    type: string,
    payload: {
        url: string,
        is_reusable?: boolean
    }
    fallback?: {
        title: string,
        url: string,
        payload: null,
        type: string
    }
}
interface IQuickReplyDto {
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
interface IMessageDeliveryEvent extends IMessagingDto {
    delivery: {
        mids: string[],
        watermark: number,
        seq: number
    }
}
/*Webhook Messages-DELIVERIES END*/

