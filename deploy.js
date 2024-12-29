const { Web3 } = require('web3');

const web3 = new Web3('http://127.0.0.1:7545');

const bytecode = '0x6080604052348015600f57600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103178061005f6000396000f3fe6080604052600436106100385760003560e01c806312065fe0146100445780633ccfd60b1461006f5780638da5cb5b146100865761003f565b3661003f57005b600080fd5b34801561005057600080fd5b506100596100b1565b60405161006691906101ed565b60405180910390f35b34801561007b57600080fd5b506100846100b9565b005b34801561009257600080fd5b5061009b6101b0565b6040516100a89190610249565b60405180910390f35b600047905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610147576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013e906102c1565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f193505050501580156101ad573d6000803e3d6000fd5b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000819050919050565b6101e7816101d4565b82525050565b600060208201905061020260008301846101de565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061023382610208565b9050919050565b61024381610228565b82525050565b600060208201905061025e600083018461023a565b92915050565b600082825260208201905092915050565b7f4f6e6c7920746865206f776e65722063616e2077697468647261770000000000600082015250565b60006102ab601b83610264565b91506102b682610275565b602082019050919050565b600060208201905081810360008301526102da8161029e565b905091905056fea264697066735822122096cbadfa74e84d2a205582bac911777fd6bcdfa6aa3ca987ecc4355a913034fd64736f6c634300081a0033'

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

const main = async () => {
    try {
        await web3.eth.net.isListening();
        console.log('Connected to Ganache successfully!');
        
        const deployedContract = await deployContract();
        
        const code = await web3.eth.getCode(deployedContract.options.address);
        if (code !== '0x') {
            console.log('Contract deployed and verified successfully!');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

main();