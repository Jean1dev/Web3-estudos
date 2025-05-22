import { anchorProgram } from "@/anchor/anchor-provider";
import { Campaign, fillCampaign } from "./campaigns";
import { Wallet } from "@coral-xyz/anchor";

function randomImage() {
    const images = [
        "https://images.unsplash.com/photo-1574068468668-a05a11f871da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
        "https://images.unsplash.com/photo-1596753316288-2bf513ebcf74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    ]

    return images[Math.floor(Math.random() * images.length)];
}

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const rpcGetVaquinhas = async (wallet: Wallet) => {
    const program = anchorProgram(wallet);

    try {
        const vaquinhas = await program.account.vaquinha.all();
        const remap: Campaign[] = vaquinhas.map((vaquinha) => ({
            id: vaquinha.publicKey.toBase58(),
            title: vaquinha.account.name,
            description: vaquinha.account.description,
            creator: vaquinha.account.owner.toBase58(),
            longDescription: "Our mission is to clean up the world's oceans by removing plastic waste and other pollutants that harm marine ecosystems. With your support, we can deploy advanced cleanup technologies, organize beach cleanups, and fund research into sustainable solutions to prevent future pollution. Join us in restoring the health of our oceans for generations to come.",
            image: randomImage(),
            targetAmount: randomNumber(1, 5000),
            currentAmount: vaquinha.account.amountDonated,
            backers: randomNumber(1, 100),
            daysLeft: randomNumber(1, 30),
        }))

        fillCampaign(remap);

        return {
            error: false,
            data: remap
        }
    } catch (error) {
        console.error(error);
        return {
            error: true
        }
    }
}