const { actions, NodeWallet } = require("@metaplex/js");
const {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

(async () => {
  let uri =
    "https://gateway.pinata.cloud/ipfs/QmXu1s1s6vGN6mG86G9ub2aijjqmeqEC8yur7jSYyJkT33";
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const keypair = new Keypair();
  let wallet = new NodeWallet(keypair);
  console.log(wallet.publicKey.toBase58());
  let maxSupply = 1;
  const signature = await connection.requestAirdrop(
    wallet.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(signature);
  console.log(
    "Airdrop confirmed:",
    await connection.getBalance(wallet.publicKey)
  );
  actions.
  actions
    .mintEditionFromMaster({
      connection,
      wallet,
      ,
      wallet: wallet.publicKey,
    })
    .catch((err) => {
      console.log(err);
    });
  //   actions
  //     .mintNFT({
  //       connection,
  //       wallet,
  //       uri: uri,
  //       maxSupply,
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
})();
