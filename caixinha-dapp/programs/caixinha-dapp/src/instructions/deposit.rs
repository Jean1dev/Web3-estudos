use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub caixinha: Account<'info, Caixinha>,
}

pub fn handler(ctx: Context<Deposit>, amount: f32) -> Result<()> {
    let caixinha = &mut ctx.accounts.caixinha;
    
    caixinha.amount += amount;
    caixinha.deposits_count += 1;
    Ok(())
}
