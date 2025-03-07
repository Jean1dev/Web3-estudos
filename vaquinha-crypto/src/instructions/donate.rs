use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use crate::state::*;

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub vaquinha: Account<'info, Vaquinha>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Donate>, amount: u64) -> Result<()> {
    if amount <= 0 {
        return Err(error!(DonateErrorCode::AmountInvalid));
    }

    let vaquinha = &mut ctx.accounts.vaquinha;
    let signer = &mut ctx.accounts.user;
    let ix = system_instruction::transfer(&signer.key(), &vaquinha.key(), amount);

    anchor_lang::solana_program::program::invoke(
        &ix,
        &[
            signer.to_account_info(),
            vaquinha.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    vaquinha.amount_donated += amount;
    Ok(())
}

#[error_code]
pub enum DonateErrorCode {
    #[msg("Donated amount must be greater than zero")]
    AmountInvalid,
}
