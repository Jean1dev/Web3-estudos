use anchor_lang::prelude::*;

declare_id!("Do72vP6pm2g9UDAy8mhP7LrEPoHD4c5SQXacbrQ2aoDv");

#[program]
pub mod caixinha_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
