use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct CreateCaixinha<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 8 + 32)]
    pub caixinha: Account<'info, Caixinha>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateCaixinha>,
    name: String,
    desc: String,
    ref_id: String,
) -> Result<()> {
    let caixinha = &mut ctx.accounts.caixinha;
    let authority = &mut ctx.accounts.authority;

    caixinha.name = name;
    caixinha.desc = desc;
    caixinha.ref_id = ref_id;
    caixinha.amount = 0.0;
    caixinha.deposits_count = 0;
    caixinha.owner = authority.key();
    Ok(())
}