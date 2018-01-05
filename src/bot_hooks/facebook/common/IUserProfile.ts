interface IUserProfile{
    first_name: string,
    last_name: string,
    profile_pic: string,
    locale: string,
    timezone: number,
    gender: string,
    last_ad_refferal: {
        source: string;
        type: string;
        ad_id: string;
    }
}
