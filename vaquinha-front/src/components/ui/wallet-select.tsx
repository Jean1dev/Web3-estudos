import { useCallback, useState } from "react";
import {
    useWallet,
    Wallet as SolanaWallet
} from "@solana/wallet-adapter-react";

const truncatePublicKey = (pubKey: string, length = 8) => {
    return `${pubKey.slice(0, length)}...${pubKey.slice(-length)}...`;
}

const WalletSelection = () => {
    const {
        wallets,
        select,
        wallet,
        connect,
        connected
    } = useWallet();
    const [isOpen, setIsOpen] = useState(false);

    const onConnectWallet = useCallback(async (wallet: SolanaWallet) => {
        if (!wallet || !wallet.adapter) return

        try {
            await select(wallet.adapter.name);
            await connect()
        } catch (e) {
            console.log('Wallet error:', e)
        } finally {
            setIsOpen(false);
        }
    }, [])

    const toggleDropdown = () => setIsOpen(!isOpen);
    
    if (connected) {
        return (
            <div className="flex items-center gap-2">
            <img
                src={wallet?.adapter.icon}
                alt={`${wallet?.adapter.name} icon`}
                className="w-5 h-5"
            />
            <span className="text-sm font-medium text-blue-accent">
                {truncatePublicKey(wallet.adapter.publicKey.toBase58())}
            </span>
            <button
                onClick={async () => await wallet.adapter.disconnect()}
                className="ml-2 px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
                Disconnect
            </button>
            </div>
        );
    }

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="glass px-4 py-2 rounded-full text-sm font-medium text-blue-accent transition-colors hover:bg-blue-accent hover:text-white"
            >
                {wallet?.adapter.name || "Connect Wallet"}
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {wallets.map((walletOption) => (
                        <button
                            key={walletOption.adapter.name}
                            onClick={() => onConnectWallet(walletOption)}
                            className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-sm hover:bg-blue-accent hover:text-white ${wallet?.adapter.name === walletOption.adapter.name
                                    ? "bg-blue-accent text-white"
                                    : "text-blue-accent"
                                }`}
                        >
                            <img
                                src={walletOption.adapter.icon}
                                alt={`${walletOption.adapter.name} icon`}
                                className="w-5 h-5"
                            />
                            {walletOption.adapter.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WalletSelection;