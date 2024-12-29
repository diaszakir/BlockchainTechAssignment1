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
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
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
	}
];

const contractAddress = '0x60104Ac3D1774d6Efaea70a94F1F3D9115B6F15E'; 

const contract = new web3.eth.Contract(abi, contractAddress);

async function getBalance() {
    const balance = await contract.methods.getBalance().call();
    console.log('Contract Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
}

(async () => {
    try {
        console.log('Initial Contract Balance:');
        await getBalance();
    } catch (error) {
        console.error('Error during execution:', error.message);
    }
})();
