// JavaScript Document
// Author: Simon<vsiryxm@qq.com>
// Date: 2018/09/06 21:00

$(function() {
	var web3;
	var abi = [
			{
				"constant": true,
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"name": "",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getInfo",
				"outputs": [
					{
						"name": "",
						"type": "string"
					},
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "age",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "_name",
						"type": "string"
					},
					{
						"name": "_age",
						"type": "uint256"
					}
				],
				"name": "setInfo",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];
	var contract = "0x0e75f0edf164943f78628a2d9ca856928cb3fced";
	var contractInstance;
	
	initWeb3();
	initContract();
	
	//初始化web3
	function initWeb3() {		
		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
		} else {
			//web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/q7e6gTMRPm7mtLpodlSD"));
			web3 = new Web3(new Web3.providers.HttpProvider("HTTP://192.168.60.162:7545"));
		}
	}
	
	//初始化合约
	function initContract() {
		
		console.info('-----------输出web3是否连接上以太坊网络-----------');
		console.info(web3.isConnected());

		//输出web3的版本
		console.info('-----------输出web3的版本-----------');
		console.info(web3.version.api);
		console.info(web3.currentProvider);
		
		web3.eth.coinbase = web3.eth.accounts[0];
		console.info(web3.eth.coinbase);

		//输出当前的账号
		console.info('-----------输出当前账号-----------');
		console.info(web3.eth.accounts);

		//合约地址
		var myContract = web3.eth.contract(abi); //JSON.parse(abi)
		contractInstance = myContract.at(contract);
		console.info('-----------输出合约对象-----------');
		console.info(contractInstance);
	}
	
	//提交上链
	$('#btnSubmit').on('click', function() {
		var name = $.trim($('#name').val());
		var age = $.trim($('#age').val());
		if(name == '' || name == undefined) {
			alert('请输入姓名！');
			$('#name').focus();
			return false;
		}
		if(age == '' || age == undefined) {
			alert('请输入年龄！');
			$('#age').focus();
			return false;
		}
		console.info(name, age);
		console.info(contractInstance);
		contractInstance.setInfo(name, age, function(error, result) {
			console.info('-----------输出上链结果-----------');
			console.info(result);
			if(!error) {
				console.info('SUCCESS');
				console.info(result);
			} else {
				console.info('FAIL');
				console.info(error);
			}
		});
	});
	
	//读取链上信息
	$('#btnQuery').on('click', function() {
		contractInstance.getInfo(function(error, result) {
			console.info('-----------输出查询结果-----------');
			if(!error) {
				console.info('SUCCESS');
				console.info(result);
			} else {
				console.info('FAIL');
				console.error(error);
			}
		});
	});
	
});