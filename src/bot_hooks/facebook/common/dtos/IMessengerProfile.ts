//Docs: https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/
interface IMessengerProfile {
  account_linking_url: string,
  persistent_menu: IPersistantMenu[],
  get_started: IGetStarted,
  greeting: IGreeting[],
  whitelisted_domains: string[],
  payment_settings: IPaymentSettings,
  target_audience: ITargetAudience,
  home_url: IHomeUrl
}