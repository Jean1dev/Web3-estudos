use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use crate::state::*;
use std::str::FromStr;

#[derive(Accounts)]
pub struct TradeNft<'info> {
    #[account(mut)]
    pub achiviement: Account<'info, MyAchievement>,
    #[account(mut)]
    pub signer: Signer<'info>,
}

pub fn handler(ctx: Context<TradeNft>) -> Result<()> {
    let achiviement = &mut ctx.accounts.achiviement;
    let signer = &mut ctx.accounts.signer;

    if achiviement.owner == signer.key().to_string() {
        return Err(ErrorCode::Unauthorized.into());
    }

    let lamports = (achiviement.price * 1_000_000_000.0) as u64; // Convert SOL to lamports

    let owner_pubkey = Pubkey::from_str(&achiviement.owner).map_err(|_| ErrorCode::InvalidOwner)?;

    let ix = system_instruction::transfer(&signer.key(), &owner_pubkey, lamports);

    anchor_lang::solana_program::program::invoke(
        &ix,
        &[signer.to_account_info(), achiviement.to_account_info()],
    )?;

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized action")]
    Unauthorized,
    #[msg("Invalid owner address")]
    InvalidOwner,
}
