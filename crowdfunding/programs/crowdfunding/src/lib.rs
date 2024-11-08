use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::solana_program::system_instruction;

declare_id!("82o3jdKmymbQBoN3m2dL3PGfL84UFmqa68a8AtjHM7Dc");

#[program]
pub mod crowdfunding {
    use super::*;

    pub fn create_campaign(ctx: Context<CreateCampaign>, name: String, desc: String) -> ProgramResult {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.desc = desc;
        campaign.amount_donated = 0;
        campaign.owner = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> ProgramResult {
        let campaign = &mut ctx.accounts.campaign;
        let user = &mut &ctx.accounts.user;

        if campaign.owner != *user.key {
            return Err(ProgramError::IncorrectProgramId);
        }
        let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());

        if **campaign.to_account_info().lamports.borrow() - rent_balance < amount {
            return Err(ProgramError::InsufficientFunds);
        }

        **campaign.to_account_info().try_borrow_mut_lamports()? -= amount;
        **campaign.to_account_info().try_borrow_mut_lamports()? += amount;
        
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> ProgramResult {
        let ix = system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.campaign.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.campaign.to_account_info(),
            ],
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(init, payer = user, space = 8 + 8 + 8 + 32, seeds=[b"CAMPAIGN_DEMO".as_ref(), user.key().as_ref()], bump)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Campaign {
    pub name: String,
    pub desc: String,
    pub amount_donated: u64,
    pub owner: Pubkey,
}

#[derive(Accounts)]
pub struct Withdraw<'info>{
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    pub system_program: Program<'info, System>,
}