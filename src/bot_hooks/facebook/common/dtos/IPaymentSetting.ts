//Docs: https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/payment-setting
interface IPaymentSettings {
  privacy_url: string,
  public_key: string,
  testers: number[]
}