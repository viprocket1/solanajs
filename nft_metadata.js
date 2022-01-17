const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { Metadata } = require("@metaplex-foundation/mpl-token-metadata");

// NFT is a mint. just like SRM, USDC ..., the only different is that NFT's supply is 1
//
// if we want to get NFT's metadata, first we need to know what is the mint address.
// here I take a random DAPE as an example
// https://explorer.solana.com/address/9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A
//
// tokenmeta is a PDA a which derived by mint address
// the formula is ['metadata', metadata_program_id, mint_id]
// is it totally fine to forget it because sdk already wrapped it for us

//const connection = new Connection("https://api.devnet.solana.com");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async () => {
  //nft public key
  let mintPubkey = new PublicKey(
    "AuHtNbxqFJWuCTt14CXLxwKhvTx4VQ3SKp712QW3s2os"
  );
  let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);

  const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
  console.log(tokenmeta);
})();
