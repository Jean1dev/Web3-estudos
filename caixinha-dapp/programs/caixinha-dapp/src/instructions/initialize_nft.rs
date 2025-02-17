use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct InitializeNewNft<'info> {
    #[account(init, payer = authority, space = 8 + 1024 + 32 + 8 + 32 + 32)]
    pub nft: Account<'info, MyAchievement>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeNewNft>,
    name: String,
    img_url: String,
    price: f32,
) -> Result<()> {
    let nft = &mut ctx.accounts.nft;
    let authority = &mut ctx.accounts.authority;

    nft.name = name;
    nft.img_url = img_url;
    nft.price = price;
    nft.creator = authority.key();

    msg!("New Nft create {}! ", nft.name);
    Ok(())
}
