use anchor_lang::prelude::*;

#[account]
pub struct Caixinha {
    pub name: String,
    pub desc: String,
    pub ref_id: String,
    pub amount: f32,
    pub deposits_count: u8,
    pub owner: Pubkey,
}
