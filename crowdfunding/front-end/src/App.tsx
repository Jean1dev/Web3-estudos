import { useEffect, useState } from 'react';
import './App.css'
import idl from '../../target/idl/crowdfunding.json'
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js'
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from '@project-serum/anchor'
import { Buffer } from 'buffer'
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';

interface WindowWithSolana extends Window {
  solana?: any;
  Buffer?: any;
}

declare const window: WindowWithSolana;

const programID = new PublicKey(idl.address)
const network = clusterApiUrl('devnet')
const opts = {
  preflightCommitment: 'processed' as web3.Commitment
}
const { SystemProgram } = web3
window.Buffer = Buffer

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [campaigns, setCampaings] = useState<any[]>([])

  const getProvider = () => {
    const connection = new Connection(network, opts.prefligthCommitment)
    const provider = new AnchorProvider(connection, window.solana, opts.prefligthCommitment)
    return provider
  }

  const getCampaigns = async () => {
    const connection = new Connection(network, opts.prefligthCommitment)
    const provider = getProvider()
    const program = new Program(idl, programID, provider)
    Promise.all((await connection.getProgramAccounts(programID)).map(async (account) => {
      const item = await program.account.campaign.fetch(account.pubkey)
      const pubkey = account.pubkey
      return { pubkey, item }
    })).then((campaigns) => {
      console.log(campaigns)
      setCampaings(campaigns)
    })
  }

  const createCampaign = async () => {
    try {
      const provider = getProvider()
      const program = new Program(idl, programID, provider)
      const { campaign } = await PublicKey.findProgramAddress([
        utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
        provider.wallet.publicKey.toBuffer(),
      ], programID)

      await program.rpc.create("campaign name", "campaign description", {
        accounts: {
          campaign,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        }
      })

      console.log('Campaign created')
    } catch (error) {
      console.log(error)
    }
  }

  const chefIfWalletIsConnect = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom is installed!')
        }

      } else {
        console.log('Phantom is not installed!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const withDraw = async publicKey => {
    try {
      const provider = getProvider()
      const program = new Program(idl, programID, provider)

      await program.rpc.withdraw(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
        accounts: {
          campaign: publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        }
      })

      console.log('Withdraw made')
    } catch (error) {
      console.log(error)
    }
  }

  const donate = async publicKey => {
    try{
      const provider = getProvider()
      const program = new Program(idl, programID, provider)


      await program.rpc.donate(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
        accounts: {
          campaign: publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        }
      })

      console.log('Donation made')
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom is installed!')
          const response = await solana.connect({
            onlyIfTrusted: true,
          })

          console.log(response.publicKey.toString())
          setWalletAddress(response.publicKey.toString())
        }
      } else {
        console.log('Phantom is not installed!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotConnectedContainer = () => {
    return <button onClick={connectWallet}>Connect to Wallet</button>
  }

  const renderConnectedContainer = () => {
    return <>
      <button onClick={createCampaign}>Create Campaign</button>
      <button onClick={getCampaigns}>List Campaign</button>
      <br />
      {campaigns.map((campaign, index) => (
        <>
        <p>Campaing ID: {campaign.pubkey.toString()}</p>
        <p>Balance: {(campaign.amountDonate / web3.LAMPORTS_PER_SOL).toString()}</p>
        <p>Campaing Name: {campaign.name}</p>
        <button onClick={() => donate(campaign.pubkey)}>Donate</button>
        </>
      ))}
    </>
  }

  useEffect(() => {
    const onLoad = async () => {
      await chefIfWalletIsConnect()
    }

    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [])


  return (
    <>
      <div className='app'>
        <header className='app-header'>
          <h1>Phantom Wallet</h1>
        </header>
        {!walletAddress ? renderNotConnectedContainer() : renderConnectedContainer()}
      </div>
    </>
  )
}

export default App
