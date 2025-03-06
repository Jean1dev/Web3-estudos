use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct CreateVaquinha<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 64 + 8 + 32)]
    pub vaquinha: Account<'info, Vaquinha>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateVaquinha>, name: String, description: String) -> Result<()> {
    let vaquinha = &mut ctx.accounts.vaquinha;
    let creator = &mut ctx.accounts.creator;

    vaquinha.name = name;
    vaquinha.description = description;
    vaquinha.amount_donated = (00.00 * 100.00) as u64;
    vaquinha.owner = creator.key();

    Ok(())
}
