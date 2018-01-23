interface ISendMessageDto<TMessageType extends (ITextMessageDto | IAttachmentMessageDto)> extends ISendMessageBaseDto {
    /**
     *  property identifies the messaging type of the message being sent
     *  RESPONSE,UPDATE,MESSAGE_TAG, NON_PROMOTIONAL_SUBSCRIPTION
     */
    messaging_type?: string,
    message: TMessageType,
    /**
     * Optional. Push notification type:
     * REGULAR: sound/vibration
     * SILENT_PUSH: on-screen notification only
     * NO_PUSH: no notification
     * Defaults to REGULAR.
     */
    notification_type?: string,
    tag?: string
}

interface ISenderActionMessageDto extends ISendMessageBaseDto {
    /**
     * Message state to display to the user:
     * typing_on: display the typing bubble
     * typing_off: remove the typing bubble
     * mark_seen: display the confirmation icon
     */
    sender_action: string
}


interface ISendMessageBaseDto {
    recipient: IRecipientDto,
}

interface ITextMessageDto extends IMessageBaseDto {
    text: string
}
interface IAttachmentMessageDto extends IMessageBaseDto {
    attachment: IAttachmentDto
}

interface IAttachmentDto {
    /**
     * Type of attachment, may be image, audio, video, file or template
     */
    type: string,
    payload: object
}

interface IMessageBaseDto {
    /**
     * Optional. Array of quick_reply to be sent with messages
     */
    quick_replies?: IQuickReplySendDto[],
    /**
     * Optional. Custom string that is delivered as a message echo. 1000 character limit.
     */
    metadata?: string
}

interface IQuickReplySendDto {
    /**
     * Must be one of the following
     * text: Sends a text button
     * location: Sends a button to collect the recipient's location
     */
    content_type: string,
    /**
     * Required if content_type is 'text'. The text to display on the quick reply button. 20 character limit.
     */
    title?: string,
    /**
     * Required if content_type is 'text'. Custom data that will be sent back to you via the messaging_postbacks webhook event. 1000 character limit.
     */
    payload?: string | number,
    /**
     * Optional. URL of image to display on the quick reply button for text quick replies. Image should be a minimum of 24px x 24px. Larger images will be automatically cropped and resized.
     */
    image_url?: string,
}


interface IRecipientDto {
    id: string,
    phone_number?: string,
    user_ref?: string,
    name?: {
        first_name: string,
        last_name: string
    }
}