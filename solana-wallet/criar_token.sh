# Instalação do SPL Token CLI
cargo install spl-token-cli

# Criação da carteira
solana-keygen new 

solana-keygen pubkey 

solana balance --url devnet

solana airdrop 1 6VSpmMpW7uyVmmpvGyEAryNtf2H82azd5CfvnyA6fZ1k --url devnet 

# Transfere Solana para a carteira especificada
solana transfer ANqM2cDocza5RwehzLuwkkBQTPFQGwqt958hbKh5zzDN 4 --url devnet

# Criação do token
spl-token create-token --url devnet 

spl-token create-account $TOKEN_ADRESS --url devnet

spl-token balance $TOKEN_ADRESS --url devnet

spl-token mint $TOKEN --amount 1000  --url devnet

spk-token supply $TOKEN --url devnet

spl-token authorize $TOKEN mint --disable --url devnet

spl-token burn $ACCOUNT_ADDRESS 100 --url devnet

spl-token transfer $TOKEN 100 $ACCOUNT_ADDRESS --url devnet