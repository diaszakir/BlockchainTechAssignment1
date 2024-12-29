# Ether Receiver Smart Contract

## Names and Group
Dias Zakir SE-2320

Danel Kanbakova SE-2320

## Title
This is a Solidity smart contract for receiving Ether, checking the contract's balance, and allowing the owner to withdraw all Ether.

## Usage

1. **Deploy the Smart Contract**:  
   Use Remix or any Ethereum development environment to deploy the `EtherReceiver` contract to a blockchain network (such as Ganache or Public Testnet's for local testing).

2. **Interact with the Contract**:  
   Use the provided JavaScript code (`interact.js`) to send Ether to the contract and withdraw Ether from the contract.

   (`getBalance`) to get balance from account

   (`sendEther`) to send ether to account

   (`withDraw`) to withdraw ether

3. **MetaMask**
MetaMask is used in this project to manage Ethereum accounts and interact with the blockchain. It allows users to:

1. Connect to the Ethereum Network: MetaMask acts as a bridge to connect the local Ethereum network (like Ganache) or public testnets.

2. Manage Accounts: It securely stores and manages user accounts and private keys.

---

### Steps to interact with the contract:

1. **Install Dependencies**:
   First, ensure you have Node.js and npm installed on your machine. Then, install the necessary dependencies by running the following command:
   ```bash
   npm install web3
   ```

2. **Set Up Web3**:
   In the `interact.js` file, configure Web3 to connect to your Ethereum network (such as Ganache or a testnet). Ensure that the contract ABI and address are correctly set.

   ```js
   const { Web3 } = require('web3');
   const web3 = new Web3('http://127.0.0.1:7545'); // Change to your network URL
   ```

3. **Connect to the Contract**:
   Define the ABI and contract address in `interact.js` to interact with the deployed `EtherReceiver` contract. You can find the contract address after deployment in Remix or from the `deploy.js` output.

   ```js
   const abi = [ ... ];  // ABI
   const contractAddress = '0x296.....';  // Bytecode
   const contract = new web3.eth.Contract(abi, contractAddress);
   ```

4. **Send Ether to the Contract**:
   Use the `sendEtherToContract` function to send Ether to the contract from one of the accounts. The function transfers a specified amount of Ether (e.g., 1 ETH) to the contract.

   ```js
   async function sendEtherToContract() {
       const accounts = await web3.eth.getAccounts();
       const sender = accounts[0];
       await web3.eth.sendTransaction({
           from: sender,
           to: contractAddress,
           value: web3.utils.toWei('1', 'ether'),
           gas: 200000
       });
   }
   ```

5. **Check Contract Balance**:
   Call the `getBalance` function to view the current balance of the contract in Ether. This function queries the contract for its balance.

   ```js
   async function getBalance() {
       const balance = await contract.methods.getBalance().call();
       console.log('Contract Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
   }
   ```

6. **Withdraw Ether from the Contract**:
   Only the contract owner can withdraw Ether. Use the `withdraw` function to transfer the contract’s balance to the owner’s address.

   ```js
   async function withdraw() {
       const accounts = await web3.eth.getAccounts();
       const owner = accounts[0];
       await contract.methods.withdraw().send({ from: owner, gas: 200000 });
   }
   ```

7. **Run the Script**:
   To interact with the contract, run the `interact.js` script using Node.js:
   ```bash
   node interact.js
   ```

   This will:
   - Display the initial contract balance.
   - Send 1 ETH to the contract.
   - Display the updated contract balance.
   - Withdraw Ether from the contract if the caller is the owner.

### Example Output:
When you run the script, you’ll see the following example output:

```bash
Initial Contract Balance:
Contract Balance: 0 ETH

Sending Ether to Contract...
Ether sent successfully: 0xTransactionHash

Updated Contract Balance:
Contract Balance: 1 ETH

Withdrawing Funds...
Withdrawal successful: 0xTransactionHash

Final Contract Balance:
Contract Balance: 0 ETH
```

---