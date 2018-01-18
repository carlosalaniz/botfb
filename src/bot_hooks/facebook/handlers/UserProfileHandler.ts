'use strict'
import * as WebRequest from 'web-request';

export class UserProfileHandler {
  constructor() { }
  async getHttpAsync(psid: string) {
    var result = await WebRequest.json<IUserProfile>(
      "https://graph.facebook.com/v2.6/2238706842821354?fields=first_name,last_name,profile_pic&access_token=EAACHtgoZCfj8BABx4ABX7WcpSeIAsXCZCPC62uEUgTyI6XTHxn2vLKE9vWlSvbXsBZBKu1rs488gW4Gl7B27FV9zHZCx8ZAa6IqyCxvMGYLQkYlv8aVoed7pgHoazeJxp8Oir14DHWqwbYWy02FluWkMq5RdNWZB17wlNodGXxuoRwSnWjUH2e");
    return result;
  };
}