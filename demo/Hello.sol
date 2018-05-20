pragma solidity ^0.4.18;

contract Hello {

    string geeting; //状态变量（字符串，引用类型），以太坊上的程序，是代码和数据（即状态变量）的集合
        
    /* 构造函数只在创建合约时调用一次 */
    /* 初始化输入：hello world! */
    constructor(_geeting) public {
      greeting = _greeting;
    }
    
    /* constant是view的别名，constant计划在Solidity 0.5.0版本之后会弃用。 */
    function say() view public returns (string) {
        return greeting;
    }
    
}
