export type LiqPayData = {
    version?: number
    public_key?: string
    private_key?: string
    action?:string
    amount?: number
    currency?: string
    description?: string
    order_id?: string
    card?: string
    card_exp_month?: string
    card_exp_year?: string
    result_url?: string
    server_url?: string
    sandbox?: 1 | 0
}