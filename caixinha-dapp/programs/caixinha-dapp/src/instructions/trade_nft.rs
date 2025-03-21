use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use crate::state::*;

#[derive(Accounts)]
pub struct TradeNft<'info> {
    #[account(mut)]
    pub achiviement: Account<'info, MyAchievement>,
    /// CHECK: This account is safe because it is provided by the user and will be validated in the handler
    #[account(mut)]
    pub to: AccountInfo<'info>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<TradeNft>) -> Result<()> {
    let achiviement = &mut ctx.accounts.achiviement;
    let signer = &mut ctx.accounts.signer;
    let to = &mut ctx.accounts.to;

    if achiviement.owner == signer.key().to_string() {
        return Err(ErrorCode::Unauthorized.into());
    }

    let lamports = (achiviement.price * 1_000_000_000.0) as u64; // Convert SOL to lamports

    let ix = system_instruction::transfer(&signer.key(), &to.key(), lamports);

    anchor_lang::solana_program::program::invoke(
        &ix,
        &[
            signer.to_account_info(),
            to.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    achiviement.owner = signer.key().to_string();

    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized action")]
    Unauthorized,
}
