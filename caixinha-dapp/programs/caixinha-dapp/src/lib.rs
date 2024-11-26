use anchor_lang::prelude::*;

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
        let caixinha = &mut ctx.accounts.caixinha;
        caixinha.name = name;
        caixinha.desc = desc;
        caixinha.ref_id = ref_id;
        caixinha.amount = 0;
        caixinha.deposits_count = 0;
        caixinha.owner = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let caixinha = &mut ctx.accounts.caixinha;
        caixinha.amount += amount;
        caixinha.deposits_count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCaixinha<'info> {
    #[account(init, payer = user, space = 8 + 32 + 32 + 8 + 32, seeds=[b"CAIXINHA_DEMO", user.key().as_ref()], bump)]
    pub caixinha: Account<'info, Caixinha>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Caixinha {
    pub name: String,
    pub desc: String,
    pub ref_id: String,
    pub amount: u64,
    pub deposits_count: u8,
    pub owner: Pubkey,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub caixinha: Account<'info, Caixinha>,
}