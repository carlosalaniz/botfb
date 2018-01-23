"use strict"
interface IMessangerWebhookEventDto {
    object: string,
    entry: IEntryDto[]
}

interface IEntryDto {
    id: string,
    time: number,
    messaging: IMessagingEventDto[]
}

interface IMessagingEventDto {
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
interface IReadDto extends IMessagingEventDto {
    read: {
        watermark: number,
        seq: number
    }
}
/*Webhook Messages-READ END*/


/*Webhook Messages START*/
interface IMessageEventDto extends IMessagingEventDto {
    message: {
        text?: string,
        attachments?: IMessageAttachmentDto[] | IMessageFallbackAttachmentDto[]
        nlp?: {
            entities: any
        },
        mid?: string,
        seq?: number,
        quick_reply?: IQuickReplyRecievedDto | string
    }
}

interface IMessageAttachmentDto {
    type: string, //audio, fallback, file, image, location or video
    payload: IMultimediaPayload | ILocationPayload
}

interface IMessageFallbackAttachmentDto extends IMessageAttachmentDto {
    title: string,
    url: string
}

interface IMultimediaPayload {
    url: string
}

interface ILocationPayload {
    coordinates: {
        lat: number;
        long: number;
    }
}

interface IQuickReplyRecievedDto {
    payload: {
        //image, audio, video or file payload
        url?: string,
        coordinates?: {
            lat: number,
            long: number
        }
    };
}

/*Webhook Messages-DELIVERIES START*/
interface IMessageDeliveryEvent extends IMessagingEventDto {
    delivery: {
        mids: string[],
        watermark: number,
        seq: number
    }
}
/*Webhook Messages-DELIVERIES END*/

