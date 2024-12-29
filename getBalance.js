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

(async () => {
    try {
        console.log('Initial Contract Balance:');
        await getBalance(); // Проверяем баланс до пополнения
    } catch (error) {
        console.error('Error during execution:', error.message);
    }
})();