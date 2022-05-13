export const receive = [
    {
        title: "API Token (response)",
        description: "The result of the API token request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            api_token: {
                title: "api_token",
                description: "Contains the result of API token according to the type of request.",
                type: "object",
                additionalProperties: false,
                properties: {
                    delete_token: {
                        description: "Token deleted.",
                        type: "integer",
                        enum: [
                            1
                        ]
                    },
                    new_token: {
                        description: "Token created.",
                        type: "integer",
                        enum: [
                            1
                        ]
                    },
                    tokens: {
                        description: "API tokens",
                        type: "array",
                        items: {
                            description: "The information for each token.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                display_name: {
                                    description: "The token name specified when creating.",
                                    type: "string"
                                },
                                last_used: {
                                    description: "The last date which the token has been used.",
                                    type: "string"
                                },
                                scopes: {
                                    description: "List of permission scopes of the token.",
                                    type: "array",
                                    items: {
                                        description: "The permission scope.",
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
                                token: {
                                    description: "The token that can be used to `authorize` with.",
                                    type: "string"
                                },
                                valid_for_ip: {
                                    description: "The IP restriction for the token. No restriction if empty.",
                                    type: "string"
                                }
                            }
                        },
                        sensitive: 1
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "api_token"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Account Limits (response)",
        description: "Trading and Withdrawal Limits",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            get_limits: {
                title: "get_limits",
                description: "Trading limits of real account user",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_balance: {
                        description: "Maximum account cash balance",
                        type: "number"
                    },
                    daily_transfers: {
                        description: "Daily transfers",
                        type: "object"
                    },
                    daily_turnover: {
                        description: "Maximum daily turnover",
                        type: "number"
                    },
                    lifetime_limit: {
                        description: "Lifetime withdrawal limit",
                        type: "number"
                    },
                    market_specific: {
                        description: "Contains limitation information for each market.",
                        type: "object",
                        patternProperties: {
                            "^(commodities|forex|indices|synthetic_index)$": {
                                description: "List of limitation profiles for each market",
                                type: "array",
                                items: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        name: {
                                            description: "The submarket display name.",
                                            type: "string"
                                        },
                                        payout_limit: {
                                            description: "The limit of payout for the submarket",
                                            type: "number"
                                        },
                                        profile_name: {
                                            description: "The limitation profile name.",
                                            type: "string"
                                        },
                                        turnover_limit: {
                                            description: "The limit of turnover for the submarket",
                                            type: "number"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    num_of_days: {
                        description: "Number of days for num_of_days_limit withdrawal limit",
                        type: "integer"
                    },
                    num_of_days_limit: {
                        description: "Withdrawal limit for num_of_days days",
                        type: "number"
                    },
                    open_positions: {
                        description: "Maximum number of open positions",
                        type: "integer"
                    },
                    payout: {
                        description: "Maximum aggregate payouts on open positions",
                        type: "number"
                    },
                    payout_per_symbol: {
                        description: "Maximum payout for each symbol based on different barrier types.",
                        type: [
                            "null",
                            "object"
                        ],
                        additionalProperties: false,
                        properties: {
                            atm: {
                                description: "Maximum aggregate payouts on open positions per symbol for contracts where barrier is same as entry spot.",
                                type: [
                                    "null",
                                    "number"
                                ]
                            },
                            non_atm: {
                                description: "Maximum aggregate payouts on open positions per symbol for contract where barrier is different from entry spot.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    less_than_seven_days: {
                                        description: "Maximum aggregate payouts on open positions per symbol for contract where barrier is different from entry spot and duration is less than and equal to seven days",
                                        type: "number"
                                    },
                                    more_than_seven_days: {
                                        description: "Maximum aggregate payouts on open positions per symbol for contract where barrier is different from entry spot and duration is more to seven days",
                                        type: "number"
                                    }
                                }
                            }
                        }
                    },
                    payout_per_symbol_and_contract_type: {
                        description: "Maximum aggregate payouts on open positions per symbol and contract type. This limit can be exceeded up to the overall payout limit if there is no prior open position.",
                        type: "number"
                    },
                    remainder: {
                        description: "Amount left to reach withdrawal limit",
                        type: "number"
                    },
                    withdrawal_for_x_days_monetary: {
                        description: "Total withdrawal for num_of_days days",
                        type: "number"
                    },
                    withdrawal_since_inception_monetary: {
                        description: "Total withdrawal since inception",
                        type: "number"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "get_limits"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Account Status (response)",
        description: "A message with Account Status",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            get_account_status: {
                title: "get_account_status",
                description: "Account status details",
                type: "object",
                additionalProperties: false,
                required: [
                    "currency_config",
                    "prompt_client_to_authenticate",
                    "risk_classification",
                    "status"
                ],
                properties: {
                    authentication: {
                        description: "This represents the authentication status of the user and it includes what authentication is needed.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "needs_verification"
                        ],
                        properties: {
                            attempts: {
                                description: "POI attempts made by the client",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    count: {
                                        description: "A number of POI attempts made by the client",
                                        type: "integer"
                                    },
                                    history: {
                                        description: "A list of POI attempts made by the client in chronological descending order",
                                        type: "array",
                                        items: {
                                            type: "object",
                                            additionalProperties: false,
                                            properties: {
                                                country_code: {
                                                    description: "2-letter country code used to request the attempt.",
                                                    type: "string"
                                                },
                                                id: {
                                                    description: "The id of the attempt.",
                                                    type: "string"
                                                },
                                                service: {
                                                    description: "The service used to make the verification.",
                                                    type: "string"
                                                },
                                                status: {
                                                    description: "Status of the attempt.",
                                                    type: "string",
                                                    enum: [
                                                        "verified",
                                                        "rejected",
                                                        "pending"
                                                    ]
                                                },
                                                timestamp: {
                                                    description: "The epoch of the attempt.",
                                                    type: "integer"
                                                }
                                            }
                                        }
                                    },
                                    latest: {
                                        description: "The latest POI attempt made by the client",
                                        type: [
                                            "null",
                                            "object"
                                        ]
                                    }
                                }
                            },
                            document: {
                                description: "The authentication status for document.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    expiry_date: {
                                        description: "This is the epoch of the document expiry date.",
                                        type: "integer"
                                    },
                                    status: {
                                        description: "This represents the current status of the proof of address document submitted for authentication.",
                                        type: "string",
                                        enum: [
                                            "none",
                                            "pending",
                                            "rejected",
                                            "verified",
                                            "expired",
                                            "suspected"
                                        ]
                                    }
                                }
                            },
                            identity: {
                                description: "The authentication status for identity.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    expiry_date: {
                                        description: "This is the epoch of the document expiry date.",
                                        type: "integer"
                                    },
                                    services: {
                                        description: "This shows the information about the authentication services implemented",
                                        type: "object",
                                        additionalProperties: false,
                                        properties: {
                                            idv: {
                                                description: "This shows the information related to IDV supported services",
                                                type: "object",
                                                additionalProperties: false,
                                                properties: {
                                                    expiry_date: {
                                                        description: "This is the epoch of the document expiry date.",
                                                        type: "integer"
                                                    },
                                                    last_rejected: {
                                                        description: "Show the last IDV reported reasons for the rejected cases",
                                                        type: "array",
                                                        items: {
                                                            type: "string"
                                                        }
                                                    },
                                                    reported_properties: {
                                                        description: "Shows the latest document properties detected and reported by IDVS",
                                                        type: "object"
                                                    },
                                                    status: {
                                                        description: "This represents the status of the latest IDV check.",
                                                        type: "string",
                                                        enum: [
                                                            "none",
                                                            "pending",
                                                            "rejected",
                                                            "verified",
                                                            "expired"
                                                        ]
                                                    },
                                                    submissions_left: {
                                                        description: "This shows the number of IDV submissions left for the client",
                                                        type: "integer"
                                                    }
                                                }
                                            },
                                            manual: {
                                                description: "This shows the information related to the manual POI checks",
                                                type: "object",
                                                additionalProperties: false,
                                                properties: {
                                                    status: {
                                                        description: "This represents the status of the current manual POI check.",
                                                        type: "string",
                                                        enum: [
                                                            "none",
                                                            "pending",
                                                            "rejected",
                                                            "verified",
                                                            "expired",
                                                            "suspected"
                                                        ]
                                                    }
                                                }
                                            },
                                            onfido: {
                                                description: "This shows the information related to Onfido supported services",
                                                type: "object",
                                                additionalProperties: false,
                                                properties: {
                                                    country_code: {
                                                        description: "3 letter country code for Onfide SDK",
                                                        type: "string",
                                                        pattern: "^[A-Z]{3}$"
                                                    },
                                                    documents: {
                                                        description: "This shows the list of documents types supported by Onfido",
                                                        type: "array",
                                                        items: {
                                                            type: "string",
                                                            examples: [
                                                                "Driving Licence",
                                                                "National Identity Card",
                                                                "Passport"
                                                            ]
                                                        }
                                                    },
                                                    documents_supported: {
                                                        description: "This shows the list of documents types supported.",
                                                        type: "array",
                                                        items: {
                                                            type: "string"
                                                        }
                                                    },
                                                    is_country_supported: {
                                                        description: "This shows the information if the country is supported by Onfido",
                                                        type: "integer",
                                                        enum: [
                                                            1,
                                                            0
                                                        ]
                                                    },
                                                    last_rejected: {
                                                        description: "Show the last Onfido reported reasons for the rejected cases",
                                                        type: "array",
                                                        items: {
                                                            type: "string"
                                                        }
                                                    },
                                                    reported_properties: {
                                                        description: "Shows the latest document properties detected and reported by Onfido",
                                                        type: "object"
                                                    },
                                                    status: {
                                                        description: "This represents the status of the latest Onfido check.",
                                                        type: "string",
                                                        enum: [
                                                            "none",
                                                            "pending",
                                                            "rejected",
                                                            "verified",
                                                            "expired",
                                                            "suspected"
                                                        ]
                                                    },
                                                    submissions_left: {
                                                        description: "This shows the number of Onfido submissions left for the client",
                                                        type: "integer"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    status: {
                                        description: "This represent the current status for proof of identity document submitted for authentication.",
                                        type: "string",
                                        enum: [
                                            "none",
                                            "pending",
                                            "rejected",
                                            "verified",
                                            "expired",
                                            "suspected"
                                        ]
                                    }
                                }
                            },
                            needs_verification: {
                                description: "An array containing the list of required authentication.",
                                type: "array",
                                items: {
                                    description: "This represents the current type of authentication required, possible values are identity and document.",
                                    type: "string"
                                }
                            }
                        }
                    },
                    cashier_missing_fields: {
                        description: "Contains missing profile fields required for cashier access.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    cashier_validation: {
                        description: "If the cashier is unavailble, this array contains one or more error codes for each reason.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    currency_config: {
                        description: "Provides cashier details for client currency.",
                        type: "object",
                        minProperties: 0,
                        patternProperties: {
                            "^[a-zA-Z0-9]{2,20}$": {
                                description: "Client currency",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    is_deposit_suspended: {
                                        description: "Deposit is allowed for currency or not",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    is_withdrawal_suspended: {
                                        description: "Withdrawal is allowed for currency or not",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    prompt_client_to_authenticate: {
                        description: "Indicates whether the client should be prompted to authenticate their account.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    risk_classification: {
                        description: "Client risk classification: `low`, `standard`, `high`.",
                        type: "string"
                    },
                    social_identity_provider: {
                        description: "Social identity provider a user signed up with.",
                        type: "string",
                        enum: [
                            "google",
                            "facebook",
                            "apple"
                        ]
                    },
                    status: {
                        description: "Account status. Possible status: \n- `address_verified`: client's address is verified by third party services. \n- `allow_document_upload`: client is allowed to upload documents. \n- `age_verification`: client is age-verified. \n- `authenticated`: client is fully authenticated. \n- `cashier_locked`: cashier is locked. \n- `closed`: client has closed the account. \n- `crs_tin_information`: client has updated tax related information. \n- `deposit_locked`: deposit is not allowed. \n- `disabled`: account is disabled. \n- `document_expired`: client's submitted proof-of-identity documents have expired. \n- `document_expiring_soon`: client's submitted proof-of-identity documents are expiring within a month. \n- `duplicate_account`: this client's account has been marked as duplicate. \n- `dxtrade_password_not_set`: Deriv X password is not set. \n- `financial_assessment_not_complete`: client should complete their financial assessment. \n- `financial_information_not_complete`: client has not completed financial assessment. \n- `financial_risk_approval`: client has accepted financial risk disclosure. \n- `max_turnover_limit_not_set`: client has not set financial limits on their account. Applies to UK and Malta clients. \n- `mt5_password_not_set`: MT5 password is not set. \n- `mt5_withdrawal_locked`: MT5 deposits allowed, but withdrawal is not allowed. \n- `needs_affiliate_coc_approval`: user must approve the Affiliate's Code of Conduct Agreement. \n- `no_trading`: trading is disabled. \n- `no_withdrawal_or_trading`: client cannot trade or withdraw but can deposit. \n- `pa_withdrawal_explicitly_allowed`: withdrawal through payment agent is allowed. \n- `password_reset_required`: this client must reset their password.  \n- `professional`: this client has opted for a professional account. \n- `professional_requested`: this client has requested for a professional account. \n- `professional_rejected`: this client's request for a professional account has been rejected. \n- `proveid_pending`: this client's identity is being validated. Applies for MX account with GB residence only. \n- `proveid_requested`: this client has made a request to have their identity be validated. \n- `social_signup`: this client is using social signup. \n- `trading_experience_not_complete`: client has not completed the trading experience questionnaire. \n- `ukgc_funds_protection`: client has acknowledged UKGC funds protection notice. \n- `unwelcome`: client cannot deposit or buy contracts, but can withdraw or sell contracts. \n- `withdrawal_locked`: deposits allowed but withdrawals are not allowed.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "get_account_status"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Active Symbols (response)",
        description: "A message containing the list of active symbols.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            active_symbols: {
                title: "active_symbols",
                description: "List of active symbols.",
                type: "array",
                items: {
                    description: "The information about each symbol.",
                    type: "object",
                    additionalProperties: false,
                    required: [
                        "display_name",
                        "exchange_is_open",
                        "is_trading_suspended",
                        "market",
                        "market_display_name",
                        "pip",
                        "submarket",
                        "submarket_display_name",
                        "symbol",
                        "symbol_type"
                    ],
                    properties: {
                        allow_forward_starting: {
                            description: "`1` if the symbol is tradable in a forward starting contract, `0` if not.",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        delay_amount: {
                            description: "Amount the data feed is delayed (in minutes) due to Exchange licensing requirements. Only returned on `full` active symbols call.",
                            type: "integer"
                        },
                        display_name: {
                            description: "Display name.",
                            type: "string"
                        },
                        exchange_is_open: {
                            description: "`1` if market is currently open, `0` if closed.",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        exchange_name: {
                            description: "Exchange name (for underlyings listed on a Stock Exchange). Only returned on `full` active symbols call.",
                            type: "string"
                        },
                        intraday_interval_minutes: {
                            description: "Intraday interval minutes. Only returned on `full` active symbols call.",
                            type: "integer"
                        },
                        is_trading_suspended: {
                            description: "`1` indicates that trading is currently suspended, `0` if not.",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        market: {
                            description: "Market category (forex, indices, etc).",
                            type: "string"
                        },
                        market_display_name: {
                            description: "Translated market name.",
                            type: "string"
                        },
                        pip: {
                            description: "Pip size (i.e. minimum fluctuation amount).",
                            type: "number"
                        },
                        quoted_currency_symbol: {
                            description: "For stock indices, the underlying currency for that instrument. Only returned on `full` active symbols call.",
                            type: "string"
                        },
                        spot: {
                            description: "Latest spot price of the underlying. Only returned on `full` active symbols call.",
                            type: [
                                "null",
                                "number"
                            ]
                        },
                        spot_age: {
                            description: "Number of seconds elapsed since the last spot price. Only returned on `full` active symbols call.",
                            type: "string"
                        },
                        spot_time: {
                            description: "Latest spot epoch time. Only returned on `full` active symbols call.",
                            type: "string"
                        },
                        submarket: {
                            description: "Submarket name.",
                            type: "string"
                        },
                        submarket_display_name: {
                            description: "Translated submarket name.",
                            type: "string"
                        },
                        symbol: {
                            description: "The symbol code for this underlying.",
                            type: "string"
                        },
                        symbol_type: {
                            description: "Symbol type (forex, commodities, etc).",
                            type: "string"
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "active_symbols"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Delete (response)",
        description: "The result of delete application request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            app_delete: {
                title: "app_delete",
                description: "1 on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "app_delete"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Get Details (response)",
        description: "A message with requested application details",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            app_get: {
                title: "app_get",
                description: "The information of the requested application.",
                type: "object",
                additionalProperties: false,
                required: [
                    "app_id",
                    "app_markup_percentage",
                    "appstore",
                    "github",
                    "googleplay",
                    "homepage",
                    "name",
                    "redirect_uri",
                    "verification_uri"
                ],
                properties: {
                    active: {
                        description: "Active.",
                        type: "integer"
                    },
                    app_id: {
                        description: "Application ID.",
                        type: "integer"
                    },
                    app_markup_percentage: {
                        description: "Markup added to contract prices (as a percentage of contract payout).",
                        type: "number"
                    },
                    appstore: {
                        description: "Application's App Store URL.",
                        type: "string"
                    },
                    github: {
                        description: "Application's GitHub page (for open-source projects).",
                        type: "string"
                    },
                    googleplay: {
                        description: "Application's Google Play URL.",
                        type: "string"
                    },
                    homepage: {
                        description: "Application's homepage URL.",
                        type: "string"
                    },
                    name: {
                        description: "Application name.",
                        type: "string"
                    },
                    redirect_uri: {
                        description: "The URL to redirect to after a successful login.",
                        type: "string"
                    },
                    scopes: {
                        description: "Scope Details.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    verification_uri: {
                        description: "Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "app_get"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: List (response)",
        description: "A message with created applications",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            app_list: {
                title: "app_list",
                description: "List of created applications for the authorized account.",
                type: "array",
                items: {
                    title: "Application object",
                    type: "object",
                    additionalProperties: false,
                    required: [
                        "app_id",
                        "app_markup_percentage",
                        "appstore",
                        "github",
                        "googleplay",
                        "homepage",
                        "name",
                        "redirect_uri",
                        "verification_uri"
                    ],
                    properties: {
                        active: {
                            description: "Active.",
                            type: "integer"
                        },
                        app_id: {
                            description: "Application ID.",
                            type: "integer"
                        },
                        app_markup_percentage: {
                            description: "Markup added to contract prices (as a percentage of contract payout).",
                            type: "number"
                        },
                        appstore: {
                            description: "Application's App Store URL.",
                            type: [
                                "null",
                                "string"
                            ]
                        },
                        github: {
                            description: "Application's GitHub page. (for open-source projects)",
                            type: [
                                "null",
                                "string"
                            ]
                        },
                        googleplay: {
                            description: "Application's Google Play URL.",
                            type: [
                                "null",
                                "string"
                            ]
                        },
                        homepage: {
                            description: "Application's homepage URL.",
                            type: [
                                "null",
                                "string"
                            ]
                        },
                        name: {
                            description: "Application name.",
                            type: "string"
                        },
                        redirect_uri: {
                            description: "The URL to redirect to after a successful login.",
                            type: "string"
                        },
                        scopes: {
                            description: "Scope Details.",
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        verification_uri: {
                            description: "Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.",
                            type: [
                                "null",
                                "string"
                            ]
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "app_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Markup Details (response)",
        description: "Per transaction reporting of app_markup",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            app_markup_details: {
                title: "app_markup_details",
                description: "App Markup transaction details",
                type: "object",
                additionalProperties: false,
                properties: {
                    transactions: {
                        description: "Array of returned transactions",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                app_id: {
                                    description: "ID of the application where this contract was purchased.",
                                    type: "integer"
                                },
                                app_markup: {
                                    description: "The markup the client paid in their currency",
                                    type: "number"
                                },
                                app_markup_usd: {
                                    description: "The markup the client paid in USD",
                                    type: "number"
                                },
                                app_markup_value: {
                                    description: "The markup the client paid in the app developer's currency",
                                    type: "number"
                                },
                                client_currcode: {
                                    description: "Currency code of the client",
                                    type: "string"
                                },
                                client_loginid: {
                                    description: "Login ID of the client",
                                    type: "string"
                                },
                                dev_currcode: {
                                    description: "Currency code of the app developer",
                                    type: "string"
                                },
                                dev_loginid: {
                                    description: "Login ID of the app developer",
                                    type: "string"
                                },
                                transaction_id: {
                                    description: "The transaction ID. Every contract (buy or sell) and every payment has a unique ID.",
                                    type: "integer",
                                    examples: [
                                        10867502908
                                    ]
                                },
                                transaction_time: {
                                    description: "The epoch value of purchase time of transaction",
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "app_markup_details"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Register (response)",
        description: "A message with created application details",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            app_register: {
                title: "app_register",
                description: "The information of the created application.",
                type: "object",
                additionalProperties: false,
                required: [
                    "app_id",
                    "app_markup_percentage",
                    "appstore",
                    "github",
                    "googleplay",
                    "homepage",
                    "name",
                    "redirect_uri",
                    "verification_uri"
                ],
                properties: {
                    active: {
                        description: "Active.",
                        type: "integer"
                    },
                    app_id: {
                        description: "Application ID.",
                        type: "integer"
                    },
                    app_markup_percentage: {
                        description: "Markup added to contract prices (as a percentage of contract payout).",
                        type: "number"
                    },
                    appstore: {
                        description: "Application's App Store URL.",
                        type: "string"
                    },
                    github: {
                        description: "Application's GitHub page (for open-source projects).",
                        type: "string"
                    },
                    googleplay: {
                        description: "Application's Google Play URL.",
                        type: "string"
                    },
                    homepage: {
                        description: "Application's homepage URL.",
                        type: "string"
                    },
                    name: {
                        description: "Application name.",
                        type: "string"
                    },
                    redirect_uri: {
                        description: "The URL to redirect to after a successful login.",
                        type: "string"
                    },
                    scopes: {
                        description: "Scope Details.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    verification_uri: {
                        description: "Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "app_register"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Application: Update (response)",
        description: "A message with created application",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            app_update: {
                title: "app_update",
                description: "Information of the updated application.",
                type: "object",
                additionalProperties: false,
                properties: {
                    active: {
                        description: "Active.",
                        type: "integer"
                    },
                    app_id: {
                        description: "Application ID.",
                        type: "integer"
                    },
                    app_markup_percentage: {
                        description: "Markup added to contract prices (as a percentage of contract payout).",
                        type: "number"
                    },
                    appstore: {
                        description: "Application's App Store URL.",
                        type: "string"
                    },
                    github: {
                        description: "Application's GitHub page (for open-source projects).",
                        type: "string"
                    },
                    googleplay: {
                        description: "Application's Google Play URL.",
                        type: "string"
                    },
                    homepage: {
                        description: "Application's homepage URL.",
                        type: "string"
                    },
                    name: {
                        description: "Application name.",
                        type: "string"
                    },
                    redirect_uri: {
                        description: "The URL to redirect to after a successful login.",
                        type: "string"
                    },
                    scopes: {
                        description: "Scope Details.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    verification_uri: {
                        description: "Used when `verify_email` called. If available, a URL containing the verification token will be sent to the client's email, otherwise only the token will be sent.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "app_update"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Asset Index (response)",
        description: "A message with Asset Index",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            asset_index: {
                title: "asset_index",
                description: "List of underlyings by their display name and symbol followed by their available contract types and duration boundaries.",
                type: "array"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "asset_index"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Authorize (response)",
        description: "A message containing account information for the holder of that token.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            authorize: {
                title: "authorize",
                description: "Account information for the holder of the token.",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_list: {
                        description: "List of accounts for current user.",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                account_type: {
                                    description: "Account type.",
                                    type: "string",
                                    enum: [
                                        "trading",
                                        "wallet"
                                    ]
                                },
                                currency: {
                                    description: "Currency of specified account.",
                                    type: "string"
                                },
                                excluded_until: {
                                    description: "Epoch of date till client has excluded him/herself from the website, only present if client is self excluded.",
                                    type: "integer"
                                },
                                is_disabled: {
                                    description: "Boolean value: 1 or 0, indicating whether the account is marked as disabled or not.",
                                    type: "integer",
                                    enum: [
                                        1,
                                        0
                                    ]
                                },
                                is_virtual: {
                                    description: "Boolean value: 1 or 0, indicating whether the account is a virtual-money account.",
                                    type: "integer",
                                    enum: [
                                        1,
                                        0
                                    ]
                                },
                                landing_company_name: {
                                    description: "Landing company shortcode the account belongs to.",
                                    type: "string"
                                },
                                loginid: {
                                    description: "The account ID of specified account.",
                                    type: "string"
                                },
                                trading: {
                                    description: "Details of the Trading account.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        linked_to: {
                                            description: "Details of the Wallet account linked to the Trading account.",
                                            type: "array",
                                            items: {
                                                type: "object",
                                                additionalProperties: false,
                                                properties: {
                                                    account_id: {
                                                        description: "Wallet account ID.",
                                                        type: "string"
                                                    },
                                                    balance: {
                                                        description: "Wallet account balance.",
                                                        type: "string"
                                                    },
                                                    currency: {
                                                        description: "Wallet account currency.",
                                                        type: "string"
                                                    },
                                                    payment_method: {
                                                        description: "Wallet account payment method.",
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                wallet: {
                                    description: "Details of the Wallet account.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        account_id: {
                                            description: "Wallet account ID.",
                                            type: "string"
                                        },
                                        balance: {
                                            description: "Wallet account balance.",
                                            type: "number"
                                        },
                                        currency: {
                                            description: "Wallet account currency.",
                                            type: "string"
                                        },
                                        linked_to: {
                                            description: "Details of the list of Trading accounts linked to the Wallet account.",
                                            type: "array",
                                            items: {
                                                type: "object",
                                                additionalProperties: false,
                                                properties: {
                                                    account_id: {
                                                        description: "Trading account ID.",
                                                        type: "string"
                                                    },
                                                    balance: {
                                                        description: "Trading account balance.",
                                                        type: "string"
                                                    },
                                                    currency: {
                                                        description: "Trading account currency.",
                                                        type: "string"
                                                    },
                                                    platform: {
                                                        description: "Trading account platform name.",
                                                        type: "string",
                                                        enum: [
                                                            "deriv",
                                                            "dxtrade",
                                                            "mt5"
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        payment_method: {
                                            description: "Wallet account payment method.",
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    balance: {
                        description: "Cash balance of the account.",
                        type: "number"
                    },
                    country: {
                        description: "2-letter country code (ISO standard).",
                        type: "string",
                        pattern: "^[a-z]{0,2}$"
                    },
                    currency: {
                        description: "Currency of the account.",
                        type: "string"
                    },
                    email: {
                        description: "User email.",
                        type: "string"
                    },
                    fullname: {
                        description: "User's full name. Will be empty for virtual accounts.",
                        type: "string"
                    },
                    is_virtual: {
                        description: "Boolean value: 1 or 0, indicating whether the account is a virtual-money account.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    landing_company_fullname: {
                        description: "Landing company name the account belongs to.",
                        type: "string"
                    },
                    landing_company_name: {
                        description: "Landing company shortcode the account belongs to.",
                        type: "string"
                    },
                    local_currencies: {
                        description: "Currencies in client's residence country",
                        type: "object",
                        minProperties: 0,
                        patternProperties: {
                            "^[a-zA-Z0-9]{2,20}$": {
                                description: "Currency code",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fractional_digits"
                                ],
                                properties: {
                                    fractional_digits: {
                                        description: "Number of fractional digits.",
                                        type: "integer"
                                    }
                                }
                            }
                        }
                    },
                    loginid: {
                        description: "The account ID that the token was issued for.",
                        type: "string"
                    },
                    preferred_language: {
                        description: "User's preferred language, ISO standard code of language",
                        type: [
                            "null",
                            "string"
                        ],
                        pattern: "^[A-Z]{0,2}$|^[A-Z]{2}_[A-Z]{2}$"
                    },
                    scopes: {
                        description: "Scopes available to the token.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    trading: {
                        description: "Details of the Trading account.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            linked_to: {
                                description: "Details of the Wallet account linked to the Trading account.",
                                type: "array",
                                items: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        account_id: {
                                            description: "Wallet account ID.",
                                            type: "string"
                                        },
                                        balance: {
                                            description: "Wallet account balance.",
                                            type: "string"
                                        },
                                        currency: {
                                            description: "Wallet account currency.",
                                            type: "string"
                                        },
                                        payment_method: {
                                            description: "Wallet account payment method.",
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    upgradeable_landing_companies: {
                        description: "List of landing company shortcodes the account can upgrade to.",
                        type: "array"
                    },
                    user_id: {
                        description: "The internal user ID for this account.",
                        type: "integer"
                    },
                    wallet: {
                        description: "Details of the Wallet account.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            account_id: {
                                description: "Wallet account ID.",
                                type: "string"
                            },
                            balance: {
                                description: "Wallet account balance.",
                                type: "number"
                            },
                            currency: {
                                description: "Wallet account currency.",
                                type: "string"
                            },
                            linked_to: {
                                description: "Details of the list of Trading accounts linked to the Wallet account.",
                                type: "array",
                                items: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        account_id: {
                                            description: "Trading account ID.",
                                            type: "string"
                                        },
                                        balance: {
                                            description: "Trading account balance.",
                                            type: "string"
                                        },
                                        currency: {
                                            description: "Trading account currency.",
                                            type: "string"
                                        },
                                        platform: {
                                            description: "Trading account platform name.",
                                            type: "string",
                                            enum: [
                                                "deriv",
                                                "dxtrade",
                                                "mt5"
                                            ]
                                        }
                                    }
                                }
                            },
                            payment_method: {
                                description: "Wallet account payment method.",
                                type: "string"
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "authorize"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Balance (response)",
        description: "Return details of user account balance",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            balance: {
                title: "balance",
                description: "Current balance of one or more accounts.",
                type: "object",
                additionalProperties: false,
                required: [
                    "balance",
                    "currency",
                    "loginid"
                ],
                properties: {
                    balance: {
                        description: "Balance of current account.",
                        type: "number",
                        minimum: 0
                    },
                    accounts: {
                        description: "List of active accounts.",
                        type: "object",
                        additionalProperties: false,
                        patternProperties: {
                            "^.+[0-9]{3,}$": {
                                description: "Individual accounts details.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "balance",
                                    "converted_amount",
                                    "currency",
                                    "demo_account",
                                    "status",
                                    "type"
                                ],
                                properties: {
                                    balance: {
                                        description: "Account balance",
                                        type: "number"
                                    },
                                    converted_amount: {
                                        description: "Account balance converted the total currency.",
                                        type: "number"
                                    },
                                    currency: {
                                        description: "Account currency.",
                                        type: "string",
                                        pattern: "^(|[a-zA-Z0-9]{2,20})$",
                                        examples: [
                                            "USD"
                                        ]
                                    },
                                    demo_account: {
                                        description: "If set to 1, this is a demo account.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    status: {
                                        description: "Boolean value of 1 or 0. Indicates the status of account. 1 indicates account is good and accessible.",
                                        type: "integer",
                                        enum: [
                                            1,
                                            0
                                        ]
                                    },
                                    type: {
                                        description: "Type of account.",
                                        type: "string",
                                        enum: [
                                            "mt5",
                                            "deriv"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    currency: {
                        description: "Currency of current account.",
                        type: "string",
                        pattern: "^(|[a-zA-Z0-9]{2,20})$",
                        examples: [
                            "USD"
                        ]
                    },
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    },
                    loginid: {
                        description: "Client loginid.",
                        type: "string",
                        pattern: "^[A-Z]{2,4}[0-9]{1,10}$",
                        examples: [
                            "CR000000"
                        ]
                    },
                    total: {
                        description: "Summary totals of accounts by type.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            deriv: {
                                description: "Total balance of all real money Deriv accounts.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "amount",
                                    "currency"
                                ],
                                properties: {
                                    amount: {
                                        description: "Total of balances.",
                                        type: "number",
                                        minimum: 0
                                    },
                                    currency: {
                                        description: "Currency of total.",
                                        type: "string",
                                        pattern: "^(|[a-zA-Z0-9]{2,20})$",
                                        examples: [
                                            "USD"
                                        ]
                                    }
                                }
                            },
                            deriv_demo: {
                                description: "Total balance of all demo Deriv accounts.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "amount",
                                    "currency"
                                ],
                                properties: {
                                    amount: {
                                        description: "Total of balances.",
                                        type: "number",
                                        minimum: 0
                                    },
                                    currency: {
                                        description: "Currency of total.",
                                        type: "string",
                                        pattern: "^(|[a-zA-Z0-9]{2,20})$",
                                        examples: [
                                            "USD"
                                        ]
                                    }
                                }
                            },
                            mt5: {
                                description: "Total balance of all MT5 real money accounts.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "amount",
                                    "currency"
                                ],
                                properties: {
                                    amount: {
                                        description: "Total balance of all MT5 accounts",
                                        type: "number"
                                    },
                                    currency: {
                                        description: "Currency of total.",
                                        type: "string",
                                        pattern: "^(|[a-zA-Z0-9]{2,20})$",
                                        examples: [
                                            "USD"
                                        ]
                                    }
                                }
                            },
                            mt5_demo: {
                                description: "Total balance of all MT5 demo accounts.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "amount",
                                    "currency"
                                ],
                                properties: {
                                    amount: {
                                        description: "Total of balances.",
                                        type: "number"
                                    },
                                    currency: {
                                        description: "Currency of total.",
                                        type: "string",
                                        pattern: "^(|[a-zA-Z0-9]{2,20})$",
                                        examples: [
                                            "USD"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "balance"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Buy Contract (response)",
        description: "A message with transaction results is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            buy: {
                title: "buy",
                description: "Receipt confirmation for the purchase",
                type: "object",
                additionalProperties: false,
                required: [
                    "balance_after",
                    "buy_price",
                    "contract_id",
                    "longcode",
                    "payout",
                    "purchase_time",
                    "shortcode",
                    "start_time",
                    "transaction_id"
                ],
                properties: {
                    balance_after: {
                        description: "The new account balance after completion of the purchase",
                        type: "number"
                    },
                    buy_price: {
                        description: "Actual effected purchase price",
                        type: "number"
                    },
                    contract_id: {
                        description: "Internal contract identifier",
                        type: "integer"
                    },
                    longcode: {
                        description: "The description of contract purchased",
                        type: "string"
                    },
                    payout: {
                        description: "Proposed payout value",
                        type: "number"
                    },
                    purchase_time: {
                        description: "Epoch value of the transaction purchase time",
                        type: "integer"
                    },
                    shortcode: {
                        description: "Compact description of the contract purchased",
                        type: "string"
                    },
                    start_time: {
                        description: "Epoch value showing the expected start time of the contract",
                        type: "integer"
                    },
                    transaction_id: {
                        description: "Internal transaction identifier",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "buy"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Buy Contract for Multiple Accounts (response)",
        description: "A message with transaction results is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            buy_contract_for_multiple_accounts: {
                title: "buy_contract_for_multiple_accounts",
                description: "Receipt confirmation for the purchase",
                type: "object",
                additionalProperties: false,
                required: [
                    "result"
                ],
                properties: {
                    result: {
                        description: "List of results containing transactions and/or errors for the bought contracts.",
                        type: "array",
                        items: {
                            anyOf: [
                                {
                                    description: "Receipt for one contract",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "buy_price",
                                        "contract_id",
                                        "longcode",
                                        "payout",
                                        "purchase_time",
                                        "shortcode",
                                        "start_time",
                                        "token",
                                        "transaction_id"
                                    ],
                                    properties: {
                                        buy_price: {
                                            description: "Actual effected purchase price",
                                            type: "number"
                                        },
                                        contract_id: {
                                            description: "Internal contract identifier",
                                            type: "integer"
                                        },
                                        longcode: {
                                            description: "The description of contract purchased",
                                            type: "string"
                                        },
                                        payout: {
                                            description: "Proposed payout value",
                                            type: "number"
                                        },
                                        purchase_time: {
                                            description: "Epoch value of the transaction purchase time",
                                            type: "integer"
                                        },
                                        shortcode: {
                                            description: "Compact description of the contract purchased",
                                            type: "string"
                                        },
                                        start_time: {
                                            description: "Epoch value showing the expected start time of the contract",
                                            type: "integer"
                                        },
                                        token: {
                                            description: "The token designating the account",
                                            type: "string",
                                            sensitive: 1
                                        },
                                        transaction_id: {
                                            description: "Internal transaction identifier",
                                            type: "integer"
                                        }
                                    }
                                },
                                {
                                    description: "Error message",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "code",
                                        "message_to_client",
                                        "token"
                                    ],
                                    properties: {
                                        code: {
                                            description: "An error code",
                                            type: "string"
                                        },
                                        message_to_client: {
                                            description: "An error message localized according to the websocket",
                                            type: "string"
                                        },
                                        token: {
                                            description: "The token designating the account",
                                            type: "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "buy_contract_for_multiple_accounts"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Cancel a Contract (response)",
        description: "A message with transaction results is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            cancel: {
                title: "cancel",
                description: "Receipt for the transaction",
                type: "object",
                additionalProperties: false,
                properties: {
                    balance_after: {
                        description: "New account balance after completion of the sale",
                        type: "number"
                    },
                    contract_id: {
                        description: "Internal contract identifier for the sold contract",
                        type: "integer"
                    },
                    reference_id: {
                        description: "Internal transaction identifier for the corresponding buy transaction",
                        type: "integer"
                    },
                    sold_for: {
                        description: "Actual effected sale price",
                        type: "number"
                    },
                    transaction_id: {
                        description: "Internal transaction identifier for the sale transaction",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "cancel"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Cashier Information (response)",
        description: "Cashier information for the specified type.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            cashier: {
                title: "cashier",
                description: "Possible error codes are:\n- `ASK_TNC_APPROVAL`: API call `tnc_approval`\n- `ASK_AUTHENTICATE`\n- `ASK_UK_FUNDS_PROTECTION`: API call `tnc_approval`\n- `ASK_CURRENCY`: API call `set_account_currency`\n- `ASK_EMAIL_VERIFY`: API call `verify_email`\n- `ASK_FIX_DETAILS`: API call `set_settings`",
                oneOf: [
                    {
                        description: "Response for type `url`, It will return url to cashier service.",
                        type: "string"
                    },
                    {
                        description: "Response for type `api'.",
                        type: "object",
                        required: [
                            "action"
                        ],
                        properties: {
                            action: {
                                description: "Type of operation, which is requested.",
                                type: "string",
                                enum: [
                                    "deposit",
                                    "withdraw"
                                ]
                            },
                            deposit: {
                                description: "[Optional] Result for `deposit` action.",
                                type: "object",
                                required: [
                                    "address"
                                ],
                                properties: {
                                    address: {
                                        description: "Address for crypto deposit.",
                                        type: "string"
                                    }
                                }
                            },
                            withdraw: {
                                description: "[Optional] Result for `withdraw` action.",
                                oneOf: [
                                    {
                                        title: "Withdraw operation",
                                        description: "Result for withdraw operation.",
                                        type: "object",
                                        required: [
                                            "id",
                                            "status_code",
                                            "status_message"
                                        ],
                                        properties: {
                                            id: {
                                                description: "The unique identifier for the transaction.",
                                                type: "string"
                                            },
                                            status_code: {
                                                description: "The status code of the withdrawal.",
                                                type: "string",
                                                enum: [
                                                    "LOCKED"
                                                ]
                                            },
                                            status_message: {
                                                description: "The status message of the withdrawal.",
                                                type: "string"
                                            }
                                        }
                                    },
                                    {
                                        title: "Dry-run validation",
                                        description: "Result for `dry_run` validation.",
                                        type: "object",
                                        required: [
                                            "dry_run"
                                        ],
                                        properties: {
                                            dry_run: {
                                                description: "The `dry_run` was successful.",
                                                type: "integer",
                                                enum: [
                                                    1
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "cashier"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Contracts For Symbol (response)",
        description: "Get the list of currently available contracts",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            contracts_for: {
                title: "contracts_for",
                description: "List of available contracts. Note: if the user is authenticated, then only contracts allowed under his account will be returned.",
                type: "object",
                additionalProperties: false,
                required: [
                    "available"
                ],
                properties: {
                    available: {
                        description: "Array of available contracts details",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            required: [
                                "barrier_category",
                                "barriers",
                                "contract_category",
                                "contract_category_display",
                                "contract_type",
                                "exchange_name",
                                "expiry_type",
                                "market",
                                "max_contract_duration",
                                "min_contract_duration",
                                "sentiment",
                                "start_type",
                                "submarket",
                                "underlying_symbol"
                            ],
                            properties: {
                                available_barriers: {
                                    description: "Array of available barriers for a predefined trading period",
                                    type: "array",
                                    minItems: 1
                                },
                                barrier: {
                                    description: "Barrier Details.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                barrier_category: {
                                    description: "Category of barrier.",
                                    type: "string",
                                    examples: [
                                        "american",
                                        "asian",
                                        "euro_atm",
                                        "euro_non_atm"
                                    ]
                                },
                                barriers: {
                                    description: "Number of barriers.",
                                    type: "number",
                                    examples: [
                                        0,
                                        1,
                                        2
                                    ]
                                },
                                cancellation_range: {
                                    description: "Cancellation range",
                                    type: "array"
                                },
                                contract_category: {
                                    description: "Category of contract.",
                                    type: "string",
                                    examples: [
                                        "asian",
                                        "callput"
                                    ]
                                },
                                contract_category_display: {
                                    description: "Category of the contract.",
                                    type: "string",
                                    examples: [
                                        "Asians",
                                        "Up/Down"
                                    ]
                                },
                                contract_display: {
                                    description: "Display name for the type of contract.",
                                    type: "string",
                                    examples: [
                                        "Asian Up",
                                        "Higher"
                                    ]
                                },
                                contract_type: {
                                    description: "Type of contract.",
                                    type: "string",
                                    examples: [
                                        "ASIANU",
                                        "CALL"
                                    ]
                                },
                                exchange_name: {
                                    description: "Name of exchange",
                                    type: "string",
                                    examples: [
                                        "RANDOM"
                                    ]
                                },
                                expired_barriers: {
                                    description: "Array of barriers already expired",
                                    type: "array"
                                },
                                expiry_type: {
                                    description: "Expiry Type.",
                                    type: "string",
                                    examples: [
                                        "daily",
                                        "intraday",
                                        "tick"
                                    ]
                                },
                                forward_starting_options: {
                                    description: "Array of returned forward starting options",
                                    type: "array",
                                    items: {
                                        type: "object",
                                        additionalProperties: false,
                                        properties: {
                                            blackouts: {
                                                description: "The epoch value for the blackouts of forward starting session.",
                                                type: "array"
                                            },
                                            close: {
                                                description: "The epoch value for the closing date of forward starting session.",
                                                type: "string"
                                            },
                                            date: {
                                                description: "The epoch value for the date of forward starting session.",
                                                type: "string"
                                            },
                                            open: {
                                                description: "The epoch value for the opening date of forward starting session.",
                                                type: "string"
                                            }
                                        }
                                    },
                                    minItems: 1
                                },
                                high_barrier: {
                                    description: "High barrier Details.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                last_digit_range: {
                                    description: "Last digit range",
                                    type: "array"
                                },
                                low_barrier: {
                                    description: "Low barrier Details.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                market: {
                                    description: "Type of market.",
                                    type: "string",
                                    examples: [
                                        "forex",
                                        "indices",
                                        "synthetic_index"
                                    ]
                                },
                                max_contract_duration: {
                                    description: "Maximum contract duration",
                                    type: "string",
                                    examples: [
                                        "10"
                                    ]
                                },
                                min_contract_duration: {
                                    description: "Minimum contract duration.",
                                    type: "string",
                                    examples: [
                                        "5"
                                    ]
                                },
                                multiplier_range: {
                                    description: "Multiplier range.",
                                    type: "array"
                                },
                                payout_limit: {
                                    description: "Maximum payout.",
                                    type: "number",
                                    examples: [
                                        10000
                                    ]
                                },
                                sentiment: {
                                    description: "Type of sentiment.",
                                    type: "string",
                                    examples: [
                                        "differ",
                                        "down",
                                        "match",
                                        "up"
                                    ]
                                },
                                start_type: {
                                    description: "Start Type.",
                                    type: "string",
                                    examples: [
                                        "forward",
                                        "spot"
                                    ]
                                },
                                submarket: {
                                    description: "Type of submarket.",
                                    type: "string",
                                    examples: [
                                        "major_pairs",
                                        "random_index"
                                    ]
                                },
                                trading_period: {
                                    description: "A hash of predefined trading period",
                                    type: "object"
                                },
                                underlying_symbol: {
                                    description: "Symbol code",
                                    type: "string",
                                    examples: [
                                        "R_50",
                                        "frxEURUSD"
                                    ]
                                }
                            }
                        },
                        minItems: 1
                    },
                    close: {
                        description: "Symbol's next market-close time as an epoch value",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    feed_license: {
                        description: "Indicates the feed license for symbol, for example whether its realtime or delayed",
                        type: "string"
                    },
                    hit_count: {
                        description: "Count of contracts available",
                        type: "number"
                    },
                    open: {
                        description: "Symbol's next market-open time as an epoch value",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    spot: {
                        description: "Current spot price for this underlying",
                        type: [
                            "null",
                            "number"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "contracts_for"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: List (response)",
        description: "Details of copiers and/or traders for Copy Trading",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            copytrading_list: {
                title: "copytrading_list",
                description: "The trading information of copiers or traders.",
                type: "object",
                additionalProperties: false,
                required: [
                    "copiers",
                    "traders"
                ],
                properties: {
                    copiers: {
                        description: "List of users who are currently copy trading the authenticated user",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            required: [
                                "loginid"
                            ],
                            properties: {
                                loginid: {
                                    description: "The loginid of the copier's account.",
                                    type: "string"
                                }
                            }
                        }
                    },
                    traders: {
                        description: "List of traders being followed by the authenticated user",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                assets: {
                                    description: "The list of assets to copy the trades of.",
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                },
                                loginid: {
                                    description: "The loginid of the trader's account.",
                                    type: "string"
                                },
                                max_trade_stake: {
                                    description: "Maximum trading stake set for the trader.",
                                    type: [
                                        "null",
                                        "number"
                                    ]
                                },
                                min_trade_stake: {
                                    description: "Minimum trading stake set for the trader.",
                                    type: [
                                        "null",
                                        "number"
                                    ]
                                },
                                token: {
                                    description: "The token provided for the trader.",
                                    type: "string"
                                },
                                trade_types: {
                                    description: "The type of trades set.",
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "copytrading_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: Start (response)",
        description: "A message with results is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            copy_start: {
                title: "copy_start",
                description: "Copy start confirmation. Returns 1 is success.",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "copy_start"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: Statistics (response)",
        description: "The statistics of the trader.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            copytrading_statistics: {
                title: "copytrading_statistics",
                description: "Statistics of the trader",
                type: "object",
                additionalProperties: false,
                required: [
                    "active_since",
                    "avg_duration",
                    "avg_loss",
                    "avg_profit",
                    "copiers",
                    "last_12months_profitable_trades",
                    "monthly_profitable_trades",
                    "performance_probability",
                    "total_trades",
                    "trades_breakdown",
                    "trades_profitable"
                ],
                properties: {
                    active_since: {
                        description: "This is the epoch the investor started trading.",
                        type: "integer"
                    },
                    avg_duration: {
                        description: "Average seconds of keeping positions open.",
                        type: "integer"
                    },
                    avg_loss: {
                        description: "Average loss of trades in percentage.",
                        type: "number"
                    },
                    avg_profit: {
                        description: "Average profitable trades in percentage.",
                        type: "number"
                    },
                    copiers: {
                        description: "Number of copiers for this trader.",
                        type: "number"
                    },
                    last_12months_profitable_trades: {
                        description: "Represents the net change in equity for a 12-month period.",
                        type: "number"
                    },
                    monthly_profitable_trades: {
                        description: "Represents the net change in equity per month.",
                        type: "object",
                        minProperties: 0,
                        patternProperties: {
                            "^[0-9]{4}\\-[0-9]{2}$": {
                                description: "Monthly profitable trades in percentage.",
                                type: "number"
                            }
                        }
                    },
                    performance_probability: {
                        description: "Trader performance probability.",
                        type: "number"
                    },
                    total_trades: {
                        description: "Total number of trades for all time.",
                        type: "integer"
                    },
                    trades_breakdown: {
                        description: "Represents the portfolio distribution by markets.",
                        type: "object",
                        minProperties: 0,
                        patternProperties: {
                            "^\\w+$": {
                                description: "Number of trades in percentage.",
                                type: "number"
                            }
                        }
                    },
                    trades_profitable: {
                        description: "Number of profit trades in percentage.",
                        type: "number"
                    },
                    yearly_profitable_trades: {
                        description: "Represents the net change in equity per year.",
                        type: "object",
                        minProperties: 0,
                        patternProperties: {
                            "^[0-9]{4}$": {
                                description: "Yearly profitable trades in percentage.",
                                type: "number"
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "copytrading_statistics"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Copy Trading: Stop (response)",
        description: "A message with results is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            copy_stop: {
                title: "copy_stop",
                description: "Copy stopping confirmation. Returns 1 is success.",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "copy_stop"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Countries List (response)",
        description: "A message with Residence List",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            residence_list: {
                title: "residence_list",
                description: "List of countries for account opening",
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        disabled: {
                            description: "Disabled.",
                            type: "string"
                        },
                        identity: {
                            description: "Information about identity options available",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                services: {
                                    description: "Identity services configuration",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        idv: {
                                            description: "IDV configuration",
                                            type: "object",
                                            additionalProperties: false,
                                            properties: {
                                                documents_supported: {
                                                    description: "Documents supported by the IDV service in this country",
                                                    type: "object",
                                                    patternProperties: {
                                                        "^\\w+$": {
                                                            description: "Document type",
                                                            type: "object",
                                                            additionalProperties: false,
                                                            properties: {
                                                                display_name: {
                                                                    description: "The localized display name",
                                                                    type: "string"
                                                                },
                                                                format: {
                                                                    description: "[Optional] Regex pattern to validate documents",
                                                                    type: "string"
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                has_visual_sample: {
                                                    description: "Flag which indicates whether this country has IDV visual samples",
                                                    type: "integer",
                                                    enum: [
                                                        0,
                                                        1
                                                    ]
                                                },
                                                is_country_supported: {
                                                    description: "Flag which indicates whether IDV is available in this country",
                                                    type: "integer",
                                                    enum: [
                                                        0,
                                                        1
                                                    ]
                                                }
                                            }
                                        },
                                        onfido: {
                                            description: "Onfido configuration",
                                            type: "object",
                                            additionalProperties: false,
                                            properties: {
                                                documents_supported: {
                                                    description: "Documents supported by the IDV service in this country",
                                                    type: "object",
                                                    patternProperties: {
                                                        "^\\w+$": {
                                                            description: "Document type",
                                                            type: "object",
                                                            additionalProperties: false,
                                                            properties: {
                                                                display_name: {
                                                                    description: "The localized display name",
                                                                    type: "string"
                                                                },
                                                                format: {
                                                                    description: "[Optional] Regex pattern to validate documents",
                                                                    type: "string"
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                is_country_supported: {
                                                    description: "Flag which indicates whether Onfido is available in this country",
                                                    type: "integer",
                                                    enum: [
                                                        0,
                                                        1
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        phone_idd: {
                            description: "IDD code of country",
                            type: [
                                "null",
                                "string"
                            ]
                        },
                        selected: {
                            description: "Selected.",
                            type: "string"
                        },
                        text: {
                            description: "Country full name",
                            type: "string"
                        },
                        tin_format: {
                            description: "Country tax identifier format",
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        value: {
                            description: "2-letter country code",
                            type: "string",
                            pattern: "^\\w\\w$"
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "residence_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Document Upload (response)",
        description: "Receive details of uploaded authentication documents",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            document_upload: {
                title: "document_upload",
                description: "Details of the uploaded documents.",
                type: "object",
                additionalProperties: false,
                required: [
                    "call_type",
                    "upload_id"
                ],
                properties: {
                    call_type: {
                        description: "Current call type, add this to your binary payload metadata",
                        type: "number"
                    },
                    checksum: {
                        description: "Hex encoded SHA-1 checksum of the file",
                        type: "string"
                    },
                    document_issuing_country: {
                        description: "2-letter country code",
                        type: "string",
                        pattern: "^[a-z]{2}$"
                    },
                    size: {
                        description: "File size",
                        type: "number"
                    },
                    status: {
                        description: "Upload status (`success` or `failure`)",
                        type: "string"
                    },
                    upload_id: {
                        description: "Current upload ID, add this to your binary payload metadata",
                        type: "number"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "document_upload"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Economic Calendar (response)",
        description: "A list of economic events.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            economic_calendar: {
                title: "economic_calendar",
                description: "Economic calendar.",
                type: "object",
                additionalProperties: false,
                properties: {
                    events: {
                        description: "Array of economic events",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                actual: {
                                    description: "Actual value.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        display_value: {
                                            description: "Actual value.",
                                            type: "string"
                                        }
                                    }
                                },
                                currency: {
                                    description: "Currency symbol.",
                                    type: "string"
                                },
                                event_name: {
                                    description: "Event name.",
                                    type: "string"
                                },
                                forecast: {
                                    description: "Forecasted value.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        display_value: {
                                            description: "Forecasted value.",
                                            type: "string"
                                        }
                                    }
                                },
                                impact: {
                                    description: "Impact.",
                                    type: "integer",
                                    maximum: 5,
                                    minimum: 1
                                },
                                previous: {
                                    description: "Previous value.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        display_value: {
                                            description: "Previous value.",
                                            type: "string"
                                        }
                                    }
                                },
                                release_date: {
                                    description: "Release date.",
                                    type: "integer",
                                    examples: [
                                        1441175849
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "economic_calendar"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Exchange Rates (response)",
        description: "The exchange rate values from the specified base currency to all currencies supported by the system.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            exchange_rates: {
                title: "exchange_rates",
                description: "Exchange rate values from base to all other currencies",
                type: "object",
                additionalProperties: false,
                properties: {
                    base_currency: {
                        description: "Base currency",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$"
                    },
                    date: {
                        description: "Date retrieval epoch time represented as an integer number",
                        type: "integer"
                    },
                    rates: {
                        description: "Rates of exchanging a unit of base currency into the target currencies",
                        type: "object",
                        patternProperties: {
                            "^[a-zA-Z0-9]{2,20}$": {
                                description: "The rate of exchanging a unit of the base currency into a target currency (represented by the key)",
                                type: "number"
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "exchange_rates"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Forget (response)",
        description: "The result of forget request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            forget: {
                title: "forget",
                description: "If set to 1, stream exited and stopped. If set to 0, stream did not exist.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "forget"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Forget All (response)",
        description: "The result of forget all request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            forget_all: {
                title: "forget_all",
                description: "IDs of the cancelled streams",
                type: "array"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "forget_all"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Get Account Settings (response)",
        description: "A message with User Settings",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            get_settings: {
                title: "get_settings",
                description: "User information and settings.",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_opening_reason: {
                        description: "Purpose and reason for requesting the account opening. Only applicable for real money account.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    address_city: {
                        description: "City (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    address_line_1: {
                        description: "Address line 1 (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    address_line_2: {
                        description: "Address line 2 (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    address_postcode: {
                        description: "Post Code (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    address_state: {
                        description: "State (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    allow_copiers: {
                        description: "Boolean value 1 or 0, indicating permission to allow others to follow your trades. Note: not applicable for Virtual account. Only allow for real money account.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    citizen: {
                        description: "Country of legal citizenship, 2-letter country code.",
                        type: "string"
                    },
                    client_tnc_status: {
                        description: "Latest terms and conditions version accepted by client",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    country: {
                        description: "User Country (same as residence field) - deprecated",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    country_code: {
                        description: "2-letter country code ISO standard",
                        type: [
                            "null",
                            "string"
                        ],
                        pattern: "^[a-z]{0,2}$"
                    },
                    date_of_birth: {
                        description: "Epoch of user's birthday (note: Only available for users who have at least one real account)",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    email: {
                        description: "User Email",
                        type: "string"
                    },
                    email_consent: {
                        description: "Boolean value 1 or 0, indicating permission to use email address for any contact which may include marketing",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    feature_flag: {
                        description: "Contains features that are enabled or disabled for this user",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            wallet: {
                                description: "Boolean value 1 or 0 indicating whether his feature this enabled or not",
                                type: "integer",
                                enum: [
                                    0,
                                    1
                                ]
                            }
                        }
                    },
                    first_name: {
                        description: "First name (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    has_secret_answer: {
                        description: "Returns 1 if the client has a secret answer, 0 otherwise.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    immutable_fields: {
                        description: "A list of profile fields which are immutable (read-only unless they are not set yet) due to landing company regulations and the current status of the account.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    is_authenticated_payment_agent: {
                        description: "Boolean value 1 or 0, indicating whether is payment agent (note: not applicable for virtual money accounts)",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    last_name: {
                        description: "Last name (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    non_pep_declaration: {
                        description: "Indicates client's self-declaration of not being a PEP/RCA (Politically Exposed Person/Relatives and Close Associates). Note: returned for real accounts only.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    phone: {
                        description: "Telephone (note: Only available for users who have at least one real account)",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    place_of_birth: {
                        description: "Place of birth, 2-letter country code.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    preferred_language: {
                        description: "User's preferred language, ISO standard code of language",
                        type: [
                            "null",
                            "string"
                        ],
                        pattern: "^[A-Z]{0,2}$|^[A-Z]{2}_[A-Z]{2}$"
                    },
                    request_professional_status: {
                        description: "Boolean value 1 or 0, indicating if client has requested professional status.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    residence: {
                        description: "User Country",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    salutation: {
                        description: "Salutation (note: Only available for users who have at least one real account)",
                        type: "string"
                    },
                    tax_identification_number: {
                        description: "Tax identification number. Only applicable for real money account.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    tax_residence: {
                        description: "Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    user_hash: {
                        description: "Hash generated using user details to verify whether the user is legitimate for our customer support system.",
                        type: [
                            "null",
                            "string"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "get_settings"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Get Financial Assessment (response)",
        description: "This call gets the financial assessment details of client's account.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            get_financial_assessment: {
                title: "get_financial_assessment",
                description: "Client's financial assessment details",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_turnover: {
                        description: "The anticipated account turnover",
                        type: "string"
                    },
                    binary_options_trading_experience: {
                        description: "Binary options trading experience",
                        type: "string"
                    },
                    binary_options_trading_frequency: {
                        description: "Binary options trading frequency",
                        type: "string"
                    },
                    cfd_score: {
                        description: "CFD Score",
                        type: "integer"
                    },
                    cfd_trading_experience: {
                        description: "CFDs trading experience",
                        type: "string"
                    },
                    cfd_trading_frequency: {
                        description: "CFDs trading frequency",
                        type: "string"
                    },
                    commodities_trading_experience: {
                        description: "Commodities trading experience",
                        type: "string"
                    },
                    commodities_trading_frequency: {
                        description: "Commodities trading frequency",
                        type: "string"
                    },
                    education_level: {
                        description: "Level of Education",
                        type: "string"
                    },
                    employment_industry: {
                        description: "Industry of Employment",
                        type: "string"
                    },
                    employment_status: {
                        description: "Employment Status",
                        type: "string"
                    },
                    estimated_worth: {
                        description: "Estimated Net Worth",
                        type: "string"
                    },
                    financial_information_score: {
                        description: "Financial Information Score",
                        type: "integer"
                    },
                    forex_trading_experience: {
                        description: "Forex trading experience",
                        type: "string"
                    },
                    forex_trading_frequency: {
                        description: "Forex trading frequency",
                        type: "string"
                    },
                    income_source: {
                        description: "Income Source",
                        type: "string"
                    },
                    indices_trading_experience: {
                        description: "Indices trading experience",
                        type: "string"
                    },
                    indices_trading_frequency: {
                        description: "Indices trading frequency",
                        type: "string"
                    },
                    net_income: {
                        description: "Net Annual Income",
                        type: "string"
                    },
                    occupation: {
                        description: "Occupation",
                        type: "string"
                    },
                    other_derivatives_trading_experience: {
                        description: "Trading experience in other financial derivatives",
                        type: "string"
                    },
                    other_derivatives_trading_frequency: {
                        description: "Trading frequency in other financial derivatives",
                        type: "string"
                    },
                    other_instruments_trading_experience: {
                        description: "Trading experience in other financial instruments",
                        type: "string"
                    },
                    other_instruments_trading_frequency: {
                        description: "Trading frequency in other financial instruments",
                        type: "string"
                    },
                    source_of_wealth: {
                        description: "Source of wealth",
                        type: "string"
                    },
                    stocks_trading_experience: {
                        description: "Stocks trading experience",
                        type: "string"
                    },
                    stocks_trading_frequency: {
                        description: "Stocks trading frequency",
                        type: "string"
                    },
                    total_score: {
                        description: "Total Score",
                        type: "integer"
                    },
                    trading_score: {
                        description: "Trading Experience Score",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "get_financial_assessment"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Get Self-Exclusion (response)",
        description: "A message with User Self-Exclusion",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            get_self_exclusion: {
                title: "get_self_exclusion",
                description: "List of values set for self exclusion.",
                type: "object",
                additionalProperties: false,
                properties: {
                    exclude_until: {
                        description: "Exclude me from the website (for a minimum of 6 months, up to a maximum of 5 years). Note: uplifting this self-exclusion may require contacting the company.",
                        type: "string"
                    },
                    max_30day_deposit: {
                        description: "30-day limit on deposits",
                        type: "number"
                    },
                    max_30day_losses: {
                        description: "30-day limit on losses",
                        type: "number"
                    },
                    max_30day_turnover: {
                        description: "30-day turnover limit",
                        type: "number"
                    },
                    max_7day_deposit: {
                        description: "7-day limit on deposits",
                        type: "number"
                    },
                    max_7day_losses: {
                        description: "7-day limit on losses",
                        type: "number"
                    },
                    max_7day_turnover: {
                        description: "7-day turnover limit",
                        type: "number"
                    },
                    max_balance: {
                        description: "Maximum account cash balance",
                        type: "number"
                    },
                    max_deposit: {
                        description: "Daily limit on deposits",
                        type: "number"
                    },
                    max_losses: {
                        description: "Daily limit on losses",
                        type: "number"
                    },
                    max_open_bets: {
                        description: "Maximum number of open positions",
                        type: "integer"
                    },
                    max_turnover: {
                        description: "Daily turnover limit",
                        type: "number"
                    },
                    session_duration_limit: {
                        description: "Session duration limit, in minutes",
                        type: "integer"
                    },
                    timeout_until: {
                        description: "Exclude me from the website (for up to 6 weeks). The time is in epoch format. Note: unlike `exclude_until`, this self-exclusion will be lifted automatically at the expiry of the timeout period.",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "get_self_exclusion"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Identity Verification Add Document (response)",
        description: "Adds document information such as issuing country, id and type for identity verification processes.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            identity_verification_document_add: {
                title: "identity_verification_document_add",
                description: "1 on success",
                type: "integer",
                enum: [
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "identity_verification_document_add"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Landing Company (response)",
        description: "Returns the Landing Company for clients of a given country.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            landing_company: {
                title: "landing_company",
                description: "Landing Company",
                type: "object",
                additionalProperties: false,
                properties: {
                    address_parseable: {
                        description: "Flag to indicate if address parseable or not",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    config: {
                        description: "Config structure with document types ,taxRequired ,tin format details.",
                        type: "object"
                    },
                    dxtrade_financial_company: {
                        description: "Available Deriv X financial account types (all except Synthetic Indices).",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            standard: {
                                description: "Landing Company details.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowable currencies",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowable markets",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    dxtrade_gaming_company: {
                        description: "Available Deriv X gaming account types (Synthetic Indices).",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            standard: {
                                description: "Landing Company details.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowable currencies",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowable markets",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    financial_company: {
                        description: "Landing Company for financial contracts (all except Synthetic Indices)",
                        type: [
                            "null",
                            "object"
                        ],
                        additionalProperties: false,
                        properties: {
                            address: {
                                description: "Landing Company address",
                                type: [
                                    "array",
                                    "null"
                                ],
                                items: {
                                    type: "string"
                                }
                            },
                            changeable_fields: {
                                description: "Special conditions for changing sensitive fields",
                                type: "object"
                            },
                            country: {
                                description: "Landing Company country of incorporation",
                                type: "string"
                            },
                            currency_config: {
                                title: "Currency Config Structure",
                                description: "The configuration of each currency.",
                                type: "object"
                            },
                            has_reality_check: {
                                description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                type: "integer",
                                enum: [
                                    1,
                                    0
                                ]
                            },
                            legal_allowed_contract_categories: {
                                description: "Allowed contract types for this Landing Company",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            legal_allowed_currencies: {
                                description: "Allowed account currencies for this Landing Company",
                                type: "array",
                                items: {
                                    type: "string",
                                    pattern: "^[a-zA-Z0-9]{2,20}$"
                                }
                            },
                            legal_allowed_markets: {
                                description: "Allowed markets for this Landing Company",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            legal_default_currency: {
                                description: "Default account currency",
                                type: "string",
                                pattern: "^[a-zA-Z0-9]{2,20}$"
                            },
                            name: {
                                description: "Landing Company legal name",
                                type: "string"
                            },
                            requirements: {
                                description: "Legal requirements for the Landing Company",
                                type: "object"
                            },
                            shortcode: {
                                description: "Landing Company short code",
                                type: "string"
                            }
                        }
                    },
                    forbidden_postcode_pattern: {
                        description: "Forbidden postcode pattern",
                        type: "string"
                    },
                    gaming_company: {
                        description: "Landing Company for gaming contracts (Synthetic Indices)",
                        type: [
                            "null",
                            "object"
                        ],
                        additionalProperties: false,
                        properties: {
                            address: {
                                description: "Landing Company address",
                                type: [
                                    "array",
                                    "null"
                                ],
                                items: {
                                    type: "string"
                                }
                            },
                            changeable_fields: {
                                description: "Special conditions for changing sensitive fields",
                                type: "object"
                            },
                            country: {
                                description: "Landing Company country of incorporation",
                                type: "string"
                            },
                            currency_config: {
                                title: "Currency Config Structure",
                                description: "The configuration of each currency.",
                                type: "object"
                            },
                            has_reality_check: {
                                description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                type: "integer",
                                enum: [
                                    0,
                                    1
                                ]
                            },
                            legal_allowed_contract_categories: {
                                description: "Allowed contract types",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            legal_allowed_currencies: {
                                description: "Allowable currencies",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            legal_allowed_markets: {
                                description: "Allowable markets",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            legal_default_currency: {
                                description: "Default account currency",
                                type: "string"
                            },
                            name: {
                                description: "Landing Company legal name",
                                type: "string"
                            },
                            requirements: {
                                description: "Legal requirements for the Landing Company",
                                type: "object"
                            },
                            shortcode: {
                                description: "Landing Company short code",
                                type: "string"
                            }
                        }
                    },
                    gamstop_company: {
                        description: "Gamestop company details.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    has_proveid: {
                        description: "Flag to indicate if proveid is present or not",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    id: {
                        description: "Country code",
                        type: "string"
                    },
                    is_idv_supported: {
                        description: "Flag to indicate if idv is supported or not",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    lc_to_open_mf_account: {
                        description: "Open mf account lc details.",
                        type: "string"
                    },
                    minimum_age: {
                        description: "Minimum age",
                        type: "integer"
                    },
                    mt5_age_verification: {
                        description: "Flag to indicate if mt5 age verification detail.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    mt_financial_company: {
                        description: "Landing Company for MT5 financial contracts (all except Synthetic Indices), currently divided into Financial STP, Financial (standard), and Swap-Free as subtypes.",
                        type: [
                            "null",
                            "object"
                        ],
                        additionalProperties: false,
                        properties: {
                            financial: {
                                description: "Contain details for landing company for financial subtype. The Financial account is suitable for a wide range of traders, both new and experienced. It gives you mid-range leverage and variable spreads that give you a great deal of flexibility for whatever position you wish to take in the market.",
                                type: [
                                    "null",
                                    "object"
                                ],
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowed account currencies for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowed markets for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            },
                            financial_stp: {
                                description: "Contain details for landing company for Financial STP subtype. The Financial STP account provides you with tight spreads, higher ticket size and offers a variety of FX pairs from majors to exotics. It is a straight through processing (STP) account with direct access to FX liquidity from various providers.",
                                type: [
                                    "null",
                                    "object"
                                ],
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowed account currencies for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowed markets for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            },
                            swap_free: {
                                description: "Contains details for Landing Company for swap-free subtype. The Swap-Free account is suitable for a wide range of traders, both new and experienced. It gives you mid-range leverage and variable spreads that give you a great deal of flexibility for whatever position you wish to take in the market with zero swap fee.",
                                type: [
                                    "null",
                                    "object"
                                ],
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowed account currencies for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowed markets for this Landing Company",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    mt_gaming_company: {
                        description: "Landing Company for MT5 standard gaming contracts (Synthetic Indices), currently divided into Financial (standard), and Swap-Free as subtypes.",
                        type: [
                            "null",
                            "object"
                        ],
                        additionalProperties: false,
                        properties: {
                            financial: {
                                description: "Landing Company for MT5 gaming contracts (Synthetic Indices)",
                                type: [
                                    "null",
                                    "object"
                                ],
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowable currencies",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowable markets",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            },
                            swap_free: {
                                description: "Landing Company for MT5 swap free gaming contracts (Synthetic Indices)",
                                type: [
                                    "null",
                                    "object"
                                ],
                                additionalProperties: false,
                                properties: {
                                    address: {
                                        description: "Landing Company address",
                                        type: [
                                            "array",
                                            "null"
                                        ],
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    changeable_fields: {
                                        description: "Special conditions for changing sensitive fields",
                                        type: "object"
                                    },
                                    country: {
                                        description: "Landing Company country of incorporation",
                                        type: "string"
                                    },
                                    currency_config: {
                                        title: "Currency Config Structure",
                                        description: "The configuration of each currency.",
                                        type: "object"
                                    },
                                    has_reality_check: {
                                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    legal_allowed_contract_categories: {
                                        description: "Allowed contract types",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_currencies: {
                                        description: "Allowable currencies",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_allowed_markets: {
                                        description: "Allowable markets",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    legal_default_currency: {
                                        description: "Default account currency",
                                        type: "string"
                                    },
                                    name: {
                                        description: "Landing Company legal name",
                                        type: "string"
                                    },
                                    requirements: {
                                        description: "Legal requirements for the Landing Company",
                                        type: "object"
                                    },
                                    shortcode: {
                                        description: "Landing Company short code",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    name: {
                        description: "Country name",
                        type: "string"
                    },
                    need_set_max_turnover_limit: {
                        description: "Flag to indicate whether max turnover limit settings.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    no_province: {
                        description: "Flag to indicate province settings.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    require_address_postcode: {
                        description: "Flag to indicate whether address postcode is required or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    require_age_verified_for_synthetic: {
                        description: "Flag to indicate whether age verification required ofr synthetic or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    require_poi: {
                        description: "Flag to indicate whether poi is required.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    require_verification_when_not_age_verified: {
                        description: "Flag to indicate whether verification required if age not verified.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    skip_deposit_verification: {
                        description: "Flag to indicate whether to skip deposit verifcation or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    ukgc_funds_protection: {
                        description: "Flag to indicate ukgc funds protection setting.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    virtual_company: {
                        description: "Virtual Company",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "landing_company"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Landing Company Details (response)",
        description: "A message with Landing Company.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            landing_company_details: {
                title: "landing_company_details",
                description: "The detailed information of the requested landing company.",
                type: "object",
                additionalProperties: false,
                properties: {
                    address: {
                        description: "Landing Company address.",
                        type: [
                            "array",
                            "null"
                        ],
                        items: {
                            type: "string"
                        }
                    },
                    changeable_fields: {
                        description: "Special conditions for changing sensitive fields",
                        type: "object"
                    },
                    country: {
                        description: "Landing Company country.",
                        type: "string"
                    },
                    currency_config: {
                        title: "Currency Config Structure",
                        description: "The configuration of each currency.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            commodities: {
                                title: "Commodities",
                                description: "Name of commodities.",
                                type: "object"
                            },
                            cryptocurrency: {
                                title: "Cryptocurrency",
                                description: "Name of cryptocurrency.",
                                type: "object"
                            },
                            forex: {
                                title: "Forex",
                                description: "Name of forex.",
                                type: "object"
                            },
                            indices: {
                                title: "Indices",
                                description: "Name of indices.",
                                type: "object"
                            },
                            market: {
                                title: "Market",
                                description: "Name of market.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    currency: {
                                        title: "Currency",
                                        description: "Currency Symbol.",
                                        type: "object",
                                        additionalProperties: false,
                                        properties: {
                                            max_payout: {
                                                description: "Maximum payout for this currency in this market.",
                                                type: "integer"
                                            },
                                            min_stake: {
                                                description: "Minimum stake for this currency in this market.",
                                                type: "integer"
                                            }
                                        }
                                    }
                                }
                            },
                            synthetic_index: {
                                title: "Synthetic index",
                                description: "Name of synthetic index.",
                                type: "object"
                            }
                        }
                    },
                    has_reality_check: {
                        description: "Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    legal_allowed_contract_categories: {
                        description: "Allowed contract types for this Landing Company",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    legal_allowed_currencies: {
                        description: "Allowable currencies for accounts with this Landing Company.",
                        type: "array",
                        items: {
                            type: "string",
                            pattern: "^[a-zA-Z0-9]{2,20}$"
                        }
                    },
                    legal_allowed_markets: {
                        description: "Allowed markets for this Landing Company",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    legal_default_currency: {
                        description: "Default currency of client accounts with this Landing Company.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$"
                    },
                    name: {
                        description: "Landing Company name.",
                        type: "string"
                    },
                    requirements: {
                        description: "Legal requirements for the given Landing Company.",
                        type: "object"
                    },
                    shortcode: {
                        description: "Landing Company shortcode.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "landing_company_details"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Log Out (response)",
        description: "The response of logout request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            logout: {
                title: "logout",
                description: "The result of logout request which is 1",
                type: "integer",
                enum: [
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "logout"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Login History (response)",
        description: "Recent login/logout history records",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            login_history: {
                title: "login_history",
                description: "Array of records of client login/logout activities",
                type: "array",
                items: {
                    description: "User login history",
                    type: "object",
                    additionalProperties: false,
                    required: [
                        "action",
                        "environment",
                        "status",
                        "time"
                    ],
                    properties: {
                        action: {
                            description: "Type of action.",
                            type: "string",
                            examples: [
                                "login",
                                "logout"
                            ]
                        },
                        environment: {
                            description: "Provides details about browser, device used during login or logout",
                            type: "string"
                        },
                        status: {
                            description: "Status of activity: 1 - success, 0 - failure",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        time: {
                            description: "Epoch time of the activity",
                            type: "integer"
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "login_history"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Accounts List (response)",
        description: "Get list of MT5 accounts for client.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_login_list: {
                title: "mt5_login_list",
                description: "Array containing MT5 account objects.",
                type: "array",
                items: {
                    title: "Details of each MT5 loginid.",
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        account_type: {
                            description: "Account type.",
                            type: "string",
                            enum: [
                                "demo",
                                "real"
                            ]
                        },
                        balance: {
                            description: "Balance of the MT5 account.",
                            type: "number"
                        },
                        country: {
                            description: "Residence of the MT5 account.",
                            type: "string"
                        },
                        currency: {
                            description: "Currency of the MT5 account.",
                            type: "string"
                        },
                        display_balance: {
                            description: "Account balance, formatted to appropriate decimal places.",
                            type: "string"
                        },
                        email: {
                            description: "Email address of the MT5 account.",
                            type: "string"
                        },
                        error: {
                            description: "Error in MT5 account details.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                code: {
                                    description: "Error code string.",
                                    type: "string"
                                },
                                details: {
                                    description: "Extra information about the error.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        account_type: {
                                            description: "MT5 account type.",
                                            type: "string"
                                        },
                                        login: {
                                            description: "MT5 account login ID.",
                                            type: "string"
                                        },
                                        server: {
                                            description: "Trade server name of the MT5 account.",
                                            type: "string"
                                        },
                                        server_info: {
                                            description: "Trade server information.",
                                            type: "object",
                                            additionalProperties: false,
                                            properties: {
                                                environment: {
                                                    description: "The environment. E.g. Deriv-Server.",
                                                    type: "string",
                                                    enum: [
                                                        "Deriv-Demo",
                                                        "Deriv-Server",
                                                        "Deriv-Server-02"
                                                    ]
                                                },
                                                geolocation: {
                                                    description: "Geographical location of the server.",
                                                    type: "object",
                                                    additionalProperties: false,
                                                    properties: {
                                                        location: {
                                                            description: "Sever location.",
                                                            type: "string"
                                                        },
                                                        region: {
                                                            description: "Sever region.",
                                                            type: "string"
                                                        },
                                                        sequence: {
                                                            description: "Sever sequence.",
                                                            type: "integer"
                                                        }
                                                    }
                                                },
                                                id: {
                                                    description: "Server id.",
                                                    type: "string"
                                                }
                                            }
                                        }
                                    }
                                },
                                message_to_client: {
                                    description: "Error message.",
                                    type: "string"
                                }
                            }
                        },
                        group: {
                            description: "Group type of the MT5 account, e.g. `demo\\svg_financial`",
                            type: "string"
                        },
                        landing_company_short: {
                            description: "Landing company shortcode of the MT5 account.",
                            type: "string",
                            enum: [
                                "bvi",
                                "labuan",
                                "malta",
                                "maltainvest",
                                "samoa",
                                "svg",
                                "vanuatu"
                            ]
                        },
                        leverage: {
                            description: "Leverage of the MT5 account (1 to 1000).",
                            type: "number"
                        },
                        login: {
                            description: "Login of MT5 account.",
                            type: "string",
                            pattern: "^MT[DR]?[0-9]+$"
                        },
                        market_type: {
                            description: "Market type",
                            type: "string",
                            enum: [
                                "financial",
                                "synthetic"
                            ]
                        },
                        name: {
                            description: "Name of the owner of the MT5 account.",
                            type: "string"
                        },
                        server: {
                            description: "Trade server name of the MT5 account.",
                            type: "string"
                        },
                        server_info: {
                            description: "Trade server information.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                environment: {
                                    description: "The environment. E.g. Deriv-Server.",
                                    type: "string",
                                    enum: [
                                        "Deriv-Demo",
                                        "Deriv-Server",
                                        "Deriv-Server-02"
                                    ]
                                },
                                geolocation: {
                                    description: "Geographical location of the server.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        location: {
                                            description: "Sever location.",
                                            type: "string"
                                        },
                                        region: {
                                            description: "Sever region.",
                                            type: "string"
                                        },
                                        sequence: {
                                            description: "Sever sequence.",
                                            type: "integer"
                                        }
                                    }
                                },
                                id: {
                                    description: "Server id.",
                                    type: "string"
                                }
                            }
                        },
                        sub_account_type: {
                            description: "Sub account type",
                            type: "string",
                            enum: [
                                "financial",
                                "financial_stp",
                                "swap_free"
                            ]
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_login_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Deposit (response)",
        description: "The result of MT5 deposit request.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_deposit: {
                title: "mt5_deposit",
                description: "1 on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_deposit"
                ]
            },
            binary_transaction_id: {
                description: "Withdrawal reference ID of Binary account",
                type: "integer"
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Get Setting (response)",
        description: "Get MT5 user settings",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_get_settings: {
                title: "mt5_get_settings",
                description: "MT5 user account details",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_type: {
                        description: "Account type.",
                        type: "string",
                        enum: [
                            "demo",
                            "real"
                        ]
                    },
                    address: {
                        description: "The address of the user. The maximum length of the address is 128 characters.",
                        type: "string"
                    },
                    balance: {
                        description: "Account balance.",
                        type: "string"
                    },
                    city: {
                        description: "User's city of residence.",
                        type: "string"
                    },
                    company: {
                        description: "Name of the client's company. The maximum length of the company name is 64 characters.",
                        type: "string"
                    },
                    country: {
                        description: "2-letter country code.",
                        type: "string"
                    },
                    currency: {
                        description: "MT5 account currency (`USD` or `EUR`) that depends on the MT5 company (`vanuatu`, `svg`, `malta`).",
                        type: "string"
                    },
                    email: {
                        description: "Email address.",
                        type: "string"
                    },
                    group: {
                        description: "The group where account belongs to.",
                        type: "string"
                    },
                    landing_company_short: {
                        description: "Landing company shortcode of the MT5 account.",
                        type: "string",
                        enum: [
                            "bvi",
                            "labuan",
                            "malta",
                            "maltainvest",
                            "samoa",
                            "svg",
                            "vanuatu"
                        ]
                    },
                    leverage: {
                        description: "Client leverage (from 1 to 1000).",
                        type: "number"
                    },
                    login: {
                        description: "Login ID of the user's MT5 account.",
                        type: "string",
                        pattern: "^MT[DR]?[0-9]+$"
                    },
                    market_type: {
                        description: "Market type",
                        type: "string",
                        enum: [
                            "financial",
                            "synthetic"
                        ]
                    },
                    name: {
                        description: "Client's name. The maximum length of a client's symbol name is 128 characters.",
                        type: "string"
                    },
                    phone: {
                        description: "User's phone number.",
                        type: "string"
                    },
                    phonePassword: {
                        description: "The user's phone password.",
                        type: "string"
                    },
                    state: {
                        description: "User's state (region) of residence.",
                        type: "string"
                    },
                    sub_account_type: {
                        description: "Sub account type",
                        type: "string",
                        enum: [
                            "financial",
                            "financial_stp",
                            "swap_free"
                        ]
                    },
                    zipCode: {
                        description: "User's zip code.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_get_settings"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: New Account (response)",
        description: "Create MT5 account Receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_new_account: {
                title: "mt5_new_account",
                description: "New MT5 account details",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_type: {
                        description: "Account type.",
                        type: "string",
                        enum: [
                            "demo",
                            "gaming",
                            "financial"
                        ]
                    },
                    agent: {
                        description: "Agent Details.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    balance: {
                        description: "Account balance.",
                        type: "number"
                    },
                    currency: {
                        description: "MT5 account currency (`USD` or `EUR`) that depends on the MT5 company (`vanuatu`, `svg`, `malta`).",
                        type: "string"
                    },
                    display_balance: {
                        description: "Account balance, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    login: {
                        description: "Login ID of the user's new MT5 account. Login could have 2 types of prefixes: MTD, MTR. MTD - for demo accounts and MTR for real money accounts.",
                        type: "string",
                        pattern: "^MT[DR]?[0-9]+$"
                    },
                    mt5_account_category: {
                        description: "With default value of conventional, unavailable for `financial_stp` sub account type.",
                        type: "string",
                        enum: [
                            "conventional",
                            "swap_free"
                        ]
                    },
                    mt5_account_type: {
                        description: "Sub account type, present only when account type is either `demo` or `financial`.",
                        type: "string",
                        enum: [
                            "financial",
                            "financial_stp"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_new_account"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Password Change (response)",
        description: "MT5 user password change receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_password_change: {
                title: "mt5_password_change",
                description: "`1` on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_password_change"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Password Check (response)",
        description: "MT5 user password check receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_password_check: {
                title: "mt5_password_check",
                description: "`1` on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_password_check"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Password Reset (response)",
        description: "MT5 user password reset receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_password_reset: {
                title: "mt5_password_reset",
                description: "`1` on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_password_reset"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "MT5: Withdrawal (response)",
        description: "The result of MT5 withdrawal request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            mt5_withdrawal: {
                title: "mt5_withdrawal",
                description: "`1` on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "mt5_withdrawal"
                ]
            },
            binary_transaction_id: {
                description: "Deposit reference ID of Binary account.",
                type: "integer"
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "New Real-Money Account: Default Landing Company (response)",
        description: "Create real account Receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            new_account_real: {
                title: "new_account_real",
                description: "New real money account details",
                type: "object",
                additionalProperties: false,
                required: [
                    "client_id",
                    "landing_company",
                    "oauth_token"
                ],
                properties: {
                    client_id: {
                        description: "Client ID of new real money account",
                        type: "string"
                    },
                    currency: {
                        description: "Currency of an account",
                        type: "string"
                    },
                    landing_company: {
                        description: "Landing company full name",
                        type: "string"
                    },
                    landing_company_short: {
                        description: "Landing company shortcode",
                        type: "string"
                    },
                    landing_company_shortcode: {
                        description: "Landing company shortcode",
                        type: "string"
                    },
                    oauth_token: {
                        description: "OAuth token for client's login session",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "new_account_real"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "New Real-Money Account: Deriv Investment (Europe) Ltd (response)",
        description: "Create maltainvest account Receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            new_account_maltainvest: {
                title: "new_account_maltainvest",
                description: "New `maltainvest` account details",
                type: "object",
                additionalProperties: false,
                required: [
                    "client_id",
                    "landing_company",
                    "oauth_token"
                ],
                properties: {
                    client_id: {
                        description: "Client ID of new `maltainvest` account",
                        type: "string"
                    },
                    landing_company: {
                        description: "Landing company full name",
                        type: "string"
                    },
                    landing_company_short: {
                        description: "Landing company shortcode",
                        type: "string"
                    },
                    landing_company_shortcode: {
                        description: "Landing company shortcode",
                        type: "string"
                    },
                    oauth_token: {
                        description: "OAuth token for client's login session",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "new_account_maltainvest"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "New Virtual-Money Account (response)",
        description: "Create virtual-money account",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            new_account_virtual: {
                title: "new_account_virtual",
                description: "New virtual-money account details",
                type: "object",
                additionalProperties: false,
                required: [
                    "balance",
                    "client_id",
                    "currency",
                    "email",
                    "oauth_token"
                ],
                properties: {
                    balance: {
                        description: "Account balance",
                        type: "number"
                    },
                    client_id: {
                        description: "ID of the new virtual-money account",
                        type: "string"
                    },
                    currency: {
                        description: "Account currency",
                        type: "string"
                    },
                    email: {
                        description: "Email of the new virtual-money account",
                        type: "string"
                    },
                    oauth_token: {
                        description: "Oauth token for the client's login session (so that the user may be logged in immediately)",
                        type: "string"
                    },
                    type: {
                        description: "Account type",
                        type: "string",
                        enum: [
                            "trading",
                            "wallet"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "new_account_virtual"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "OAuth Applications (response)",
        description: "A message with used applications",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            oauth_apps: {
                title: "oauth_apps",
                description: "List of OAuth applications that used for the authorized account.",
                type: "array",
                items: {
                    title: "Application object",
                    type: "object",
                    additionalProperties: false,
                    required: [
                        "app_id",
                        "app_markup_percentage",
                        "last_used",
                        "name",
                        "scopes"
                    ],
                    properties: {
                        app_id: {
                            description: "Application ID.",
                            type: "integer"
                        },
                        app_markup_percentage: {
                            description: "Markup added to contract prices (as a percentage of contract payout)",
                            type: "number"
                        },
                        last_used: {
                            description: "The last date which the application has been used.",
                            type: [
                                "null",
                                "string"
                            ]
                        },
                        name: {
                            description: "Application name",
                            type: "string"
                        },
                        scopes: {
                            description: "The list of permission scopes grant for each app.",
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "oauth_apps"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert Create (response)",
        description: "Returns the information of the created  P2P (Peer to Peer) advert.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advert_create: {
                title: "p2p_advert_create",
                description: "The information of the created P2P advert.",
                type: "object",
                additionalProperties: false,
                required: [
                    "account_currency",
                    "advertiser_details",
                    "amount",
                    "amount_display",
                    "counterparty_type",
                    "country",
                    "created_time",
                    "description",
                    "id",
                    "is_active",
                    "is_visible",
                    "local_currency",
                    "max_order_amount",
                    "max_order_amount_display",
                    "max_order_amount_limit",
                    "max_order_amount_limit_display",
                    "min_order_amount",
                    "min_order_amount_display",
                    "min_order_amount_limit",
                    "min_order_amount_limit_display",
                    "payment_method",
                    "price",
                    "price_display",
                    "rate",
                    "rate_display",
                    "remaining_amount",
                    "remaining_amount_display",
                    "type"
                ],
                properties: {
                    account_currency: {
                        description: "Currency for this advert. This is the system currency to be transferred between advertiser and client.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    advertiser_details: {
                        title: "Advertiser Details",
                        description: "Details of the advertiser for this advert.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "name",
                            "total_completion_rate"
                        ],
                        properties: {
                            first_name: {
                                description: "The advertiser's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The advertiser's unique identifier.",
                                type: "string"
                            },
                            last_name: {
                                description: "The advertiser's last name.",
                                type: "string"
                            },
                            name: {
                                description: "The advertiser's displayed name.",
                                type: "string"
                            },
                            total_completion_rate: {
                                description: "The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.",
                                type: [
                                    "null",
                                    "number"
                                ]
                            }
                        }
                    },
                    amount: {
                        description: "The total amount specified in advert, in `account_currency`.",
                        type: "number"
                    },
                    amount_display: {
                        description: "The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    contact_info: {
                        description: "Advertiser contact information. Only applicable for 'sell adverts'.",
                        type: "string"
                    },
                    counterparty_type: {
                        description: "Type of transaction from the opposite party's perspective.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    },
                    country: {
                        description: "The target country code of the advert.",
                        type: "string",
                        pattern: "^[a-z]{0,2}$"
                    },
                    created_time: {
                        description: "The advert creation time in epoch.",
                        type: "integer"
                    },
                    description: {
                        description: "General information about the advert.",
                        type: "string"
                    },
                    id: {
                        description: "The unique identifier for this advert.",
                        type: "string"
                    },
                    is_active: {
                        description: "The activation status of the advert.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_visible: {
                        description: "Indicates that this advert will appear on the main advert list.",
                        type: "integer",
                        default: 0,
                        enum: [
                            0,
                            1
                        ]
                    },
                    local_currency: {
                        description: "Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    max_order_amount: {
                        description: "Maximum order amount specified in advert, in `account_currency`.",
                        type: "number"
                    },
                    max_order_amount_display: {
                        description: "Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    max_order_amount_limit: {
                        description: "Maximum order amount at this time, in `account_currency`.",
                        type: "number"
                    },
                    max_order_amount_limit_display: {
                        description: "Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    min_order_amount: {
                        description: "Minimum order amount specified in advert, in `account_currency`.",
                        type: "number"
                    },
                    min_order_amount_display: {
                        description: "Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    min_order_amount_limit: {
                        description: "Minimum order amount at this time, in `account_currency`.",
                        type: "number"
                    },
                    min_order_amount_limit_display: {
                        description: "Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    payment_info: {
                        description: "Payment instructions. Only applicable for 'sell adverts'.",
                        type: "string"
                    },
                    payment_method: {
                        description: "Supported payment methods. Comma separated list.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    payment_method_details: {
                        description: "Details of available payment methods.",
                        type: "object",
                        additionalProperties: false,
                        patternProperties: {
                            "^[0-9]{1,8}$": {
                                description: "Unique identifier.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fields",
                                    "is_enabled",
                                    "method"
                                ],
                                properties: {
                                    display_name: {
                                        description: "Display name of payment method.",
                                        type: "string"
                                    },
                                    fields: {
                                        description: "Payment method fields.",
                                        type: "object",
                                        additionalProperties: false,
                                        minProperties: 1,
                                        patternProperties: {
                                            "^[a-z0-9_]{1,30}$": {
                                                description: "Field identifier.",
                                                type: "object",
                                                additionalProperties: false,
                                                required: [
                                                    "display_name",
                                                    "required",
                                                    "type",
                                                    "value"
                                                ],
                                                properties: {
                                                    display_name: {
                                                        description: "Display name of payment method field.",
                                                        type: "string"
                                                    },
                                                    required: {
                                                        description: "Is field required or optional.",
                                                        type: "integer"
                                                    },
                                                    type: {
                                                        description: "Field type.",
                                                        type: "string",
                                                        enum: [
                                                            "text",
                                                            "memo"
                                                        ]
                                                    },
                                                    value: {
                                                        description: "Current value of payment method field.",
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    is_enabled: {
                                        description: "Indicates whether method is enabled.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    method: {
                                        description: "Payment method identifier.",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    payment_method_names: {
                        description: "Names of supported payment methods.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    price: {
                        description: "Cost of the advert in local currency.",
                        type: "number"
                    },
                    price_display: {
                        description: "Cost of the advert in local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    rate: {
                        description: "Conversion rate from account currency to local currency.",
                        type: "number"
                    },
                    rate_display: {
                        description: "Conversion rate from account currency to local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    remaining_amount: {
                        description: "Amount currently available for orders, in `account_currency`.",
                        type: "number"
                    },
                    remaining_amount_display: {
                        description: "Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    type: {
                        description: "Whether this is a buy or a sell.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advert_create"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert Information (response)",
        description: "Returns information about the given advert ID.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advert_info: {
                title: "p2p_advert_info",
                description: "P2P advert information.",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_currency: {
                        description: "Currency for this advert. This is the system currency to be transferred between advertiser and client.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    advertiser_details: {
                        title: "Advertiser Details",
                        description: "Details of the advertiser for this advert.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "name",
                            "total_completion_rate"
                        ],
                        properties: {
                            first_name: {
                                description: "The advertiser's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The advertiser's unique identifier.",
                                type: "string"
                            },
                            is_blocked: {
                                description: "Indicates that the advertiser is blocked by the current user.",
                                type: "integer",
                                enum: [
                                    1
                                ]
                            },
                            is_favourite: {
                                description: "Indicates that the advertiser is a favourite of the current user.",
                                type: "integer",
                                enum: [
                                    1
                                ]
                            },
                            last_name: {
                                description: "The advertiser's last name.",
                                type: "string"
                            },
                            name: {
                                description: "The advertiser's displayed name.",
                                type: "string"
                            },
                            total_completion_rate: {
                                description: "The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.",
                                type: [
                                    "null",
                                    "number"
                                ]
                            }
                        }
                    },
                    amount: {
                        description: "The total amount specified in advert, in `account_currency`. It is only visible to the advert owner.",
                        type: "number"
                    },
                    amount_display: {
                        description: "The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                        type: "string"
                    },
                    contact_info: {
                        description: "Advertiser contact information. Only applicable for 'sell adverts'. ",
                        type: "string"
                    },
                    counterparty_type: {
                        description: "Type of transaction from the opposite party's perspective.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    },
                    country: {
                        description: "The target country code of the advert.",
                        type: "string",
                        pattern: "^[a-z]{0,2}$"
                    },
                    created_time: {
                        description: "The advert creation time in epoch.",
                        type: "integer"
                    },
                    days_until_archive: {
                        description: "Days until automatic inactivation of this ad, if no activity occurs.",
                        type: "integer"
                    },
                    deleted: {
                        description: "Indicates that the advert has been deleted.",
                        type: "integer",
                        enum: [
                            1
                        ]
                    },
                    description: {
                        description: "General information about the advert.",
                        type: "string"
                    },
                    id: {
                        description: "The unique identifier for this advert.",
                        type: "string"
                    },
                    is_active: {
                        description: "The activation status of the advert.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_visible: {
                        description: "Indicates that this advert will appear on the main advert list. It is only visible to the advert owner.",
                        type: "integer",
                        default: 0,
                        enum: [
                            0,
                            1
                        ]
                    },
                    local_currency: {
                        description: "Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    max_order_amount: {
                        description: "Maximum order amount specified in advert, in `account_currency`. It is only visible for advertisers.",
                        type: "number"
                    },
                    max_order_amount_display: {
                        description: "Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                        type: "string"
                    },
                    max_order_amount_limit: {
                        description: "Maximum order amount at this time, in `account_currency`.",
                        type: "number"
                    },
                    max_order_amount_limit_display: {
                        description: "Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    min_order_amount: {
                        description: "Minimum order amount specified in advert, in `account_currency`. It is only visible for advertisers.",
                        type: "number"
                    },
                    min_order_amount_display: {
                        description: "Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                        type: "string"
                    },
                    min_order_amount_limit: {
                        description: "Minimum order amount at this time, in `account_currency`.",
                        type: "number"
                    },
                    min_order_amount_limit_display: {
                        description: "Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    payment_info: {
                        description: "Payment instructions. Only applicable for 'sell adverts'.",
                        type: "string"
                    },
                    payment_method: {
                        description: "Supported payment methods. Comma separated list of identifiers.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    payment_method_details: {
                        description: "Details of available payment methods.",
                        type: "object",
                        additionalProperties: false,
                        patternProperties: {
                            "^[0-9]{1,8}$": {
                                description: "Unique identifier.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fields",
                                    "is_enabled",
                                    "method"
                                ],
                                properties: {
                                    display_name: {
                                        description: "Display name of payment method.",
                                        type: "string"
                                    },
                                    fields: {
                                        description: "Payment method fields.",
                                        type: "object",
                                        additionalProperties: false,
                                        minProperties: 1,
                                        patternProperties: {
                                            "^[a-z0-9_]{1,30}$": {
                                                description: "Field identifier.",
                                                type: "object",
                                                additionalProperties: false,
                                                required: [
                                                    "display_name",
                                                    "required",
                                                    "type",
                                                    "value"
                                                ],
                                                properties: {
                                                    display_name: {
                                                        description: "Display name of payment method field.",
                                                        type: "string"
                                                    },
                                                    required: {
                                                        description: "Is field required or optional.",
                                                        type: "integer"
                                                    },
                                                    type: {
                                                        description: "Field type.",
                                                        type: "string",
                                                        enum: [
                                                            "text",
                                                            "memo"
                                                        ]
                                                    },
                                                    value: {
                                                        description: "Current value of payment method field.",
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    is_enabled: {
                                        description: "Indicates whether method is enabled.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    method: {
                                        description: "Payment method identifier.",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    payment_method_names: {
                        description: "Names of supported payment methods.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    price: {
                        description: "Cost of the advert in local currency.",
                        type: "number"
                    },
                    price_display: {
                        description: "Cost of the advert in local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    rate: {
                        description: "Conversion rate from account currency to local currency.",
                        type: "number"
                    },
                    rate_display: {
                        description: "Conversion rate from account currency to local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    remaining_amount: {
                        description: "Amount currently available for orders, in `account_currency`. It is only visible for advertisers.",
                        type: "number"
                    },
                    remaining_amount_display: {
                        description: "Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                        type: "string"
                    },
                    type: {
                        description: "Whether this is a buy or a sell.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advert_info"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert List (response)",
        description: "Available adverts matching the requested criteria.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advert_list: {
                title: "p2p_advert_list",
                description: "P2P adverts list.",
                type: "object",
                additionalProperties: false,
                required: [
                    "list"
                ],
                properties: {
                    list: {
                        description: "List of adverts.",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            required: [
                                "account_currency",
                                "advertiser_details",
                                "counterparty_type",
                                "country",
                                "created_time",
                                "description",
                                "id",
                                "is_active",
                                "is_visible",
                                "local_currency",
                                "max_order_amount_limit",
                                "max_order_amount_limit_display",
                                "min_order_amount_limit",
                                "min_order_amount_limit_display",
                                "payment_method",
                                "price",
                                "price_display",
                                "rate",
                                "rate_display",
                                "type"
                            ],
                            properties: {
                                account_currency: {
                                    description: "Currency for this advert. This is the system currency to be transferred between advertiser and client.",
                                    type: "string",
                                    pattern: "^[a-zA-Z0-9]{2,20}$",
                                    examples: [
                                        "USD"
                                    ]
                                },
                                advertiser_details: {
                                    title: "Advertiser Details",
                                    description: "Details of the advertiser for this advert.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "id",
                                        "name",
                                        "total_completion_rate"
                                    ],
                                    properties: {
                                        first_name: {
                                            description: "The advertiser's first name.",
                                            type: "string"
                                        },
                                        id: {
                                            description: "The advertiser's unique identifier.",
                                            type: "string"
                                        },
                                        is_favourite: {
                                            description: "Indicates that the advertiser is a favourite.",
                                            type: "integer",
                                            enum: [
                                                1
                                            ]
                                        },
                                        last_name: {
                                            description: "The advertiser's last name.",
                                            type: "string"
                                        },
                                        name: {
                                            description: "The advertiser's displayed name.",
                                            type: "string"
                                        },
                                        total_completion_rate: {
                                            description: "The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.",
                                            type: [
                                                "null",
                                                "number"
                                            ]
                                        }
                                    }
                                },
                                amount: {
                                    description: "The total amount specified in advert, in `account_currency`. It is only visible to the advert owner.",
                                    type: "number"
                                },
                                amount_display: {
                                    description: "The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                                    type: "string"
                                },
                                contact_info: {
                                    description: "Advertiser contact information. Only applicable for 'sell adverts'.",
                                    type: "string"
                                },
                                counterparty_type: {
                                    description: "Type of transaction from the opposite party's perspective.",
                                    type: "string",
                                    enum: [
                                        "buy",
                                        "sell"
                                    ]
                                },
                                country: {
                                    description: "The target country code of the advert.",
                                    type: "string",
                                    pattern: "^[a-z]{0,2}$"
                                },
                                created_time: {
                                    description: "The advert creation time in epoch.",
                                    type: "integer"
                                },
                                days_until_archive: {
                                    description: "Days until automatic inactivation of this ad, if no activity occurs.",
                                    type: "integer"
                                },
                                description: {
                                    description: "General information about the advert.",
                                    type: "string"
                                },
                                id: {
                                    description: "The unique identifier for this advert.",
                                    type: "string"
                                },
                                is_active: {
                                    description: "The activation status of the advert.",
                                    type: "integer",
                                    enum: [
                                        0,
                                        1
                                    ]
                                },
                                is_visible: {
                                    description: "Indicates that this advert will appear on the main advert list.",
                                    type: "integer",
                                    default: 0,
                                    enum: [
                                        0,
                                        1
                                    ]
                                },
                                local_currency: {
                                    description: "Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.",
                                    type: "string",
                                    pattern: "^[a-zA-Z0-9]{2,20}$",
                                    examples: [
                                        "USD"
                                    ]
                                },
                                max_order_amount: {
                                    description: "Maximum order amount specified in advert, in `account_currency`. It is only visible for advertisers.",
                                    type: "number"
                                },
                                max_order_amount_display: {
                                    description: "Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                                    type: "string"
                                },
                                max_order_amount_limit: {
                                    description: "Maximum order amount at this time, in `account_currency`.",
                                    type: "number"
                                },
                                max_order_amount_limit_display: {
                                    description: "Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                min_order_amount: {
                                    description: "Minimum order amount specified in advert, in `account_currency`. It is only visible for advertisers.",
                                    type: "number"
                                },
                                min_order_amount_display: {
                                    description: "Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                                    type: "string"
                                },
                                min_order_amount_limit: {
                                    description: "Minimum order amount at this time, in `account_currency`.",
                                    type: "number"
                                },
                                min_order_amount_limit_display: {
                                    description: "Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                payment_info: {
                                    description: "Payment instructions. Only applicable for 'sell adverts'.",
                                    type: "string"
                                },
                                payment_method: {
                                    description: "Supported payment methods. Comma separated list of identifiers.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                payment_method_names: {
                                    description: "Names of supported payment methods.",
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                },
                                price: {
                                    description: "Cost of the advert in local currency.",
                                    type: "number"
                                },
                                price_display: {
                                    description: "Cost of the advert in local currency, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                rate: {
                                    description: "Conversion rate from account currency to local currency.",
                                    type: "number"
                                },
                                rate_display: {
                                    description: "Conversion rate from account currency to local currency, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                remaining_amount: {
                                    description: "Amount currently available for orders, in `account_currency`. It is only visible to the advert owner.",
                                    type: "number"
                                },
                                remaining_amount_display: {
                                    description: "Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.",
                                    type: "string"
                                },
                                type: {
                                    description: "Whether this is a buy or a sell.",
                                    type: "string",
                                    enum: [
                                        "buy",
                                        "sell"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advert_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advert Update (response)",
        description: "Returns information about the updated advert.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advert_update: {
                title: "p2p_advert_update",
                description: "P2P updated advert information.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    account_currency: {
                        description: "Currency for this advert. This is the system currency to be transferred between advertiser and client.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    advertiser_details: {
                        title: "Advertiser Details",
                        description: "Details of the advertiser for this advert.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "name",
                            "total_completion_rate"
                        ],
                        properties: {
                            first_name: {
                                description: "The advertiser's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The advertiser's unique identifier.",
                                type: "string"
                            },
                            last_name: {
                                description: "The advertiser's last name.",
                                type: "string"
                            },
                            name: {
                                description: "The advertiser's displayed name.",
                                type: "string"
                            },
                            total_completion_rate: {
                                description: "The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.",
                                type: [
                                    "null",
                                    "number"
                                ]
                            }
                        }
                    },
                    amount: {
                        description: "The total amount specified in advert, in `account_currency`.",
                        type: "number"
                    },
                    amount_display: {
                        description: "The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    contact_info: {
                        description: "Advertiser contact information. Only applicable for 'sell adverts'.",
                        type: "string"
                    },
                    counterparty_type: {
                        description: "Type of transaction from the opposite party's perspective.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    },
                    country: {
                        description: "The target country code of the advert.",
                        type: "string",
                        pattern: "^[a-z]{0,2}$"
                    },
                    created_time: {
                        description: "The advert creation time in epoch.",
                        type: "integer"
                    },
                    days_until_archive: {
                        description: "Days until automatic inactivation of this ad, if no activity occurs.",
                        type: "integer"
                    },
                    deleted: {
                        description: "Indicates that the advert has been deleted.",
                        type: "integer",
                        enum: [
                            1
                        ]
                    },
                    description: {
                        description: "General information about the advert.",
                        type: "string"
                    },
                    id: {
                        description: "The unique identifier for this advert.",
                        type: "string"
                    },
                    is_active: {
                        description: "The activation status of the advert.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_visible: {
                        description: "Indicates that this advert will appear on the main advert list.",
                        type: "integer",
                        default: 0,
                        enum: [
                            0,
                            1
                        ]
                    },
                    local_currency: {
                        description: "Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    max_order_amount: {
                        description: "Maximum order amount specified in advert, in `account_currency`.",
                        type: "number"
                    },
                    max_order_amount_display: {
                        description: "Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    max_order_amount_limit: {
                        description: "Maximum order amount at this time, in `account_currency`.",
                        type: "number"
                    },
                    max_order_amount_limit_display: {
                        description: "Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    min_order_amount: {
                        description: "Minimum order amount specified in advert, in `account_currency`. It is only visible to the advert owner.",
                        type: "number"
                    },
                    min_order_amount_display: {
                        description: "Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    min_order_amount_limit: {
                        description: "Minimum order amount at this time, in `account_currency`.",
                        type: "number"
                    },
                    min_order_amount_limit_display: {
                        description: "Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    payment_info: {
                        description: "Payment instructions. Only applicable for 'sell adverts'.",
                        type: "string"
                    },
                    payment_method: {
                        description: "Supported payment methods. Comma separated list of identifiers",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    payment_method_details: {
                        description: "Details of available payment methods.",
                        type: "object",
                        additionalProperties: false,
                        patternProperties: {
                            "^[0-9]{1,8}$": {
                                description: "Unique identifier.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fields",
                                    "is_enabled",
                                    "method"
                                ],
                                properties: {
                                    display_name: {
                                        description: "Display name of payment method.",
                                        type: "string"
                                    },
                                    fields: {
                                        description: "Payment method fields.",
                                        type: "object",
                                        additionalProperties: false,
                                        minProperties: 1,
                                        patternProperties: {
                                            "^[a-z0-9_]{1,30}$": {
                                                description: "Field identifier.",
                                                type: "object",
                                                additionalProperties: false,
                                                required: [
                                                    "display_name",
                                                    "required",
                                                    "type",
                                                    "value"
                                                ],
                                                properties: {
                                                    display_name: {
                                                        description: "Display name of payment method field.",
                                                        type: "string"
                                                    },
                                                    required: {
                                                        description: "Is field required or optional.",
                                                        type: "integer"
                                                    },
                                                    type: {
                                                        description: "Field type.",
                                                        type: "string",
                                                        enum: [
                                                            "text",
                                                            "memo"
                                                        ]
                                                    },
                                                    value: {
                                                        description: "Current value of payment method field.",
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    is_enabled: {
                                        description: "Indicates if this method is available on adverts.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    method: {
                                        description: "Payment method identifier.",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    payment_method_names: {
                        description: "Names of supported payment methods.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    price: {
                        description: "Cost of the advert in local currency.",
                        type: "number"
                    },
                    price_display: {
                        description: "Cost of the advert in local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    rate: {
                        description: "Conversion rate from account currency to local currency.",
                        type: "number"
                    },
                    rate_display: {
                        description: "Conversion rate from account currency to local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    remaining_amount: {
                        description: "Amount currently available for orders, in `account_currency`.",
                        type: "number"
                    },
                    remaining_amount_display: {
                        description: "Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    type: {
                        description: "Whether this is a buy or a sell.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advert_update"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Create (response)",
        description: "Returns information of the created advertiser.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advertiser_create: {
                title: "p2p_advertiser_create",
                description: "P2P advertiser information.",
                type: "object",
                additionalProperties: false,
                required: [
                    "buy_completion_rate",
                    "buy_orders_count",
                    "cancel_time_avg",
                    "cancels_remaining",
                    "chat_token",
                    "chat_user_id",
                    "contact_info",
                    "created_time",
                    "favourited",
                    "id",
                    "is_approved",
                    "is_listed",
                    "name",
                    "payment_info",
                    "release_time_avg",
                    "sell_completion_rate",
                    "sell_orders_count",
                    "total_completion_rate",
                    "total_orders_count"
                ],
                properties: {
                    balance_available: {
                        description: "Amount of funds available to sell on P2P. May be less than account balance according to deposit methods used.",
                        type: "number"
                    },
                    basic_verification: {
                        description: "Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    buy_completion_rate: {
                        description: "The percentage of completed orders out of total orders as a buyer within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    buy_orders_count: {
                        description: "The number of buy order completed within the past 30 days.",
                        type: "integer"
                    },
                    cancel_time_avg: {
                        description: "The average time in seconds taken to cancel orders as a buyer within the past 30 days.",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    cancels_remaining: {
                        description: "The number of times the user may cancel orders before being temporarily blocked.",
                        type: "integer"
                    },
                    chat_token: {
                        description: "The token to be used for authenticating the client for chat.",
                        type: "string",
                        sensitive: 1
                    },
                    chat_user_id: {
                        description: "The unique identifier for the chat user.",
                        type: "string"
                    },
                    contact_info: {
                        description: "Advertiser's contact information.",
                        type: "string"
                    },
                    created_time: {
                        description: "The epoch time that the client became an advertiser.",
                        type: "integer"
                    },
                    daily_buy: {
                        description: "Total value of P2P buy transactions in the past 24 hours.",
                        type: "string"
                    },
                    daily_buy_limit: {
                        description: "Maximum allowed value of P2P buy transactions in a 24 hour period.",
                        type: "string"
                    },
                    daily_sell: {
                        description: "Total value of P2P sell transactions in the past 24 hours.",
                        type: "string"
                    },
                    daily_sell_limit: {
                        description: "Maximum allowed value of P2P sell transactions in a 24 hour period.",
                        type: "string"
                    },
                    default_advert_description: {
                        description: "Default description that can be used every time an advert is created.",
                        type: "string"
                    },
                    favourited: {
                        description: "Number of other users who have favourited this advertiser.",
                        type: "integer"
                    },
                    full_verification: {
                        description: "Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    id: {
                        description: "The advertiser's identification number.",
                        type: "string"
                    },
                    is_approved: {
                        description: "The approval status of the advertiser.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_listed: {
                        description: "Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    name: {
                        description: "The advertiser's displayed name.",
                        type: "string"
                    },
                    payment_info: {
                        description: "Advertiser's payment information.",
                        type: "string"
                    },
                    release_time_avg: {
                        description: "The average time in seconds taken to release funds as a seller within the past 30 days.",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    sell_completion_rate: {
                        description: "The percentage of completed orders out of total orders as a seller within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    sell_orders_count: {
                        description: "The number of sell order orders completed within the past 30 days.",
                        type: "integer"
                    },
                    show_name: {
                        description: "When `1`, the advertiser's real name will be displayed to other users on adverts and orders.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    total_completion_rate: {
                        description: "The percentage of completed orders out of all orders within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    total_orders_count: {
                        description: "The total number of orders completed since advertiser registration.",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advertiser_create"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Information (response)",
        description: "Returns information about the given advertiser ID.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advertiser_info: {
                title: "p2p_advertiser_info",
                description: "P2P advertiser information.",
                type: "object",
                additionalProperties: false,
                required: [
                    "basic_verification",
                    "buy_completion_rate",
                    "buy_orders_count",
                    "cancel_time_avg",
                    "created_time",
                    "favourited",
                    "full_verification",
                    "id",
                    "is_approved",
                    "is_listed",
                    "name",
                    "release_time_avg",
                    "sell_completion_rate",
                    "sell_orders_count",
                    "total_completion_rate",
                    "total_orders_count"
                ],
                properties: {
                    balance_available: {
                        description: "Amount of funds available to sell on P2P. May be less than account balance according to deposit methods used.",
                        type: "number"
                    },
                    basic_verification: {
                        description: "Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    blocked_until: {
                        description: "If a temporary bar was placed, this is the epoch time at which it will end.",
                        type: "integer"
                    },
                    buy_completion_rate: {
                        description: "The percentage of completed orders out of total orders as a buyer within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    buy_orders_count: {
                        description: "The number of buy order completed within the past 30 days.",
                        type: "integer"
                    },
                    cancel_time_avg: {
                        description: "The average time in seconds taken to cancel orders as a buyer within the past 30 days.",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    cancels_remaining: {
                        description: "The number of times the user may cancel orders before being temporarily blocked.",
                        type: "integer"
                    },
                    chat_token: {
                        description: "The token to be used for authenticating the client for chat.",
                        type: "string",
                        sensitive: 1
                    },
                    chat_user_id: {
                        description: "The unique identifier for the chat user.",
                        type: "string"
                    },
                    contact_info: {
                        description: "Advertiser's contact information.",
                        type: "string"
                    },
                    created_time: {
                        description: "The epoch time that the client became an advertiser.",
                        type: "integer"
                    },
                    daily_buy: {
                        description: "Total value of P2P buy transactions in the past 24 hours.",
                        type: "string"
                    },
                    daily_buy_limit: {
                        description: "Maximum allowed value of P2P buy transactions in a 24 hour period.",
                        type: "string"
                    },
                    daily_sell: {
                        description: "Total value of P2P sell transactions in the past 24 hours.",
                        type: "string"
                    },
                    daily_sell_limit: {
                        description: "Maximum allowed value of P2P sell transactions in a 24 hour period.",
                        type: "string"
                    },
                    default_advert_description: {
                        description: "Default description that can be used every time an advert is created.",
                        type: "string"
                    },
                    favourited: {
                        description: "Number of other users who have favourited this advertiser.",
                        type: "integer"
                    },
                    first_name: {
                        description: "The advertiser's first name.",
                        type: "string"
                    },
                    full_verification: {
                        description: "Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    id: {
                        description: "The advertiser's identification number.",
                        type: "string"
                    },
                    is_approved: {
                        description: "The approval status of the advertiser.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_blocked: {
                        description: "Indicates that the advertiser is blocked by the current user.",
                        type: "integer",
                        enum: [
                            1
                        ]
                    },
                    is_favourite: {
                        description: "Indicates that the advertiser is a favourite of the current user",
                        type: "integer",
                        enum: [
                            1
                        ]
                    },
                    is_listed: {
                        description: "Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    last_name: {
                        description: "The advertiser's last name.",
                        type: "string"
                    },
                    max_order_amount: {
                        description: "Maximum order amount for adverts.",
                        type: "string"
                    },
                    min_balance: {
                        description: "Sell ads will be hidden when your available balance or remaining daily sell limit falls beneath this value.",
                        type: "string"
                    },
                    min_order_amount: {
                        description: "Minimum order amount for adverts.",
                        type: "string"
                    },
                    name: {
                        description: "The advertiser's displayed name.",
                        type: "string"
                    },
                    payment_info: {
                        description: "Advertiser's payment information.",
                        type: "string"
                    },
                    release_time_avg: {
                        description: "The average time in seconds taken to release funds as a seller within the past 30 days.",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    sell_completion_rate: {
                        description: "The percentage of completed orders out of total orders as a seller within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    sell_orders_count: {
                        description: "The number of sell order orders completed within the past 30 days.",
                        type: "integer"
                    },
                    show_name: {
                        description: "When `1`, the advertiser's real name will be displayed on to other users on adverts and orders.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    total_completion_rate: {
                        description: "The percentage of completed orders out of all orders within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    total_orders_count: {
                        description: "The total number of orders completed since advertiser registration.",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advertiser_info"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Relations (response)",
        description: "Returns information about favourite and blocked advertisers.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advertiser_relations: {
                title: "p2p_advertiser_relations",
                description: "P2P advertiser relations information.",
                type: "object",
                additionalProperties: false,
                required: [
                    "blocked_advertisers",
                    "favourite_advertisers"
                ],
                properties: {
                    blocked_advertisers: {
                        description: "List of advertisers blocked by the current user.",
                        type: "array",
                        items: {
                            description: "Advertiser details.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                created_time: {
                                    description: "The epoch time that the advertiser was blocked.",
                                    type: "integer"
                                },
                                id: {
                                    description: "Advertiser unique identifer.",
                                    type: "string"
                                },
                                name: {
                                    description: "Advertiser displayed name.",
                                    type: "string"
                                }
                            }
                        }
                    },
                    favourite_advertisers: {
                        description: "Favourite advertisers of the current user.",
                        type: "array",
                        items: {
                            description: "Advertiser details.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                created_time: {
                                    description: "The epoch time that the advertiser was set as favourite.",
                                    type: "integer"
                                },
                                id: {
                                    description: "Advertiser unique identifer.",
                                    type: "string"
                                },
                                name: {
                                    description: "Advertiser displayed name.",
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advertiser_relations"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Advertiser Update (response)",
        description: "Returns latest information of the advertiser.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_advertiser_update: {
                title: "p2p_advertiser_update",
                description: "P2P advertiser information.",
                type: "object",
                additionalProperties: false,
                required: [
                    "basic_verification",
                    "buy_completion_rate",
                    "buy_orders_count",
                    "cancel_time_avg",
                    "created_time",
                    "favourited",
                    "full_verification",
                    "id",
                    "is_approved",
                    "is_listed",
                    "name",
                    "release_time_avg",
                    "sell_completion_rate",
                    "sell_orders_count",
                    "total_completion_rate",
                    "total_orders_count"
                ],
                properties: {
                    balance_available: {
                        description: "Amount of funds available to sell on P2P. May be less than account balance according to deposit methods used.",
                        type: "number"
                    },
                    basic_verification: {
                        description: "Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    blocked_until: {
                        description: "If a temporary bar was placed, this is the epoch time at which it will end.",
                        type: "integer"
                    },
                    buy_completion_rate: {
                        description: "The percentage of completed orders out of total orders as a buyer within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    buy_orders_count: {
                        description: "The number of buy order completed within the past 30 days.",
                        type: "integer"
                    },
                    cancel_time_avg: {
                        description: "The average time in seconds taken to cancel orders as a buyer within the past 30 days.",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    cancels_remaining: {
                        description: "The number of times the user may cancel orders before being temporarily blocked.",
                        type: "integer"
                    },
                    chat_token: {
                        description: "The token to be used for authenticating the client for chat.",
                        type: "string",
                        sensitive: 1
                    },
                    chat_user_id: {
                        description: "The unique identifier for the chat user.",
                        type: "string"
                    },
                    contact_info: {
                        description: "Advertiser's contact information.",
                        type: "string"
                    },
                    created_time: {
                        description: "The epoch time that the client became an advertiser.",
                        type: "integer"
                    },
                    daily_buy: {
                        description: "Total value of P2P buy transactions in the past 24 hours.",
                        type: "string"
                    },
                    daily_buy_limit: {
                        description: "Maximum allowed value of P2P buy transactions in a 24 hour period.",
                        type: "string"
                    },
                    daily_sell: {
                        description: "Total value of P2P sell transactions in the past 24 hours.",
                        type: "string"
                    },
                    daily_sell_limit: {
                        description: "Maximum allowed value of P2P sell transactions in a 24 hour period.",
                        type: "string"
                    },
                    default_advert_description: {
                        description: "Default description that can be used every time an advert is created.",
                        type: "string"
                    },
                    favourited: {
                        description: "Number of other users who have favourited this advertiser.",
                        type: "integer"
                    },
                    first_name: {
                        description: "The advertiser's first name.",
                        type: "string"
                    },
                    full_verification: {
                        description: "Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.",
                        type: "integer",
                        enum: [
                            1,
                            0
                        ]
                    },
                    id: {
                        description: "The advertiser's identification number.",
                        type: "string"
                    },
                    is_approved: {
                        description: "The approval status of the advertiser.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_listed: {
                        description: "Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    last_name: {
                        description: "The advertiser's last name.",
                        type: "string"
                    },
                    max_order_amount: {
                        description: "Maximum order amount for adverts.",
                        type: "string"
                    },
                    min_balance: {
                        description: "Sell ads will be hidden when your available balance or remaining daily sell limit falls beneath this value.",
                        type: "string"
                    },
                    min_order_amount: {
                        description: "Minimum order amount for adverts.",
                        type: "string"
                    },
                    name: {
                        description: "The advertiser's displayed name.",
                        type: "string"
                    },
                    payment_info: {
                        description: "Advertiser's payment information.",
                        type: "string"
                    },
                    release_time_avg: {
                        description: "The average time in seconds taken to release funds as a seller within the past 30 days.",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    sell_completion_rate: {
                        description: "The percentage of completed orders out of total orders as a seller within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    sell_orders_count: {
                        description: "The number of sell order orders completed within the past 30 days.",
                        type: "integer"
                    },
                    show_name: {
                        description: "When `1`, the advertiser's real name will be displayed on to other users on adverts and orders.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    total_completion_rate: {
                        description: "The percentage of completed orders out of all orders within the past 30 days.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    total_orders_count: {
                        description: "The total number of orders completed since advertiser registration.",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_advertiser_update"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Chat Create (response)",
        description: "Information of the created P2P chat.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_chat_create: {
                title: "p2p_chat_create",
                description: "Information of the P2P chat.",
                type: "object",
                additionalProperties: false,
                required: [
                    "channel_url",
                    "order_id"
                ],
                properties: {
                    channel_url: {
                        description: "The URL to be used to initialise the chat for the requested order.",
                        type: "string"
                    },
                    order_id: {
                        description: "The unique identifier for the order that the chat belongs to.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_chat_create"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Cancel (response)",
        description: "Result of the P2P order cancellation.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_order_cancel: {
                description: "Cancellation details",
                type: "object",
                additionalProperties: false,
                required: [
                    "id",
                    "status"
                ],
                properties: {
                    id: {
                        description: "The unique identifier for the order.",
                        type: "string"
                    },
                    status: {
                        description: "The new status of the order.",
                        type: "string",
                        enum: [
                            "cancelled"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_order_cancel"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Confirm (response)",
        description: "Result of the P2P order confirmation.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_order_confirm: {
                description: "Confirmation details",
                type: "object",
                additionalProperties: false,
                required: [
                    "id",
                    "status"
                ],
                properties: {
                    id: {
                        description: "The unique identifier for the order.",
                        type: "string"
                    },
                    status: {
                        description: "The new status of the order.",
                        type: "string",
                        enum: [
                            "buyer-confirmed",
                            "completed"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_order_confirm"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Create (response)",
        description: "The information about the created P2P order.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_order_create: {
                title: "p2p_order_create",
                description: "Information of the creates P2P order.",
                type: "object",
                additionalProperties: false,
                required: [
                    "account_currency",
                    "advert_details",
                    "advertiser_details",
                    "amount",
                    "amount_display",
                    "chat_channel_url",
                    "client_details",
                    "contact_info",
                    "created_time",
                    "dispute_details",
                    "expiry_time",
                    "id",
                    "is_incoming",
                    "local_currency",
                    "payment_info",
                    "price",
                    "price_display",
                    "rate",
                    "rate_display",
                    "status",
                    "type"
                ],
                properties: {
                    account_currency: {
                        description: "The currency of order.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    advert_details: {
                        title: "Advert Details",
                        description: "Details of the advert for this order.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "description",
                            "id",
                            "payment_method",
                            "type"
                        ],
                        properties: {
                            description: {
                                description: "General information about the advert.",
                                type: "string"
                            },
                            id: {
                                description: "The unique identifier for the advert.",
                                type: "string"
                            },
                            payment_method: {
                                description: "The payment method.",
                                type: [
                                    "null",
                                    "string"
                                ]
                            },
                            type: {
                                description: "Type of the advert.",
                                type: "string",
                                enum: [
                                    "buy",
                                    "sell"
                                ]
                            }
                        }
                    },
                    advertiser_details: {
                        title: "Advertiser Details",
                        description: "Details of the advertiser for this order.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "loginid",
                            "name"
                        ],
                        properties: {
                            first_name: {
                                description: "The advertiser's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The advertiser's unique identifier.",
                                type: "string"
                            },
                            last_name: {
                                description: "The advertiser's last name.",
                                type: "string"
                            },
                            loginid: {
                                description: "The advertiser's account identifier.",
                                type: "string"
                            },
                            name: {
                                description: "The advertiser's displayed name.",
                                type: "string"
                            }
                        }
                    },
                    amount: {
                        description: "The amount of the order.",
                        type: "number"
                    },
                    amount_display: {
                        description: "The amount of the order, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    chat_channel_url: {
                        description: "The URL to be used to initialise the chat for this order.",
                        type: "string"
                    },
                    client_details: {
                        title: "Client Details",
                        description: "Details of the client who created the order.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "loginid",
                            "name"
                        ],
                        properties: {
                            first_name: {
                                description: "The client's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The client's unique P2P identifier.",
                                type: "string"
                            },
                            last_name: {
                                description: "The client's last name.",
                                type: "string"
                            },
                            loginid: {
                                description: "The client's account identifier.",
                                type: "string"
                            },
                            name: {
                                description: "The client's displayed name.",
                                type: "string"
                            }
                        }
                    },
                    contact_info: {
                        description: "Seller contact information.",
                        type: "string"
                    },
                    created_time: {
                        description: "The epoch time of the order creation.",
                        type: "integer"
                    },
                    dispute_details: {
                        title: "Dispute Details",
                        description: "Details of the order dispute.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "dispute_reason",
                            "disputer_loginid"
                        ],
                        properties: {
                            dispute_reason: {
                                description: "The dispute reason",
                                type: [
                                    "null",
                                    "string"
                                ]
                            },
                            disputer_loginid: {
                                description: "The loginid of the client who's raising the dispute",
                                type: [
                                    "null",
                                    "string"
                                ]
                            }
                        }
                    },
                    expiry_time: {
                        description: "The epoch time in which the order will be expired.",
                        type: "integer"
                    },
                    id: {
                        description: "The unique identifier for this order.",
                        type: "string"
                    },
                    is_incoming: {
                        description: "`1` if the order is created for the advert of the current client, otherwise `0`.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    local_currency: {
                        description: "Local currency for this order.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    payment_info: {
                        description: "Payment instructions.",
                        type: "string"
                    },
                    payment_method: {
                        description: "Supported payment methods. Comma separated list.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    payment_method_details: {
                        description: "Details of available payment methods.",
                        type: "object",
                        additionalProperties: false,
                        patternProperties: {
                            "^[0-9]{1,8}$": {
                                description: "Unique identifier.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fields",
                                    "is_enabled",
                                    "method"
                                ],
                                properties: {
                                    display_name: {
                                        description: "Display name of payment method.",
                                        type: "string"
                                    },
                                    fields: {
                                        description: "Payment method fields.",
                                        type: "object",
                                        additionalProperties: false,
                                        minProperties: 1,
                                        patternProperties: {
                                            "^[a-z0-9_]{1,30}$": {
                                                description: "Field identifier.",
                                                type: "object",
                                                additionalProperties: false,
                                                required: [
                                                    "display_name",
                                                    "required",
                                                    "type",
                                                    "value"
                                                ],
                                                properties: {
                                                    display_name: {
                                                        description: "Display name of payment method field.",
                                                        type: "string"
                                                    },
                                                    required: {
                                                        description: "Is field required or optional.",
                                                        type: "integer"
                                                    },
                                                    type: {
                                                        description: "Field type.",
                                                        type: "string",
                                                        enum: [
                                                            "text",
                                                            "memo"
                                                        ]
                                                    },
                                                    value: {
                                                        description: "Current value of payment method field.",
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    is_enabled: {
                                        description: "Indicates whether method is enabled.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    method: {
                                        description: "Payment method identifier.",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    price: {
                        description: "Cost in local currency.",
                        type: "number"
                    },
                    price_display: {
                        description: "Cost in local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    rate: {
                        description: "Conversion rate of the order.",
                        type: "number"
                    },
                    rate_display: {
                        description: "Conversion rate of the order, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    status: {
                        description: "The status of the created order.",
                        type: "string",
                        enum: [
                            "pending"
                        ]
                    },
                    type: {
                        description: "Type of the order.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_order_create"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order Information (response)",
        description: "Information of the P2P order.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_order_info: {
                title: "p2p_order_info",
                description: "The information of P2P order.",
                type: "object",
                additionalProperties: false,
                required: [
                    "account_currency",
                    "advert_details",
                    "advertiser_details",
                    "amount",
                    "amount_display",
                    "chat_channel_url",
                    "client_details",
                    "contact_info",
                    "created_time",
                    "dispute_details",
                    "expiry_time",
                    "id",
                    "is_incoming",
                    "local_currency",
                    "payment_info",
                    "price",
                    "price_display",
                    "rate",
                    "rate_display",
                    "status",
                    "type"
                ],
                properties: {
                    account_currency: {
                        description: "The currency of order.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    advert_details: {
                        title: "Advert Details",
                        description: "Details of the advert for this order.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "description",
                            "id",
                            "payment_method",
                            "type"
                        ],
                        properties: {
                            description: {
                                description: "General information about the advert.",
                                type: "string"
                            },
                            id: {
                                description: "The unique identifier for the advert.",
                                type: "string"
                            },
                            payment_method: {
                                description: "The payment method.",
                                type: [
                                    "null",
                                    "string"
                                ]
                            },
                            type: {
                                description: "Type of the advert.",
                                type: "string",
                                enum: [
                                    "buy",
                                    "sell"
                                ]
                            }
                        }
                    },
                    advertiser_details: {
                        title: "Advertiser Details",
                        description: "Details of the advertiser for this order.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "loginid",
                            "name"
                        ],
                        properties: {
                            first_name: {
                                description: "The advertiser's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The advertiser's unique identifier.",
                                type: "string"
                            },
                            last_name: {
                                description: "The advertiser's last name.",
                                type: "string"
                            },
                            loginid: {
                                description: "The advertiser's account identifier.",
                                type: "string"
                            },
                            name: {
                                description: "The advertiser's displayed name.",
                                type: "string"
                            }
                        }
                    },
                    amount: {
                        description: "The amount of the order.",
                        type: "number"
                    },
                    amount_display: {
                        description: "The amount of the order, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    chat_channel_url: {
                        description: "The URL to be used to initialise the chat for this order.",
                        type: "string"
                    },
                    client_details: {
                        title: "Client Details",
                        description: "Details of the client who created the order.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "id",
                            "loginid",
                            "name"
                        ],
                        properties: {
                            first_name: {
                                description: "The client's first name.",
                                type: "string"
                            },
                            id: {
                                description: "The client's unique P2P identifier.",
                                type: "string"
                            },
                            last_name: {
                                description: "The client's last name.",
                                type: "string"
                            },
                            loginid: {
                                description: "The client's account identifier.",
                                type: "string"
                            },
                            name: {
                                description: "The client's displayed name.",
                                type: "string"
                            }
                        }
                    },
                    contact_info: {
                        description: "Seller contact information.",
                        type: "string"
                    },
                    created_time: {
                        description: "The epoch time of the order creation.",
                        type: "integer"
                    },
                    dispute_details: {
                        title: "Dispute Details",
                        description: "Details of the order dispute.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "dispute_reason",
                            "disputer_loginid"
                        ],
                        properties: {
                            dispute_reason: {
                                description: "The dispute reason",
                                type: [
                                    "null",
                                    "string"
                                ]
                            },
                            disputer_loginid: {
                                description: "The loginid of the client who's raising the dispute",
                                type: [
                                    "null",
                                    "string"
                                ]
                            }
                        }
                    },
                    expiry_time: {
                        description: "The epoch time in which the order will be expired.",
                        type: "integer"
                    },
                    id: {
                        description: "The unique identifier for this order.",
                        type: "string"
                    },
                    is_incoming: {
                        description: "`1` if the order is created for the advert of the current client, otherwise `0`.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    local_currency: {
                        description: "Local currency for this order.",
                        type: "string",
                        pattern: "^[a-zA-Z0-9]{2,20}$",
                        examples: [
                            "USD"
                        ]
                    },
                    payment_info: {
                        description: "Payment instructions.",
                        type: "string"
                    },
                    payment_method: {
                        description: "Supported payment methods. Comma separated list.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    payment_method_details: {
                        description: "Details of available payment methods.",
                        type: "object",
                        additionalProperties: false,
                        patternProperties: {
                            "^[0-9]{1,8}$": {
                                description: "Unique identifier.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fields",
                                    "is_enabled",
                                    "method"
                                ],
                                properties: {
                                    display_name: {
                                        description: "Display name of payment method.",
                                        type: "string"
                                    },
                                    fields: {
                                        description: "Payment method fields.",
                                        type: "object",
                                        additionalProperties: false,
                                        minProperties: 1,
                                        patternProperties: {
                                            "^[a-z0-9_]{1,30}$": {
                                                description: "Field identifier.",
                                                type: "object",
                                                additionalProperties: false,
                                                required: [
                                                    "display_name",
                                                    "required",
                                                    "type",
                                                    "value"
                                                ],
                                                properties: {
                                                    display_name: {
                                                        description: "Display name of payment method field.",
                                                        type: "string"
                                                    },
                                                    required: {
                                                        description: "Is field required or optional.",
                                                        type: "integer"
                                                    },
                                                    type: {
                                                        description: "Field type.",
                                                        type: "string",
                                                        enum: [
                                                            "text",
                                                            "memo"
                                                        ]
                                                    },
                                                    value: {
                                                        description: "Current value of payment method field.",
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    is_enabled: {
                                        description: "Indicates whether method is enabled.",
                                        type: "integer",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    method: {
                                        description: "Payment method identifier.",
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    price: {
                        description: "Cost in local currency.",
                        type: "number"
                    },
                    price_display: {
                        description: "Cost in local currency, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    rate: {
                        description: "Conversion rate of the order.",
                        type: "number"
                    },
                    rate_display: {
                        description: "Conversion rate of the order, formatted to appropriate decimal places.",
                        type: "string"
                    },
                    status: {
                        description: "Current order status.",
                        type: "string",
                        enum: [
                            "pending",
                            "buyer-confirmed",
                            "cancelled",
                            "timed-out",
                            "blocked",
                            "refunded",
                            "completed",
                            "disputed",
                            "dispute-refunded",
                            "dispute-completed"
                        ]
                    },
                    type: {
                        description: "Whether this is a buy or a sell.",
                        type: "string",
                        enum: [
                            "buy",
                            "sell"
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_order_info"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "P2P Order List (response)",
        description: "All orders matching the requested criteria.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            p2p_order_list: {
                title: "p2p_order_list",
                description: "List of P2P orders.",
                type: "object",
                additionalProperties: false,
                required: [
                    "list"
                ],
                properties: {
                    list: {
                        description: "List of orders.",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            required: [
                                "account_currency",
                                "advert_details",
                                "advertiser_details",
                                "amount",
                                "amount_display",
                                "chat_channel_url",
                                "contact_info",
                                "created_time",
                                "dispute_details",
                                "expiry_time",
                                "id",
                                "is_incoming",
                                "local_currency",
                                "payment_info",
                                "price",
                                "price_display",
                                "rate",
                                "rate_display",
                                "status",
                                "type"
                            ],
                            properties: {
                                account_currency: {
                                    description: "The currency to be bought or sold.",
                                    type: "string",
                                    pattern: "^[a-zA-Z0-9]{2,20}$",
                                    examples: [
                                        "USD"
                                    ]
                                },
                                advert_details: {
                                    title: "Advert Details",
                                    description: "Details of the advert for this order.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "description",
                                        "id",
                                        "payment_method",
                                        "type"
                                    ],
                                    properties: {
                                        description: {
                                            description: "General information about the advert.",
                                            type: "string"
                                        },
                                        id: {
                                            description: "The unique identifier for the advert.",
                                            type: "string"
                                        },
                                        payment_method: {
                                            description: "The payment method.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        type: {
                                            description: "Type of the advert.",
                                            type: "string",
                                            enum: [
                                                "buy",
                                                "sell"
                                            ]
                                        }
                                    }
                                },
                                advertiser_details: {
                                    title: "Advertiser Details",
                                    description: "Details of the advertiser for this order.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "id",
                                        "loginid",
                                        "name"
                                    ],
                                    properties: {
                                        first_name: {
                                            description: "The advertiser's first name.",
                                            type: "string"
                                        },
                                        id: {
                                            description: "The advertiser's unique identifier.",
                                            type: "string"
                                        },
                                        last_name: {
                                            description: "The advertiser's last name.",
                                            type: "string"
                                        },
                                        loginid: {
                                            description: "The advertiser's account identifier.",
                                            type: "string"
                                        },
                                        name: {
                                            description: "The advertiser's displayed name.",
                                            type: "string"
                                        }
                                    }
                                },
                                amount: {
                                    description: "The amount of the order.",
                                    type: "number"
                                },
                                amount_display: {
                                    description: "The amount of the order, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                chat_channel_url: {
                                    description: "The URL to be used to initialise the chat for this order.",
                                    type: "string"
                                },
                                client_details: {
                                    title: "Client Details",
                                    description: "Details of the client who created the order.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "id",
                                        "loginid",
                                        "name"
                                    ],
                                    properties: {
                                        first_name: {
                                            description: "The client's first name.",
                                            type: "string"
                                        },
                                        id: {
                                            description: "The client's unique P2P identifier.",
                                            type: "string"
                                        },
                                        last_name: {
                                            description: "The client's last name.",
                                            type: "string"
                                        },
                                        loginid: {
                                            description: "The client's account identifier.",
                                            type: "string"
                                        },
                                        name: {
                                            description: "The client's displayed name.",
                                            type: "string"
                                        }
                                    }
                                },
                                contact_info: {
                                    description: "Seller contact information.",
                                    type: "string"
                                },
                                created_time: {
                                    description: "The epoch time of the order creation.",
                                    type: "integer"
                                },
                                dispute_details: {
                                    title: "Dispute Details",
                                    description: "Details of the order dispute.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "dispute_reason",
                                        "disputer_loginid"
                                    ],
                                    properties: {
                                        dispute_reason: {
                                            description: "The dispute reason",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        disputer_loginid: {
                                            description: "The loginid of the client who's raising the dispute",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        }
                                    }
                                },
                                expiry_time: {
                                    description: "The epoch time in which the order will be expired.",
                                    type: "integer"
                                },
                                id: {
                                    description: "The unique identifier for this order.",
                                    type: "string"
                                },
                                is_incoming: {
                                    description: "`1` if the order is created for the advert of the current client, otherwise `0`.",
                                    type: "integer",
                                    enum: [
                                        0,
                                        1
                                    ]
                                },
                                local_currency: {
                                    description: "Local currency for this order.",
                                    type: "string",
                                    pattern: "^[a-zA-Z0-9]{2,20}$",
                                    examples: [
                                        "USD"
                                    ]
                                },
                                payment_info: {
                                    description: "Payment instructions.",
                                    type: "string"
                                },
                                payment_method: {
                                    description: "Supported payment methods. Comma separated list of identifiers.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                payment_method_names: {
                                    description: "Names of supported payment methods.",
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                },
                                price: {
                                    description: "Cost in local currency.",
                                    type: "number"
                                },
                                price_display: {
                                    description: "Cost in local currency, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                rate: {
                                    description: "Conversion rate of the order.",
                                    type: "number"
                                },
                                rate_display: {
                                    description: "Conversion rate of the order, formatted to appropriate decimal places.",
                                    type: "string"
                                },
                                status: {
                                    description: "Current order status.",
                                    type: "string",
                                    enum: [
                                        "pending",
                                        "buyer-confirmed",
                                        "cancelled",
                                        "timed-out",
                                        "blocked",
                                        "refunded",
                                        "completed",
                                        "disputed",
                                        "dispute-refunded",
                                        "dispute-completed"
                                    ]
                                },
                                type: {
                                    description: "Whether this is a buy or a sell.",
                                    type: "string",
                                    enum: [
                                        "buy",
                                        "sell"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "p2p_order_list"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Agent: List (response)",
        description: "A message with Payment Agent List",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            paymentagent_list: {
                title: "paymentagent_list",
                description: "Payment Agent List",
                type: "object",
                additionalProperties: false,
                required: [
                    "list"
                ],
                properties: {
                    available_countries: {
                        description: "The list of countries in which payment agent is available.",
                        type: "array",
                        items: {
                            description: "The `country_code` and `country_name`",
                            type: "array",
                            items: {
                                type: [
                                    "null",
                                    "string"
                                ]
                            }
                        }
                    },
                    list: {
                        description: "List of payment agents available in the requested country.",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                currencies: {
                                    description: "Currencies that are accepted by this payment agent.",
                                    type: "string"
                                },
                                deposit_commission: {
                                    description: "Commission amount applied on deposits made through this payment agent.",
                                    type: "string"
                                },
                                email: {
                                    description: "Payment agent's email address.",
                                    type: "string"
                                },
                                further_information: {
                                    description: "More descriptions about this payment agent.",
                                    type: "string"
                                },
                                max_withdrawal: {
                                    description: "Maximum withdrawal allowed for transactions through this payment agent.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                min_withdrawal: {
                                    description: "Minimum withdrawal allowed for transactions through this payment agent.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                name: {
                                    description: "Payment agent's name.",
                                    type: "string"
                                },
                                paymentagent_loginid: {
                                    description: "Payment agent's loginid.",
                                    type: "string"
                                },
                                summary: {
                                    description: "A summary about payment agent.",
                                    type: "string"
                                },
                                supported_banks: {
                                    description: "Comma separated list of supported banks.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                telephone: {
                                    description: "Payment agent's phone number.",
                                    type: "string"
                                },
                                url: {
                                    description: "Payment agent's website URL.",
                                    type: "string"
                                },
                                withdrawal_commission: {
                                    description: "Commission amount applied on withdrawals made through this payment agent.",
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "paymentagent_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Agent: Transfer (response)",
        description: "The result of transfer request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            paymentagent_transfer: {
                title: "paymentagent_transfer",
                description: "If set to `1`, transfer success. If set to `2`, dry-run success.",
                type: "integer",
                enum: [
                    1,
                    2
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "paymentagent_transfer"
                ]
            },
            client_to_full_name: {
                description: "The `transfer_to` client full name",
                type: "string"
            },
            client_to_loginid: {
                description: "The `transfer_to` client loginid",
                type: "string"
            },
            transaction_id: {
                description: "Reference ID of transfer performed",
                type: "integer"
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Agent: Withdraw (response)",
        description: "The result of payment agent withdrawal request made.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            paymentagent_withdraw: {
                title: "paymentagent_withdraw",
                description: "If set to `1`, withdrawal success. If set to `2`, dry-run success.",
                type: "integer",
                enum: [
                    1,
                    2
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "paymentagent_withdraw"
                ]
            },
            paymentagent_name: {
                description: "Payment agent name.",
                type: "string"
            },
            transaction_id: {
                description: "Reference ID of withdrawal performed.",
                type: "integer"
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment Methods (response)",
        description: "List of available payment methods for a given country.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            payment_methods: {
                title: "payment_methods",
                description: "Available payment methods for a given country. Note: if a user is logged in, the residence country will be considered.",
                type: "array",
                items: {
                    title: "The payment_method schema",
                    description: "A payment method suported for the given country",
                    type: "object",
                    additionalProperties: false,
                    required: [
                        "deposit_limits",
                        "deposit_time",
                        "description",
                        "display_name",
                        "id",
                        "payment_processor",
                        "predefined_amounts",
                        "signup_link",
                        "supported_currencies",
                        "type",
                        "type_display_name",
                        "withdraw_limits",
                        "withdrawal_time"
                    ],
                    properties: {
                        deposit_limits: {
                            title: "deposit_limits",
                            description: "The min and max values for deposits.",
                            type: "object",
                            patternProperties: {
                                "^[A-Z]{3}$": {
                                    title: "Currency limits",
                                    description: "Deposit limits for this method.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "max",
                                        "min"
                                    ],
                                    properties: {
                                        max: {
                                            title: "max",
                                            description: "Maximum amount for deposits for this currency.",
                                            type: "integer",
                                            examples: [
                                                100
                                            ]
                                        },
                                        min: {
                                            title: "min",
                                            description: "Minimum amount for deposit for this currency.",
                                            type: "integer",
                                            examples: [
                                                5
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        deposit_time: {
                            title: "deposit_time",
                            description: "How much time it takes for a deposit to be processed.",
                            type: "string",
                            examples: [
                                "instant"
                            ]
                        },
                        description: {
                            title: "description",
                            description: "Short description explaining the payment method.",
                            type: "string",
                            examples: [
                                "Use your bank account to deposit and withdraw. Bank charges apply."
                            ]
                        },
                        display_name: {
                            title: "display_name",
                            description: "Common name for the payment method.",
                            type: "string",
                            examples: [
                                "Bank Transfer"
                            ]
                        },
                        id: {
                            title: "id",
                            description: "Unique identifier for the payment method.",
                            type: "string",
                            examples: [
                                "bank_transfer"
                            ]
                        },
                        payment_processor: {
                            title: "type",
                            description: "Payment processor for this payment method.",
                            type: "string",
                            examples: [
                                "Skrill"
                            ]
                        },
                        predefined_amounts: {
                            title: "The predefined_amounts schema",
                            description: "A list of predefined amounts for withdraw or deposit.",
                            type: "array",
                            items: {
                                description: "Predefined amount to withdraw or deposit.",
                                type: "integer",
                                examples: [
                                    5,
                                    10
                                ]
                            }
                        },
                        signup_link: {
                            title: "signup_link",
                            description: "Sign up link for this payment method.",
                            type: "string",
                            examples: [
                                "https://account.skrill.com/wallet/account/sign-up"
                            ]
                        },
                        supported_currencies: {
                            title: "supported_currencies",
                            description: "Currencies supported for this payment method.",
                            type: "array",
                            items: {
                                description: "Supported currency, using 3-letter code (ISO standard).",
                                type: "string",
                                examples: [
                                    "EUR",
                                    "USD"
                                ]
                            }
                        },
                        type: {
                            title: "type",
                            description: "Type of Payment Method.",
                            type: "string",
                            examples: [
                                "bank_wire"
                            ]
                        },
                        type_display_name: {
                            title: "type_display_name",
                            description: "A printable description for type of payment method.",
                            type: "string",
                            examples: [
                                "Bank Wire"
                            ]
                        },
                        withdraw_limits: {
                            title: "withdraw_limits",
                            description: "Withdrawal limits per currency.",
                            type: "object",
                            patternProperties: {
                                "^[A-Z]{3}$": {
                                    title: "Currency limits",
                                    description: "Withdrawal limits for this currency.",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "max",
                                        "min"
                                    ],
                                    properties: {
                                        max: {
                                            title: "max",
                                            description: "Maximum amount for wihdrawals in this currency.",
                                            type: "integer",
                                            examples: [
                                                10
                                            ]
                                        },
                                        min: {
                                            title: "min",
                                            description: "Minimum amount for withdrawals in this currency.",
                                            type: "integer",
                                            examples: [
                                                5
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        withdrawal_time: {
                            title: "withdrawal_time",
                            description: "How much time takes a withdrawal to be processed.",
                            type: "string",
                            examples: [
                                "1 working day"
                            ]
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "payment_methods"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment agent create (response)",
        description: "Sets client's payment agent details.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "paymentagent_create"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payment agent details (response)",
        description: "Gets client's payment agent details.",
        type: "object",
        auth_required: 1,
        auth_scopes: [
            "admin"
        ],
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            paymentagent_details: {
                description: "The payment agent details.",
                type: "object",
                additionalProperties: false,
                properties: {
                    affiliate_id: {
                        description: "Client's My Affiliate id, if exists.",
                        type: "string"
                    },
                    code_of_conduct_approval: {
                        description: "Indicates client's agreement with the Code of Conduct document.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    commission_deposit: {
                        description: "Commission (%) the agent want to take on deposits",
                        type: "number"
                    },
                    commission_withdrawal: {
                        description: "Commission (%) the agent want to take on withdrawals",
                        type: "number"
                    },
                    currency_code: {
                        description: "Currency supported by the payment agent. It's usually the same as agent's Deriv account currency.",
                        type: "string"
                    },
                    email: {
                        description: "Payment agent's email address.",
                        type: "string"
                    },
                    information: {
                        description: "Information about payment agent and their proposed service.",
                        type: "string"
                    },
                    is_authenticated: {
                        description: "Indicates if client is authenticated by Deriv.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_listed: {
                        description: "Wether or not the client should be listed among available agents in the FE.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    max_withdrawal: {
                        description: "Maximum amount allowed for withdrawals",
                        type: "number"
                    },
                    min_withdrawal: {
                        description: "Minimum amount allowed for withdrawals",
                        type: "number"
                    },
                    payment_agent_name: {
                        description: "The name with which the payment agent is going to be identified.",
                        type: "string"
                    },
                    phone: {
                        description: "Payment agent's phone number with country code.",
                        type: "string"
                    },
                    supported_payment_methods: {
                        description: "A list of supported payment methods.",
                        type: "array",
                        items: {
                            description: "A payment method's name",
                            type: "string"
                        }
                    },
                    target_country: {
                        description: "Client's target country.",
                        type: "string"
                    },
                    url: {
                        description: "The URL of payment agent's website.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "paymentagent_details"
                ]
            },
            passthrough: {
                description: "Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
                type: "object"
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Payout Currencies (response)",
        description: "List of available payout currencies.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            payout_currencies: {
                title: "payout_currencies",
                description: "Available payout currencies. Note: if a user is logged in, only the currency available for the account will be returned.",
                type: "array",
                items: {
                    description: "Available payout currency.",
                    type: "string",
                    examples: [
                        "USD"
                    ]
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "payout_currencies"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Ping (response)",
        description: "The response of ping request.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            ping: {
                title: "ping",
                description: "Will return 'pong'",
                type: "string",
                enum: [
                    "pong"
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "ping"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Portfolio (response)",
        description: "Receive a list of outstanding options in the user's portfolio",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            portfolio: {
                title: "portfolio",
                description: "Current account's open positions.",
                type: "object",
                additionalProperties: false,
                required: [
                    "contracts"
                ],
                properties: {
                    contracts: {
                        title: "Contracts",
                        description: "List of open positions.",
                        type: "array",
                        items: {
                            title: "Portfolio",
                            description: "The details of each open position.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                app_id: {
                                    description: "ID of the application where this contract was purchased.",
                                    type: [
                                        "integer",
                                        "null"
                                    ]
                                },
                                buy_price: {
                                    description: "Buy price",
                                    type: "number"
                                },
                                contract_id: {
                                    description: "Internal contract identifier number (to be used in a `proposal_open_contract` API call).",
                                    type: "integer"
                                },
                                contract_type: {
                                    description: "Contract type",
                                    type: "string"
                                },
                                currency: {
                                    description: "Contract currency",
                                    type: "string"
                                },
                                date_start: {
                                    description: "Epoch of start date",
                                    type: "integer"
                                },
                                expiry_time: {
                                    description: "Epoch of expiry time",
                                    type: "integer"
                                },
                                longcode: {
                                    description: "Contract description",
                                    type: "string"
                                },
                                payout: {
                                    description: "Payout price",
                                    type: "number"
                                },
                                purchase_time: {
                                    description: "Epoch of purchase time",
                                    type: "integer"
                                },
                                shortcode: {
                                    description: "Contract short code description",
                                    type: "string"
                                },
                                symbol: {
                                    description: "Symbol code",
                                    type: "string"
                                },
                                transaction_id: {
                                    description: "It is the transaction ID. Every contract (buy or sell) and every payment has a unique ID.",
                                    type: "integer",
                                    examples: [
                                        "10867502908"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "portfolio"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Price Proposal (response)",
        description: "Latest price and other details for a given contract",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            proposal: {
                title: "proposal",
                description: "Latest price and other details for a given contract",
                type: "object",
                additionalProperties: false,
                required: [
                    "ask_price",
                    "date_start",
                    "display_value",
                    "id",
                    "longcode",
                    "payout",
                    "spot",
                    "spot_time"
                ],
                properties: {
                    ask_price: {
                        description: "The ask price.",
                        type: "number",
                        examples: [
                            5.14
                        ]
                    },
                    cancellation: {
                        description: "Contains information about contract cancellation option.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            ask_price: {
                                description: "Ask price of contract cancellation option.",
                                type: "number"
                            },
                            date_expiry: {
                                description: "Expiry time in epoch for contract cancellation option.",
                                type: "integer"
                            }
                        }
                    },
                    commission: {
                        description: "Commission changed in percentage (%).",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    date_expiry: {
                        description: "The end date of the contract.",
                        type: "integer",
                        examples: [
                            1439999053
                        ]
                    },
                    date_start: {
                        description: "The start date of the contract.",
                        type: "integer",
                        examples: [
                            1439999053
                        ]
                    },
                    display_value: {
                        description: "Same as `ask_price`.",
                        type: "string",
                        examples: [
                            "5.14"
                        ]
                    },
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    },
                    limit_order: {
                        description: "Contains limit order information. (Only applicable for contract with limit order).",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            stop_loss: {
                                description: "Contains information where the contract will be closed automatically at the loss specified by the user.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    display_name: {
                                        description: "Localized display name",
                                        type: "string"
                                    },
                                    order_amount: {
                                        description: "Stop loss amount",
                                        type: [
                                            "null",
                                            "number"
                                        ]
                                    },
                                    order_date: {
                                        description: "Stop loss order epoch",
                                        type: "integer"
                                    },
                                    value: {
                                        description: "Pip-sized barrier value",
                                        type: [
                                            "null",
                                            "string"
                                        ]
                                    }
                                }
                            },
                            stop_out: {
                                description: "Contains information where the contract will be closed automatically when the value of the contract is close to zero. This is set by the us.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    display_name: {
                                        description: "Localized display name",
                                        type: "string"
                                    },
                                    order_amount: {
                                        description: "Stop out amount",
                                        type: "number"
                                    },
                                    order_date: {
                                        description: "Stop out order epoch",
                                        type: "integer"
                                    },
                                    value: {
                                        description: "Pip-sized barrier value",
                                        type: "string"
                                    }
                                }
                            },
                            take_profit: {
                                description: "Contains information where the contract will be closed automatically at the profit specified by the user.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    display_name: {
                                        description: "Localized display name",
                                        type: "string"
                                    },
                                    order_amount: {
                                        description: "Take profit amount",
                                        type: [
                                            "null",
                                            "number"
                                        ]
                                    },
                                    order_date: {
                                        description: "Take profit order epoch",
                                        type: "integer"
                                    },
                                    value: {
                                        description: "Pip-sized barrier value",
                                        type: [
                                            "null",
                                            "string"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    longcode: {
                        description: "Example: Win payout if Random 100 Index is strictly higher than entry spot at 15 minutes after contract start time.",
                        type: "string"
                    },
                    multiplier: {
                        description: "[Only for lookback trades] Multiplier applies when calculating the final payoff for each type of lookback. e.g. (Exit spot - Lowest historical price) * multiplier = Payout",
                        type: "number"
                    },
                    payout: {
                        description: "The payout amount of the contract.",
                        type: "number",
                        examples: [
                            10
                        ]
                    },
                    spot: {
                        description: "Spot value (if there are no Exchange data-feed licensing restrictions for the underlying symbol).",
                        type: "number",
                        examples: [
                            9874.52
                        ]
                    },
                    spot_time: {
                        description: "The corresponding time of the spot value.",
                        type: "integer",
                        examples: [
                            1439999052
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "proposal"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Price Proposal: Open Contracts (response)",
        description: "Latest price and other details for an open contract in the user's portfolio",
        type: "object",
        required: [
            "echo_req"
        ],
        properties: {
            proposal_open_contract: {
                title: "proposal_open_contract",
                description: "Latest price and other details for an open contract",
                type: "object",
                additionalProperties: false,
                properties: {
                    account_id: {
                        description: "Account Id",
                        type: "number"
                    },
                    audit_details: {
                        title: "Audit details for expired contract.",
                        description: "Tick details around contract start and end time.",
                        type: [
                            "null",
                            "object"
                        ],
                        additionalProperties: false,
                        properties: {
                            all_ticks: {
                                description: "Ticks for tick expiry contract from start time till expiry.",
                                type: "array",
                                items: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        epoch: {
                                            description: "Epoch time of a tick or the contract start or end time.",
                                            type: "integer"
                                        },
                                        flag: {
                                            description: "A flag used to highlight the record in front-end applications.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        name: {
                                            description: "A short description of the data. It could be a tick or a time associated with the contract.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        tick: {
                                            description: "The spot value at the given epoch.",
                                            type: [
                                                "null",
                                                "number"
                                            ]
                                        },
                                        tick_display_value: {
                                            description: "The spot value with the correct precision at the given epoch.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        }
                                    }
                                }
                            },
                            contract_end: {
                                description: "Ticks around contract end time.",
                                type: "array",
                                items: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        epoch: {
                                            description: "Epoch time of a tick or the contract start or end time.",
                                            type: "integer"
                                        },
                                        flag: {
                                            description: "A flag used to highlight the record in front-end applications.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        name: {
                                            description: "A short description of the data. It could be a tick or a time associated with the contract.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        tick: {
                                            description: "The spot value at the given epoch.",
                                            type: [
                                                "null",
                                                "number"
                                            ]
                                        },
                                        tick_display_value: {
                                            description: "The spot value with the correct precision at the given epoch.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        }
                                    }
                                }
                            },
                            contract_start: {
                                description: "Ticks around contract start time.",
                                type: "array",
                                items: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        epoch: {
                                            description: "Epoch time of a tick or the contract start or end time.",
                                            type: "integer"
                                        },
                                        flag: {
                                            description: "A flag used to highlight the record in front-end applications.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        name: {
                                            description: "A short description of the data. It could be a tick or a time associated with the contract.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        },
                                        tick: {
                                            description: "The spot value at the given epoch.",
                                            type: [
                                                "null",
                                                "number"
                                            ]
                                        },
                                        tick_display_value: {
                                            description: "The spot value with the correct precision at the given epoch.",
                                            type: [
                                                "null",
                                                "string"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    barrier: {
                        description: "Barrier of the contract (if any).",
                        type: [
                            "null",
                            "string"
                        ],
                        examples: [
                            "42.123"
                        ]
                    },
                    barrier_count: {
                        description: "The number of barriers a contract has.",
                        type: "number",
                        examples: [
                            0,
                            1,
                            2
                        ]
                    },
                    bid_price: {
                        description: "Price at which the contract could be sold back to the company.",
                        type: "number",
                        examples: [
                            5.14
                        ]
                    },
                    buy_price: {
                        description: "Price at which contract was purchased",
                        type: "number"
                    },
                    cancellation: {
                        description: "Contains information about contract cancellation option.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            ask_price: {
                                description: "Ask price of contract cancellation option.",
                                type: "number"
                            },
                            date_expiry: {
                                description: "Expiry time in epoch for contract cancellation option.",
                                type: "integer"
                            }
                        }
                    },
                    commision: {
                        description: "Commission in payout currency amount.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    commission: {
                        description: "Commission in payout currency amount.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    contract_id: {
                        description: "The internal contract identifier",
                        type: "integer"
                    },
                    contract_type: {
                        description: "Contract type.",
                        type: "string",
                        examples: [
                            "CALL",
                            "PUT"
                        ]
                    },
                    currency: {
                        description: "The currency code of the contract.",
                        type: "string",
                        examples: [
                            "USD"
                        ]
                    },
                    current_spot: {
                        description: "Spot value if we have license to stream this symbol.",
                        type: "number",
                        examples: [
                            9874.52
                        ]
                    },
                    current_spot_display_value: {
                        description: "Spot value with the correct precision if we have license to stream this symbol.",
                        type: "string",
                        examples: [
                            "9874.520"
                        ]
                    },
                    current_spot_time: {
                        description: "The corresponding time of the current spot.",
                        type: "integer",
                        examples: [
                            1439999052
                        ]
                    },
                    date_expiry: {
                        description: "Expiry date (epoch) of the Contract. Please note that it is not applicable for tick trade contracts.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    date_settlement: {
                        description: "Settlement date (epoch) of the contract.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    date_start: {
                        description: "Start date (epoch) of the contract.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    display_name: {
                        description: "Display name of underlying",
                        type: "string"
                    },
                    display_value: {
                        description: "The `bid_price` with the correct precision",
                        type: "string"
                    },
                    entry_spot: {
                        description: "Same as `entry_tick`. For backwards compatibility.",
                        type: [
                            "null",
                            "number"
                        ]
                    },
                    entry_spot_display_value: {
                        description: "Same as `entry_tick_display_value`. For backwards compatibility.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    entry_tick: {
                        description: "This is the entry spot of the contract. For contracts starting immediately it is the next tick after the start time. For forward-starting contracts it is the spot at the start time.",
                        type: "number",
                        examples: [
                            86.63
                        ]
                    },
                    entry_tick_display_value: {
                        description: "This is the entry spot with the correct precision of the contract. For contracts starting immediately it is the next tick after the start time. For forward-starting contracts it is the spot at the start time.",
                        type: "string",
                        examples: [
                            "86.630"
                        ]
                    },
                    entry_tick_time: {
                        description: "This is the epoch time of the entry tick.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    exit_tick: {
                        description: "Exit tick can refer to the latest tick at the end time, the tick that fulfils the contract's winning or losing condition for path dependent contracts (Touch/No Touch and Stays Between/Goes Outside) or the tick at which the contract is sold before expiry.",
                        type: "number",
                        examples: [
                            86.81
                        ]
                    },
                    exit_tick_display_value: {
                        description: "Exit tick can refer to the latest tick at the end time, the tick that fulfils the contract's winning or losing condition for path dependent contracts (Touch/No Touch and Stays Between/Goes Outside) or the tick at which the contract is sold before expiry.",
                        type: "string",
                        examples: [
                            "86.810"
                        ]
                    },
                    exit_tick_time: {
                        description: "This is the epoch time of the exit tick. Note that since certain instruments don't tick every second, the exit tick time may be a few seconds before the end time.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    expiry_time: {
                        description: "This is the expiry time.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    high_barrier: {
                        description: "High barrier of the contract (if any).",
                        type: "string",
                        pattern: "^[+-]?[0-9]+\\.?[0-9]*$",
                        examples: [
                            "42.123"
                        ]
                    },
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    },
                    is_expired: {
                        description: "Whether the contract is expired or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_forward_starting: {
                        description: "Whether the contract is forward-starting or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_intraday: {
                        description: "Whether the contract is an intraday contract.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_path_dependent: {
                        description: "Whether the contract expiry price will depend on the path of the market (e.g. One Touch contract).",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_settleable: {
                        description: "Whether the contract is settleable or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_sold: {
                        description: "Whether the contract is sold or not.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_valid_to_cancel: {
                        description: "Whether the contract can be cancelled.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    is_valid_to_sell: {
                        description: "Whether the contract can be sold back to the company.",
                        type: "integer",
                        enum: [
                            0,
                            1
                        ]
                    },
                    limit_order: {
                        description: "Orders are applicable to `MULTUP` and `MULTDOWN` contracts only.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            stop_loss: {
                                description: "Contains information where the contract will be closed automatically at the loss specified by the user.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    display_name: {
                                        description: "Localized display name",
                                        type: "string"
                                    },
                                    order_amount: {
                                        description: "Stop loss amount",
                                        type: [
                                            "null",
                                            "number"
                                        ]
                                    },
                                    order_date: {
                                        description: "Stop loss order epoch",
                                        type: "integer"
                                    },
                                    value: {
                                        description: "Pip-sized barrier value",
                                        type: [
                                            "null",
                                            "string"
                                        ]
                                    }
                                }
                            },
                            stop_out: {
                                description: "Contains information where the contract will be closed automatically when the value of the contract is close to zero. This is set by the us.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    display_name: {
                                        description: "Localized display name",
                                        type: "string"
                                    },
                                    order_amount: {
                                        description: "Stop out amount",
                                        type: "number"
                                    },
                                    order_date: {
                                        description: "Stop out order epoch",
                                        type: "integer"
                                    },
                                    value: {
                                        description: "Pip-sized barrier value",
                                        type: "string"
                                    }
                                }
                            },
                            take_profit: {
                                description: "Contain information where the contract will be closed automatically at the profit specified by the user.",
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    display_name: {
                                        description: "Localized display name",
                                        type: "string"
                                    },
                                    order_amount: {
                                        description: "Take profit amount",
                                        type: [
                                            "null",
                                            "number"
                                        ]
                                    },
                                    order_date: {
                                        description: "Take profit order epoch",
                                        type: "integer"
                                    },
                                    value: {
                                        description: "Pip-sized barrier value",
                                        type: [
                                            "null",
                                            "string"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    longcode: {
                        description: "Text description of the contract purchased, Example: Win payout if Volatility 100 Index is strictly higher than entry spot at 10 minutes after contract start time.",
                        type: "string"
                    },
                    low_barrier: {
                        description: "Low barrier of the contract (if any).",
                        type: "string",
                        pattern: "^[+-]?[0-9]+\\.?[0-9]*$",
                        examples: [
                            "40.132"
                        ]
                    },
                    multiplier: {
                        description: "[Only for lookback trades] Multiplier applies when calculating the final payoff for each type of lookback. e.g. (Exit spot - Lowest historical price) * multiplier = Payout",
                        type: "number"
                    },
                    payout: {
                        description: "Payout value of the contract.",
                        type: "number",
                        examples: [
                            10.5
                        ]
                    },
                    profit: {
                        description: "The latest bid price minus buy price.",
                        type: "number"
                    },
                    profit_percentage: {
                        description: "Profit in percentage.",
                        type: "number"
                    },
                    purchase_time: {
                        description: "Epoch of purchase time, will be same as `date_start` for all contracts except forward starting contracts.",
                        type: "integer"
                    },
                    reset_time: {
                        description: "[Only for reset trades] The epoch time of a barrier reset.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    sell_price: {
                        description: "Price at which contract was sold, only available when contract has been sold.",
                        type: "number"
                    },
                    sell_spot: {
                        description: "Latest spot value at the sell time. (only present for contracts already sold). Will no longer be supported in the next API release.",
                        type: "number",
                        examples: [
                            86.63
                        ]
                    },
                    sell_spot_display_value: {
                        description: "Latest spot value with the correct precision at the sell time. (only present for contracts already sold). Will no longer be supported in the next API release.",
                        type: "string",
                        examples: [
                            "86.630"
                        ]
                    },
                    sell_spot_time: {
                        description: "Epoch time of the sell spot. Note that since certain underlyings don't tick every second, the sell spot time may be a few seconds before the sell time. (only present for contracts already sold). Will no longer be supported in the next API release.",
                        type: "integer",
                        examples: [
                            1446629000
                        ]
                    },
                    sell_time: {
                        description: "Epoch time of when the contract was sold (only present for contracts already sold)",
                        type: [
                            "integer",
                            "null"
                        ]
                    },
                    shortcode: {
                        description: "Coded description of the contract purchased.",
                        type: "string",
                        examples: [
                            "CALL_R_100_90_1446704187_1446704787_S0P_0"
                        ]
                    },
                    status: {
                        title: "Contract status",
                        description: "Contract status. Will be `sold` if the contract was sold back before expiry, `won` if won and `lost` if lost at expiry. Otherwise will be `open`",
                        type: [
                            "null",
                            "string"
                        ],
                        enum: [
                            "open",
                            "sold",
                            "won",
                            "lost",
                            "cancelled",
                            null
                        ]
                    },
                    tick_count: {
                        description: "Only for tick trades, number of ticks",
                        type: "integer"
                    },
                    tick_stream: {
                        description: "Tick stream from entry to end time.",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                epoch: {
                                    description: "Epoch time of a tick or the contract start or end time.",
                                    type: "integer"
                                },
                                tick: {
                                    description: "The spot value at the given epoch.",
                                    type: [
                                        "null",
                                        "number"
                                    ]
                                },
                                tick_display_value: {
                                    description: "The spot value with the correct precision at the given epoch.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                }
                            }
                        }
                    },
                    transaction_ids: {
                        title: "Transaction ids for contract",
                        description: "Every contract has buy and sell transaction ids, i.e. when you purchase a contract we associate it with buy transaction id, and if contract is already sold we associate that with sell transaction id.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            buy: {
                                description: "Buy transaction ID for that contract",
                                type: "integer"
                            },
                            sell: {
                                description: "Sell transaction ID for that contract, only present when contract is already sold.",
                                type: "integer"
                            }
                        }
                    },
                    underlying: {
                        description: "The underlying symbol code.",
                        type: "string",
                        examples: [
                            "R_50"
                        ]
                    },
                    validation_error: {
                        description: "Error message if validation fails",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "proposal_open_contract"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Profit Table (response)",
        description: "A summary of account profit table is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            profit_table: {
                title: "profit_table",
                description: "Account Profit Table.",
                type: "object",
                additionalProperties: false,
                properties: {
                    count: {
                        description: "Number of transactions returned in this call",
                        type: "number"
                    },
                    transactions: {
                        description: "Array of returned transactions",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                app_id: {
                                    description: "ID of the application where this contract was purchased.",
                                    type: [
                                        "integer",
                                        "null"
                                    ]
                                },
                                buy_price: {
                                    description: "The buy price",
                                    type: "number"
                                },
                                contract_id: {
                                    description: "The unique contract identifier.",
                                    type: [
                                        "integer",
                                        "null"
                                    ],
                                    examples: [
                                        4867502908
                                    ]
                                },
                                duration_type: {
                                    description: "The duration type of the contract.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                longcode: {
                                    description: "The description of contract purchased if description is set to 1",
                                    type: "string"
                                },
                                payout: {
                                    description: "Payout price",
                                    type: "number"
                                },
                                purchase_time: {
                                    description: "Epoch purchase time of the transaction",
                                    type: "integer"
                                },
                                sell_price: {
                                    description: "The price the contract sold for.",
                                    type: "number"
                                },
                                sell_time: {
                                    description: "Epoch sell time of the transaction",
                                    type: [
                                        "integer",
                                        "null"
                                    ]
                                },
                                shortcode: {
                                    description: "Compact description of the contract purchased if description is set to 1",
                                    type: "string"
                                },
                                transaction_id: {
                                    description: "The transaction Identifier. Every contract (buy or sell) and every payment has a unique transaction identifier.",
                                    type: "integer",
                                    examples: [
                                        10867502908
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "profit_table"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Reality Check (response)",
        description: "This gives summary of client's trades and account for reality check",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            reality_check: {
                title: "reality_check",
                description: "Reality check summary of trades.",
                type: "object",
                additionalProperties: false,
                properties: {
                    buy_amount: {
                        description: "Total amount of contract purchased.",
                        type: "number"
                    },
                    buy_count: {
                        description: "Total count of contract purchased.",
                        type: "integer"
                    },
                    currency: {
                        description: "Currency of client account i.e currency for trading",
                        type: "string"
                    },
                    loginid: {
                        description: "Client loginid.",
                        type: "string",
                        examples: [
                            "CR000000"
                        ]
                    },
                    open_contract_count: {
                        description: "Total count of contracts that are not yet expired.",
                        type: "integer"
                    },
                    potential_profit: {
                        description: "Indicative profit of contract as per current market price.",
                        type: "number"
                    },
                    sell_amount: {
                        description: "Total amount of contracts sold.",
                        type: "number"
                    },
                    sell_count: {
                        description: "Total count of contract sold.",
                        type: "integer"
                    },
                    start_time: {
                        description: "Reality check summary start time epoch",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "reality_check"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Revoke Oauth Application (response)",
        description: "A message with revoking a used application",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            revoke_oauth_app: {
                title: "revoke_oauth_app",
                description: "`1` on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "revoke_oauth_app"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Sell Contract (response)",
        description: "A message with transaction results is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            sell: {
                title: "sell",
                description: "Receipt for the transaction",
                type: "object",
                additionalProperties: false,
                properties: {
                    balance_after: {
                        description: "New account balance after completion of the sale",
                        type: "number"
                    },
                    contract_id: {
                        description: "Internal contract identifier for the sold contract",
                        type: "integer"
                    },
                    reference_id: {
                        description: "Internal transaction identifier for the corresponding buy transaction",
                        type: "integer"
                    },
                    sold_for: {
                        description: "Actual effected sale price",
                        type: "number"
                    },
                    transaction_id: {
                        description: "Internal transaction identifier for the sale transaction",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "sell"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Sell Contracts: Multiple Accounts (response)",
        description: "Confirmation of the sale status for the selected contracts and accounts.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            sell_contract_for_multiple_accounts: {
                title: "sell_contract_for_multiple_accounts",
                description: "Status information for each affected account.",
                type: "object",
                additionalProperties: false,
                properties: {
                    result: {
                        description: "The result of sell for multiple accounts request.",
                        type: "array",
                        items: {
                            anyOf: [
                                {
                                    title: "Receipt for the transaction",
                                    description: "Receipt for the transaction",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "balance_after",
                                        "contract_id",
                                        "reference_id",
                                        "sell_price",
                                        "transaction_id"
                                    ],
                                    properties: {
                                        balance_after: {
                                            description: "New account balance after completion of the sale",
                                            type: "number"
                                        },
                                        contract_id: {
                                            description: "Internal contract identifier",
                                            type: "integer"
                                        },
                                        reference_id: {
                                            description: "Internal transaction identifier for the corresponding transaction",
                                            type: "integer"
                                        },
                                        sell_price: {
                                            description: "Actual effected sale price",
                                            type: "number"
                                        },
                                        sell_time: {
                                            description: "date and time of sale `YYYY-MM-dd hh:mm:ss` format",
                                            type: "string"
                                        },
                                        transaction_id: {
                                            description: "Internal transaction identifier for the contract sale transaction",
                                            type: "integer"
                                        }
                                    }
                                },
                                {
                                    description: "Error message",
                                    type: "object",
                                    additionalProperties: false,
                                    required: [
                                        "code",
                                        "message_to_client",
                                        "token"
                                    ],
                                    properties: {
                                        code: {
                                            description: "An error code",
                                            type: "string"
                                        },
                                        message_to_client: {
                                            description: "An error message localized according to the websocket",
                                            type: "string"
                                        },
                                        token: {
                                            description: "The token designating the account",
                                            type: "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "sell_contract_for_multiple_accounts"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Sell Expired Contracts (response)",
        description: "The result of sell expired contract",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            sell_expired: {
                title: "sell_expired",
                description: "Sell expired contract object containing count of contracts sold",
                type: "object",
                additionalProperties: false,
                properties: {
                    count: {
                        description: "The number of contracts that has been sold.",
                        type: "integer",
                        examples: [
                            10
                        ]
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "sell_expired"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Server Status (response)",
        description: "Server status alongside general settings like call limits, currencies information, supported languages, etc.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            website_status: {
                title: "website_status",
                description: "Server status and other information regarding general settings",
                type: "object",
                additionalProperties: false,
                required: [
                    "api_call_limits",
                    "crypto_config",
                    "currencies_config",
                    "p2p_config"
                ],
                properties: {
                    api_call_limits: {
                        description: "Maximum number of API calls during specified period of time.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "max_proposal_subscription",
                            "max_requestes_general",
                            "max_requests_outcome",
                            "max_requests_pricing"
                        ],
                        properties: {
                            max_proposal_subscription: {
                                description: "Maximum subscription to proposal calls.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "applies_to",
                                    "max"
                                ],
                                properties: {
                                    applies_to: {
                                        description: "Describes which calls this limit applies to.",
                                        type: "string"
                                    },
                                    max: {
                                        description: "Maximum number of allowed calls.",
                                        type: "number"
                                    }
                                }
                            },
                            max_requestes_general: {
                                description: "Maximum number of general requests allowed during specified period of time.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "applies_to",
                                    "hourly",
                                    "minutely"
                                ],
                                properties: {
                                    applies_to: {
                                        description: "Describes which calls this limit applies to.",
                                        type: "string"
                                    },
                                    hourly: {
                                        description: "The maximum of allowed calls per hour.",
                                        type: "number"
                                    },
                                    minutely: {
                                        description: "The maximum of allowed calls per minute.",
                                        type: "number"
                                    }
                                }
                            },
                            max_requests_outcome: {
                                description: "Maximum number of outcome requests allowed during specified period of time.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "applies_to",
                                    "hourly",
                                    "minutely"
                                ],
                                properties: {
                                    applies_to: {
                                        description: "Describes which calls this limit applies to.",
                                        type: "string"
                                    },
                                    hourly: {
                                        description: "The maximum of allowed calls per hour.",
                                        type: "number"
                                    },
                                    minutely: {
                                        description: "The maximum of allowed calls per minute.",
                                        type: "number"
                                    }
                                }
                            },
                            max_requests_pricing: {
                                description: "Maximum number of pricing requests allowed during specified period of time.",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "applies_to",
                                    "hourly",
                                    "minutely"
                                ],
                                properties: {
                                    applies_to: {
                                        description: "Describes which calls this limit applies to.",
                                        type: "string"
                                    },
                                    hourly: {
                                        description: "The maximum of allowed calls per hour.",
                                        type: "number"
                                    },
                                    minutely: {
                                        description: "The maximum of allowed calls per minute.",
                                        type: "number"
                                    }
                                }
                            }
                        }
                    },
                    clients_country: {
                        description: "Country code of connected IP",
                        type: "string"
                    },
                    crypto_config: {
                        description: "Provides minimum withdrawal for all crypto currency in USD",
                        type: "object",
                        minProperties: 0,
                        patternProperties: {
                            "^[a-zA-Z0-9]{2,20}$": {
                                description: "Crypto-currency code",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "minimum_withdrawal"
                                ],
                                properties: {
                                    minimum_withdrawal: {
                                        description: "Minimum withdrawal for the currency in USD.",
                                        type: "number"
                                    }
                                }
                            }
                        }
                    },
                    currencies_config: {
                        description: "Available currencies and their information",
                        type: "object",
                        minProperties: 1,
                        patternProperties: {
                            "^[a-zA-Z0-9]{2,20}$": {
                                description: "Currency code",
                                type: "object",
                                additionalProperties: false,
                                required: [
                                    "fractional_digits",
                                    "is_deposit_suspended",
                                    "is_suspended",
                                    "is_withdrawal_suspended",
                                    "stake_default",
                                    "transfer_between_accounts",
                                    "type"
                                ],
                                properties: {
                                    fractional_digits: {
                                        description: "Number of fractional digits.",
                                        type: "number"
                                    },
                                    is_deposit_suspended: {
                                        description: "Current status for payment deposit for the currency",
                                        type: "number",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    is_suspended: {
                                        description: "Current status for the currency",
                                        type: "number",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    is_withdrawal_suspended: {
                                        description: "Current status for payment withdrawal for the currency",
                                        type: "number",
                                        enum: [
                                            0,
                                            1
                                        ]
                                    },
                                    name: {
                                        description: "Name of the currency.",
                                        type: "string"
                                    },
                                    stake_default: {
                                        description: "Default stake value for the currency.",
                                        type: "number",
                                        minimum: 0
                                    },
                                    transfer_between_accounts: {
                                        description: "Fees and range of allowed amount for transfer between accounts with different types of currencies.",
                                        type: "object",
                                        additionalProperties: false,
                                        required: [
                                            "fees",
                                            "limits"
                                        ],
                                        properties: {
                                            fees: {
                                                description: "The fee that applies for transfer between accounts with different types of currencies.",
                                                type: "object",
                                                patternProperties: {
                                                    "^[a-zA-Z0-9]{2,20}$": {
                                                        description: "Currency code.",
                                                        type: "number",
                                                        maximum: 7,
                                                        minimum: 0
                                                    }
                                                }
                                            },
                                            limits: {
                                                description: "Range of allowed amount for transfer between accounts.",
                                                oneOf: [
                                                    {
                                                        type: "object",
                                                        required: [
                                                            "min"
                                                        ],
                                                        properties: {
                                                            max: {
                                                                description: "Maximum allowed amount for transfer between accounts with different types of currencies.",
                                                                type: "number",
                                                                minimum: 0
                                                            },
                                                            min: {
                                                                description: "Minimum allowed amount for transfer between accounts with different types of currencies.",
                                                                type: "number",
                                                                minimum: 0
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: "null"
                                                    }
                                                ]
                                            },
                                            limits_dxtrade: {
                                                description: "Range of allowed amount for transfer between dxtrade accounts.",
                                                type: "object"
                                            },
                                            limits_mt5: {
                                                description: "Range of allowed amount for transfer between mt5 accounts.",
                                                type: "object"
                                            }
                                        }
                                    },
                                    type: {
                                        description: "Type of the currency.",
                                        type: "string",
                                        enum: [
                                            "fiat",
                                            "crypto"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    message: {
                        description: "Text for site status banner, contains problem description. shown only if set by the system.",
                        type: "string"
                    },
                    p2p_config: {
                        description: "Peer-to-peer payment system settings.",
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "adverts_active_limit",
                            "cancellation_block_duration",
                            "cancellation_count_period",
                            "cancellation_grace_period",
                            "cancellation_limit",
                            "disabled",
                            "maximum_advert_amount",
                            "maximum_order_amount",
                            "order_daily_limit",
                            "order_payment_period"
                        ],
                        properties: {
                            adverts_active_limit: {
                                description: "Maximum number of active ads allowed by an advertiser per currency pair and advert type (buy or sell).",
                                type: "integer"
                            },
                            adverts_archive_period: {
                                description: "Adverts will be deactivated if no activity occurs within this period, in days.",
                                type: "integer"
                            },
                            cancellation_block_duration: {
                                description: "A buyer will be blocked for this duration after exceeding the cancellation limit, in hours.",
                                type: "integer"
                            },
                            cancellation_count_period: {
                                description: "The period within which to count buyer cancellations, in hours.",
                                type: "integer"
                            },
                            cancellation_grace_period: {
                                description: "A buyer may cancel an order within this period without negative consequences, in minutes after order creation.",
                                type: "integer"
                            },
                            cancellation_limit: {
                                description: "A buyer will be temporarily barred after marking this number of cancellations within cancellation_period.",
                                type: "integer"
                            },
                            disabled: {
                                description: "When 1, the P2P service is unavailable.",
                                type: "integer",
                                enum: [
                                    0,
                                    1
                                ]
                            },
                            maximum_advert_amount: {
                                description: "Maximum amount of an advert, in USD.",
                                type: "number"
                            },
                            maximum_order_amount: {
                                description: "Maximum amount of an order, in USD.",
                                type: "number"
                            },
                            order_daily_limit: {
                                description: "Maximum number of orders a user may create per day.",
                                type: "integer"
                            },
                            order_payment_period: {
                                description: "Time allowed for order payment, in minutes after order creation.",
                                type: "integer"
                            }
                        }
                    },
                    site_status: {
                        description: "The current status of the website.",
                        type: "string",
                        enum: [
                            "up",
                            "down",
                            "updating"
                        ]
                    },
                    supported_languages: {
                        description: "Provides codes for languages supported.",
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    terms_conditions_version: {
                        description: "Latest terms and conditions version.",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "website_status"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Server Time (response)",
        description: "The result of server time request.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            time: {
                title: "time",
                description: "Epoch of server time.",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "time"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Server list (response)",
        description: "Get list of servers for the platform provided.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            trading_servers: {
                title: "trading_servers",
                description: "Array containing platform server objects.",
                type: "array",
                items: {
                    title: "Details of each server.",
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        account_type: {
                            description: "Supported trading account type.",
                            type: "string",
                            enum: [
                                "demo",
                                "real"
                            ]
                        },
                        disabled: {
                            description: "Flag to represent if this server is currently disabled or not",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        environment: {
                            description: "Current environment (installation instance) where servers are deployed. Currently, there are one demo and two real environments.",
                            type: "string",
                            enum: [
                                "Deriv-Demo",
                                "Deriv-Server",
                                "Deriv-Server-02"
                            ]
                        },
                        geolocation: {
                            description: "Object containing geolocation information of the server.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                location: {
                                    description: "Geolocation country or place where server is located.",
                                    type: "string"
                                },
                                region: {
                                    description: "Geolocation region where server is located.",
                                    type: "string"
                                },
                                sequence: {
                                    description: "Sequence number of the server in that region.",
                                    type: "integer"
                                }
                            }
                        },
                        id: {
                            description: "Server unique id.",
                            type: "string",
                            enum: [
                                "p01_ts01",
                                "p01_ts02",
                                "p01_ts03",
                                "p01_ts04",
                                "p02_ts02"
                            ]
                        },
                        market_type: {
                            description: "Market type",
                            type: "string"
                        },
                        message_to_client: {
                            description: "Error message to client when server is disabled",
                            type: "string"
                        },
                        recommended: {
                            description: "Flag to represent if this is server is recommended based on client's country of residence.",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        supported_accounts: {
                            description: "Account type supported by the server.",
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "trading_servers"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Account Currency (response)",
        description: "Status of set account currency call",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            set_account_currency: {
                title: "set_account_currency",
                description: "`1`: success, `0`: no change",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "set_account_currency"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Account Settings (response)",
        description: "A message with User Settings",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            set_settings: {
                title: "set_settings",
                description: "1 on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "set_settings"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Financial Assessment (response)",
        description: "Set Financial Assessment Receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            set_financial_assessment: {
                title: "set_financial_assessment",
                description: "The financial assessment score assigned to the submitted financial assessment",
                type: "object",
                additionalProperties: false,
                properties: {
                    cfd_score: {
                        description: "CFD score based on answers",
                        type: "integer"
                    },
                    financial_information_score: {
                        description: "Financial information score based on answers",
                        type: "integer"
                    },
                    total_score: {
                        description: "Financial Assessment score based on answers",
                        type: "integer"
                    },
                    trading_score: {
                        description: "Trading experience score based on answers",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "set_financial_assessment"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Set Self-Exclusion (response)",
        description: "A message with User Self-Exclusion",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            set_self_exclusion: {
                title: "set_self_exclusion",
                description: "`1` on success",
                type: "integer"
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "set_self_exclusion"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Statement (response)",
        description: "A summary of account statement is received",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            statement: {
                title: "statement",
                description: "Account statement.",
                type: "object",
                additionalProperties: false,
                properties: {
                    count: {
                        description: "Number of transactions returned in this call",
                        type: "number"
                    },
                    transactions: {
                        description: "Array of returned transactions",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                action_type: {
                                    description: "It is the type of action.",
                                    type: "string",
                                    enum: [
                                        "buy",
                                        "sell",
                                        "deposit",
                                        "withdrawal",
                                        "hold",
                                        "release",
                                        "adjustment",
                                        "virtual_credit",
                                        "transfer"
                                    ]
                                },
                                amount: {
                                    description: "It is the amount of transaction.",
                                    type: "number",
                                    examples: [
                                        -83.23
                                    ]
                                },
                                app_id: {
                                    description: "ID of the application where this contract was purchased.",
                                    type: [
                                        "integer",
                                        "null"
                                    ]
                                },
                                balance_after: {
                                    description: "It is the remaining balance.",
                                    type: "number",
                                    examples: [
                                        10150.13
                                    ]
                                },
                                contract_id: {
                                    description: "It is the contract ID.",
                                    type: [
                                        "integer",
                                        "null"
                                    ],
                                    examples: [
                                        4867502908
                                    ]
                                },
                                fees: {
                                    description: "Contains details about fees used for transfer. It is present only when action type is transfer.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        amount: {
                                            description: "Fees amount",
                                            type: "number"
                                        },
                                        currency: {
                                            description: "Fees currency",
                                            type: "string"
                                        },
                                        minimum: {
                                            description: "Minimum amount of fees",
                                            type: "number"
                                        },
                                        percentage: {
                                            description: "Fees percentage",
                                            type: "number"
                                        }
                                    }
                                },
                                from: {
                                    description: "Contains details of account from which amount was transferred. It is present only when action type is transfer.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        loginid: {
                                            description: "Login id of the account from which money was transferred.",
                                            type: "string"
                                        }
                                    }
                                },
                                longcode: {
                                    description: "The description of contract purchased if description is set to `1`.",
                                    type: "string"
                                },
                                payout: {
                                    description: "Payout price",
                                    type: [
                                        "null",
                                        "number"
                                    ]
                                },
                                purchase_time: {
                                    description: "Time at which contract was purchased, present only for sell transaction",
                                    type: "integer"
                                },
                                reference_id: {
                                    description: "Internal transaction identifier for the corresponding buy transaction ( set only for contract selling )",
                                    type: [
                                        "integer",
                                        "null"
                                    ]
                                },
                                shortcode: {
                                    description: "Compact description of the contract purchased if description is set to `1`.",
                                    type: [
                                        "null",
                                        "string"
                                    ]
                                },
                                to: {
                                    description: "Contains details of account to which amount was transferred. It is present only when action type is transfer.",
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                        loginid: {
                                            description: "Login id of the account to which money was transferred.",
                                            type: "string"
                                        }
                                    }
                                },
                                transaction_id: {
                                    description: "It is the transaction ID. In statement every contract (buy or sell) and every payment has a unique ID.",
                                    type: "integer",
                                    examples: [
                                        10867502908
                                    ]
                                },
                                transaction_time: {
                                    description: "It is the time of transaction.",
                                    type: "integer",
                                    examples: [
                                        1441175849
                                    ]
                                },
                                withdrawal_details: {
                                    description: "Additional withdrawal details such as typical processing times, if description is set to `1`.",
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "statement"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "States List (response)",
        description: "A message with States List",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            states_list: {
                title: "states_list",
                description: "List of states.",
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        text: {
                            description: "The state name.",
                            type: "string"
                        },
                        value: {
                            description: "The state code.",
                            type: "string"
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "states_list"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Terms and Conditions Approval (response)",
        description: "The result of T&C approval request.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            tnc_approval: {
                title: "tnc_approval",
                description: "Set terms and conditions 1: success",
                type: "integer",
                enum: [
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "tnc_approval"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Ticks History (response)",
        description: "Historic tick data for a single symbol",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Type of the response according to the `style` sent in request. Would be `history` or `candles` for the first response, and `tick` or `ohlc` for the rest when subscribed.",
                type: "string",
                enum: [
                    "history",
                    "tick",
                    "candles",
                    "ohlc"
                ]
            },
            candles: {
                title: "candles",
                description: "Array of OHLC (open/high/low/close) price values for the given time (only for style=`candles`)",
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        close: {
                            description: "It is the close price value for the given time",
                            type: "number"
                        },
                        epoch: {
                            description: "It is an epoch value",
                            type: "integer"
                        },
                        high: {
                            description: "It is the high price value for the given time",
                            type: "number"
                        },
                        low: {
                            description: "It is the low price value for the given time",
                            type: "number"
                        },
                        open: {
                            description: "It is the open price value for the given time",
                            type: "number"
                        }
                    }
                }
            },
            history: {
                title: "history",
                description: "Historic tick data for a given symbol. Note: this will always return the latest possible set of ticks with accordance to the parameters specified.",
                type: "object",
                additionalProperties: false,
                properties: {
                    prices: {
                        description: "An array containing list of tick values for the corresponding epoch values in `times` array.",
                        type: "array",
                        items: {
                            description: "Tick value.",
                            type: "number"
                        }
                    },
                    times: {
                        description: "An array containing list of epoch values for the corresponding tick values in `prices` array.",
                        type: "array",
                        items: {
                            description: "Epoch of the tick.",
                            type: "integer"
                        }
                    }
                }
            },
            pip_size: {
                description: "Indicates the number of decimal points that the returned amounts must be displayed with",
                type: "number"
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Ticks Stream (response)",
        description: "Latest spot price for a given symbol. Continuous responses with a frequency of up to one second.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Type of the response.",
                type: "string",
                enum: [
                    "tick"
                ]
            },
            tick: {
                title: "TickSpotData",
                description: "Tick by tick list of streamed data",
                type: "object",
                additionalProperties: false,
                required: [
                    "pip_size"
                ],
                properties: {
                    ask: {
                        description: "Market ask at the epoch",
                        type: "number"
                    },
                    bid: {
                        description: "Market bid at the epoch",
                        type: "number"
                    },
                    epoch: {
                        description: "Epoch time of the tick",
                        type: "integer"
                    },
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    },
                    pip_size: {
                        description: "Indicates the number of decimal points that the returned amounts must be displayed with",
                        type: "number"
                    },
                    quote: {
                        description: "Market value at the epoch",
                        type: "number"
                    },
                    symbol: {
                        description: "Symbol",
                        type: "string"
                    }
                }
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Durations (response)",
        description: "A message with trading duration information for symbol and contract combinations.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            trading_durations: {
                title: "trading_durations",
                description: "List of underlyings by their display name and symbol followed by their available contract types and trading duration boundaries.",
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        data: {
                            title: "data",
                            description: "Available contract types and trading duration boundaries",
                            type: "array",
                            items: {
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                    market: {
                                        description: "The market in which the underlyings listed in `symbol` located.",
                                        type: "object",
                                        additionalProperties: false,
                                        properties: {
                                            display_name: {
                                                description: "Translated market name.",
                                                type: "string"
                                            },
                                            name: {
                                                description: "Market name.",
                                                type: "string"
                                            }
                                        }
                                    },
                                    submarket: {
                                        description: "The submarket in which the underlyings listed in `symbol` located.",
                                        type: "object",
                                        additionalProperties: false,
                                        properties: {
                                            display_name: {
                                                description: "Translated submarket name.",
                                                type: "string"
                                            },
                                            name: {
                                                description: "Submarket name.",
                                                type: "string"
                                            }
                                        }
                                    },
                                    symbol: {
                                        description: "List of underlying symbols.",
                                        type: "array",
                                        items: {
                                            type: "object",
                                            additionalProperties: false,
                                            properties: {
                                                display_name: {
                                                    description: "Translated symbol name.",
                                                    type: "string"
                                                },
                                                name: {
                                                    description: "Symbol name.",
                                                    type: "string"
                                                }
                                            }
                                        }
                                    },
                                    trade_durations: {
                                        description: "List of trade durations available for symbols and contract combinations.",
                                        type: "array",
                                        items: {
                                            type: "object",
                                            additionalProperties: false,
                                            properties: {
                                                durations: {
                                                    description: "List of trade durations available for the symbols.",
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        additionalProperties: false,
                                                        properties: {
                                                            display_name: {
                                                                description: "Translated duration type name.",
                                                                type: "string"
                                                            },
                                                            max: {
                                                                description: "Maximum allowed duration for this type.",
                                                                type: "integer"
                                                            },
                                                            min: {
                                                                description: "Minimum allowed duration for this type.",
                                                                type: "integer"
                                                            },
                                                            name: {
                                                                description: "Duration type name.",
                                                                type: "string"
                                                            }
                                                        }
                                                    }
                                                },
                                                trade_type: {
                                                    description: "List of trade types available for the symbols.",
                                                    type: "object",
                                                    additionalProperties: false,
                                                    properties: {
                                                        display_name: {
                                                            description: "Translated trade type name.",
                                                            type: "string"
                                                        },
                                                        name: {
                                                            description: "Trade type name.",
                                                            type: "string"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        market: {
                            description: "The market in which the underlyings listed in `symbol` located.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                display_name: {
                                    description: "Translated market name.",
                                    type: "string"
                                },
                                name: {
                                    description: "Market name.",
                                    type: "string"
                                }
                            }
                        },
                        submarket: {
                            description: "The submarket in which the underlyings listed in `symbol` located.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                                display_name: {
                                    description: "Translated submarket name.",
                                    type: "string"
                                },
                                name: {
                                    description: "Submarket name.",
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "trading_durations"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Platform: Investor Password Reset (response)",
        description: "The result of the Trading Platform investor password reset.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "trading_platform_investor_password_reset"
                ]
            },
            trading_platform_password_reset: {
                title: "trading_platform_investor_password_reset",
                description: "If set to 1, the investor password has been reset.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Platform: Password Reset (response)",
        description: "The result of the Trading Platform password reset.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            trading_platform_password_reset: {
                title: "trading_platform_password_reset",
                description: "If set to 1, the password has been reset.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "trading_platform_password_reset"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Trading Times (response)",
        description: "A message with Trading Times",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            trading_times: {
                title: "trading_times",
                description: "The trading times structure is a hierarchy as follows: Market -> SubMarket -> Underlyings",
                type: "object",
                additionalProperties: false,
                required: [
                    "markets"
                ],
                properties: {
                    markets: {
                        description: "An array of markets",
                        type: "array",
                        items: {
                            type: "object",
                            additionalProperties: false,
                            required: [
                                "name"
                            ],
                            properties: {
                                name: {
                                    description: "Market name",
                                    type: "string"
                                },
                                submarkets: {
                                    description: "An array of submarkets",
                                    type: "array",
                                    items: {
                                        type: "object",
                                        additionalProperties: false,
                                        required: [
                                            "name"
                                        ],
                                        properties: {
                                            name: {
                                                description: "Submarket name",
                                                type: "string"
                                            },
                                            symbols: {
                                                description: "Symbols array",
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    additionalProperties: false,
                                                    required: [
                                                        "name",
                                                        "symbol"
                                                    ],
                                                    properties: {
                                                        events: {
                                                            description: "Events",
                                                            type: "array"
                                                        },
                                                        name: {
                                                            description: "Symbol name",
                                                            type: "string"
                                                        },
                                                        symbol: {
                                                            description: "Symbol shortcode",
                                                            type: "string"
                                                        },
                                                        times: {
                                                            description: "Open, close and settlement times",
                                                            type: "object"
                                                        },
                                                        trading_days: {
                                                            description: "Trading days",
                                                            type: "array",
                                                            items: {
                                                                type: "string",
                                                                enum: [
                                                                    "Sun",
                                                                    "Mon",
                                                                    "Tue",
                                                                    "Wed",
                                                                    "Thu",
                                                                    "Fri",
                                                                    "Sat"
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "trading_times"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Transactions Stream (response)",
        description: "Return transaction updates",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            transaction: {
                title: "transaction",
                description: "Realtime stream of user transaction updates.",
                type: "object",
                additionalProperties: false,
                properties: {
                    action: {
                        description: "The transaction type.",
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
                    amount: {
                        description: "It is the amount of transaction performed.",
                        type: "number",
                        examples: [
                            -83.23
                        ]
                    },
                    balance: {
                        description: "Balance amount",
                        type: "number",
                        maximum: 10000000000000000000,
                        minimum: 0
                    },
                    barrier: {
                        description: "Barrier of the contract. Only applicable to single barrier contracts. Could be undefined if a contract does not have a barrier.",
                        type: [
                            "null",
                            "number",
                            "string"
                        ]
                    },
                    contract_id: {
                        description: "It is the contract ID.",
                        type: [
                            "integer",
                            "null"
                        ],
                        examples: [
                            4867502908
                        ]
                    },
                    currency: {
                        description: "Transaction currency",
                        type: "string"
                    },
                    date_expiry: {
                        description: "Epoch value of the expiry time of the contract. Please note that in case of buy transaction this is approximate value not exact one.",
                        type: "integer"
                    },
                    display_name: {
                        description: "Display name of symbol",
                        type: "string"
                    },
                    high_barrier: {
                        description: "The high barrier of a contract. Only applicable to double barrier contracts.",
                        type: [
                            "number",
                            "string"
                        ]
                    },
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    },
                    longcode: {
                        description: "Description of contract purchased",
                        type: "string"
                    },
                    low_barrier: {
                        description: "The low barrier of a contract. Only applicable to double barrier contracts.",
                        type: "string"
                    },
                    purchase_time: {
                        description: "Time at which contract was purchased, present only for sell transaction",
                        type: "integer"
                    },
                    stop_loss: {
                        description: "The pip-sized target spot price where the contract will be closed automatically at the loss specified by the user.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    stop_out: {
                        description: "The pip-sized target spot price where the contract will be closed automatically when the value of the contract is close to zero. This is set by the us.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    symbol: {
                        description: "Symbol code",
                        type: "string"
                    },
                    take_profit: {
                        description: "The pip-sized target spot price where the contract will be closed automatically at the profit specified by the user.",
                        type: [
                            "null",
                            "string"
                        ]
                    },
                    transaction_id: {
                        description: "It is the transaction ID. Every contract (buy or sell) or payment has a unique ID.",
                        type: "integer",
                        examples: [
                            10867502908
                        ]
                    },
                    transaction_time: {
                        description: "Time at which transaction was performed: for buy it is purchase time, for sell it is sell time.",
                        type: "integer"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "transaction"
                ]
            },
            subscription: {
                title: "Subscription information",
                description: "For subscription requests only.",
                type: "object",
                additionalProperties: false,
                required: [
                    "id"
                ],
                properties: {
                    id: {
                        description: "A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.",
                        type: "string",
                        examples: [
                            "c84a793b-8a87-7999-ce10-9b22f7ceead3"
                        ]
                    }
                }
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Transfer Between Accounts (response)",
        description: "The result of transfer order.",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            transfer_between_accounts: {
                title: "transfer_between_accounts",
                description: "If set to 1, transfer succeeded.",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "transfer_between_accounts"
                ]
            },
            accounts: {
                description: "The available accounts to transfer, or the accounts affected by a successful transfer.",
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        account_type: {
                            description: "Type of the account. Please note that `binary` is deprecated and replaced by `trading`",
                            type: "string",
                            enum: [
                                "trading",
                                "mt5",
                                "wallet",
                                "dxtrade",
                                "binary"
                            ]
                        },
                        balance: {
                            description: "Account balance.",
                            type: "string"
                        },
                        currency: {
                            description: "Default account currency.",
                            type: "string",
                            examples: [
                                "USD"
                            ]
                        },
                        demo_account: {
                            description: "0 for real accounts; 1 for virtual/demo accounts.",
                            type: "integer",
                            enum: [
                                0,
                                1
                            ]
                        },
                        loginid: {
                            description: "Account identifier used for system transfers.",
                            type: "string",
                            examples: [
                                "CR000000"
                            ]
                        },
                        market_type: {
                            description: "Market type of account.",
                            type: "string",
                            enum: [
                                "financial",
                                "synthetic"
                            ]
                        },
                        mt5_group: {
                            description: "The group of mt5 account.",
                            type: "string",
                            examples: [
                                "real\u000banuatu_financial"
                            ]
                        }
                    }
                }
            },
            client_to_full_name: {
                description: "The account to client full name",
                type: "string"
            },
            client_to_loginid: {
                description: "The account to client loginid",
                type: "string"
            },
            transaction_id: {
                description: "Reference ID of transfer performed",
                type: "integer"
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Update Contract (response)",
        description: "Contract update status",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            contract_update: {
                title: "contract_update",
                description: "Contains the update status of the request",
                type: "object",
                additionalProperties: false,
                properties: {
                    stop_loss: {
                        description: "The target spot price where the contract will be closed automatically at the loss specified by the user.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            display_name: {
                                description: "Localized display name",
                                type: "string"
                            },
                            order_amount: {
                                description: "Stop loss amount",
                                type: [
                                    "null",
                                    "number"
                                ]
                            },
                            order_date: {
                                description: "Stop loss order epoch",
                                type: "integer"
                            },
                            value: {
                                description: "Stop loss pip-sized barrier value",
                                type: [
                                    "null",
                                    "string"
                                ]
                            }
                        }
                    },
                    take_profit: {
                        description: "The target spot price where the contract will be closed automatically at the profit specified by the user.",
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            display_name: {
                                description: "Localized display name",
                                type: "string"
                            },
                            order_amount: {
                                description: "Take profit amount",
                                type: [
                                    "null",
                                    "number"
                                ]
                            },
                            order_date: {
                                description: "Take profit order epoch",
                                type: "integer"
                            },
                            value: {
                                description: "Take profit pip-sized barrier value",
                                type: [
                                    "null",
                                    "string"
                                ]
                            }
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "contract_update"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Update Contract History (response)",
        description: "Contract update history status",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            contract_update_history: {
                title: "contract_update_history",
                description: "Contains the historical and the most recent update status of the contract",
                type: "array",
                items: {
                    description: "Contains the changed parameter.",
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        display_name: {
                            description: "Display name of the changed parameter.",
                            type: "string"
                        },
                        order_amount: {
                            description: "The amount.",
                            type: "string"
                        },
                        order_date: {
                            description: "The epoch when the changed was done.",
                            type: "integer"
                        },
                        order_type: {
                            description: "The contract parameter updated.",
                            type: "string"
                        },
                        value: {
                            description: "The pip-sized barrier value.",
                            type: [
                                "null",
                                "string"
                            ]
                        }
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "contract_update_history"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Verify Email (response)",
        description: "Verify Email Receive",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            verify_email: {
                title: "verify_email",
                description: "1 for success (secure code has been sent to the email address)",
                type: "integer",
                enum: [
                    0,
                    1
                ]
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "verify_email"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    },
    {
        title: "Top Up Virtual-Money Account (response)",
        description: "The result of virtual money top up",
        type: "object",
        required: [
            "echo_req",
            "msg_type"
        ],
        properties: {
            topup_virtual: {
                title: "topup_virtual",
                description: "The information regarding a successful top up for a virtual money account",
                type: "object",
                additionalProperties: false,
                properties: {
                    amount: {
                        description: "Top up amount",
                        type: "number"
                    },
                    currency: {
                        description: "Top up currency string",
                        type: "string"
                    }
                }
            },
            echo_req: {
                description: "Echo of the request made.",
                type: "object"
            },
            msg_type: {
                description: "Action name of the request made.",
                type: "string",
                enum: [
                    "topup_virtual"
                ]
            },
            req_id: {
                description: "Optional field sent in request to map to response, present only when request contains `req_id`.",
                type: "integer"
            }
        }
    }
]

