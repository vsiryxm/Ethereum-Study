## 以太坊DAPP环境检查DEMO

### 知识点

- .isMetaMask
- 不支持时的提示

### 一、检测当前运行环境是否支持MetaMask
示例代码：
```
window.addEventListener('load', function() {
		if (typeof web3 !== undefined) {
			web3 = new Web3(web3.currentProvider);
            console.info('-----------输出环境信息-----------');
			if (web3.currentProvider.isMetaMask == true) {
				console.info('MetaMask可用');
			} else {
				console.info('非MetaMask环境');
			}
		} else {
			$("#metamask").html("您的浏览器目前不支持启用以太坊的应用。请尝试执行以下操作之一：<br>下载Mist，一个与以太坊兼容的浏览器；<br>安装浏览器插件<a href='https://metamask.io/'>MetaMask</a>!");
            //提示参考：https://gist.github.com/frozeman/fbc7465d0b0e6c1c4c23
		}
	});
```


### 二、获取当前网络信息

```
web3.version.getNetwork((error, netId) => {
			console.info('-----------输出当前网络信息-----------');
			switch (netId) {
				case "1":
					console.info('NetID:' + netId + '，This is mainnet');
					break;
				case "2":
					console.info('NetID:' + netId + '，This is the deprecated Morden test network.');
					break;
				case "3":
					console.info('NetID:' + netId + '，This is the ropsten test network.');
					break;
				case "4":
					console.info('NetID:' + netId + '，This is the Rinkeby test network.');
					break;
				case "42":
					console.info('NetID:' + netId + '，This is the Kovan test network.');
					break;
				default:
					console.info('NetID:' + netId + '，This is an unknown network.');
			}
		});
```

### 二、获取当前钱包是否打开

```
web3.eth.getAccounts(function (error, accounts) {
		console.info('-----------输出钱包是否锁定-----------');
		console.log(web3.eth.defaultAccount);
		if (accounts.length == 0) {
			console.info('钱包已锁定');
		} else {
			console.info('钱包已打开');
		}		
	});
```













