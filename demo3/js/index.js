// JavaScript Document
// Author: Simon<vsiryxm@qq.com>
// Date: 2018/09/09 08:50

$(function() {
	window.addEventListener('load', function() {
		// Checking if Web3 has been injected by the browser (Mist/MetaMask)
		if (typeof web3 !== 'undefined') {
		  // Use Mist/MetaMask's provider
		  //window.web3 = new Web3(web3.currentProvider);
		  window.web3 = web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/q7e6gTMRPm7mtLpodlSD"));
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
		getUncle(); //获取叔块信息
		getTransaction(); //获取交易hash对应的交易
		getTransactionFromBlock(); //获取区块中的某一笔交易详情，与getTransaction是一样的效果
		getTransactionReceipt(); //获取一个交易的收据，与getTransaction、getTransactionFromBlock比较，多了合约相关字段，如合约地址contractAddress
		getTransactionCount(); //获得指定地址发起的交易数（支出的交易）
		//sendTransaction();
		//sendContractTransaction();
		//signData(); //使用指定帐户签名要发送的数据，帐户需要处于解锁状态
		sha3(); //使用sha3（keccak-256）哈希算法，计算给定字符串的哈希值。交易哈希就是这么来的，66位
		toHex(); //将字符串转换成Hex值，与toAscii是一对，toHex与fromAscii有点类似，但fromAscii可以填充0到多少位
		toAscii(); //将HEX字符串转为ASCII字符串，与toHex是一对
		fromAscii(); //将任何的ASCII码字符串转为HEX字符串，fromAscii与toHex有点类似，但fromAscii可以填充0到多少位
		fromDecimal(); //将一个数字，或者字符串形式的数字转为一个十六进制串
		fromWei(); //以太坊货币单位之间的转换，将wei转换成其它单位
		toWei(); //将给定资金转换为以wei为单位的数值
		toBigNumber(); //转换一个数字为BigNumber的实例
		isAddress(); //检查给定的字符串是否是有效的以太坊地址
		setDefaultAccount(); //设置默认交易地址，这些方法要用到： web3.eth.sendTransaction() web3.eth.call()
		
		

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
		//块编号或哈希值，或者字符串常量："earliest"（创世块）、"latest"（最新已打包块） 、 "pending"（最新打包中的块）. 
		var blockHashOrNumber = 'latest';
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
		//块编号或哈希值，或者字符串常量："earliest"（创世块）、"latest"（最新已打包块） 、 "pending"（最新打包中的块）. 
		var blockHashOrNumber = '2964325';
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

	//获取叔块信息
	//例子：切换到主网，访问https://etherscan.io/block/21456
	function getUncle() {
		var blockHashOrNumber = "latest";
		var uncleIndex = 0;
		if (blockHashOrNumber != null && blockHashOrNumber.length > 0 && uncleIndex != null ) {
			web3.eth.getUncle(blockHashOrNumber, uncleIndex, (error, result) => {
			console.info('-----------获取叔块信息-----------');
			if (!error) {
				console.info(parseResultObject(result));
			} else {
				console.info(parseResultObject(error));
			}
		  })
		}
	}

	//获取交易hash对应的交易
	//如：https://rinkeby.etherscan.io/tx/0xbadf6dccbcf5255ba3c91105a6eb5a4fbafd5a12b85cccf4dfe0914d895d09fe
	function getTransaction() {
		var transactionHash = '0x62a220b4fa9a6ab04a29b24f29d6b414796100bbd134a11f0ef725f9219335ce';	  
		if (transactionHash != null && transactionHash.length > 0) {
			web3.eth.getTransaction(transactionHash, (error, result) => {
			console.info('-----------获取交易hash对应的交易-----------');
			if (!error) {
				console.info(parseResultObject(result));
			} else {
				console.info(error);
			}
			})
		}
	}

	//获取区块中的某一笔交易详情
	//如：https://rinkeby.etherscan.io/txs?block=2964454 倒数第1笔交易即transactionIndex=0
	function getTransactionFromBlock() {
		var blockHashOrNumber = '2964454';
		var transactionIndex = '0';
		
		if (blockHashOrNumber != null && blockHashOrNumber.length > 0 &&
			transactionIndex != null && transactionIndex.length > 0) {
			web3.eth.getTransactionFromBlock(blockHashOrNumber, transactionIndex, (error, result) => {
				console.info('-----------获取区块中的某一笔交易详情-----------');
				if (!error) {
					console.info(parseResultObject(result));
				} else {
					console.info(error);
				}
			})
		}
	}

	//获取一个交易的收据
	//https://rinkeby.etherscan.io/tx/0xbadf6dccbcf5255ba3c91105a6eb5a4fbafd5a12b85cccf4dfe0914d895d09fe
	//与getTransaction、getTransactionFromBlock比较，多了合约相关字段，如合约地址contractAddress
	function getTransactionReceipt() {
		var transactionHash = '0x62a220b4fa9a6ab04a29b24f29d6b414796100bbd134a11f0ef725f9219335ce';
		
		if (transactionHash != null) {
			web3.eth.getTransactionReceipt(transactionHash, (err, res) => {
			console.info('-----------获取一个交易的收据-----------');
			var output = "";
			if (!err) {
				console.info(res);
			} else {
				console.info(err);
			}
			});
		}
	}

	//获得指定地址发起的交易数（支出的交易）
	//如：https://etherscan.io/address/0x0266F961906e34af20b185749Bf0f87066741a25
	function getTransactionCount() {
		var address = '0x0266F961906e34af20b185749Bf0f87066741a25';
	  
		if (address != null && address.length > 0) {
		  web3.eth.getTransactionCount(address, (err, res) => {
			console.info('-----------获得指定地址发起的交易数（支出的交易）-----------');
			var output = "";
			if (!err) {
			  output += res;
			} else {
			  output = "Error";
			}
			console.info(output);
		  })
		}
	  }

	  function sendTransaction() {
		
		var fromAccount = '0xd134dd2a3c16fb12885cd6fdc8a03d4bbe5d7031';
		var toAccount = '0xfacd69a6df3265ddf3f60a868d3b0086feb1597e';
		var amount = 1000000000000000; //0.01 ether
	  
		// Use for example 2
		var gas = "35000";
		var gasPrice = "21000000000";
	  
	  // Use for example 2
		if (fromAccount != null &&
			toAccount != null && 
			amount != null &&
			gas != null &&
			gasPrice != null
		) {
		  // Example 1: Using the default MetaMask gas and gasPrice
		  var message = {from: fromAccount, to:toAccount, value: web3.toWei(amount, 'ether')};
	  
		  // Example 2: Setting gas and gasPrice
		  //var message = {from: fromAccount, to:toAccount, value: web3.toWei(amount, 'ether'), gas: gas, gasPrice: gasPrice};
	  
		  // Example 3: Using the default account
		  //web3.eth.defaultAccount = fromAccount;
		  //var message = {to:toAccount, value: web3.toWei(amount, 'ether')};
	  
		  web3.eth.sendTransaction(message, (err, res) => {
			console.info('-----------发送交易-----------');
			console.info(err);
			console.info(res);
			var output = "";
			if (!err) {
			  output += res;
			} else {
			  output = "Error";
			}
			console.info(output);
		  })
		}
	  }

	  //使用指定帐户签名要发送的数据，帐户需要处于解锁状态。
	  function sendContractTransaction() {
		var fromAccount = document.getElementById('fromAccount2').value;
		var byteCode = document.getElementById('byteCode').value;
	  
		if (fromAccount != null && fromAccount.length > 0 &&
			byteCode != null && byteCode.length > 0
		) {
		  //var data = {from: fromAccount, to:toAccount, value: web3.toWei(amount, 'ether'), gasLimit: gasLimit, gasPrice: gasPrice};
		  var message = {from: fromAccount, data:byteCode.trim()};
	  
		  web3.eth.sendTransaction(message, (err, res) => {
			var output = "";
			if (!err) {
			  output += res;
			} else {
			  output = "Error";
			}
			document.getElementById('transactionResponse2').innerHTML = "Contract transaction response= " + output + "<br />";
		  })
		}
	  }


	  //使用指定帐户签名要发送的数据，帐户需要处于解锁状态
	  function signData() {
			var fromAccount = '0xd134dd2a3c16fb12885cd6fdc8a03d4bbe5d7031';
			var dataToSign = 'Hello Simon!';
	  
			if (fromAccount != null && dataToSign != null) {
		  	var encryptedMessage = web3.sha3(dataToSign);
	  
		  	web3.eth.sign(fromAccount, encryptedMessage, (err, res) => {

					console.info('-----------使用指定帐户签名要发送的数据，帐户需要处于解锁状态-----------');

					var output = "";
					var rValue = "";
					var sValue = "";
					var vValue = "";
	  
					if (!err) {
						output += res;
						var r = res.slice(0, 66);
						var s = '0x' + res.slice(66, 130);
						var v = '0x' + res.slice(130, 132)
						v = web3.toDecimal(v)
				
						// Using ethereumjs-util.js
						var msg = EthJS.Util.toBuffer(encryptedMessage);
						var pub = EthJS.Util.ecrecover(msg, v, r, s);
						var addrBuf = EthJS.Util.pubToAddress(pub);
						var addr    = EthJS.Util.bufferToHex(addrBuf);
				
					} else {
						output = "Error";
					}
					console.info('sig='+output);
					console.info('r = sig.slice(0, 66) ='+r);
					console.info("s = '0x' + sig.slice(66, 130) = " + s );
					console.info("v = '0x' + sig.slice(130, 132)\n v = web3.toDecimal(v) = " + v);
					console.info("pubKey = ecrecover(msg, v, r, s) = " + addr);
		  	});
			}
	  }

		//使用sha3（keccak-256）哈希算法，计算给定字符串的哈希值。交易哈希就是这么来的，66位
		//Hello Simon!
		//sha3=0x5037e1a5e02e081b1b850b130eca7ac17335fdf4c61cc5ff6ae765196fb0d5b3 使用hex 
		//sha3=0xef82a5fff3a5526183e7c925d562e5faf53a8a1be84dd35facff147fc6966d3d 没有使用hex
	  function sha3() {
			var dataToHash = "Hello Simon!";
			var encoding = "hex"; //是否编码，no不编码，hex则编码

			if (dataToHash != null) {
				console.info('-----------使用sha3（keccak-256）哈希算法，计算给定字符串的哈希值-----------');
				if(encoding == "hex") {
					console.info('sha3=' + web3.sha3(dataToHash, {encoding: 'hex'}));
				} else {
					console.info('sha3=' + web3.sha3(dataToHash));
				}
			}
	  }
		
		//将字符串转换成Hex值，与hexToASCII是一对，toHex与fromAscii有点类似，但fromAscii可以填充0到多少位
	  function toHex() {
			var dataToHex = 'Hello,Simon!';
			if (dataToHex != null) {
				console.info('-----------将字符串转换成Hex值-----------');
				console.info(web3.toHex(dataToHex));
			}
	  }
		
		//将HEX字符串转为ASCII字符串，与toHex是一对
	  function toAscii() {
			var hexString = '0x48656c6c6f2c53696d6f6e21';
			if (hexString != null) {
				console.info('-----------将HEX字符串转为ASCII字符串-----------');
				console.info(web3.toAscii(hexString));
			}
	  }
		
		//将任何的ASCII码字符串转为HEX字符串，fromAscii与toHex有点类似，但fromAscii可以填充0到多少位
	  function fromAscii() {
			var asciiString = 'Hello,Simon!'; //试了一下，如果这里是'21'，转过来的结果是0x3231，而不是fromDecimal返回的0x15
			var numberOfBytes = 32; //可以是更大字节数
			
			if (asciiString != null && !isNaN(numberOfBytes)) {
				var padding = parseInt(numberOfBytes);
				console.info('-----------将任何的ASCII码字符串转为HEX字符串-----------');
				if(padding > 0) {
					console.info(web3.fromAscii(asciiString, padding));
				} else {
					console.info(web3.fromAscii(asciiString));
				}
			}
	  }
		
		//将一个十六进制转为一个十进制的数字
	  function toDecimal() {
			var hexToNumber = 0x15;
			console.info('-----------将一个十六进制转为一个十进制的数字-----------');
			if (hexToNumber != null) {
				console.info(web3.toDecimal(hexToNumber));
			}
	  }
		
		//将一个数字，或者字符串形式的数字转为一个十六进制串
	  function fromDecimal() {
			var numberToHex = 21;
			console.info('-----------将一个数字，或者字符串形式的数字转为一个十六进制串-----------');
			if (numberToHex != null) {
				console.info(web3.fromDecimal(numberToHex));
			}
	  }
		
		//以太坊货币单位之间的转换，将wei转换成其它单位
	  function fromWei() {
			var numberOfWei = 1 * Math.pow(10, 18); //1乘以10的18次方
			var etherUnit = 'ether'; //Gwei Kwei Mwei/babbage/ether/femtoether ether finney/gether/grand/gwei等

			if (numberOfWei != null && !isNaN(numberOfWei)) {
				console.info('-----------以太坊货币单位之间的转换，将wei转换成其它单位-----------');
				console.info(web3.fromWei(numberOfWei, etherUnit));
			}
	  }
		
		//将给定资金转换为以wei为单位的数值
	  function toWei() {
			var numberOfEthereumUnit = 1;
			var etherUnit = 'ether';

			if (numberOfEthereumUnit != null && !isNaN(numberOfEthereumUnit)) {
				console.info('-----------将给定资金转换为以wei为单位的数值-----------');
				console.info(web3.toWei(numberOfEthereumUnit, etherUnit));
			}
	  }
	  
	  //转换一个数字为BigNumber的实例
	  function toBigNumber() {
			var numberToBigNumber = 200000000000000000000001;
			var output="";
			console.info('-----------转换一个数字为BigNumber的实例-----------');
			if (numberToBigNumber != null && !isNaN(numberToBigNumber)) {
				output = web3.toBigNumber(numberToBigNumber);
				console.info("A BigNumber = " + output.toString(10));
				console.log(output.toNumber()); // 2.0000000000000002e+23
				console.log(output.toString(10)); // '200000000000000000000001'
			}
	  }
	  
	  //检查给定的字符串是否是有效的以太坊地址
	  function isAddress() {
			var hexAddress = '0x0266f961906e34af20b185749bf0f87066741a25';
			var output="";
			if (hexAddress != null) {
				output = web3.isAddress(hexAddress);
				console.info('-----------检查给定的字符串是否是有效的以太坊地址-----------');
				console.info("Is an address ="+output);
			}
	  }
		
		//设置默认交易地址
		//这些方法要用到： web3.eth.sendTransaction() web3.eth.call()
	  function setDefaultAccount() {
			var defaultAccount = '0x03183a5c78434860d5e021d98155a55dd577a97a';
			if (defaultAccount != null && web3.isAddress(defaultAccount)) {
				console.info('-----------设置默认交易地址-----------');
				web3.eth.defaultAccount = defaultAccount;
				console.info(web3.eth.defaultAccount);
			}
	  }

	  
	  function parseResultObject(result) {
			var output = "";
			for (var key in result) {
				if (result.hasOwnProperty(key)) {
				if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
					var arrObj = result[key];
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
					output += key + " -> " + result[key] + "\n";
				}
				}
			}
			return output;
	  }
	
});


// https://gist.github.com/frozeman/655a9325a93ac198416e 确定交易是否有了12个确认