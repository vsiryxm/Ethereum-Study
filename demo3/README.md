## 撸web3.js接口代码DEMO

### 知识点

```
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
sendTransaction();
sendContractTransaction();
signData(); //使用指定帐户签名要发送的数据，帐户需要处于解锁状态
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

```

### 注意

建议在chrome console控制台下测试使用。
如果有报错，需要修改相关方法的参数。

### 参考

https://web3.learnblockchain.cn/0.2x.x/












