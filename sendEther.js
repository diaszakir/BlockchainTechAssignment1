const { Web3 } = require('web3'); 
const web3 = new Web3('http://127.0.0.1:7545'); 

const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

const contractAddress = '0x29629A767e8AC731Eae8e5803E35ba3E5f7107a9'; 

const contract = new web3.eth.Contract(abi, contractAddress);

async function getBalance() {
    const balance = await contract.methods.getBalance().call();
    console.log('Contract Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
}

async function sendEtherToContract() {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        console.log(`Sending 1 ETH to contract from ${sender}...`);
        const result = await web3.eth.sendTransaction({
            from: sender,
            to: contractAddress,
            value: web3.utils.toWei('1', 'ether'), 
            gas: 200000
        });
        console.log('Ether sent successfully:', result.transactionHash);
    } catch (error) {
        console.error('Error sending Ether:', error.message);
    }
}

async function withdraw() {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0]; 

    try {
        console.log(`Attempting to withdraw funds by owner (${owner})...`);
        const result = await contract.methods.withdraw().send({
            from: owner, 
            gas: 200000
        });
        console.log('Withdrawal successful:', result.transactionHash);
    } catch (error) {
        console.error('Error withdrawing funds:', error.message);
    }
}

(async () => {
    try {
        console.log('Initial Contract Balance:');
        await getBalance(); 

        console.log('\nSending Ether to Contract...');
        await sendEtherToContract(); 

    
    } catch (error) {
        console.error('Error during execution:', error.message);
    }
})();
