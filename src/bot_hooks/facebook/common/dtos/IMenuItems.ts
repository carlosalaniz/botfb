//docs: https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu3
interface IMenuItems {
    type: string,
    title: string,
    url: string,
    payload: string,
    call_to_actions: IMenuItems[],
    webview_height_ratio?: string,
    messenger_extensions?: string,
    fallback_url?: string,
    webview_share_button?: string
  }