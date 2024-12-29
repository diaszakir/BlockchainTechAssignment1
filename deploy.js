const { Web3 } = require('web3');

const web3 = new Web3('http://127.0.0.1:7545');

// Add your bytecode here (paste from Remix)
const bytecode = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610277806100606000396000f3fe60806040526004361061002d5760003560e01c806312065fe01461003c5780638da5cb5b1461006757610037565b3661003757005b600080fd5b34801561004857600080fd5b50610051610092565b60405161005e91906101cf565b60405180910390f35b34801561007357600080fd5b5061007c61009a565b60405161008991906101f9565b60405180910390f35b600047905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000819050919050565b6100d4816100c1565b82525050565b60006020820190506100ef60008301846100cb565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610120826100f5565b9050919050565b61013081610115565b82525050565b600060208201905061014b6000830184610127565b92915050565b61015a81610115565b811461016557600080fd5b50565b60008135905061017781610151565b92915050565b6000602082840312156101935761019261014c565b5b60006101a184828501610168565b91505092915050565b6101b3816100c1565b81146101be57600080fd5b50565b6000813590506101d0816101aa565b92915050565b60006020828403121561019357610192610196565b60006101a184828501610168565b91505092915050565b6000602082019050610213600083018461012756fea2646970667358221220f5f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f664736f6c63430008000033'; // Replace this with your actual bytecode

// ABI from your contract
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

const deployContract = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];

        console.log(`Deploying contract from account: ${owner}`);
        
        const contract = new web3.eth.Contract(abi);
        
        const deployedContract = await contract
            .deploy({
                data: bytecode
            })
            .send({
                from: owner,
                gas: 3000000,
                gasPrice: '30000000000'
            });

        console.log(`Contract deployed at address: ${deployedContract.options.address}`);
        return deployedContract;
    } catch (error) {
        console.error('Deployment error:', error.message);
        throw error;
    }
};

// Main execution
const main = async () => {
    try {
        // Verify connection
        await web3.eth.net.isListening();
        console.log('Connected to Ganache successfully!');
        
        // Deploy contract
        const deployedContract = await deployContract();
        
        // Verify deployment
        const code = await web3.eth.getCode(deployedContract.options.address);
        if (code !== '0x') {
            console.log('Contract deployed and verified successfully!');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

main();