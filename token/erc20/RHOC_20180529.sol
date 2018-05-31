pragma solidity ^0.4.7;

contract SafeMath {
  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }
  /* 批注：throw是早期Solidity 0.4.10之前的写法，
     现在已经将assert纳入系统异常处理函数，不再使用throw */
  function assert(bool assertion) internal {
    if (!assertion) throw;
  }
}

/* 批注：看到过ERC20分成两个合约的写法，多了一个ERC20Basic，
   如下面合成一个的写法，合在一起的可能更容易被以太坊官网接受 */
contract ERC20 {
  uint public totalSupply;
  function balanceOf(address who) constant returns (uint);
  function allowance(address owner, address spender) constant returns (uint);

  function transfer(address to, uint value) returns (bool ok);
  function transferFrom(address from, address to, uint value) returns (bool ok);
  function approve(address spender, uint value) returns (bool ok);
  event Transfer(address indexed from, address indexed to, uint value);
  event Approval(address indexed owner, address indexed spender, uint value);
}

/* 批注：SafeMath有两种引入方式，一种是library，通过using导入；
   一种是contract，通过继承 */
contract StandardToken is ERC20, SafeMath {
  mapping (address => uint) balances;
  mapping (address => mapping (address => uint)) allowed;

  function transfer(address _to, uint _value) returns (bool success) {
    // This test is implied by safeSub()
    // if (balances[msg.sender] < _value) { throw; }
    balances[msg.sender] = safeSub(balances[msg.sender], _value);
    balances[_to] = safeAdd(balances[_to], _value);
    Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint _value) returns (bool success) {
    var _allowance = allowed[_from][msg.sender];

    // These tests are implied by safeSub()
    // if (balances[_from] < _value) { throw; }
    // if (_allowance < _value) { throw; }
    balances[_to] = safeAdd(balances[_to], _value);
    balances[_from] = safeSub(balances[_from], _value);
    allowed[_from][msg.sender] = safeSub(_allowance, _value);
    Transfer(_from, _to, _value);
    return true;
  }

  function balanceOf(address _owner) constant returns (uint balance) {
    return balances[_owner];
  }

  function approve(address _spender, uint _value) returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) constant returns (uint remaining) {
    return allowed[_owner][_spender];
  }
}

contract RHOC is StandardToken {
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name = "RHOC";   // Fancy name: eg: RHO Coin
    string public symbol = "RHOC"; // An identifier: eg RHOC
    uint public decimals = 8;      // Unit precision

    function RHOC(uint supply, address mint) {
        totalSupply = supply;       // Set the total supply (in base units)
        balances[mint] = supply;    // Initially assign the entire supply to the specified account
    }

    /* 批注：禁止向合约地址打ETH */
    // do not allow deposits
    function() {
        throw;
    }
}

/*
总结：
1、合约地址：https://etherscan.io/address/0x168296bb09e24a88805cb9c33356536b980d3fc5
2、这是RChain发行的代币RHOC(RHOC)；
3、从合约代码来看，这应该是0.4.10版本前编写的，属于早期发布的合约；
4、合约没有设置管理员，直接将余额指定给一个钱包地址；
5、业务逻辑比较简单，没有增发、燃烧、停止交易方法；
6、禁止向合约地址打ETH。
*/
