export const send = [
    {
        title: "API Token (request)",
        description: "This call manages API tokens",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "api_token"
        ],
        properties: {
            api_token: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            delete_token: {
                description: "[Optional] The token to remove.",
                type: "string",
                pattern: "^\\w+$"
            },
            new_token: {
                description: "[Optional] The name of the created token.",
                type: "string",
                pattern: "^[A-Za-z0-9\\s_]+$"
            },
            new_token_scopes: {
                description: "[Optional] List of permission scopes to provide with the token.",
                type: "array",
                items: {
                    description: "Required when create new token",
                    type: "string",
                    enum: [
                        "read",
                        "trade",
                        "trading_information",
                        "payments",
                        "admin"
                    ]
                }
            },
            valid_for_current_ip_only: {
                description: "[Optional] If you set this parameter during token creation, then the token created will only work for the IP address that was used to create the token",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order List (request)",
        description: "List active orders. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_order_list"
        ],
        properties: {
            p2p_order_list: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            active: {
                description: "[Optional] Should be 1 to list active, 0 to list inactive (historical).",
                type: "number",
                enum: [
                    0,
                    1
                ]
            },
            advert_id: {
                description: "[Optional] If present, lists orders applying to a specific advert.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            limit: {
                description: "[Optional] Used for paging.",
                type: "integer",
                default: 50
            },
            offset: {
                description: "[Optional] Used for paging.",
                type: "integer",
                default: 0
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever there is a change to any order belonging to you.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Agent: Transfer (request)",
        description: "Payment Agent Transfer - this call is available only to accounts that are approved Payment Agents.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "paymentagent_transfer",
            "amount",
            "currency",
            "transfer_to"
        ],
        properties: {
            paymentagent_transfer: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            amount: {
                description: "The amount to transfer.",
                type: "number"
            },
            currency: {
                description: "Currency code.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            transfer_to: {
                description: "The loginid of the recipient account.",
                type: "string",
                pattern: "^[A-Za-z]+[0-9]+$"
            },
            description: {
                description: "[Optional] Remarks about the transfer.",
                type: "string",
                pattern: "^[0-9A-Za-z .,'-]{0,250}$"
            },
            dry_run: {
                description: "[Optional] If set to `1`, just do validation.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Agent: Withdraw (request)",
        description: "Initiate a withdrawal to an approved Payment Agent.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "paymentagent_withdraw",
            "amount",
            "currency",
            "paymentagent_loginid",
            "verification_code"
        ],
        properties: {
            paymentagent_withdraw: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            amount: {
                description: "The amount to withdraw to the payment agent.",
                type: "number"
            },
            currency: {
                description: "The currency code.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            paymentagent_loginid: {
                description: "The payment agent loginid received from the `paymentagent_list` call.",
                type: "string",
                pattern: "^[A-Za-z]+[0-9]+$"
            },
            verification_code: {
                description: "Email verification code (received from a `verify_email` call, which must be done first)",
                type: "string",
                pattern: "^\\w{8,128}$"
            },
            description: {
                description: "[Optional] Remarks about the withdraw. Only letters, numbers, space, period, comma, - ' are allowed.",
                type: "string",
                pattern: "^[0-9A-Za-z .,'-]{0,250}$"
            },
            dry_run: {
                description: "[Optional] If set to 1, just do validation.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment agent create (request)",
        description: "Saves client's payment agent details.",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "paymentagent_create",
            "code_of_conduct_approval",
            "commission_deposit",
            "commission_withdrawal",
            "email",
            "information",
            "payment_agent_name",
            "supported_payment_methods",
            "url"
        ],
        properties: {
            paymentagent_create: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            code_of_conduct_approval: {
                description: "Indicates client's agreement with the Code of Conduct.",
                type: "integer",
                enum: [
                    1
                ]
            },
            commission_deposit: {
                description: "Commission  (%) the agent wants to take on deposits",
                type: "number",
                maximum: 9,
                minimum: 0
            },
            commission_withdrawal: {
                description: "Commission  (%) the agent wants to take on withdrawals",
                type: "number",
                maximum: 9,
                minimum: 0
            },
            email: {
                description: "Payment agent's email address.",
                type: "string",
                pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,255}$"
            },
            information: {
                description: "[Optional] Information about payment agent and their proposed service.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,500}$"
            },
            payment_agent_name: {
                description: "The name with which the payment agent is going to be identified.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,100}$"
            },
            supported_payment_methods: {
                description: "A list of supported payment methods.",
                type: "array",
                items: {
                    description: "A payment method's name",
                    type: "string",
                    pattern: "^[\\w \\-]{2,30}$"
                }
            },
            url: {
                description: "The URL of payment agent's website.",
                type: "string",
                pattern: "^[a-z][a-z0-9.+\\-]*://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$",
                maxLength: 100
            },
            affiliate_id: {
                description: "[Optional] Client's My Affiliate id, if exists.",
                type: "string",
                pattern: "^[\\w]{0,32}$"
            },
            phone: {
                description: "Payment agent's phone number with coutry code.",
                type: "string",
                pattern: "^\\+[\\-\\ 0-9]{8,40}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Agent: List (request)",
        description: "Will return a list of Payment Agents for a given country for a given currency. Payment agents allow users to deposit and withdraw funds using local payment methods that might not be available via the main website's cashier system.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "paymentagent_list"
        ],
        properties: {
            paymentagent_list: {
                title: "Payment Agent Target Country",
                description: "Client's 2-letter country code (obtained from `residence_list` call).",
                type: "string",
                pattern: "^\\w\\w$"
            },
            currency: {
                description: "[Optional] If specified, only payment agents that supports that currency will be returned (obtained from `payout_currencies` call).",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment agent details (request)",
        description: "Gets client's payment agent details.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "paymentagent_details"
        ],
        properties: {
            paymentagent_details: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Methods (request)",
        description: "Will return a list payment methods available for the given country. If the request is authenticated the client's residence country will be used.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "payment_methods"
        ],
        properties: {
            payment_methods: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            country: {
                description: "[Optional] 2-letter country code (ISO standard).",
                type: "string",
                pattern: "^[a-z]{0,2}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Payout Currencies (request)",
        description: "Retrieve a list of available option payout currencies. If a user is logged in, only the currencies available for the account will be returned.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "payout_currencies"
        ],
        properties: {
            payout_currencies: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Ping (request)",
        description: "To send the ping request to the server. Mostly used to test the connection or to keep it alive.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "ping"
        ],
        properties: {
            ping: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Portfolio (request)",
        description: "Receive information about my current portfolio of outstanding options",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "portfolio"
        ],
        properties: {
            portfolio: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            contract_type: {
                description: "Return only contracts of the specified types",
                type: "array",
                items: {
                    type: "string",
                    enum: [
                        "ASIAND",
                        "ASIANU",
                        "CALL",
                        "CALLE",
                        "CALLSPREAD",
                        "DIGITDIFF",
                        "DIGITEVEN",
                        "DIGITMATCH",
                        "DIGITODD",
                        "DIGITOVER",
                        "DIGITUNDER",
                        "EXPIRYMISSE",
                        "EXPIRYMISS",
                        "EXPIRYRANGE",
                        "EXPIRYRANGEE",
                        "LBFLOATCALL",
                        "LBFLOATPUT",
                        "LBHIGHLOW",
                        "MULTDOWN",
                        "MULTUP",
                        "NOTOUCH",
                        "ONETOUCH",
                        "PUT",
                        "PUTE",
                        "PUTSPREAD",
                        "RANGE",
                        "RESETCALL",
                        "RESETPUT",
                        "RUNHIGH",
                        "RUNLOW",
                        "TICKHIGH",
                        "TICKLOW",
                        "UPORDOWN"
                    ],
                    uniqueItems: true
                }
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Price Proposal (request)",
        description: "Gets latest price for a specific contract.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "proposal",
            "contract_type",
            "currency",
            "symbol"
        ],
        properties: {
            proposal: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            contract_type: {
                description: "The proposed contract type",
                type: "string",
                enum: [
                    "MULTUP",
                    "MULTDOWN",
                    "UPORDOWN",
                    "EXPIRYRANGE",
                    "ONETOUCH",
                    "CALLE",
                    "LBHIGHLOW",
                    "ASIAND",
                    "EXPIRYRANGEE",
                    "DIGITDIFF",
                    "DIGITMATCH",
                    "DIGITOVER",
                    "PUTE",
                    "DIGITUNDER",
                    "NOTOUCH",
                    "CALL",
                    "RANGE",
                    "LBFLOATPUT",
                    "DIGITODD",
                    "PUT",
                    "ASIANU",
                    "LBFLOATCALL",
                    "EXPIRYMISSE",
                    "EXPIRYMISS",
                    "DIGITEVEN",
                    "TICKHIGH",
                    "TICKLOW",
                    "RESETCALL",
                    "RESETPUT",
                    "CALLSPREAD",
                    "PUTSPREAD",
                    "RUNHIGH",
                    "RUNLOW"
                ]
            },
            currency: {
                description: "This can only be the account-holder's currency (obtained from `payout_currencies` call).",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            symbol: {
                description: "The short symbol name (obtained from `active_symbols` call).",
                type: "string",
                pattern: "^\\w{2,30}$"
            },
            amount: {
                description: "[Optional] Proposed contract payout or stake, or multiplier (for lookbacks).",
                type: "number",
                minimum: 0
            },
            barrier: {
                description: "[Optional] Barrier for the contract (or last digit prediction for digit contracts). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers. Not needed for lookbacks.",
                type: "string",
                pattern: "^(?=.{1,20}$)[+-]?[0-9]+\\.?[0-9]*$"
            },
            barrier2: {
                description: "[Optional] Low barrier for the contract (for contracts with two barriers). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers. Not needed for lookbacks.",
                type: "string",
                pattern: "^(?=.{1,20}$)[+-]?[0-9]+\\.?[0-9]*$"
            },
            basis: {
                description: "[Optional] Indicates type of the `amount`.",
                type: "string",
                enum: [
                    "payout",
                    "stake"
                ]
            },
            cancellation: {
                description: "Cancellation duration option (only for `MULTUP` and `MULTDOWN` contracts).",
                type: "string",
                pattern: "^\\w+$"
            },
            date_expiry: {
                description: "[Optional] Epoch value of the expiry time of the contract. Either date_expiry or duration is required.",
                type: "integer",
                maximum: 9999999999,
                minimum: 0
            },
            date_start: {
                description: "[Optional] Indicates epoch value of the starting time of the contract. If left empty, the start time of the contract is now.",
                type: "integer",
                maximum: 9999999999,
                minimum: 0
            },
            duration: {
                description: "[Optional] Duration quantity. Either date_expiry or duration is required.",
                type: "integer",
                maximum: 99999999,
                minimum: 0
            },
            duration_unit: {
                description: "[Optional] Duration unit - `s`: seconds, `m`: minutes, `h`: hours, `d`: days, `t`: ticks.",
                type: "string",
                default: "s",
                enum: [
                    "d",
                    "m",
                    "s",
                    "h",
                    "t"
                ]
            },
            limit_order: {
                description: "Add an order to close the contract once the order condition is met (only for `MULTUP` and `MULTDOWN` contracts). Supported orders: `take_profit`, `stop_loss`.",
                type: "object",
                additionalProperties: false,
                properties: {
                    stop_loss: {
                        description: "Contract will be automatically closed when the value of the contract reaches a specific loss.",
                        type: "number"
                    },
                    take_profit: {
                        description: "Contract will be automatically closed when the value of the contract reaches a specific profit.",
                        type: "number"
                    }
                }
            },
            multiplier: {
                description: "[Optional] The multiplier for non-binary options. E.g. lookbacks.",
                type: "number",
                minimum: 0
            },
            product_type: {
                description: "[Optional] The product type.",
                type: "string",
                default: "basic",
                enum: [
                    "basic"
                ]
            },
            selected_tick: {
                description: "[Optional] The tick that is predicted to have the highest/lowest value - for `TICKHIGH` and `TICKLOW` contracts.",
                type: "integer"
            },
            subscribe: {
                description: "[Optional] 1 - to initiate a realtime stream of prices. Note that tick trades (without a user-defined barrier), digit trades and less than 24 hours at-the-money contracts for the following underlying symbols are not streamed: `R_10`, `R_25`, `R_50`, `R_75`, `R_100`, `RDBULL`, `RDBEAR` (this is because their price is constant).",
                type: "integer",
                enum: [
                    1
                ]
            },
            trading_period_start: {
                description: "[Optional] Required only for multi-barrier trading. Defines the epoch value of the trading period start time.",
                type: "integer"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Profit Table (request)",
        description: "Retrieve a summary of account Profit Table, according to given search criteria",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "profit_table"
        ],
        properties: {
            profit_table: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            contract_type: {
                description: "Return only contracts of the specified types",
                type: "array",
                items: {
                    type: "string",
                    enum: [
                        "ASIAND",
                        "ASIANU",
                        "CALL",
                        "CALLE",
                        "CALLSPREAD",
                        "DIGITDIFF",
                        "DIGITEVEN",
                        "DIGITMATCH",
                        "DIGITODD",
                        "DIGITOVER",
                        "DIGITUNDER",
                        "EXPIRYMISSE",
                        "EXPIRYMISS",
                        "EXPIRYRANGE",
                        "EXPIRYRANGEE",
                        "LBFLOATCALL",
                        "LBFLOATPUT",
                        "LBHIGHLOW",
                        "MULTDOWN",
                        "MULTUP",
                        "NOTOUCH",
                        "ONETOUCH",
                        "PUT",
                        "PUTE",
                        "PUTSPREAD",
                        "RANGE",
                        "RESETCALL",
                        "RESETPUT",
                        "RUNHIGH",
                        "RUNLOW",
                        "TICKHIGH",
                        "TICKLOW",
                        "UPORDOWN"
                    ],
                    uniqueItems: true
                }
            },
            date_from: {
                description: "[Optional] Start date (epoch or YYYY-MM-DD)",
                type: "string",
                pattern: "^([0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])|[0-9]{1,10})$"
            },
            date_to: {
                description: "[Optional] End date (epoch or YYYY-MM-DD)",
                type: "string",
                pattern: "^([0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])|[0-9]{1,10})$"
            },
            description: {
                description: "[Optional] If set to 1, will return full contracts description.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            limit: {
                description: "[Optional] Apply upper limit to count of transactions received.",
                type: "number",
                default: 50,
                maximum: 500,
                minimum: 0
            },
            offset: {
                description: "[Optional] Number of transactions to skip.",
                type: "number"
            },
            sort: {
                description: "[Optional] Sort direction.",
                type: "string",
                default: "DESC",
                enum: [
                    "ASC",
                    "DESC"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Reality Check (request)",
        description: "Retrieve summary of client's trades and account for the Reality Check facility. A 'reality check' means a display of time elapsed since the session began, and associated client profit/loss. The Reality Check facility is a regulatory requirement for certain landing companies.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "reality_check"
        ],
        properties: {
            reality_check: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Revoke Oauth Application (request)",
        description: "Used for revoking access of particular app.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "revoke_oauth_app"
        ],
        properties: {
            revoke_oauth_app: {
                description: "The application ID to revoke.",
                type: "integer"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Sell Contract (request)",
        description: "Sell a Contract as identified from a previous `portfolio` call.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "sell",
            "price"
        ],
        properties: {
            sell: {
                description: "Pass contract_id received from the `portfolio` call.",
                type: "integer"
            },
            price: {
                description: "Minimum price at which to sell the contract, or `0` for 'sell at market'.",
                type: "number"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Sell Contracts: Multiple Accounts (request)",
        description: "Sell contracts for multiple accounts simultaneously. Uses the shortcode response from `buy_contract_for_multiple_accounts` to identify the contract, and authorisation tokens to select which accounts to sell those contracts on. Note that only the accounts identified by the tokens will be affected. This will not sell the contract on the currently-authorised account unless you include the token for the current account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "sell_contract_for_multiple_accounts",
            "price",
            "shortcode",
            "tokens"
        ],
        properties: {
            sell_contract_for_multiple_accounts: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            price: {
                description: "Minimum price at which to sell the contract, or `0` for 'sell at market'.",
                type: "number"
            },
            shortcode: {
                description: "An internal ID used to identify the contract which was originally bought. This is returned from the `buy` and `buy_contract_for_multiple_accounts` calls.",
                type: "string",
                pattern: "^([A-Za-z0-9_.-]+)$"
            },
            tokens: {
                description: "Authorisation tokens which select the accounts to sell use for the affected accounts.",
                type: "array",
                items: {
                    type: "string",
                    pattern: "^([a-zA-Z0-9-]+)$"
                },
                sensitive: 1
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Server Status (request)",
        description: "Request server status.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "website_status"
        ],
        properties: {
            website_status: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            subscribe: {
                description: "[Optional] `1` to stream the server/website status updates.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Price Proposal: Open Contracts (request)",
        description: "Get latest price (and other information) for a contract in the user's portfolio",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "proposal_open_contract"
        ],
        properties: {
            proposal_open_contract: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            contract_id: {
                description: "[Optional] Contract ID received from a `portfolio` request. If not set, you will receive stream of all open contracts.",
                type: "integer"
            },
            subscribe: {
                description: "[Optional] `1` to stream.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Sell Expired Contracts (request)",
        description: "This call will try to sell any expired contracts and return the number of sold contracts.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "sell_expired"
        ],
        properties: {
            sell_expired: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Server Time (request)",
        description: "Request back-end server epoch time.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "time"
        ],
        properties: {
            time: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Server list (request)",
        description: "Get the list of servers for a trading platform.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "trading_servers"
        ],
        properties: {
            trading_servers: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            account_type: {
                description: "[Optional] Trading account type.",
                type: "string",
                enum: [
                    "demo",
                    "real"
                ]
            },
            environment: {
                description: "[Optional] Pass the environment (installation) instance. Currently, there are one demo and two real environments. Defaults to 'all'.",
                type: "string",
                default: "all",
                enum: [
                    "all",
                    "Deriv-Demo",
                    "Deriv-Server",
                    "Deriv-Server-02"
                ]
            },
            market_type: {
                description: "[Optional] Market type.",
                type: "string",
                default: "synthetic",
                enum: [
                    "financial",
                    "synthetic"
                ]
            },
            platform: {
                description: "[Optional] Pass the trading platform name, default to mt5",
                type: "string",
                default: "mt5",
                enum: [
                    "mt5",
                    "dxtrade"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Account Settings (request)",
        description: "Set User Settings (this call should be used in conjunction with `get_settings`)",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "set_settings"
        ],
        properties: {
            set_settings: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            account_opening_reason: {
                description: "[Optional] Purpose and reason for requesting the account opening. Only applicable for real money account. Required for clients that have not set it yet. Can only be set once.",
                type: "string",
                enum: [
                    "Speculative",
                    "Income Earning",
                    "Hedging",
                    "Peer-to-peer exchange"
                ]
            },
            address_city: {
                description: "[Optional] Note: not applicable for virtual account. Required field for real money account.",
                type: "string",
                pattern: "^[\\p{L}\\s'.-]{1,35}$"
            },
            address_line_1: {
                description: "[Optional] Note: not applicable for virtual account. Required field for real money account.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()\\x{b0}@#/-]{1,70}$"
            },
            address_line_2: {
                description: "[Optional] Note: not applicable for virtual account. Optional field for real money account.",
                type: [
                    "null",
                    "string"
                ],
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()\\x{b0}@#/-]{0,70}$"
            },
            address_postcode: {
                description: "[Optional] Note: not applicable for virtual account. Optional field for real money account.",
                type: "string",
                pattern: "^([A-Za-z0-9][A-Za-z0-9\\s-]{0,20})?$"
            },
            address_state: {
                description: "[Optional] Note: not applicable for virtual account. Optional field for real money account.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,-;]{0,35}$"
            },
            allow_copiers: {
                description: "[Optional] Boolean value 1 or 0, indicating permission to allow others to follow your trades. Note: not applicable for Virtual account. Only allow for real money account.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            citizen: {
                description: "[Optional] Country of legal citizenship, 2-letter country code.",
                type: [
                    "null",
                    "string"
                ],
                pattern: "^([a-z]{2})?$"
            },
            date_of_birth: {
                description: "[Optional] Date of birth format: yyyy-mm-dd (can only be changed on unauthenticated svg accounts).",
                type: "string",
                pattern: "^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$"
            },
            email_consent: {
                description: "[Optional] Boolean value 1 or 0, indicating permission to use email address for any contact which may include marketing",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            feature_flag: {
                description: "[Optional] Enable or disable one or multiple features.",
                type: "object",
                additionalProperties: false,
                properties: {
                    wallet: {
                        description: "[Optional] Boolean value 1 or 0 indicating whether to enable/disable this feature",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    }
                }
            },
            first_name: {
                description: "[Optional] Within 2-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes (can only be changed on unauthenticated svg accounts).",
                type: "string",
                pattern: "^[\\p{L}\\s'.-]{2,50}$"
            },
            last_name: {
                description: "[Optional] Within 2-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes (can only be changed on unauthenticated svg accounts).",
                type: "string",
                pattern: "^[\\p{L}\\s'.-]{2,50}$"
            },
            non_pep_declaration: {
                description: "[Optional] Indicates client's self-declaration of not being a PEP/RCA (Politically Exposed Person/Relatives and Close Associates). Effective for real accounts only.",
                type: "integer",
                enum: [
                    1
                ]
            },
            phone: {
                description: "[Optional] Note: not applicable for virtual account. Starting with `+` followed by 9-35 digits, hyphens or space.",
                type: [
                    "null",
                    "string"
                ]
            },
            place_of_birth: {
                description: "[Optional] Place of birth, 2-letter country code.",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            preferred_language: {
                description: "[Optional] User's preferred language, ISO standard language code",
                type: [
                    "null",
                    "string"
                ],
                pattern: "^[A-Z]{0,2}$|^[A-Z]{2}_[A-Z]{2}$"
            },
            request_professional_status: {
                description: "[Optional] Required when client wants to be treated as professional. Applicable for financial accounts only.",
                type: "integer",
                enum: [
                    1
                ]
            },
            residence: {
                description: "[Optional] 2-letter country code. Note: not applicable for real money account. Only allow for Virtual account without residence set.",
                type: [
                    "null",
                    "string"
                ],
                pattern: "^[a-z]{2}$"
            },
            salutation: {
                description: "[Optional] Accept any value in enum list (can only be changed on unauthenticated svg accounts).",
                type: "string",
                enum: [
                    "Mr",
                    "Ms"
                ]
            },
            secret_answer: {
                description: "[Optional] Answer to secret question, within 4-50 characters. Required for new account and existing client details will be used if client opens another account.",
                type: "string",
                pattern: "^[\\w\\-\\,\\.\\' ]+",
                maxLength: 50,
                minLength: 4,
                sensitive: 1
            },
            secret_question: {
                description: "[Optional] Accept any value in enum list. Required for new account and existing client details will be used if client opens another account.",
                type: "string",
                enum: [
                    "Mother's maiden name",
                    "Name of your pet",
                    "Name of first love",
                    "Memorable town/city",
                    "Memorable date",
                    "Favourite dish",
                    "Brand of first car",
                    "Favourite artist"
                ]
            },
            tax_identification_number: {
                description: "[Optional] Tax identification number. Only applicable for real money account. Required for maltainvest landing company.",
                type: "string",
                pattern: "^[A-Za-z0-9.\\/\\s-]{0,25}$"
            },
            tax_residence: {
                description: "[Optional] Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account. Required for maltainvest landing company.",
                type: "string",
                pattern: "^[a-z]{0,2}(?:,[a-z]{2})*$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Account Currency (request)",
        description: "Set account currency, this will be default currency for your account i.e currency for trading, deposit. Please note that account currency can only be set once, and then can never be changed.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "set_account_currency"
        ],
        properties: {
            set_account_currency: {
                description: "Currency of the account. List of supported currencies can be acquired with `payout_currencies` call.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Statement (request)",
        description: "Retrieve a summary of account transactions, according to given search criteria",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "statement"
        ],
        properties: {
            statement: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            action_type: {
                description: "[Optional] To filter the statement according to the type of transaction.",
                type: "string",
                enum: [
                    "buy",
                    "sell",
                    "deposit",
                    "withdrawal",
                    "escrow",
                    "adjustment",
                    "virtual_credit",
                    "transfer"
                ]
            },
            date_from: {
                description: "[Optional] Start date (epoch)",
                type: "integer",
                maximum: 9999999999,
                minimum: 0
            },
            date_to: {
                description: "[Optional] End date (epoch)",
                type: "integer",
                maximum: 9999999999,
                minimum: 0
            },
            description: {
                description: "[Optional] If set to 1, will return full contracts description.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            limit: {
                description: "[Optional] Maximum number of transactions to receive.",
                type: "number",
                default: 100,
                maximum: 999,
                minimum: 0
            },
            offset: {
                description: "[Optional] Number of transactions to skip.",
                type: "number"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Self-Exclusion (request)",
        description: "Set Self-Exclusion (this call should be used in conjunction with `get_self_exclusion`)",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "set_self_exclusion"
        ],
        properties: {
            set_self_exclusion: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            exclude_until: {
                description: "[Optional] Exclude me from the website (for a minimum of 6 months, up to a maximum of 5 years). Note: uplifting this self-exclusion may require contacting the company.",
                type: [
                    "null",
                    "string"
                ],
                pattern: "^[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"
            },
            max_30day_deposit: {
                description: "[Optional] 7-day limit on deposits.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_30day_losses: {
                description: "[Optional] 30-day limit on losses.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_30day_turnover: {
                description: "[Optional] 30-day turnover limit.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_7day_deposit: {
                description: "[Optional] 7-day limit on deposits.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_7day_losses: {
                description: "[Optional] 7-day limit on losses.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_7day_turnover: {
                description: "[Optional] 7-day turnover limit.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_balance: {
                description: "[Optional] Maximum account cash balance.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_deposit: {
                description: "[Optional] Daily deposit limit.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_losses: {
                description: "[Optional] Daily limit on losses.",
                type: [
                    "null",
                    "number"
                ]
            },
            max_open_bets: {
                description: "[Optional] Maximum number of open positions.",
                type: [
                    "integer",
                    "null"
                ],
                minimum: 0
            },
            max_turnover: {
                description: "[Optional] Daily turnover limit.",
                type: [
                    "null",
                    "number"
                ]
            },
            session_duration_limit: {
                description: "[Optional] Session duration limit, in minutes.",
                type: [
                    "integer",
                    "null"
                ],
                maximum: 99999,
                minimum: 0
            },
            timeout_until: {
                description: "[Optional] Exclude me from the website (for up to 6 weeks). Requires time in epoch format. Note: unlike `exclude_until`, this self-exclusion will be lifted automatically at the expiry of the timeout period.",
                type: [
                    "integer",
                    "null"
                ],
                maximum: 9999999999,
                minimum: 0
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Financial Assessment (request)",
        description: "This call sets the financial assessment details based on the client's answers to analyze whether they possess the experience and knowledge to understand the risks involved with binary options trading.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "set_financial_assessment",
            "education_level",
            "employment_industry",
            "estimated_worth",
            "income_source",
            "net_income",
            "occupation"
        ],
        properties: {
            set_financial_assessment: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            education_level: {
                description: "Level of Education.",
                type: "string",
                enum: [
                    "Primary",
                    "Secondary",
                    "Tertiary"
                ]
            },
            employment_industry: {
                description: "Industry of Employment.",
                type: "string",
                enum: [
                    "Construction",
                    "Education",
                    "Finance",
                    "Health",
                    "Tourism",
                    "Information & Communications Technology",
                    "Science & Engineering",
                    "Legal",
                    "Social & Cultural",
                    "Agriculture",
                    "Real Estate",
                    "Food Services",
                    "Manufacturing",
                    "Unemployed"
                ]
            },
            estimated_worth: {
                description: "Estimated Net Worth.",
                type: "string",
                enum: [
                    "Less than $100,000",
                    "$100,000 - $250,000",
                    "$250,001 - $500,000",
                    "$500,001 - $1,000,000",
                    "Over $1,000,000"
                ]
            },
            income_source: {
                description: "Income Source.",
                type: "string",
                enum: [
                    "Salaried Employee",
                    "Self-Employed",
                    "Investments & Dividends",
                    "Pension",
                    "State Benefits",
                    "Savings & Inheritance"
                ]
            },
            net_income: {
                description: "Net Annual Income.",
                type: "string",
                enum: [
                    "Less than $25,000",
                    "$25,000 - $50,000",
                    "$50,001 - $100,000",
                    "$100,001 - $500,000",
                    "Over $500,000"
                ]
            },
            occupation: {
                description: "Occupation.",
                type: "string",
                enum: [
                    "Chief Executives, Senior Officials and Legislators",
                    "Managers",
                    "Professionals",
                    "Clerks",
                    "Personal Care, Sales and Service Workers",
                    "Agricultural, Forestry and Fishery Workers",
                    "Craft, Metal, Electrical and Electronics Workers",
                    "Plant and Machine Operators and Assemblers",
                    "Cleaners and Helpers",
                    "Mining, Construction, Manufacturing and Transport Workers",
                    "Armed Forces",
                    "Government Officers",
                    "Students",
                    "Unemployed"
                ]
            },
            account_turnover: {
                description: "[Optional] The anticipated account turnover.",
                type: "string",
                enum: [
                    "Less than $25,000",
                    "$25,000 - $50,000",
                    "$50,001 - $100,000",
                    "$100,001 - $500,000",
                    "Over $500,000"
                ]
            },
            binary_options_trading_experience: {
                description: "[Optional] Binary options trading experience.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            binary_options_trading_frequency: {
                description: "[Optional] Binary options trading frequency.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            cfd_trading_experience: {
                description: "[Optional] CFDs trading experience.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            cfd_trading_frequency: {
                description: "[Optional] CFDs trading frequency.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            employment_status: {
                description: "[Optional] Employment Status.",
                type: "string",
                enum: [
                    "Employed",
                    "Pensioner",
                    "Self-Employed",
                    "Student",
                    "Unemployed"
                ]
            },
            forex_trading_experience: {
                description: "[Optional] Forex trading experience.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            forex_trading_frequency: {
                description: "[Optional] Forex trading frequency.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            other_instruments_trading_experience: {
                description: "[Optional] Trading experience in other financial instruments.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            other_instruments_trading_frequency: {
                description: "[Optional] Trading frequency in other financial instruments.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            source_of_wealth: {
                description: "[Optional] Source of wealth.",
                type: "string",
                enum: [
                    "Accumulation of Income/Savings",
                    "Cash Business",
                    "Company Ownership",
                    "Divorce Settlement",
                    "Inheritance",
                    "Investment Income",
                    "Sale of Property"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "States List (request)",
        description: "For a given country, returns a list of States of that country. This is useful to populate the account opening form.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "states_list"
        ],
        properties: {
            states_list: {
                title: "States list",
                description: "Client's 2-letter country code (obtained from `residence_list` call)",
                type: "string",
                pattern: "^\\w\\w$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Ticks Stream (request)",
        description: "Initiate a continuous stream of spot price updates for a given symbol.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "ticks"
        ],
        properties: {
            ticks: {
                description: "The short symbol name or array of symbols (obtained from `active_symbols` call).",
                oneOf: [
                    {
                        type: "string",
                        pattern: "^\\w{2,30}$"
                    },
                    {
                        type: "array",
                        items: {
                            type: "string",
                            pattern: "^\\w{2,30}$"
                        }
                    }
                ]
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever a new tick is received.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Account Limits (request)",
        description: "Trading and Withdrawal Limits for a given user",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "get_limits"
        ],
        properties: {
            get_limits: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Terms and Conditions Approval (request)",
        description: "To approve the latest version of terms and conditions.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "tnc_approval"
        ],
        properties: {
            tnc_approval: {
                description: "Must be `1`",
                type: "number",
                enum: [
                    1
                ]
            },
            affiliate_coc_agreement: {
                description: "[Optional] For Affiliate's Code of Conduct Agreement.",
                type: "integer",
                enum: [
                    1
                ]
            },
            ukgc_funds_protection: {
                description: "[Optional] For `ASK_UK_FUNDS_PROTECTION` in `cashier`.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Account Status (request)",
        description: "Get Account Status",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "get_account_status"
        ],
        properties: {
            get_account_status: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Active Symbols (request)",
        description: "Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "active_symbols"
        ],
        properties: {
            active_symbols: {
                description: "If you use `brief`, only a subset of fields will be returned.",
                type: "string",
                enum: [
                    "brief",
                    "full"
                ]
            },
            landing_company: {
                description: "[Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.",
                type: "string",
                enum: [
                    "iom",
                    "malta",
                    "maltainvest",
                    "svg",
                    "virtual",
                    "vanuatu",
                    "champion",
                    "champion-virtual"
                ]
            },
            product_type: {
                description: "[Optional] If you specify this field, only symbols that can be traded through that product type will be returned.",
                type: "string",
                enum: [
                    "basic"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Delete (request)",
        description: "The request for deleting an application.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "app_delete"
        ],
        properties: {
            app_delete: {
                description: "Application app_id",
                type: "integer"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Get Details (request)",
        description: "To get the information of the OAuth application specified by 'app_id'",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "app_get"
        ],
        properties: {
            app_get: {
                description: "Application app_id",
                type: "integer"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: List (request)",
        description: "List all of the account's OAuth applications",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "app_list"
        ],
        properties: {
            app_list: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Markup Details (request)",
        description: "Retrieve details of `app_markup` according to criteria specified.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "app_markup_details",
            "date_from",
            "date_to"
        ],
        properties: {
            app_markup_details: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            date_from: {
                description: "Start date (epoch or YYYY-MM-DD HH:MM:SS). Results are inclusive of this time.",
                type: "string",
                pattern: "^([0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) ([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])|[0-9]{1,10})$"
            },
            date_to: {
                description: "End date (epoch or YYYY-MM-DD HH::MM::SS). Results are inclusive of this time.",
                type: "string",
                pattern: "^([0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) ([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])|[0-9]{1,10})$"
            },
            app_id: {
                description: "[Optional] Specific application `app_id` to report on.",
                type: "integer"
            },
            client_loginid: {
                description: "[Optional] Specific client loginid to report on, like CR12345",
                type: "string",
                pattern: "^[A-Za-z]{2,5}[0-9]{2,20}$"
            },
            description: {
                description: "[Optional] If set to 1, will return `app_markup` transaction details.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            limit: {
                description: "[Optional] Apply upper limit to count of transactions received.",
                type: "number",
                default: 1000,
                maximum: 1000,
                minimum: 0
            },
            offset: {
                description: "[Optional] Number of transactions to skip.",
                type: "number"
            },
            sort: {
                description: "[Optional] Sort direction on `transaction_time`. Other fields sort order is ASC.",
                type: "string",
                default: "DESC",
                enum: [
                    "ASC",
                    "DESC"
                ]
            },
            sort_fields: {
                description: "[Optional] One or more of the specified fields to sort on. Default sort field is by `transaction_time`.",
                type: "array",
                items: {
                    type: "string",
                    enum: [
                        "app_id",
                        "client_loginid",
                        "transaction_time"
                    ]
                },
                maxItems: 3,
                minItems: 0,
                uniqueItems: true
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Register (request)",
        description: "Register a new OAuth application",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "app_register",
            "name",
            "scopes"
        ],
        properties: {
            app_register: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            name: {
                description: "Application name.",
                type: "string",
                pattern: "^[\\w\\s-]{1,48}$"
            },
            scopes: {
                description: "List of permission scopes to grant the application.",
                type: "array",
                items: {
                    type: "string",
                    enum: [
                        "read",
                        "trade",
                        "trading_information",
                        "payments",
                        "admin"
                    ]
                }
            },
            app_markup_percentage: {
                description: "[Optional] Markup to be added to contract prices (as a percentage of contract payout).",
                type: "number",
                maximum: 5,
                minimum: 0
            },
            appstore: {
                description: "[Optional] Application's App Store URL (if applicable).",
                type: "string",
                pattern: "^https?://itunes\\.apple\\.com/\\S+$"
            },
            github: {
                description: "[Optional] Application's GitHub page (for open-source projects).",
                type: "string",
                pattern: "^https?://(www\\.)?github\\.com/\\S+$"
            },
            googleplay: {
                description: "[Optional] Application's Google Play URL (if applicable).",
                type: "string",
                pattern: "^https?://play\\.google\\.com/store/apps/details\\?id=[\\w \\.]+$"
            },
            homepage: {
                description: "[Optional] Application's homepage URL.",
                type: "string",
                pattern: "^https?://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$"
            },
            redirect_uri: {
                description: "[Optional] The URL to redirect to after a successful login. Required if charging markup percentage",
                type: "string",
                pattern: "^[a-z][a-z0-9.+\\-]*://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$"
            },
            verification_uri: {
                description: "[Optional] Used when `verify_email` called. If available, a URL containing the verification token will be sent to the client's email, otherwise only the token will be sent.",
                type: "string",
                pattern: "^[a-z][a-z0-9.+\\-]*://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Update (request)",
        description: "Update a new OAuth application",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "app_update",
            "name",
            "scopes"
        ],
        properties: {
            app_update: {
                description: "Application app_id.",
                type: "integer"
            },
            name: {
                description: "Application name.",
                type: "string",
                pattern: "^[\\w\\s-]{1,48}$"
            },
            scopes: {
                description: "Change scopes will revoke all user's grants and log them out.",
                type: "array",
                items: {
                    type: "string",
                    enum: [
                        "read",
                        "trade",
                        "trading_information",
                        "payments",
                        "admin"
                    ]
                }
            },
            app_markup_percentage: {
                description: "[Optional] Markup to be added to contract prices (as a percentage of contract payout).",
                type: "number",
                maximum: 5,
                minimum: 0
            },
            appstore: {
                description: "[Optional] Application's App Store URL (if applicable).",
                type: "string",
                pattern: "^https?://itunes\\.apple\\.com/\\S+$"
            },
            github: {
                description: "[Optional] Application's GitHub page (for open-source projects).",
                type: "string",
                pattern: "^https?://(www\\.)?github\\.com/\\S+$"
            },
            googleplay: {
                description: "[Optional] Application's Google Play URL (if applicable).",
                type: "string",
                pattern: "^https?://play\\.google\\.com/store/apps/details\\?id=[\\w \\.]+$"
            },
            homepage: {
                description: "[Optional] Application's homepage URL.",
                type: "string",
                pattern: "^https?://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$"
            },
            redirect_uri: {
                description: "[Optional] The URL to redirect to after a successful login. Required if charging markup percentage.",
                type: "string",
                pattern: "^[a-z][a-z0-9.+\\-]*://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$"
            },
            verification_uri: {
                description: "[Optional] Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.",
                type: "string",
                pattern: "^[a-z][a-z0-9.+\\-]*://[0-9a-zA-Z\\.-]+[\\%\\/\\w \\.-]*$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Durations (request)",
        description: "Retrieve a list of all available underlyings and the corresponding contract types and trading duration boundaries. If the user is logged in, only the assets available for that user's landing company will be returned.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "trading_durations"
        ],
        properties: {
            trading_durations: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            landing_company: {
                description: "[Optional] If specified, will return only the underlyings for the specified landing company.",
                type: "string",
                enum: [
                    "iom",
                    "malta",
                    "maltainvest",
                    "svg",
                    "virtual",
                    "vanuatu",
                    "champion",
                    "champion-virtual"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Asset Index (request)",
        description: "Retrieve a list of all available underlyings and the corresponding contract types and duration boundaries. If the user is logged in, only the assets available for that user's landing company will be returned.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "asset_index"
        ],
        properties: {
            asset_index: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            landing_company: {
                description: "[Optional] If specified, will return only the underlyings for the specified landing company.",
                type: "string",
                enum: [
                    "iom",
                    "malta",
                    "maltainvest",
                    "svg",
                    "virtual",
                    "vanuatu",
                    "champion",
                    "champion-virtual"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Authorize (request)",
        description: "Authorize current WebSocket session to act on behalf of the owner of a given token. Must precede requests that need to access client account, for example purchasing and selling contracts or viewing portfolio.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "authorize"
        ],
        properties: {
            authorize: {
                description: "Authentication token. May be retrieved from https://www.binary.com/en/user/security/api_tokenws.html",
                type: "string",
                pattern: "^[\\w\\-]{1,128}$",
                sensitive: 1
            },
            add_to_login_history: {
                description: "[Optional] Send this when you use api tokens for authorization and want to track activity using `login_history` call.",
                type: "integer",
                default: 0,
                enum: [
                    1,
                    0
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Balance (request)",
        description: "Get user account balance",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "balance"
        ],
        properties: {
            balance: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            account: {
                description: "[Optional] If set to `all`, return the balances of all accounts one by one; if set to `current`, return the balance of current account; if set as an account id, return the balance of that account.",
                type: "string",
                pattern: "^(current|all|[A-Z]{2,4}[0-9]{1,10})$",
                default: "current"
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever the balance changes.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Buy Contract (request)",
        description: "Buy a Contract",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "buy",
            "price"
        ],
        properties: {
            buy: {
                description: "Either the ID received from a Price Proposal (`proposal` call), or `1` if contract buy parameters are passed in the `parameters` field.",
                type: "string",
                pattern: "^(?:[\\w-]{32,128}|1)$"
            },
            price: {
                description: "Maximum price at which to purchase the contract.",
                type: "number",
                minimum: 0
            },
            parameters: {
                description: "[Optional] Used to pass the parameters for contract buy.",
                type: "object",
                additionalProperties: false,
                required: [
                    "contract_type",
                    "currency",
                    "symbol"
                ],
                properties: {
                    amount: {
                        description: "[Optional] Proposed payout or stake value",
                        type: "number",
                        minimum: 0
                    },
                    app_markup_percentage: {
                        description: "[Optional] Markup added to contract prices (as a percentage of contract payout)",
                        type: "number"
                    },
                    barrier: {
                        description: "[Optional] Barrier for the contract (or last digit prediction for digit contracts). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.",
                        type: "string",
                        pattern: "^(?=.{1,20}$)[+-]?[0-9]+\\.?[0-9]*$"
                    },
                    barrier2: {
                        description: "[Optional] Low barrier for the contract (for contracts with two barriers). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.",
                        type: "string",
                        pattern: "^(?=.{1,20}$)[+-]?[0-9]+\\.?[0-9]*$"
                    },
                    basis: {
                        description: "[Optional] Indicates whether amount is 'payout' or 'stake' for binary options.",
                        type: "string",
                        enum: [
                            "payout",
                            "stake"
                        ]
                    },
                    cancellation: {
                        description: "Cancellation duration option (only for `MULTUP` and `MULTDOWN` contracts).",
                        type: "string",
                        pattern: "^\\w+$"
                    },
                    contract_type: {
                        description: "A valid contract-type",
                        type: "string",
                        enum: [
                            "MULTUP",
                            "MULTDOWN",
                            "UPORDOWN",
                            "EXPIRYRANGE",
                            "ONETOUCH",
                            "CALLE",
                            "LBHIGHLOW",
                            "ASIAND",
                            "EXPIRYRANGEE",
                            "DIGITDIFF",
                            "DIGITMATCH",
                            "DIGITOVER",
                            "PUTE",
                            "DIGITUNDER",
                            "NOTOUCH",
                            "CALL",
                            "RANGE",
                            "LBFLOATPUT",
                            "DIGITODD",
                            "PUT",
                            "ASIANU",
                            "LBFLOATCALL",
                            "EXPIRYMISSE",
                            "EXPIRYMISS",
                            "DIGITEVEN",
                            "TICKHIGH",
                            "TICKLOW",
                            "RESETCALL",
                            "RESETPUT",
                            "CALLSPREAD",
                            "PUTSPREAD",
                            "RUNHIGH",
                            "RUNLOW"
                        ]
                    },
                    currency: {
                        description: "This can only be the account-holder's currency",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$"
                    },
                    date_expiry: {
                        description: "[Optional] Epoch value of the expiry time of the contract. You must either specify date_expiry or duration.",
                        type: "integer",
                        maximum: 9999999999,
                        minimum: 1
                    },
                    date_start: {
                        description: "[Optional] For forward-starting contracts, epoch value of the starting time of the contract.",
                        type: "integer",
                        maximum: 9999999999,
                        minimum: 0
                    },
                    duration: {
                        description: "[Optional] Duration quantity",
                        type: "integer",
                        maximum: 99999999,
                        minimum: 0
                    },
                    duration_unit: {
                        description: "[Optional] Duration unit is `s`: seconds, `m`: minutes, `h`: hours, `d`: days, `t`: ticks",
                        type: "string",
                        enum: [
                            "d",
                            "m",
                            "s",
                            "h",
                            "t"
                        ]
                    },
                    limit_order: {
                        description: "Add an order to close the contract once the order condition is met (only for `MULTUP` and `MULTDOWN` contracts).",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            stop_loss: {
                                description: "Contract will be automatically closed when the value of the contract reaches a specific loss.",
                                type: "number"
                            },
                            take_profit: {
                                description: "Contract will be automatically closed when the value of the contract reaches a specific profit.",
                                type: "number"
                            }
                        }
                    },
                    multiplier: {
                        description: "[Optional] The multiplier for non-binary options. E.g. lookbacks.",
                        type: "number",
                        minimum: 0
                    },
                    product_type: {
                        description: "[Optional] The product type.",
                        type: "string",
                        default: "basic",
                        enum: [
                            "basic"
                        ]
                    },
                    selected_tick: {
                        description: "[Optional] The tick that is predicted to have the highest/lowest value - for tickhigh and ticklow contracts.",
                        type: "integer"
                    },
                    symbol: {
                        description: "Symbol code",
                        type: "string",
                        pattern: "^\\w{2,30}$"
                    },
                    trading_period_start: {
                        description: "[Optional] An epoch value of a predefined trading period start time",
                        type: "integer",
                        maximum: 9999999999,
                        minimum: 1
                    }
                }
            },
            subscribe: {
                description: "[Optional] `1` to stream.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Buy Contract for Multiple Accounts (request)",
        description: "Buy a Contract for multiple Accounts specified by the `tokens` parameter. Note, although this is an authorized call, the contract is not bought for the authorized account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "buy_contract_for_multiple_accounts",
            "price",
            "tokens"
        ],
        properties: {
            buy_contract_for_multiple_accounts: {
                description: "Either the ID received from a Price Proposal (`proposal` call), or `1` if contract buy parameters are passed in the `parameters` field.",
                type: "string",
                pattern: "^(?:[\\w-]{32,128}|1)$"
            },
            price: {
                description: "Maximum price at which to purchase the contract.",
                type: "number",
                minimum: 0
            },
            tokens: {
                description: "List of API tokens identifying the accounts for which the contract is bought. Note: If the same token appears multiple times or if multiple tokens designate the same account, the contract is bought multiple times for this account.",
                type: "array",
                items: {
                    description: "API token identifying the accounts for which the contract is bought.",
                    type: "string",
                    pattern: "^[\\w\\s-]+$"
                },
                sensitive: 1
            },
            parameters: {
                description: "[Optional] Used to pass the parameters for contract buy.",
                type: "object",
                additionalProperties: false,
                required: [
                    "contract_type",
                    "currency",
                    "symbol"
                ],
                properties: {
                    amount: {
                        description: "[Optional] Proposed `payout` or `stake` value",
                        type: "number",
                        minimum: 0
                    },
                    app_markup_percentage: {
                        description: "[Optional] Markup added to contract prices (as a percentage of contract payout)",
                        type: "number"
                    },
                    barrier: {
                        description: "[Optional] Barrier for the contract (or last digit prediction for digit contracts). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.",
                        type: "string",
                        pattern: "^(?=.{1,20}$)[+-]?\\d+\\.?\\d*$"
                    },
                    barrier2: {
                        description: "[Optional] Low barrier for the contract (for contracts with two barriers). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.",
                        type: "string",
                        pattern: "^(?=.{1,20}$)[+-]?\\d+\\.?\\d*$"
                    },
                    basis: {
                        description: "[Optional] Indicate whether amount is 'payout' or 'stake'.",
                        type: "string",
                        enum: [
                            "payout",
                            "stake"
                        ]
                    },
                    contract_type: {
                        description: "A valid contract-type",
                        type: "string",
                        enum: [
                            "MULTUP",
                            "MULTDOWN",
                            "UPORDOWN",
                            "EXPIRYRANGE",
                            "ONETOUCH",
                            "CALLE",
                            "LBHIGHLOW",
                            "ASIAND",
                            "EXPIRYRANGEE",
                            "DIGITDIFF",
                            "DIGITMATCH",
                            "DIGITOVER",
                            "PUTE",
                            "DIGITUNDER",
                            "NOTOUCH",
                            "CALL",
                            "RANGE",
                            "LBFLOATPUT",
                            "DIGITODD",
                            "PUT",
                            "ASIANU",
                            "LBFLOATCALL",
                            "EXPIRYMISSE",
                            "EXPIRYMISS",
                            "DIGITEVEN",
                            "TICKHIGH",
                            "TICKLOW",
                            "RESETCALL",
                            "RESETPUT",
                            "CALLSPREAD",
                            "PUTSPREAD",
                            "RUNHIGH",
                            "RUNLOW"
                        ]
                    },
                    currency: {
                        description: "This can only be the account-holder's currency",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$"
                    },
                    date_expiry: {
                        description: "[Optional] Epoch value of the expiry time of the contract. You must either specify `date_expiry` or `duration`.",
                        type: "integer",
                        maximum: 9999999999,
                        minimum: 0
                    },
                    date_start: {
                        description: "[Optional] For forward-starting contracts, epoch value of the starting time of the contract.",
                        type: "integer",
                        maximum: 9999999999,
                        minimum: 0
                    },
                    duration: {
                        description: "[Optional] Duration quantity",
                        type: "integer",
                        maximum: 3600,
                        minimum: 0
                    },
                    duration_unit: {
                        description: "[Optional] Duration unit is `s`: seconds, `m`: minutes, `h`: hours, `d`: days, `t`: ticks",
                        type: "string",
                        enum: [
                            "d",
                            "m",
                            "s",
                            "h",
                            "t"
                        ]
                    },
                    multiplier: {
                        description: "[Optional] The multiplier for non-binary options. E.g. lookbacks.",
                        type: "number",
                        minimum: 0
                    },
                    selected_tick: {
                        description: "[Optional] The tick that is predicted to have the highest/lowest value - for tickhigh and ticklow contracts.",
                        type: "integer"
                    },
                    symbol: {
                        description: "Symbol code",
                        type: "string",
                        pattern: "^\\w{2,30}$"
                    }
                }
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Cancel a Contract (request)",
        description: "Cancel contract with contract id",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "cancel"
        ],
        properties: {
            cancel: {
                description: "Value should be the `contract_id` which received from the `portfolio` call.",
                type: "integer"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Cashier Information (request)",
        description: "Request the cashier info for the specified type.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "cashier"
        ],
        properties: {
            cashier: {
                description: "Operation which needs to be requested from cashier",
                type: "string",
                default: "deposit",
                enum: [
                    "deposit",
                    "withdraw"
                ]
            },
            address: {
                description: "[Optional] Address for crypto withdrawal. Only applicable for `api` type.",
                type: "string"
            },
            amount: {
                description: "[Optional] Amount for crypto withdrawal. Only applicable for `api` type.",
                type: "number",
                minimum: 0
            },
            dry_run: {
                description: "[Optional] If set to `1`, only validation is performed. Only applicable for `withdraw` using `crypto` provider and `api` type.",
                type: "integer",
                default: 0,
                enum: [
                    0,
                    1
                ]
            },
            provider: {
                description: "[Optional] Cashier provider. `crypto` will be default option for crypto currency accounts.",
                type: "string",
                default: "doughflow",
                enum: [
                    "doughflow",
                    "crypto"
                ]
            },
            type: {
                description: "[Optional] Data need to be returned from cashier. `api` is supported only for `crypto` provider.",
                type: "string",
                default: "url",
                enum: [
                    "url",
                    "api"
                ]
            },
            verification_code: {
                description: "[Optional] Email verification code (received from a `verify_email` call, which must be done first)",
                type: "string",
                pattern: "^\\w{8,128}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Contracts For Symbol (request)",
        description: "For a given symbol, get the list of currently available contracts, and the latest barrier and duration limits for each contract.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "contracts_for"
        ],
        properties: {
            contracts_for: {
                description: "The short symbol name (obtained from `active_symbols` call).",
                type: "string",
                pattern: "^\\w{2,30}$"
            },
            currency: {
                description: "[Optional] Currency of the contract's stake and payout (obtained from `payout_currencies` call).",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$",
                default: "USD"
            },
            landing_company: {
                description: "[Optional] Indicates which landing company to get a list of contracts for. If you are logged in, your account's landing company will override this field.",
                type: "string",
                default: "virtual",
                enum: [
                    "iom",
                    "malta",
                    "maltainvest",
                    "svg",
                    "virtual",
                    "vanuatu",
                    "champion",
                    "champion-virtual"
                ]
            },
            product_type: {
                description: "[Optional] If you specify this field, only contracts tradable through that contract type will be returned.",
                type: "string",
                enum: [
                    "basic"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: List (request)",
        description: "Retrieves a list of active copiers and/or traders for Copy Trading",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "copytrading_list"
        ],
        properties: {
            copytrading_list: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: Start (request)",
        description: "Start copy trader bets",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "copy_start"
        ],
        properties: {
            copy_start: {
                description: "API tokens identifying the accounts of trader which will be used to copy trades",
                type: "string",
                pattern: "^[\\w\\s-]{15,32}$",
                sensitive: 1
            },
            assets: {
                description: "[Optional] Used to set assets to be copied. E.x [\"frxUSDJPY\", \"R_50\"]",
                oneOf: [
                    {
                        type: "string",
                        pattern: "^\\w{4,128}$"
                    },
                    {
                        type: "array",
                        items: {
                            type: "string",
                            pattern: "^\\w{4,128}$"
                        }
                    }
                ]
            },
            max_trade_stake: {
                description: "[Optional] Used to set maximum trade stake to be copied.",
                type: "number"
            },
            min_trade_stake: {
                description: "[Optional] Used to set minimal trade stake to be copied.",
                type: "number"
            },
            trade_types: {
                description: "[Optional] Used to set trade types to be copied. E.x [\"CALL\", \"PUT\"]",
                oneOf: [
                    {
                        type: "string",
                        pattern: "^\\w{3,128}$"
                    },
                    {
                        type: "array",
                        items: {
                            type: "string",
                            pattern: "^\\w{3,128}$"
                        }
                    }
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: Statistics (request)",
        description: "Retrieve performance, trading, risk and copiers statistics of trader.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "copytrading_statistics",
            "trader_id"
        ],
        properties: {
            copytrading_statistics: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            trader_id: {
                description: "The ID of the target trader.",
                type: "string",
                pattern: "^[A-Za-z]+[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: Stop (request)",
        description: "Stop copy trader bets",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "copy_stop"
        ],
        properties: {
            copy_stop: {
                description: "API tokens identifying the accounts which needs not to be copied",
                type: "string",
                pattern: "^[\\w\\s-]{15,32}$",
                sensitive: 1
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Countries List (request)",
        description: "This call returns a list of countries and 2-letter country codes, suitable for populating the account opening form.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "residence_list"
        ],
        properties: {
            residence_list: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Document Upload (request)",
        description: "Request KYC information from client",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "document_upload",
            "document_format",
            "document_type",
            "expected_checksum",
            "file_size"
        ],
        properties: {
            document_upload: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            document_format: {
                description: "Document file format",
                type: "string",
                enum: [
                    "PNG",
                    "JPG",
                    "JPEG",
                    "GIF",
                    "PDF"
                ]
            },
            document_type: {
                description: "Document type",
                type: "string",
                enum: [
                    "passport",
                    "national_identity_card",
                    "driving_licence",
                    "utility_bill",
                    "bankstatement",
                    "power_of_attorney",
                    "amlglobalcheck",
                    "docverification",
                    "proofid",
                    "driverslicense",
                    "proofaddress",
                    "other",
                    "voter_card",
                    "student_card",
                    "nimc_slip",
                    "birth_certificate",
                    "pan_card",
                    "tax_photo_id",
                    "selfie_with_id",
                    "poi_others",
                    "insurance_bill",
                    "tax_receipt",
                    "phone_bill",
                    "poa_others"
                ]
            },
            expected_checksum: {
                description: "The checksum of the file to be uploaded",
                type: "string",
                pattern: "^[[:xdigit:]]{32}"
            },
            file_size: {
                description: "Document size (should be less than 10MB)",
                type: "integer"
            },
            document_id: {
                description: "[Optional] Document ID (required for Passport, Proof of ID and Driver's License)",
                type: "string",
                pattern: "^[\\w\\s-]{0,30}$"
            },
            document_issuing_country: {
                description: "[Optional] 2-letter country code",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            expiration_date: {
                description: "[Optional] Document expiration date (required for Passport, Proof of ID and Driver's License)",
                type: "string",
                pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
            },
            lifetime_valid: {
                description: "[Optional] Boolean value that indicates whether this document is lifetime valid (only applies to POI document types, cancels out the expiration_date given if any)",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            page_type: {
                description: "[Optional] To determine document side",
                type: "string",
                enum: [
                    "front",
                    "back",
                    "photo"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Economic Calendar (request)",
        description: "Specify a currency to receive a list of events related to that specific currency. For example, specifying USD will return a list of USD-related events. If the currency is omitted, you will receive a list for all currencies.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "economic_calendar"
        ],
        properties: {
            economic_calendar: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            currency: {
                description: "[Optional] Currency symbol.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            end_date: {
                description: "[Optional] End date.",
                type: "integer",
                maximum: 9999999999,
                minimum: 1
            },
            start_date: {
                description: "[Optional] Start date.",
                type: "integer",
                maximum: 9999999999,
                minimum: 1
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Exchange Rates (request)",
        description: "Retrieves the exchange rates from a base currency to all currencies supported by the system.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "exchange_rates",
            "base_currency"
        ],
        properties: {
            exchange_rates: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            base_currency: {
                description: "Base currency (can be obtained from `payout_currencies` call)",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Forget (request)",
        description: "Immediately cancel the real-time stream of messages with a specific ID.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "forget"
        ],
        properties: {
            forget: {
                description: "ID of the real-time stream of messages to cancel.",
                type: "string",
                pattern: "^[\\w-]{32,128}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Forget All (request)",
        description: "Immediately cancel the real-time streams of messages of given type.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "forget_all"
        ],
        properties: {
            forget_all: {
                description: "Cancel all streams by type. The value can be either a single type e.g. `\"ticks\"`, or an array of multiple types e.g. `[\"candles\", \"ticks\"]`.",
                oneOf: [
                    {
                        $ref: "#/definitions/stream_types"
                    },
                    {
                        type: "array",
                        items: {
                            $ref: "#/definitions/stream_types"
                        }
                    }
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        },
        definitions: {
            stream_types: {
                description: "Valid stream types that can be used to unsubscribe from.",
                type: "string",
                enum: [
                    "balance",
                    "candles",
                    "cashier_payments",
                    "p2p_advert",
                    "p2p_advertiser",
                    "p2p_order",
                    "proposal",
                    "proposal_open_contract",
                    "ticks",
                    "transaction",
                    "website_status"
                ]
            }
        }
    },
    {
        title: "Get Account Settings (request)",
        description: "Get User Settings (email, date of birth, address etc)",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "get_settings"
        ],
        properties: {
            get_settings: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Get Financial Assessment (request)",
        description: "This call gets the financial assessment details. The 'financial assessment' is a questionnaire that clients of certain Landing Companies need to complete, due to regulatory and KYC (know your client) requirements.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "get_financial_assessment"
        ],
        properties: {
            get_financial_assessment: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Ticks History (request)",
        description: "Get historic tick data for a given symbol.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "ticks_history",
            "end"
        ],
        properties: {
            ticks_history: {
                description: "Short symbol name (obtained from the `active_symbols` call).",
                type: "string",
                pattern: "^\\w{2,30}$"
            },
            end: {
                description: "Epoch value representing the latest boundary of the returned ticks. If `latest` is specified, this will be the latest available timestamp.",
                type: "string",
                pattern: "^(latest|[0-9]{1,10})$"
            },
            adjust_start_time: {
                description: "[Optional] 1 - if the market is closed at the end time, or license limit is before end time, adjust interval backwards to compensate.",
                type: "integer",
                enum: [
                    1
                ]
            },
            count: {
                description: "[Optional] An upper limit on ticks to receive.",
                type: "integer",
                default: "5000"
            },
            granularity: {
                description: "[Optional] Only applicable for style: `candles`. Candle time-dimension width setting. (default: `60`).",
                type: "integer",
                enum: [
                    60,
                    120,
                    180,
                    300,
                    600,
                    900,
                    1800,
                    3600,
                    7200,
                    14400,
                    28800,
                    86400
                ]
            },
            start: {
                description: "[Optional] Epoch value representing the earliest boundary of the returned ticks. \n- For `\"style\": \"ticks\"`: this will default to 1 day ago.\n- For `\"style\": \"candles\"`: it will default to 1 day ago if count or granularity is undefined.",
                type: "integer",
                maximum: 9999999999,
                minimum: 0
            },
            style: {
                description: "[Optional] The tick-output style.",
                type: "string",
                default: "ticks",
                enum: [
                    "candles",
                    "ticks"
                ]
            },
            subscribe: {
                description: "[Optional] 1 - to send updates whenever a new tick is received.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Get Self-Exclusion (request)",
        description: "Allows users to exclude themselves from the website for certain periods of time, or to set limits on their trading activities. This facility is a regulatory requirement for certain Landing Companies.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "get_self_exclusion"
        ],
        properties: {
            get_self_exclusion: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Identity Verification Add Document (request)",
        description: "Adds document information such as issuing country, id and type for identity verification processes.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "identity_verification_document_add",
            "document_number",
            "document_type",
            "issuing_country"
        ],
        properties: {
            identity_verification_document_add: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            document_number: {
                description: "The identification number of the document.",
                type: "string"
            },
            document_type: {
                description: "The type of the document based on provided `issuing_country` (can obtained from `residence_list` call).",
                type: "string"
            },
            issuing_country: {
                description: "2-letter country code (can obtained from `residence_list` call).",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Landing Company (request)",
        description: "The company has a number of licensed subsidiaries in various jurisdictions, which are called Landing Companies. This call will return the appropriate Landing Company for clients of a given country. The landing company may differ for Gaming contracts (Synthetic Indices) and Financial contracts (Forex, Stock Indices, Commodities).",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "landing_company"
        ],
        properties: {
            landing_company: {
                title: "Landing Company",
                description: "Client's 2-letter country code (obtained from `residence_list` call).",
                type: "string",
                pattern: "^\\w\\w$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Platform: Investor Password Reset (request)",
        description: "Reset the investor password of a Trading Platform Account",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "trading_platform_investor_password_reset",
            "account_id",
            "new_password",
            "platform",
            "verification_code"
        ],
        properties: {
            trading_platform_investor_password_reset: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            account_id: {
                description: "Trading account ID.",
                type: "string"
            },
            new_password: {
                description: "New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            platform: {
                description: "Name of trading platform.",
                type: "string",
                enum: [
                    "mt5"
                ]
            },
            verification_code: {
                description: "Email verification code (received from a `verify_email` call, which must be done first)",
                type: "string",
                pattern: "^\\w{8,128}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Landing Company Details (request)",
        description: "The company has a number of licensed subsidiaries in various jurisdictions, which are called Landing Companies (and which are wholly owned subsidiaries of the Deriv Group). This call provides information about each Landing Company.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "landing_company_details"
        ],
        properties: {
            landing_company_details: {
                description: "Landing company shortcode.",
                type: "string",
                enum: [
                    "iom",
                    "malta",
                    "maltainvest",
                    "svg",
                    "virtual",
                    "vanuatu",
                    "champion",
                    "champion-virtual",
                    "samoa",
                    "samoa-virtual"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Log Out (request)",
        description: "Logout the session",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "logout"
        ],
        properties: {
            logout: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Login History (request)",
        description: "Retrieve a summary of login history for user.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "login_history"
        ],
        properties: {
            login_history: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            limit: {
                description: "[Optional] Apply limit to count of login history records.",
                type: "integer",
                default: 10,
                maximum: 50,
                minimum: 0
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Accounts List (request)",
        description: "Get list of MT5 accounts for client",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "mt5_login_list"
        ],
        properties: {
            mt5_login_list: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Deposit (request)",
        description: "This call allows deposit into MT5 account from Binary account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "mt5_deposit",
            "to_mt5"
        ],
        properties: {
            mt5_deposit: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            to_mt5: {
                description: "MT5 account login to deposit money to",
                type: "string",
                pattern: "^MT[DR]?[0-9]+$"
            },
            amount: {
                description: "Amount to deposit (in the currency of from_binary); min = $1 or an equivalent amount, max = $20000 or an equivalent amount",
                type: "number"
            },
            from_binary: {
                description: "Binary account loginid to transfer money from",
                type: "string",
                pattern: "^[A-Za-z]+[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Get Setting (request)",
        description: "Get MT5 user account settings",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "mt5_get_settings",
            "login"
        ],
        properties: {
            mt5_get_settings: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            login: {
                description: "MT5 user login",
                type: "string",
                pattern: "^MT[DR]?[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: New Account (request)",
        description: "This call creates new MT5 user, either demo or real money user.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "mt5_new_account",
            "account_type",
            "email",
            "leverage",
            "mainPassword",
            "name"
        ],
        properties: {
            mt5_new_account: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ],
                sensitive: 1
            },
            account_type: {
                description: "Account type. If set to 'financial', setting 'mt5_account_type' is also required.",
                type: "string",
                enum: [
                    "demo",
                    "gaming",
                    "financial"
                ]
            },
            email: {
                description: "Email address",
                type: "string",
                pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$"
            },
            leverage: {
                description: "Client leverage (from 1 to 1000).",
                type: "number"
            },
            mainPassword: {
                description: "The master password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address). This field is required.",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            name: {
                description: "Client's name. The maximum length here is 101 characters.",
                type: "string",
                pattern: "^.{1,101}$"
            },
            address: {
                description: "[Optional] The address of the user. The maximum length of this address field is 128 characters.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,@/-]{0,128}$"
            },
            city: {
                description: "[Optional] User's city of residence.",
                type: "string",
                pattern: "^[\\p{L}\\s'.-]{0,50}$"
            },
            company: {
                description: "[Optional] Name of the client's company. The maximum length of the company name is 64 characters.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,@/-]{0,64}$"
            },
            country: {
                description: "[Optional] 2-letter country code (value received from `residence_list` call).",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            currency: {
                description: "[Optional] MT5 account currency, the default value will be the qualified account currency.",
                type: "string",
                pattern: "^(|[a-zA-Z0-9]{2,20})$"
            },
            dry_run: {
                description: "[Optional] If set to 1, only validation is performed.",
                type: "integer",
                default: 0,
                enum: [
                    0,
                    1
                ]
            },
            investPassword: {
                description: "[Optional] The investor password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            mt5_account_category: {
                description: "[Optional] To choose whether account is conventional or swap_free. Unavailable for financial_stp MT5_account_type",
                type: "string",
                enum: [
                    "conventional",
                    "swap_free"
                ]
            },
            mt5_account_type: {
                description: "[Optional] Financial: Variable spreads, High leverage. Financial STP: Variable spreads, Medium Leverage, more products. If 'account_type' set to 'financial', setting 'mt5_account_type' is also required.",
                type: "string",
                enum: [
                    "financial",
                    "financial_stp"
                ]
            },
            phone: {
                description: "[Optional] User's phone number.",
                type: "string",
                pattern: "^\\+?[0-9]{0,50}$"
            },
            phonePassword: {
                description: "[Optional] The user's phone password.",
                type: "string",
                maxLength: 50,
                sensitive: 1
            },
            server: {
                description: "[Optional] Trade server.",
                type: [
                    "null",
                    "string"
                ],
                enum: [
                    "p01_ts01",
                    "p01_ts02",
                    "p01_ts03",
                    "p01_ts04",
                    "p02_ts02"
                ]
            },
            state: {
                description: "[Optional] User's state (region) of residence.",
                type: "string",
                pattern: "^.{0,50}$"
            },
            zipCode: {
                description: "[Optional] User's zip code.",
                type: "string",
                maxLength: 50
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Password Change (request)",
        description: "To change passwords of the MT5 account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "mt5_password_change",
            "login",
            "new_password",
            "old_password"
        ],
        properties: {
            mt5_password_change: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            login: {
                description: "MT5 user login",
                type: "string",
                pattern: "^MT[DR]?[0-9]+$"
            },
            new_password: {
                description: "New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            old_password: {
                description: "Old password for validation (non-empty string, accepts any printable ASCII character)",
                type: "string",
                pattern: "^[ -~]+$",
                sensitive: 1
            },
            password_type: {
                description: "[Optional] Type of the password to change.",
                type: "string",
                default: "main",
                enum: [
                    "main",
                    "investor"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Password Check (request)",
        description: "This call validates the main password for the MT5 user",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "mt5_password_check",
            "login",
            "password"
        ],
        properties: {
            mt5_password_check: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            login: {
                description: "MT5 user login",
                type: "string",
                pattern: "^MT[DR]?[0-9]+$"
            },
            password: {
                description: "The password of the account.",
                type: "string",
                pattern: "^[ -~]+$",
                sensitive: 1
            },
            password_type: {
                description: "[Optional] Type of the password to check.",
                type: "string",
                default: "main",
                enum: [
                    "main",
                    "investor"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Password Reset (request)",
        description: "To reset the password of MT5 account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "mt5_password_reset",
            "login",
            "new_password",
            "verification_code"
        ],
        properties: {
            mt5_password_reset: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            login: {
                description: "MT5 user login",
                type: "string",
                pattern: "^MT[DR]?[0-9]+$"
            },
            new_password: {
                description: "New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            verification_code: {
                description: "Email verification code (received from a `verify_email` call, which must be done first)",
                type: "string",
                pattern: "^\\w{8,128}$"
            },
            password_type: {
                description: "[Optional] Type of the password to reset.",
                type: "string",
                default: "main",
                enum: [
                    "main",
                    "investor"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Withdrawal (request)",
        description: "This call allows withdrawal from MT5 account to Binary account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "mt5_withdrawal",
            "amount",
            "from_mt5",
            "to_binary"
        ],
        properties: {
            mt5_withdrawal: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            amount: {
                description: "Amount to withdraw (in the currency of the MT5 account); min = $1 or an equivalent amount, max = $20000 or an equivalent amount.",
                type: "number"
            },
            from_mt5: {
                description: "MT5 account login to withdraw money from",
                type: "string",
                pattern: "^MT[DR]?[0-9]+$"
            },
            to_binary: {
                description: "Binary account loginid to transfer money to",
                type: "string",
                pattern: "^[A-Za-z]+[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "New Real-Money Account: Default Landing Company (request)",
        description: "This call opens a new real-money account. This call can be made from a virtual-money or a real-money account. If it is the latter, client information fields in this call will be ignored and data from your existing real-money account will be used.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "new_account_real"
        ],
        properties: {
            new_account_real: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            account_opening_reason: {
                description: "[Optional] Purpose and reason for requesting the account opening.",
                type: "string",
                enum: [
                    "Speculative",
                    "Income Earning",
                    "Hedging",
                    "Peer-to-peer exchange"
                ]
            },
            account_turnover: {
                description: "[Optional] The anticipated account turnover.",
                type: "string",
                enum: [
                    "Less than $25,000",
                    "$25,000 - $50,000",
                    "$50,001 - $100,000",
                    "$100,001 - $500,000",
                    "Over $500,000"
                ]
            },
            address_city: {
                description: "[Optional] Within 100 characters.",
                type: "string",
                pattern: "^\\p{L}[\\p{L}\\s'.-]{0,99}$"
            },
            address_line_1: {
                description: "Within 70 characters, with no leading whitespaces and may contain letters/numbers and/or any of following characters '.,:;()@#/-",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}'.,:;()\\x{b0}@#/-][\\p{L}\\p{Nd}\\s'.,:;()\\x{b0}@#/-]{0,69}$"
            },
            address_line_2: {
                description: "[Optional] Within 70 characters.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()\\x{b0}@#/-]{0,70}$"
            },
            address_postcode: {
                description: "[Optional] Within 20 characters and may not contain '+'.",
                type: "string",
                pattern: "^([A-Za-z0-9][A-Za-z0-9\\s-]{0,20})?$"
            },
            address_state: {
                description: "[Optional] Possible value receive from `states_list` call.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,-]{0,35}$"
            },
            affiliate_token: {
                description: "[Optional] Affiliate token, within 32 characters.",
                type: "string",
                pattern: "^[\\w-]{0,32}$"
            },
            citizen: {
                description: "[Optional] Country of legal citizenship, 2-letter country code.",
                type: [
                    "null",
                    "string"
                ],
                pattern: "^([a-z]{2})?$"
            },
            client_type: {
                description: "[Optional] Indicates whether this is for a client requesting an account with professional status.",
                type: "string",
                default: "retail",
                enum: [
                    "professional",
                    "retail"
                ]
            },
            currency: {
                description: "[Optional] To set currency of the account. List of supported currencies can be acquired with `payout_currencies` call.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            date_of_birth: {
                description: "Date of birth format: `yyyy-mm-dd`.",
                type: "string",
                pattern: "^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$"
            },
            first_name: {
                description: "Within 2-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.",
                type: "string",
                pattern: "^(?!.*\\s{2,})[\\p{L}\\s'.-]{2,50}$"
            },
            last_name: {
                description: "Within 2-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.",
                type: "string",
                pattern: "^(?!.*\\s{2,})[\\p{L}\\s'.-]{2,50}$"
            },
            non_pep_declaration: {
                description: "[Optional] Indicates client's self-declaration of not being a PEP/RCA (Politically Exposed Person/Relatives and Close Associates).",
                type: "integer",
                maximum: 1,
                minimum: 0
            },
            phone: {
                description: "[Optional] Starting with `+` followed by 9-35 digits, hyphens or space.",
                type: [
                    "null",
                    "string"
                ]
            },
            place_of_birth: {
                description: "[Optional] Place of birth, 2-letter country code.",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            residence: {
                description: "2-letter country code, possible value receive from `residence_list` call.",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            salutation: {
                description: "[Optional] Accept any value in enum list.",
                type: "string",
                enum: [
                    "Mr",
                    "Ms"
                ]
            },
            secret_answer: {
                description: "[Optional] Answer to secret question, within 4-50 characters. Required for new account and existing client details will be used if client open another account.",
                type: "string",
                pattern: "^[\\w\\-\\,\\.\\' ]+",
                maxLength: 50,
                minLength: 4,
                sensitive: 1
            },
            secret_question: {
                description: "[Optional] Accept any value in enum list. Required for new account and existing client details will be used if client open another account.",
                type: "string",
                enum: [
                    "Mother's maiden name",
                    "Name of your pet",
                    "Name of first love",
                    "Memorable town/city",
                    "Memorable date",
                    "Favourite dish",
                    "Brand of first car",
                    "Favourite artist"
                ]
            },
            tax_identification_number: {
                description: "[Optional] Tax identification number. Only applicable for real money account. Required for `maltainvest` landing company.",
                type: "string",
                pattern: "^(?!^$|\\s+)[A-Za-z0-9.\\/\\s-]{0,25}$"
            },
            tax_residence: {
                description: "[Optional] Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account. Required for `maltainvest` landing company.",
                type: "string",
                pattern: "^[a-z]{0,2}(?:,[a-z]{2})*$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "New Real-Money Account: Deriv Investment (Europe) Ltd (request)",
        description: "This call opens a new real-money account with the `maltainvest` Landing Company. This call can be made from a virtual-money account or real-money account at Deriv (Europe) Limited. If it is the latter, client information fields in this call will be ignored and data from your existing real-money account will be used.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "new_account_maltainvest",
            "accept_risk",
            "address_city",
            "address_line_1",
            "date_of_birth",
            "education_level",
            "employment_industry",
            "estimated_worth",
            "first_name",
            "income_source",
            "last_name",
            "net_income",
            "occupation",
            "residence",
            "salutation",
            "tax_identification_number",
            "tax_residence"
        ],
        properties: {
            new_account_maltainvest: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            accept_risk: {
                description: "Show whether client has accepted risk disclaimer.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            address_city: {
                description: "Within 100 characters",
                type: "string",
                pattern: "^\\p{L}[\\p{L}\\s'.-]{0,99}$"
            },
            address_line_1: {
                description: "Within 70 characters, with no leading whitespaces and may contain letters/numbers and/or any of following characters '.,:;()@#/-",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}'.,:;()\\x{b0}@#/-][\\p{L}\\p{Nd}\\s'.,:;()\\x{b0}@#/-]{0,69}$"
            },
            date_of_birth: {
                description: "Date of birth format: yyyy-mm-dd.",
                type: "string",
                pattern: "^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$"
            },
            education_level: {
                description: "Level of Education",
                type: "string",
                enum: [
                    "Primary",
                    "Secondary",
                    "Tertiary"
                ]
            },
            employment_industry: {
                description: "Industry of Employment.",
                type: "string",
                enum: [
                    "Construction",
                    "Education",
                    "Finance",
                    "Health",
                    "Tourism",
                    "Information & Communications Technology",
                    "Science & Engineering",
                    "Legal",
                    "Social & Cultural",
                    "Agriculture",
                    "Real Estate",
                    "Food Services",
                    "Manufacturing",
                    "Unemployed"
                ]
            },
            estimated_worth: {
                description: "Estimated Net Worth.",
                type: "string",
                enum: [
                    "Less than $100,000",
                    "$100,000 - $250,000",
                    "$250,001 - $500,000",
                    "$500,001 - $1,000,000",
                    "Over $1,000,000"
                ]
            },
            first_name: {
                description: "Within 2-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.",
                type: "string",
                pattern: "^(?!.*\\s{2,})[\\p{L}\\s'.-]{2,50}$"
            },
            income_source: {
                description: "Income Source.",
                type: "string",
                enum: [
                    "Salaried Employee",
                    "Self-Employed",
                    "Investments & Dividends",
                    "Pension",
                    "State Benefits",
                    "Savings & Inheritance"
                ]
            },
            last_name: {
                description: "Within 2-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.",
                type: "string",
                pattern: "^(?!.*\\s{2,})[\\p{L}\\s'.-]{2,50}$"
            },
            net_income: {
                description: "Net Annual Income.",
                type: "string",
                enum: [
                    "Less than $25,000",
                    "$25,000 - $50,000",
                    "$50,001 - $100,000",
                    "$100,001 - $500,000",
                    "Over $500,000"
                ]
            },
            occupation: {
                description: "Occupation.",
                type: "string",
                enum: [
                    "Chief Executives, Senior Officials and Legislators",
                    "Managers",
                    "Professionals",
                    "Clerks",
                    "Personal Care, Sales and Service Workers",
                    "Agricultural, Forestry and Fishery Workers",
                    "Craft, Metal, Electrical and Electronics Workers",
                    "Plant and Machine Operators and Assemblers",
                    "Cleaners and Helpers",
                    "Mining, Construction, Manufacturing and Transport Workers",
                    "Armed Forces",
                    "Government Officers",
                    "Students",
                    "Unemployed"
                ]
            },
            residence: {
                description: "2-letter country code, possible value receive from `residence_list` call.",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            salutation: {
                description: "Accept any value in enum list.",
                type: "string",
                enum: [
                    "Mr",
                    "Ms"
                ]
            },
            tax_identification_number: {
                description: "Tax identification number. Only applicable for real money account. Required for `maltainvest` landing company.",
                type: "string",
                pattern: "^(?!^$|\\s+)[A-Za-z0-9.\\/\\s-]{0,25}$"
            },
            tax_residence: {
                description: "Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account. Required for `maltainvest` landing company.",
                type: "string",
                pattern: "^[a-z]{0,2}(?:,[a-z]{2})*$"
            },
            account_opening_reason: {
                description: "[Optional] Purpose and reason for requesting the account opening.",
                type: "string",
                enum: [
                    "Speculative",
                    "Income Earning",
                    "Hedging"
                ]
            },
            account_turnover: {
                description: "[Optional] The anticipated account turnover.",
                type: "string",
                enum: [
                    "Less than $25,000",
                    "$25,000 - $50,000",
                    "$50,001 - $100,000",
                    "$100,001 - $500,000",
                    "Over $500,000"
                ]
            },
            address_line_2: {
                description: "[Optional] Within 70 characters.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()\\x{b0}@#/-]{0,70}$"
            },
            address_postcode: {
                description: "[Optional] Within 20 characters and may not contain '+'.",
                type: "string",
                pattern: "^([A-Za-z0-9][A-Za-z0-9\\s-]{0,20})?$"
            },
            address_state: {
                description: "[Optional] Possible value receive from `states_list` call.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,-]{0,35}$"
            },
            affiliate_token: {
                description: "[Optional] Affiliate token, within 32 characters.",
                type: "string",
                pattern: "^[\\w-]{0,32}$"
            },
            binary_options_trading_experience: {
                description: "[Optional] Binary options trading experience.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            binary_options_trading_frequency: {
                description: "[Optional] Binary options trading frequency.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            cfd_trading_experience: {
                description: "[Optional] CFDs trading experience.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            cfd_trading_frequency: {
                description: "[Optional] CFDs trading frequency.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            citizen: {
                description: "[Optional] Country of legal citizenship, 2-letter country code. Possible value receive from `residence_list` call.",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            client_type: {
                description: "[Optional] Indicates whether this is for a client requesting an account with professional status.",
                type: "string",
                default: "retail",
                enum: [
                    "professional",
                    "retail"
                ]
            },
            employment_status: {
                description: "[Optional] Employment Status.",
                type: "string",
                enum: [
                    "Employed",
                    "Pensioner",
                    "Self-Employed",
                    "Student",
                    "Unemployed"
                ]
            },
            forex_trading_experience: {
                description: "[Optional] Forex trading experience.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            forex_trading_frequency: {
                description: "[Optional] Forex trading frequency.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            non_pep_declaration: {
                description: "[Optional] Indicates client's self-declaration of not being a PEP/RCA.",
                type: "integer",
                maximum: 1,
                minimum: 0
            },
            other_instruments_trading_experience: {
                description: "[Optional] Trading experience in other financial instruments.",
                type: "string",
                enum: [
                    "0-1 year",
                    "1-2 years",
                    "Over 3 years"
                ]
            },
            other_instruments_trading_frequency: {
                description: "[Optional] Trading frequency in other financial instruments.",
                type: "string",
                enum: [
                    "0-5 transactions in the past 12 months",
                    "6-10 transactions in the past 12 months",
                    "11-39 transactions in the past 12 months",
                    "40 transactions or more in the past 12 months"
                ]
            },
            phone: {
                description: "[Optional] Starting with `+` followed by 9-35 digits, hyphens or space.",
                type: [
                    "null",
                    "string"
                ]
            },
            place_of_birth: {
                description: "[Optional] Place of birth, 2-letter country code.",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            secret_answer: {
                description: "[Optional] Answer to secret question, within 4-50 characters.",
                type: "string",
                pattern: "^[\\w\\-\\,\\.\\' ]+",
                maxLength: 50,
                minLength: 4,
                sensitive: 1
            },
            secret_question: {
                description: "[Optional] Accept any value in enum list.",
                type: "string",
                enum: [
                    "Mother's maiden name",
                    "Name of your pet",
                    "Name of first love",
                    "Memorable town/city",
                    "Memorable date",
                    "Favourite dish",
                    "Brand of first car",
                    "Favourite artist"
                ]
            },
            source_of_wealth: {
                description: "[Optional] Source of wealth.",
                type: "string",
                enum: [
                    "Accumulation of Income/Savings",
                    "Cash Business",
                    "Company Ownership",
                    "Divorce Settlement",
                    "Inheritance",
                    "Investment Income",
                    "Sale of Property"
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "New Virtual-Money Account (request)",
        description: "Create a new virtual-money account.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "new_account_virtual"
        ],
        properties: {
            new_account_virtual: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            affiliate_token: {
                description: "[Optional] Affiliate token, within 32 characters.",
                type: "string",
                pattern: "^[\\w-]{0,32}$"
            },
            client_password: {
                description: "Password (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            date_first_contact: {
                description: "[Optional] Date of first contact, format: `yyyy-mm-dd` in GMT timezone.",
                type: "string",
                pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
            },
            email_consent: {
                description: "[Optional] Boolean value: 1 or 0, indicating whether the client has given consent for marketing emails.",
                type: "integer",
                enum: [
                    1,
                    0
                ]
            },
            gclid_url: {
                description: "[Optional] Google Click Identifier to track source.",
                type: "string",
                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
            },
            residence: {
                description: "2-letter country code (obtained from `residence_list` call).",
                type: "string",
                pattern: "^[a-z]{2}$"
            },
            signup_device: {
                description: "[Optional] Show whether user has used mobile or desktop.",
                type: "string",
                enum: [
                    "desktop",
                    "mobile"
                ]
            },
            type: {
                description: "Account type",
                type: "string",
                default: "trading",
                enum: [
                    "trading",
                    "wallet"
                ]
            },
            utm_ad_id: {
                description: "[Optional] Identifier of particular ad. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_adgroup_id: {
                description: "[Optional] Identifier of ad group in the campaign. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_adrollclk_id: {
                description: "[Optional] Unique identifier of click on AdRoll ads platform. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_campaign: {
                description: "[Optional] Identifies a specific product promotion or strategic campaign such as a spring sale or other promotions. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_campaign_id: {
                description: "[Optional] Identifier of paid ad campaign. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_content: {
                description: "[Optional] Used to differentiate similar content, or links within the same ad. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_fbcl_id: {
                description: "[Optional] Unique identifier of click on Facebook ads platform. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_gl_client_id: {
                description: "[Optional] Unique visitor identifier on Google Ads platform. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_medium: {
                description: "[Optional] Identifies the medium the link was used upon such as: email, CPC, or other methods of sharing. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_msclk_id: {
                description: "[Optional] Unique click identifier on Microsoft Bing ads platform. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_source: {
                description: "[Optional] Identifies the source of traffic such as: search engine, newsletter, or other referral. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            utm_term: {
                description: "[Optional] Used to send information related to the campaign term like paid search keywords. Value must match Regex pattern to be recorded",
                anyOf: [
                    {
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    {
                        type: "string"
                    }
                ]
            },
            verification_code: {
                description: "Email verification code (received from a `verify_email` call, which must be done first).",
                type: "string",
                pattern: "^\\w{8,128}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "OAuth Applications (request)",
        description: "List all my used OAuth applications.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "oauth_apps"
        ],
        properties: {
            oauth_apps: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert Create (request)",
        description: "Creates a P2P (Peer to Peer) advert. Can only be used by an approved P2P advertiser. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advert_create",
            "amount",
            "max_order_amount",
            "min_order_amount",
            "rate",
            "type"
        ],
        properties: {
            p2p_advert_create: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            amount: {
                description: "The total amount of the advert, in advertiser's account currency.",
                type: "number"
            },
            max_order_amount: {
                description: "Maximum allowed amount for the orders of this advert, in advertiser's `account_currency`. Should be less than or equal to total `amount` of the advert.",
                type: "number"
            },
            min_order_amount: {
                description: "Minimum allowed amount for the orders of this advert, in advertiser's `account_currency`. Should be less than `max_order_amount`.",
                type: "number"
            },
            rate: {
                description: "Conversion rate from advertiser's account currency to `local_currency`.",
                type: "number"
            },
            type: {
                description: "Whether this is a buy or a sell.",
                type: "string",
                enum: [
                    "buy",
                    "sell"
                ]
            },
            contact_info: {
                description: "[Optional] Advertiser contact information. Only applicable for 'sell adverts'.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            description: {
                description: "[Optional] General information about the advert.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            local_currency: {
                description: "[Optional] Local currency for this advert. If not provided, will use the currency of client's residence by default.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$",
                examples: [
                    "USD"
                ]
            },
            payment_info: {
                description: "[Optional] Payment instructions. Only applicable for 'sell adverts'.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            payment_method: {
                description: "Supported payment methods. Separate multiple values with a comma, maximum 3.",
                type: "string",
                pattern: "^([a-z0-9_]+)(,[a-z0-9_]+)?(,[a-z0-9_]+)?$"
            },
            payment_method_ids: {
                description: "IDs of payment methods, only applicable for sell ads.",
                type: "array",
                items: {
                    type: "integer"
                },
                maxItems: 3
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert Information (request)",
        description: "Retrieve information about a P2P advert. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advert_info"
        ],
        properties: {
            p2p_advert_info: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            id: {
                description: "[Optional] The unique identifier for this advert. Optional when subscribe is 1. If not provided, all advertiser adverts will be subscribed.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates when changes occur. Optional when id is provided.",
                type: "integer",
                enum: [
                    1
                ]
            },
            use_client_limits: {
                description: "[Optional] If set to 1, the maximum order amount will be adjusted to the current balance and turnover limits of the account.",
                type: "integer",
                default: 0,
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert List (request)",
        description: "Returns available adverts for use with `p2p_order_create`. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advert_list"
        ],
        properties: {
            p2p_advert_list: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            advertiser_id: {
                description: "[Optional] ID of the advertiser to list adverts for.",
                type: "string"
            },
            advertiser_name: {
                description: "[Optional] Search for advertiser by name. Partial matches will be returned.",
                type: "string"
            },
            amount: {
                description: "[Optional] How much to buy or sell, used to calculate prices.",
                type: "number"
            },
            counterparty_type: {
                description: "[Optional] Filter the adverts by `counterparty_type`.",
                type: "string",
                enum: [
                    "buy",
                    "sell"
                ]
            },
            favourites_only: {
                description: "[Optional] Only show adverts from favourite advertisers. Default is 0.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            limit: {
                description: "[Optional] Used for paging.",
                type: "integer",
                default: 50
            },
            local_currency: {
                description: "[Optional] Currency to conduct payment transaction in, defaults to the main currency for the client's country.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            offset: {
                description: "[Optional] Used for paging.",
                type: "integer",
                default: 0
            },
            payment_method: {
                description: "[Optional] Search by supported payment methods.",
                type: "array",
                items: {
                    description: "Payment method identifer.",
                    type: "string",
                    pattern: "^[a-z0-9_]{1,30}$"
                }
            },
            sort_by: {
                description: "[Optional] How the results are sorted: best rate, or advertiser completion rate.",
                type: "string",
                default: "rate",
                enum: [
                    "completion",
                    "rate"
                ]
            },
            use_client_limits: {
                description: "[Optional] If set to 1, ads that exceed this account's balance or turnover limits will not be shown.",
                type: "integer",
                default: 0,
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert Update (request)",
        description: "Updates a P2P advert. Can only be used by the advertiser. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advert_update",
            "id"
        ],
        properties: {
            p2p_advert_update: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            id: {
                description: "The unique identifier for this advert.",
                type: "string"
            },
            delete: {
                description: "[Optional] If set to 1, permanently deletes the advert.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            is_active: {
                description: "[Optional] Activate or deactivate the advert.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            payment_method: {
                description: "[Optional] Supported payment methods. Separate multiple values with a comma, maximum 3.",
                type: "string",
                pattern: "^([a-z0-9_]+)(,[a-z0-9_]+)?(,[a-z0-9_]+)?$"
            },
            payment_method_ids: {
                description: "[Optional] IDs of payment methods, only applicable for sell ads. Will replace exisiting methods.",
                type: "array",
                items: {
                    type: "integer"
                },
                maxItems: 3
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Create (request)",
        description: "Registers the client as a P2P advertiser. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advertiser_create",
            "name"
        ],
        properties: {
            p2p_advertiser_create: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            name: {
                description: "The advertiser's displayed name.",
                type: "string",
                pattern: "^(?!(.*(.)\\2{4,})|.*[\\.@_-]{2,}|^([\\.@_-])|.*([\\.@_-])$)[a-zA-Z0-9-_@\\.]{2,24}$"
            },
            contact_info: {
                description: "[Optional] Advertiser's contact information, to be used as a default for new sell adverts.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            default_advert_description: {
                description: "[Optional] Default description that can be used every time an advert is created.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            payment_info: {
                description: "[Optional] Advertiser's payment information, to be used as a default for new sell adverts.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever there is an update to advertiser",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Information (request)",
        description: "Retrieve information about a P2P advertiser. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advertiser_info"
        ],
        properties: {
            p2p_advertiser_info: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            id: {
                description: "[Optional] The unique identifier for this advertiser. If not provided, returns advertiser information about the current account.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever there is an update to advertiser",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Relations (request)",
        description: "Updates and returns favourite and blocked advertisers of the current user.",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advertiser_relations"
        ],
        properties: {
            p2p_advertiser_relations: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            add_blocked: {
                description: "IDs of advertisers to block.",
                type: "array",
                items: {
                    description: "Advertiser unique identifier.",
                    type: "number"
                },
                maxItems: 100
            },
            add_favourites: {
                description: "IDs of advertisers to add as favourites.",
                type: "array",
                items: {
                    description: "Advertiser unique identifier.",
                    type: "number"
                },
                maxItems: 100
            },
            remove_blocked: {
                description: "IDs of advertisers to remove from blocked.",
                type: "array",
                items: {
                    description: "Advertiser unique identifier.",
                    type: "number"
                },
                maxItems: 100
            },
            remove_favourites: {
                description: "IDs of advertisers to remove from favourites.",
                type: "array",
                items: {
                    description: "Advertiser unique identifier.",
                    type: "number"
                },
                maxItems: 100
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Update (request)",
        description: "Update the information of the P2P advertiser for the current account. Can only be used by an approved P2P advertiser. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_advertiser_update"
        ],
        properties: {
            p2p_advertiser_update: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            contact_info: {
                description: "[Optional] Advertiser's contact information, to be used as a default for new sell adverts.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{0,300}$"
            },
            default_advert_description: {
                description: "[Optional] Default description that can be used every time an advert is created.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{0,300}$"
            },
            is_listed: {
                description: "[Optional] Used to set if the advertiser's adverts could be listed. When `0`, adverts won't be listed regardless of they are active or not. This doesn't change the `is_active` of each individual advert.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            payment_info: {
                description: "[Optional] Advertiser's payment information, to be used as a default for new sell adverts.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{0,300}$"
            },
            show_name: {
                description: "[Optional] When `1`, the advertiser's real name will be displayed on to other users on adverts and orders.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Chat Create (request)",
        description: "Creates a P2P chat for the specified order. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_chat_create",
            "order_id"
        ],
        properties: {
            p2p_chat_create: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            order_id: {
                description: "The unique identifier for the order to create the chat for.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Cancel (request)",
        description: "Cancel a P2P order. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_order_cancel",
            "id"
        ],
        properties: {
            p2p_order_cancel: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            id: {
                description: "The unique identifier for this order.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Confirm (request)",
        description: "Confirm a P2P order. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_order_confirm",
            "id"
        ],
        properties: {
            p2p_order_confirm: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            id: {
                description: "The unique identifier for this order.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Create (request)",
        description: "Creates a P2P order for the specified advert. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_order_create",
            "advert_id",
            "amount"
        ],
        properties: {
            p2p_order_create: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            advert_id: {
                description: "The unique identifier for the advert to create an order against.",
                type: "string",
                pattern: "^([0-9]+)$"
            },
            amount: {
                description: "The amount of currency to be bought or sold.",
                type: "number"
            },
            contact_info: {
                description: "[Optional] Seller contact information. Only applicable for 'sell orders'.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            payment_info: {
                description: "[Optional] Payment instructions, only applicable for sell orders.",
                type: "string",
                pattern: "^[\\p{L}\\p{Nd}\\s'.,:;()@#/+-]{1,300}$"
            },
            payment_method_ids: {
                description: "IDs of payment methods, only applicable for sell orders.",
                type: "array",
                items: {
                    type: "integer"
                },
                maxItems: 3
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever there is an update to the order.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Information (request)",
        description: "Retrieves the information about a P2P order. **This API call is still in Beta.**",
        beta: 1,
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "p2p_order_info",
            "id"
        ],
        properties: {
            p2p_order_info: {
                description: "Must be 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            id: {
                description: "The unique identifier for the order.",
                type: "string",
                pattern: "^[0-9]+$"
            },
            subscribe: {
                description: "[Optional] If set to 1, will send updates whenever there is an update to order",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Platform: Password Reset (request)",
        description: "Reset the password of a Trading Platform Account",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        additionalProperties: false,
        required: [
            "trading_platform_password_reset",
            "new_password",
            "platform",
            "verification_code"
        ],
        properties: {
            trading_platform_password_reset: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            new_password: {
                description: "New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).",
                type: "string",
                pattern: "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{8,25}$",
                sensitive: 1
            },
            platform: {
                description: "Name of trading platform.",
                type: "string",
                enum: [
                    "dxtrade",
                    "mt5"
                ]
            },
            verification_code: {
                description: "Email verification code (received from a `verify_email` call, which must be done first)",
                type: "string",
                pattern: "^\\w{8,128}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Times (request)",
        description: "Receive a list of market opening times for a given date.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "trading_times"
        ],
        properties: {
            trading_times: {
                description: "Date to receive market opening times for. (`yyyy-mm-dd` format. `today` can also be specified).",
                type: "string",
                pattern: "^([0-9]{4}-[0-9]{1,2}-[0-9]{1,2}|today)$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Transactions Stream (request)",
        description: "Subscribe to transaction notifications",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read",
            "trading_information"
        ],
        additionalProperties: false,
        required: [
            "transaction",
            "subscribe"
        ],
        properties: {
            transaction: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            subscribe: {
                description: "If set to 1, will send updates whenever there is an update to transactions. If not to 1 then it will not return any records.",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Transfer Between Accounts (request)",
        description: "This call allows transfers between accounts held by a given user. Transfer funds between your fiat and cryptocurrency accounts (for a fee). Please note that account_from should be same as current authorized account.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "payments"
        ],
        additionalProperties: false,
        required: [
            "transfer_between_accounts"
        ],
        properties: {
            transfer_between_accounts: {
                description: "If `account_from` or `account_to` is not provided, it just returns the available accounts.",
                type: "integer",
                enum: [
                    1
                ]
            },
            account_from: {
                description: "[Optional] The loginid of the account to transfer funds from.",
                type: "string",
                pattern: "\\w+"
            },
            account_to: {
                description: "[Optional] The loginid of the account to transfer funds to.",
                type: "string",
                pattern: "\\w+"
            },
            accounts: {
                description: "[Optional] To control the list of accounts returned when `account_from` or `account_to` is not provided. `brief` (default value) means that accounts with `mt5` account_type will be excluded; it will run faster. `all` means that all accounts with any account_type (including `mt5`) will be returned.",
                type: "string",
                default: "brief",
                enum: [
                    "all",
                    "brief"
                ]
            },
            amount: {
                description: "[Optional] The amount to transfer.",
                type: "number",
                minimum: 0
            },
            currency: {
                description: "[Optional] Currency code.",
                type: "string",
                pattern: "^[a-zA-Z0-9]{2,20}$"
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Update Contract (request)",
        description: "Update a contract condition.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "contract_update",
            "contract_id",
            "limit_order"
        ],
        properties: {
            contract_update: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            contract_id: {
                description: "Internal unique contract identifier.",
                type: "integer"
            },
            limit_order: {
                description: "Specify limit order to update.",
                type: "object",
                additionalProperties: false,
                properties: {
                    stop_loss: {
                        description: "New stop loss value for a contract. To cancel, pass `null`.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    take_profit: {
                        description: "New take profit value for a contract. To cancel, pass `null`.",
                        type: [
                            "null",
                            "number"
                        ]
                    }
                }
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Update Contract History (request)",
        description: "Request for contract update history.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "read"
        ],
        additionalProperties: false,
        required: [
            "contract_update_history",
            "contract_id"
        ],
        properties: {
            contract_update_history: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            contract_id: {
                description: "Internal unique contract identifier.",
                type: "integer"
            },
            limit: {
                description: "[Optional] Maximum number of historical updates to receive.",
                type: "number",
                default: 500,
                maximum: 999,
                minimum: 1
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Verify Email (request)",
        description: "Verify an email address for various purposes. The system will send an email to the address containing a security code for verification.",
        type: "object",
        auth_required: 0,
        additionalProperties: false,
        required: [
            "verify_email",
            "type"
        ],
        properties: {
            verify_email: {
                description: "Email address to be verified.",
                type: "string",
                pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$"
            },
            type: {
                description: "Purpose of the email verification call.",
                type: "string",
                enum: [
                    "account_opening",
                    "reset_password",
                    "paymentagent_withdraw",
                    "payment_withdraw",
                    "trading_platform_password_reset",
                    "trading_platform_dxtrade_password_reset",
                    "trading_platform_mt5_password_reset",
                    "trading_platform_investor_password_reset"
                ]
            },
            url_parameters: {
                description: "[Optional] Extra parameters that can be attached to the verify email link URL.",
                type: "object",
                additionalProperties: false,
                properties: {
                    affiliate_token: {
                        description: "[Optional] Affiliate token, within 32 characters.",
                        type: "string",
                        pattern: "^[\\w-]{0,32}$"
                    },
                    date_first_contact: {
                        description: "[Optional] Date of first contact, format: yyyy-mm-dd in GMT timezone.",
                        type: "string",
                        pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
                    },
                    gclid_url: {
                        description: "[Optional] Google Click Identifier to track source.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                    },
                    pa_amount: {
                        description: "[Optional] The amount to withdraw to the payment agent. Only allowed for payment agent withdraw.",
                        type: "number"
                    },
                    pa_currency: {
                        description: "[Optional] The currency code. Only allowed for payment agent withdraw.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$"
                    },
                    pa_loginid: {
                        description: "[Optional] The payment agent loginid received from the `paymentagent_list` call. Only allowed for payment agent withdraw.",
                        type: "string",
                        pattern: "^[A-Za-z]+[0-9]+$"
                    },
                    pa_remarks: {
                        description: "[Optional] Remarks about the withdraw. Only letters, numbers, space, period, comma, - ' are allowed. Only allowed for payment agent withdraw.",
                        type: "string",
                        pattern: "^[0-9A-Za-z .,'-]{0,100}$"
                    },
                    redirect_to: {
                        description: "[Optional] The page ID to redirect to",
                        type: "integer"
                    },
                    signup_device: {
                        description: "[Optional] Show whether user has used mobile or desktop.",
                        type: "string",
                        enum: [
                            "desktop",
                            "mobile"
                        ]
                    },
                    utm_ad_id: {
                        description: "[Optional] Identifier of particular ad. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_adgroup_id: {
                        description: "[Optional] Identifier of ad group in the campaign. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_adrollclk_id: {
                        description: "[Optional] Unique identifier of click on AdRoll ads platform. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_campaign: {
                        description: "[Optional] Identifies a specific product promotion or strategic campaign such as a spring sale or other promotions. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_campaign_id: {
                        description: "[Optional] Identifier of paid ad campaign. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_content: {
                        description: "[Optional] Used to differentiate similar content, or links within the same ad. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_fbcl_id: {
                        description: "[Optional] Unique identifier of click on Facebook ads platform. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_gl_client_id: {
                        description: "[Optional] Unique visitor identifier on Google Ads platform. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_medium: {
                        description: "[Optional] Identifies the medium the link was used upon such as: email, CPC, or other methods of sharing. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_msclk_id: {
                        description: "[Optional] Unique click identifier on Microsoft Bing ads platform. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_source: {
                        description: "[Optional] Identifies the source of traffic such as: search engine, newsletter, or other referral. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    },
                    utm_term: {
                        description: "[Optional] Used to send information related to the campaign term like paid search keywords. Value must match Regex pattern to be recorded",
                        anyOf: [
                            {
                                type: "string",
                                pattern: "^[a-zA-Z0-9\\s\\-\\.\\_]{0,100}$"
                            },
                            {
                                type: "string"
                            }
                        ]
                    }
                }
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    },
    {
        title: "Top Up Virtual-Money Account (request)",
        description: "When a virtual-money's account balance becomes low, it can be topped up using this call.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "trade"
        ],
        additionalProperties: false,
        required: [
            "topup_virtual"
        ],
        properties: {
            topup_virtual: {
                description: "Must be `1`",
                type: "integer",
                enum: [
                    1
                ]
            },
            passthrough: {
                description: "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "[Optional] Used to map request to response.",
                type: "integer"
            }
        }
    }
]

