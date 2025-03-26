import { Idl } from '@coral-xyz/anchor';

export type VaquinhaDaap = {
    "version": "0.1.0",
    "name": "bb",
    "instructions": [
        {
            "name": "createVaquinha",
            "accounts": [
                {
                    "name": "vaquinha",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "description",
                    "type": "string"
                }
            ]
        },
        {
            "name": "donate",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "vaquinha",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdraw",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "vaquinha",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "vaquinha",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "name": "amountDonated",
                        "type": "u64"
                    },
                    {
                        "name": "owner",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "WithDrawErrorCode",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Nofund"
                    },
                    {
                        "name": "WrongOwner"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "AmountInvalid",
            "msg": "Donated amount must be greater than zero"
        }
    ]
};

const idl: Idl = {
    version: "0.1.0",
    name: "bb",
    instructions: [
        {
            name: "createVaquinha",
            accounts: [
                {
                    name: "vaquinha",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "creator",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "name",
                    type: "string",
                },
                {
                    name: "description",
                    type: "string",
                },
            ],
        },
        {
            name: "donate",
            accounts: [
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "vaquinha",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "amount",
                    type: "u64",
                },
            ],
        },
        {
            name: "withdraw",
            accounts: [
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "vaquinha",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: "Vaquinha",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "description",
                        type: "string",
                    },
                    {
                        name: "amountDonated",
                        type: "u64",
                    },
                    {
                        name: "owner",
                        type: "publicKey",
                    },
                ],
            },
        },
    ],
    types: [
        {
            name: "WithDrawErrorCode",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Nofund",
                    },
                    {
                        name: "WrongOwner",
                    },
                ],
            },
        },
    ],
    errors: [
        {
            code: 6000,
            name: "AmountInvalid",
            msg: "Donated amount must be greater than zero",
        },
    ],
    metadata: {
        address: "7Ekb4SwLqSp34xuZf35rn5M6cHmHiNDoZLoVfQ57ed9",
    },
};

export default idl;