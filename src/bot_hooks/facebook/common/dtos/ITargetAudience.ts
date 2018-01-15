// Docs: https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/target-audience
interface ITargetAudience {
  audience_type: AudienceTypeEnum,
  countries?: {
    blacklist?: string[],
    whitelist?: string[]
  }
}