//docs: https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu3

interface IPersistantMenu {
  locale: string,
  composer_input_disabled: boolean,
  call_to_actions: IMenuItems[]
}