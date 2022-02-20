import { TOKEN_PROGRAM_ID, AccountLayout, u64 } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const wallet = new PublicKey("FfLczWEt8wYoubArWX6iTKJ85inoKinvovzJ4CqRRuzX");

async function WalletData() {
  // 1. you can fetch all token account by an owner

  let sol_balance = await connection.getBalance(wallet);
  console.log(`Sol balance: ${sol_balance / 10000000}`);
  let response = await connection.getTokenAccountsByOwner(
    wallet, // owner here
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );
  response.value.forEach((e) => {
    console.log(`pubkey: ${e.pubkey.toBase58()}`);
    const accountInfo = AccountLayout.decode(e.account.data);
    console.log(`mint: ${new PublicKey(accountInfo.mint)}`);
    console.log(`amount: ${u64.fromBuffer(accountInfo.amount)}`);
  });

  console.log("-------------------");

  // 2. or just fetch specific mint for a owner
  let response2 = await connection.getTokenAccountsByOwner(
    wallet, // owner here
    {
      mint: new PublicKey("AuHtNbxqFJWuCTt14CXLxwKhvTx4VQ3SKp712QW3s2os"),
    }
  );
  response2.value.forEach((e) => {
    console.log(`pubkey: ${e.pubkey.toBase58()}`);
    const accountInfo = AccountLayout.decode(e.account.data);
    console.log(`mint: ${new PublicKey(accountInfo.mint)}`);
    console.log(`amount: ${u64.fromBuffer(accountInfo.amount)}`);
  });
}

WalletData().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);
