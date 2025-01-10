use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct OrderBuy<'info> {
    #[account(mut)]
    pub achiviement: Account<'info, MyAchievement>,
    #[account(mut)]
    pub signer: Signer<'info>,
}

pub fn handler(ctx: Context<OrderBuy>, payed_price: f32) -> Result<()> {
    let achiviement = &mut ctx.accounts.achiviement;
    let signer = &mut ctx.accounts.signer;
    let achiviement_price = achiviement.price;

    if !achiviement.owner.is_empty() {
        return Err(error!(OrderBuyErrorCode::AchiviementAlreadyBuyed));
    }

    if payed_price < achiviement_price {
        return Err(error!(OrderBuyErrorCode::AmountInsufficient));
    }

    achiviement.owner = signer.key().to_string();
    Ok(())
}

#[error_code]
pub enum OrderBuyErrorCode {
    #[msg("Amount insufficient for buy this achiviement")]
    AmountInsufficient,

    #[msg("Achiviement already buyed")]
    AchiviementAlreadyBuyed,
}
