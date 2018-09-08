// JavaScript Document
// Author: Simon<vsiryxm@qq.com>
// Date: 2018/09/08 23:26



$(function() {
	
	window.addEventListener('load', function() {
		if (typeof web3 !== undefined) {
			web3 = new Web3(web3.currentProvider);
			if (web3.currentProvider.isMetaMask == true) {
				$("#metamask").html("MetaMask可用");
			} else {
				$("#metamask").html("非MetaMask环境");
			}
		} else {
			$("#metamask").html("您的浏览器目前不支持启用以太坊的应用。请尝试执行以下操作之一：<br>下载Mist，一个与以太坊兼容的浏览器；<br>安装浏览器插件<a href='https://metamask.io/'>MetaMask</a>!");
		}
	});

	getNetwork();

	//获取当前网络信息
	function getNetwork() {

		web3.version.getNetwork((error, netId) => {
			console.info('-----------输出当前网络信息-----------');
			switch (netId) {
				case "1":
					$("#network").html('NetID:' + netId + '，This is mainnet');
					console.info('NetID:' + netId + '，This is mainnet');
					break;
				case "2":
					$("#network").html('NetID:' + netId + '，This is the deprecated Morden test network.');
					console.info('NetID:' + netId + '，This is the deprecated Morden test network.');
					break;
				case "3":
					$("#network").html('NetID:' + netId + '，This is the ropsten test network.');
					console.info('NetID:' + netId + '，This is the ropsten test network.');
					break;
				case "4":
					$("#network").html('NetID:' + netId + '，This is the Rinkeby test network.');
					console.info('NetID:' + netId + '，This is the Rinkeby test network.');
					break;
				case "42":
					$("#network").html('NetID:' + netId + '，This is the Kovan test network.');
					console.info('NetID:' + netId + '，This is the Kovan test network.');
					break;
				default:
					$("#network").html('NetID:' + netId + '，This is an unknown network.');
					console.info('NetID:' + netId + '，This is an unknown network.');
			}
		});
	}

	web3.eth.getAccounts(function (error, accounts) {
		console.info('-----------输出钱包是否锁定-----------');
		console.log(web3.eth.defaultAccount);
		if (accounts.length == 0) {
			$("#wallet").html('是');
			console.info('钱包已锁定');
		} else {
			$("#wallet").html("否");
			console.info('钱包已打开');
		}		
	});
	
});