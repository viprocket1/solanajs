const {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Account,
} = require("@solana/web3.js");
const bip39 = require("bip39");
const bs58 = require("bs58");
const nacl = require("tweetnacl");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const { derivePath } = require("ed25519-hd-key");

const wallet = Keypair.generate();
connection.onAccountChange(
  wallet.publicKey,
  (updatedAccountInfo, context) =>
    console.log("Updated account info: ", updatedAccountInfo),
  "confirmed"
);

async function generateMnemonicAndSeed() {
  const bip39 = await import("bip39");
  const mnemonic = bip39.generateMnemonic(256);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return { mnemonic, seed: Buffer.from(seed).toString("hex") };
}

generateMnemonicAndSeed().then((result) => {
  console.log(result);
});
