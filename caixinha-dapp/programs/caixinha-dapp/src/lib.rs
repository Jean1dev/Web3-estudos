use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;

pub use state::*;
pub use instructions::*;

declare_id!("Do72vP6pm2g9UDAy8mhP7LrEPoHD4c5SQXacbrQ2aoDv");

#[program]
pub mod caixinha_dapp {
    use super::*;

    pub fn create_caixinha(
        ctx: Context<CreateCaixinha>,
        name: String,
        desc: String,
        ref_id: String,
    ) -> Result<()> {
        instructions::create_caixinha::handler(ctx, name, desc, ref_id)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: f32) -> Result<()> {
        instructions::deposit::handler(ctx, amount)
    }

    pub fn create_new_nft(
        ctx: Context<InitializeNewNft>,
        name: String,
        img_url: String,
        price: f32
    ) -> Result<()> {
        instructions::initialize_nft::handler(ctx, name, img_url, price)
    }
}
