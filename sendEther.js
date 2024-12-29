const { Web3 } = require('web3');  // Подключаем Web3
const web3 = new Web3('http://127.0.0.1:7545'); // Подключаемся к Ganache

// ABI контракта
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

// Адрес контракта
const contractAddress = '0x29629A767e8AC731Eae8e5803E35ba3E5f7107a9'; // Адрес контракта

// Создаем экземпляр контракта
const contract = new web3.eth.Contract(abi, contractAddress);

// Функция для получения баланса контракта
async function getBalance() {
    const balance = await contract.methods.getBalance().call();
    console.log('Contract Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
}

// Функция для пополнения контракта
async function sendEtherToContract() {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // Отправитель — первый аккаунт в Ganache

    try {
        console.log(`Sending 1 ETH to contract from ${sender}...`);
        const result = await web3.eth.sendTransaction({
            from: sender,
            to: contractAddress,
            value: web3.utils.toWei('1', 'ether'), // Отправляем 1 ETH
            gas: 200000
        });
        console.log('Ether sent successfully:', result.transactionHash);
    } catch (error) {
        console.error('Error sending Ether:', error.message);
    }
}

// Функция для вывода всех средств
async function withdraw() {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0]; // Владелец контракта

    try {
        console.log(`Attempting to withdraw funds by owner (${owner})...`);
        const result = await contract.methods.withdraw().send({
            from: owner, // Важно, чтобы это был владелец контракта
            gas: 200000
        });
        console.log('Withdrawal successful:', result.transactionHash);
    } catch (error) {
        console.error('Error withdrawing funds:', error.message);
    }
}

// Выполняем функции
(async () => {
    try {
        console.log('Initial Contract Balance:');
        await getBalance(); // Проверяем баланс до пополнения

        console.log('\nSending Ether to Contract...');
        await sendEtherToContract(); // Пополняем контракт

    
    } catch (error) {
        console.error('Error during execution:', error.message);
    }
})();
