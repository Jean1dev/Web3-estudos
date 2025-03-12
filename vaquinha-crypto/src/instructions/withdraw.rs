use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub vaquinha: Account<'info, Vaquinha>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Withdraw>) -> Result<()> {
    let vaquinha = &mut ctx.accounts.vaquinha;
    let signer = &mut ctx.accounts.user;

    if vaquinha.amount_donated <= 0 {
        return Err(error!(WithDrawuErrorCode::NoFunds));
    }

    if vaquinha.owner != signer.key() {
        return Err(error!(WithDrawuErrorCode::WrongOwner));
    }

    let rent_balance = Rent::get()?.minimum_balance(vaquinha.to_account_info().data_len());
    let amount_withdraw = vaquinha.amount_donated - rent_balance;

    **vaquinha.to_account_info().try_borrow_mut_lamports()? -= amount_withdraw;
    **signer.to_account_info().try_borrow_mut_lamports()? += amount_withdraw;

    vaquinha.amount_donated = vaquinha.amount_donated - amount_withdraw;

    Ok(())
}

#[error_code]
pub enum WithDrawuErrorCode {
    #[msg("This vaquinha doest have funds")]
    NoFunds,
    #[msg("You are not owner of this vaquinha")]
    WrongOwner,
}
