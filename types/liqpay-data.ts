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

export type LiqPayResult = {
    result: 'ok',
    payment_id: 2481663471,
    action: 'pay',
    status: 'sandbox',
    version: 3,
    type: 'buy',
    paytype: 'card',
    public_key: 'sandbox_i86475297040',
    acq_id: 414963,
    order_id: '2005687c6f299c91bd8edf5343091150',
    liqpay_order_id: 'VFWBQLIK1719496448232020',
    description: 'Order payment',
    sender_first_name: 'sadsadsadsa',
    sender_last_name: 'dsadsd',
    sender_card_mask2: '400000*55',
    sender_card_bank: 'Sandbox',
    sender_card_type: 'visa',
    sender_card_country: 804,
    ip: '185.137.217.102',
    amount: 459,
    currency: 'UAH',
    sender_commission: 0,
    receiver_commission: 6.89,
    agent_commission: 0,
    amount_debit: 459,
    amount_credit: 459,
    commission_debit: 0,
    commission_credit: 6.89,
    currency_debit: 'UAH',
    currency_credit: 'UAH',
    sender_bonus: 0,
    amount_bonus: 0,
    mpi_eci: '7',
    is_3ds: false,
    language: 'uk',
    create_date: 1719496448236,
    end_date: 1719496448322,
    transaction_id: 2481663471
}