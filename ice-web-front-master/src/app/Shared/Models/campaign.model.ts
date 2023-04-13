export interface campaign_data {
    user_id?:string,
    tagline:string,
    share_price:string,
    total_valuation:string,
    // min_investment:string,
    // max_investment:string,
    campaign_images:campaign_type[],
    team:team_type[],
    company_bio:string,
    reason_to_invest:string,
    investment_planning:string,
    terms:string,
    introduce_team:string
}

interface campaign_type{
    image:string
}

interface team_type{
    name:string,
    designation:string,
    image:string
}