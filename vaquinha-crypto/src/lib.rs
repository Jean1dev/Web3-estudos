use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;

pub use instructions::*;
pub use state::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("AWbti2H3pEJiTAPPd1h1Mejwcim6XuBWWXNzAdojJGW2");

#[program]
pub mod vaquinha_crypto {
    use super::*;

    pub fn create_vaquinha(
        ctx: Context<CreateVaquinha>,
        name: String,
        description: String,
    ) -> Result<()> {
        instructions::create_vaquinha::handler(ctx, name, description)
    }
}
