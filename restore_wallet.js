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

//mnemonic to seed
const trial_mnemonic =
  "empower palace cable dwarf scheme beach city into today ranch onion tumble battle abandon honey deal tide venue prepare dismiss sand auto prize goddess";

//convert

async function mnemonicToSeed(mnemonic) {
  const bip39 = await import("bip39");
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid seed words");
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  console.log(Buffer.from(seed).toString("hex"));
  return Buffer.from(seed).toString("hex");
}

//convert
function getAccountFromSeed(
  seed,
  walletIndex,
  dPath = undefined,
  accountIndex = 0
) {
  const derivedSeed = deriveSeed(seed, walletIndex, dPath, accountIndex);
  return new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
}

//print public keys

//maths to derive lol
function deriveSeed(seed, walletIndex, derivationPath, accountIndex) {
  switch (derivationPath) {
    case DERIVATION_PATH.deprecated:
      const path = `m/501'/${walletIndex}'/0/${accountIndex}`;
      return bip32.fromSeed(seed).derivePath(path).privateKey;
    case DERIVATION_PATH.bip44:
      const path44 = `m/44'/501'/${walletIndex}'`;
      return derivePath(path44, seed).key;
    case DERIVATION_PATH.bip44Change:
      const path44Change = `m/44'/501'/${walletIndex}'/0'`;
      return derivePath(path44Change, seed).key;
    default:
      throw new Error(`invalid derivation path: ${derivationPath}`);
  }
}
const DERIVATION_PATH = {
  deprecated: undefined,
  bip44: "bip44",
  bip44Change: "bip44Change",
  bip44Root: "bip44Root", // Ledger only.
};

function toDerivationPath(dPathMenuItem) {
  switch (dPathMenuItem) {
    case DerivationPathMenuItem.Deprecated:
      return DERIVATION_PATH.deprecated;
    case DerivationPathMenuItem.Bip44:
      return DERIVATION_PATH.bip44;
    case DerivationPathMenuItem.Bip44Change:
      return DERIVATION_PATH.bip44Change;
    case DerivationPathMenuItem.Bip44Root:
      return DERIVATION_PATH.bip44Root;
    default:
      throw new Error(`invalid derivation path: ${dPathMenuItem}`);
  }
}

const DerivationPathMenuItem = {
  Deprecated: 0,
  Bip44: 1,
  Bip44Change: 2,
  Bip44Root: 3, // Ledger only.
};

for (let i = 1; i < 3; i++) {
  mnemonicToSeed(trial_mnemonic).then((seed) => {
    //console.log(seed);
    [...Array(10)].map((_, idx) => {
      console.log(
        getAccountFromSeed(
          Buffer.from(seed, "hex"),
          idx,
          toDerivationPath(i)
        ).publicKey.toBase58()
      );
    });
  });
}
