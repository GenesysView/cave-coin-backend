const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(`${process.cwd()}/config/contractABI.json`);
const Web3 = require('web3');

module.exports.decode = async function (req, res) {
    const data = req.body.data;
    const result = decoder.decodeData(data);
    console.log('decodeData', result);




    // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    // let ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];
    // var myContract = new web3.eth.Contract(ABI, "0xb27adaffb9fea1801459a1a81b17218288c097cc");
    // console.log('myContract', myContract.events);
    // var call = await web3.eth.call({ to: "0xb27adaffb9fea1801459a1a81b17218288c097cc", data: web3.utils.sha3("totalSupply()") });
    // console.log('call', call);
    // if (call != '0x') {
    //     console.log('ERC20 token detected');
    // } else {
    //     console.log('Not an ERC20 token address');
    // }


    // // var call2 = await web3.eth.call({ to: "0xb27adaffb9fea1801459a1a81b17218288c097cc", data: 'web3.utils.sha3('Transfer(address,address,uint256)')' });
    // // console.log('call2',call2);

    // var call3 = await web3.eth.call({ to: "0xb27adaffb9fea1801459a1a81b17218288c097cc", data: web3.utils.sha3("name()") });
    // console.log('call3', call3);

    // for (let index = 0; index < 1; index++) {
    //     var receipt = await web3.eth.getTransactionReceipt('0x7cf6a398b3597f9381b3058005e87d190eb4777ed2d0ed8183bd6e057b61c47d')
    //         .then((resultado) => {
    //             console.log('resultado', resultado);
    //         });

    // }
    // console.log('fin papa');

    res.status(200).send(result)
}
