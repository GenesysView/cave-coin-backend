const axios = require('axios');
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(`${process.cwd()}/config/contractABI.json`);
const Web3 = require('web3');

module.exports.server = function (server) {
    var socket = require('socket.io')
    let io = socket(server)
    io.on('connection', function (socket) {
        console.log(`${socket.id} is connected`);
        socket.on('join', function (data) {
            console.log('join', data.user_id);
            socket.join(data.user_id);
            if (data.txList != null) {
                // console.log('tamano', data.txList.result.length);
                for (let index = 0; index < data.txList.result.length; index++) {
                    const element = data.txList.result[index];
                    // console.log('index', element);

                    let request = {
                        jsonrpc: "2.0",
                        method: "eth_getTransactionByHash",
                        params: [
                            element.transactionHash
                        ],
                        id: index
                    }

                    let user_id = data.user_id;
                    axios.post('https://bsc-dataseed1.defibit.io', request)
                        .then((responseRest) => {
                            // console.log(responseRest);
                            let response = responseRest.data;
                            if (response.result != null && response.result.input != null) {
                                // console.log('response',response);
                                const data = response.result.input;
                                const abiDecode = decoder.decodeData(data);
                                // console.log('tx_message_'+user_id);
                                io.to(user_id).emit('tx_message_' + user_id, { tx: response, abi_decode: abiDecode });
                            }
                        })
                }
            } else {
                console.log('por aqui');
                io.to('user@example.com').emit('message', { msg: 'sds' });
            }
        });
    });
}