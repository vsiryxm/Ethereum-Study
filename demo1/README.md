## 手把手教你开发以太坊DAPP

### 知识点

- 使用web3.js连接以太坊测试网络
- 将数据保存到以太坊区块链
- 获取以太坊区块链上数据

### 一、部署合约到以太坊测试网络
合约示例代码：
```
pragma solidity ^0.4.24;

contract InfoContract {
    
    string public name;
    uint public age;
    
    function setInfo(string _name, uint _age) public {
        name = _name;
        age = _age;
    }
    
    function getInfo() public view returns(string, uint) {
        return (name, age);
    }
    
}
```
可部署到以太坊测试网络，也可以通过Remix部署到本地私链geth或ganache-cli,然后通过MetaMask连接到对应网络。

### 二、使用web3.js连接以太坊测试网络

1、web3.js目前有两个版本：
- 0.20 稳定版 
`<script src="https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.js"></script>`
- 1.0 测试版
`<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>`

1.0测试版引入Promise，简化异步编程，将异步操作以同步操作的流程表达出来，避免层层嵌套的回调。
代码比0.02简洁得多，但目前没有稳定版本
建议使用0.20稳定版，支持ES5语法

2、连接提供者：
- infura
申请地址：https://infura.io/signup
可连接到主网、测试网络

- 本地geth或ganache-cli
如`HTTP://127.0.0.1:7545`

3、示例代码：
```
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
}
```


### 三、创建合约对象

1、导入合约ABI
复制ABI，将ABI压缩成一行，[点击去压缩>>](http://www.bejson.com/zhuanyi/)
```
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_age","type":"uint256"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```
2、实例化合约
```
var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_age","type":"uint256"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var myContract = web3.eth.contract(abi); //JSON.parse(abi)
contractInstance = myContract.at(contract);
console.info('-----------输出合约对象-----------');
console.info(contractInstance);
```

### 四、调用合约方法

1、数据上链

```
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
```

2、读取链上数据

```
contractInstance.getInfo(function(error, result) {
    console.info('-----------输出查询结果-----------');
    if(!error) {
        console.info('SUCCESS');
        console.info(result);
        console.info(result[0]);
        console.info(result.c);
    } else {
        console.info('FAIL');
        console.error(error);
    }
});
```

或者直接读取状态变量的值：

```
contractInstance.name(function(error, result) {
    console.info('-----------输出状态变量结果-----------');
    if(!error) {
        console.info('SUCCESS');
        console.info(result);
    } else {
        console.info('FAIL');
        console.error(error);
    }
});
```














