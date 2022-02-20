import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Account,
} from "@solana/web3.js";
import * as bip39 from "bip39";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";

//create a new wallet
async function generateMnemonicAndSeed() {
  const bip39 = await import("bip39");
  const mnemonic = bip39.generateMnemonic(256);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return { mnemonic, seed: Buffer.from(seed).toString("hex") };
}

generateMnemonicAndSeed().then((result) => {
  console.log(result);
});
