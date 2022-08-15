// Created by: Alussius Aloy
// Created on: 08-14-22
// Module 2 Challenge v1.0.a 

import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

// Guard Clause - check if public key was passed from command line as argument
if (!process.argv[2]) {
    throw new Error('No public key was passed from the command line.');
}

// Guard Clause - check if public key is valid
if (!PublicKey.isOnCurve(process.argv[2])) {
    throw new Error('The public key you enter is not valid.');
}

const publicKey = process.argv[2];
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const airDropAmount = 2;

const getWalletBalance = async () => {
    try {
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );

        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch(err) {
        console.log(err)
    }
}

const airDropSol = async () => {
    try {
        // Request airdrop to the wallet
        console.log(`Airdropping ${airDropAmount} SOL to a wallet!`);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            airDropAmount * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
}

const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();