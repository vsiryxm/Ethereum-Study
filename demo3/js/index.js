// JavaScript Document
// Author: Simon<vsiryxm@qq.com>
// Date: 2018/09/09 08:50

$(function() {
	window.addEventListener('load', function() {
		// Checking if Web3 has been injected by the browser (Mist/MetaMask)
		if (typeof web3 !== 'undefined') {
		  // Use Mist/MetaMask's provider
		  window.web3 = new Web3(web3.currentProvider);
		} else {
		  console.log('No web3? You should consider trying MetaMask!')
		  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		  //window.web3 = new Web3(new Web3.providers.HttpProvider("https://proxy.mobilefish.com:9070"));
		}
		// Now you can start your app & access web3 freely:
		startAPI();
	  });

	function startAPI() {
		getNetwork(); //获取当前网络ID，并根据ID来判断当前连接的是什么网络
		getAPIVersion(); //获取web3.js的版本
		getEthereum(); //获取以太坊的协议版本
		getWhisper(); //获取Whisper的协议版本
		isConnected(); //检查web3是否连接到以太坊节点
		getListening(); //检查web3当前连接的节点是否正在监听网络连接
		getPeerCount(); //获取连接节点已连上的其它以太坊节点的数量
		getCoinbase(); //获取接收挖矿回报的账户地址
		getDefaultBlock(); //获取查询状态时使用的默认块号，也可指定块号
		getSyncing(); //获取当节点与网络已经同步时的情况，返回一个同步对象
		getMining(); //获取节点是否在挖矿
		getHashrate(); //获取节点当前每秒可算出的hash数量
		getGasPrice(); //获取当前的gas价格,这个值由最近几个块的gas价格的中值决定
		getAccounts(); //获取当前节点持有的帐户列表
		getBlockNumber(); //获取当前区块号
		getBalance(); //获取账号余额
		getCode(); //获取合约的字节码
		getBlock(); //获取指定编号或哈希的块信息
		getBlockTransactionCount(); //获取指定区块的交易数量
	}
	
	//获取当前网络ID，并根据ID来判断当前连接的是什么网络
	function getNetwork() {
		web3.version.getNetwork((error, netId) => {
			console.info('-----------获取当前网络ID和名称-----------');
			if(!error) {
				switch(netId) {
					case "1":
						console.info('NetID：' + netId + '，Mainnet');
						break;
					case "2":
						console.info('NetID：' + netId + '，Morden');
						break;
					case "3":
						console.info('NetID：' + netId + '，Ropsten');
						break;
					case "4":
						console.info('NetID：' + netId + '，Rinkeby');
						break;
					default:
						console.info('NetID：' + netId + '，Unknown network');
				}
			} else {
				console.info(error);
			}
		});
	}

	//获取web3.js的版本
	function getAPIVersion() {
		console.info('-----------获取当前web3.js的版本-----------');
		console.info(web3.version.api);
	}

	//获取以太坊的协议版本
	function getEthereum() {		
		web3.version.getEthereum((error, result) => {
			console.info('-----------获取以太坊的协议版本-----------');
			if(!error) {
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取Whisper的协议版本
	function getWhisper() {
		web3.version.getWhisper((error, result) => {
			console.info('-----------获取Whisper的协议版本-----------');
			if(!error) {
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}
	
	//检查web3是否连接到以太坊节点
	function isConnected() {
		console.info('-----------检查web3是否连接到以太坊节点-----------');
		if(web3.isConnected()) {
			console.info('已连接');
		} else {
			console.info('未连接');
		}
	}

	//检查web3当前连接的节点是否正在监听网络连接
	function getListening() {
		web3.net.getListening((error, result) => {
			console.info('-----------检查web3当前连接的节点是否正在监听网络连接-----------');
			if(!error) {
				if(result) {
					console.info('连接中');
				} else {
					console.info('已断开连接');
				}
			} else {
				console.info(error);
			}
		});
	}

	//获取连接节点已连上的其它以太坊节点的数量
	function getPeerCount() {
		web3.net.getPeerCount((error, result) => {
			console.info('-----------获取连接节点已连上的其它以太坊节点的数量-----------');
			if(!error) {
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取接收挖矿回报的账户地址
	function getCoinbase() {
		web3.eth.getCoinbase((error, result) => {
			console.info('-----------获取接收挖矿回报的账户地址-----------');
			if(!error) {
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取查询状态时使用的默认块号，也可指定块号
	//参考：https://web3.learnblockchain.cn/0.2x.x/web3.eth/#web3ethdefaultblock
	function getDefaultBlock() {
		console.info('-----------获取查询状态时使用的默认块号，也可指定块号-----------');
		console.info(web3.eth.defaultBlock);
	}

	//获取当节点与网络已经同步时的情况，返回一个同步对象
	function getSyncing() {
		web3.eth.getSyncing((error, result) => {
			console.info('-----------获取当节点与网络已经同步时的情况，返回一个同步对象-----------');
			if(!error) {
				if(!result) {
					console.info('节点未同步');
					console.info(result);
				} else {
					console.info(result);
					/*
					{
					startingBlock: 300, 从300区块号开始
					currentBlock: 312, 同步到312
					highestBlock: 512  当前区块高度
					}
					*/
				}
				
			} else {				
				console.info(error);
			}
		});
	}

	//获取节点是否在挖矿
	function getMining() {
		web3.eth.getMining((error, result) => {
			if(!error) {
				console.info('-----------获取节点是否在挖矿-----------');
				console.info(result);
				console.info('是');
			} else {
				console.info(error);
			}
		});
	}

	//获取节点当前每秒可算出的hash数量
	function getHashrate() {
		web3.eth.getHashrate((error, result) => {
			if(!error) {
				console.info('-----------获取节点当前每秒可算出的hash数量-----------');
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取当前的gas价格,这个值由最近几个块的gas价格的中值决定
	function getGasPrice() {
		web3.eth.getGasPrice((error, result) => {
			if(!error) {
				console.info('-----------获取当前的gas价格,这个值由最近几个块的gas价格的中值决定-----------');
				console.info(result.c);
			} else {
				console.info(error);
			}
		});
	}

	//获取当前节点持有的帐户列表
	function getAccounts() {
		web3.eth.getAccounts((error, result) => {
			if(!error) {
				console.info('-----------获取当前节点持有的帐户列表-----------');
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取当前区块号
	function getBlockNumber() {
		web3.eth.getBlockNumber((error, result) => {
			if(!error) {
				console.info('-----------获取当前区块号-----------');
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取账号余额
	function getBalance() {
		web3.eth.getAccounts((error, result) => {
			if(!error) {
				var account = result[0];
				if(account) {
					web3.eth.getBalance(account, (error2, result2) => {
						if(!error) {
							console.info('-----------获取账号余额-----------');
							console.info(result2.c[0]);//web3.fromWei(result2.c, 'ether')
						} else {
							console.info(error2);
						}
					});
				}
			} else {
				console.info(error);
			}
		});	
	}
	
	//获取合约的字节码
	function getCode() {
		var contractAddress = '0x1ecf80acb80b0f9b8844039a0d360de3fa0a4f29';
		web3.eth.getCode(contractAddress, (error, result) => {
			console.info('-----------获取合约的字节码-----------');
			if(!error) {
				console.info(result);
			} else {
				console.info(error);
			}
		});
	}

	//获取指定编号或哈希的块信息
	//块信息包括：前一个区块的哈希、挖矿难度值、挖矿节点名、区块时间戳、gasLimit、gasUsed等
	function getBlock() {
		//块编号或哈希值，或者字符串常量："earliest"、"latest" 、 "pending".
		var blockHashOrNumber = '0x36bc9d5c69c3db7a87de09f734c4d2f364875a7590b0e657ec5527a72f1098e5';
		//var blockHashOrNumber = '5'; //用区块号，同样的效果
		if (blockHashOrNumber != null && blockHashOrNumber.length > 0) {
			web3.eth.getBlock(blockHashOrNumber, (error, result) => {
				console.info('-----------获取指定编号或哈希的块信息-----------');
				if (!error) {
					console.info(parseResultObject(result));
				} else {
					console.info(error);
				}		
			});
		}
	}

	//获取指定区块的交易数量
	function getBlockTransactionCount() {
		//块编号或哈希值，或者字符串常量："earliest"、"latest" 、 "pending".
		var blockHashOrNumber = '5';
		if (blockHashOrNumber != null && blockHashOrNumber.length > 0) {
			web3.eth.getBlockTransactionCount(blockHashOrNumber, (error, result) => {
				console.info('-----------获取指定区块的交易数量-----------');
				if (!error) {
					console.info(result);
				} else {
					console.info(error);
				}
				
			});
		}
	}

	//获取叔伯块信息 web3.eth.getBlock()
	function showBlocksUncle() {
		var blockHashOrNumber = "latest";
		var uncleIndex = document.getElementById('uncleIndex').value;
		if (blockHashOrNumber != null && blockHashOrNumber.length > 0 &&
		  uncleIndex != null && uncleIndex.length > 0
		) {
			

		  web3.eth.getUncle(blockHashOrNumber, uncleIndex, (err, res) => {
			var output = "";
			if (!err) {
			  output += parseResultObject(res);
			} else {
			  output = "Error";
			}
			document.getElementById('blocksUncle').innerHTML = "Blocks uncle= " + output + "<br />";
		  })
		}
	  }








	  
	  function parseResultObject(res){
		var output = "";
		for (var key in res) {
		  if (res.hasOwnProperty(key)) {
			if( Object.prototype.toString.call( res[key] ) === '[object Array]' ) {
			  var arrObj = res[key];
			  if(arrObj.length == 0) {
				output += key + " -> []\n";
			  } else {
				for(var i=0; i < arrObj.length; i++){
				  for (var key2 in arrObj[i]) {
					if (arrObj[i].hasOwnProperty(key2)) {
					  output += key + "["+i+"]." + key2 + "-> " + arrObj[i][key2] + "\n";
					}
				  }
				}
			  }
			} else {
			  output += key + " -> " + res[key] + "\n";
			}
		  }
		}
		return output;
	  }
	
});


// https://gist.github.com/frozeman/655a9325a93ac198416e 确定交易是否有了12个确认