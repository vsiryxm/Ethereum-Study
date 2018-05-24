/*
 * Copyright (C) 2017 DappHub, LLC
 * @link https://github.com/dapphub/
 */

pragma solidity ^0.4.11;

/**
 * @dev 调用合约方法，更好地处理异常
 * 封装了.call、.exec、.tryExec
 * @link https://github.com/dapphub/ds-exec/blob/c1e683ae3f1f1e8522b0cb80367b5ba444f3a252/src/exec.sol
 */
contract DSExec {

    function tryExec(address target, bytes calldata, uint value) internal returns (bool call_ret)
    {
        return target.call.value(value)(calldata);
    }

    function exec(address target, bytes calldata, uint value) internal
    {
        if(!tryExec(target, calldata, value)) {
            throw;
        }
    }

    // Convenience aliases
    function exec(address t, bytes c) internal
    {
        exec(t, c, 0);
    }

    function exec(address t, uint256 v) internal
    {
        bytes memory c;
        exec(t, c, v);
    }

    function tryExec(address t, bytes c) internal returns (bool)
    {
        return tryExec(t, c, 0);
    }

    function tryExec( address t, uint256 v ) internal returns (bool)
    {
        bytes memory c;
        return tryExec(t, c, v);
    }

}

/**
 * @dev 权限验证接口
 * 验证用户钱包地址对合约方法的调用是否拥有权限
 * @link https://github.com/dapphub/ds-auth/blob/b36fd917563483d10967b57af1c9c88d06204d67/src/auth.sol
 */
contract DSAuthority {
    function canCall(address src, address dst, bytes4 sig) constant returns (bool);
}

/**
 * @dev 变更权限日志
 * 对账户进行合约操作授权或变更合约管理员时，记录日志
 * @link https://github.com/dapphub/ds-auth/blob/b36fd917563483d10967b57af1c9c88d06204d67/src/auth.sol
 */
contract DSAuthEvents {
    /* 合约操作授权时日志 */
    event LogSetAuthority (address indexed authority);
    /* 变更合约管理员日志 */
    event LogSetOwner     (address indexed owner);
}

/**
 * @dev 权限验证合约
 * 验证用户钱包地址对合约方法的调用是否拥有权限
 * @link https://github.com/dapphub/ds-auth/blob/b36fd917563483d10967b57af1c9c88d06204d67/src/auth.sol
 */
contract DSAuth is DSAuthEvents {
    /* 权限验证接口实例 */
    DSAuthority  public  authority;
    /* 定义合约管理员 */
    address public  owner;
    /* 权限验证构造函数 */
    function DSAuth() {
        /* 指定合约管理员为合约创建者 */
        owner = msg.sender;
        /* 将管理员钱包地址写入日志 */
        LogSetOwner(msg.sender);
    }

    /* 合约管理员身份转移 */
    function setOwner(address owner_) auth
    {
        /* 经过授权后，设置新的合约管理员 */
        owner = owner_;
        /* 将新的管理员钱包地址写入日志 */
        LogSetOwner(owner);
    }

    /* 合约操作授权 */
    function setAuthority(DSAuthority authority_) auth
    {
        authority = authority_;
        LogSetAuthority(authority);
    }

    /* 验证当前交易者是否拥有某个方法的操作权限 */
    modifier auth {
        assert(isAuthorized(msg.sender, msg.sig));
        _;
    }

    /* 是否被授权 */
    function isAuthorized(address src, bytes4 sig) internal returns (bool) {
        if (src == address(this)) {
            return true;
        } else if (src == owner) {
            return true;
        } else if (authority == DSAuthority(0)) {
            return false;
        } else {
            return authority.canCall(src, this, sig);
        }
    }

    /* 异常处理 */
    function assert(bool x) internal {
        if (!x) throw;
    }
}

/**
 * @dev 记录函数调用日志
 * 通过note函数修改器提供通用函数调用日志记录，该修改器触发将数据捕获为LogNote事件
 * @link https://github.com/dapphub/ds-note/blob/dbc97b158c743d8a33634d26c543f59bc0be61c3/src/note.sol
 */
contract DSNote {
    event LogNote(
    bytes4   indexed  sig,
    address  indexed  guy,
    bytes32  indexed  foo,
    bytes32  indexed  bar,
    uint     wad,
    bytes    fax
    ) anonymous;

    modifier note {
        bytes32 foo;
        bytes32 bar;

        assembly {
          foo := calldataload(4)
          bar := calldataload(36)
        }

        LogNote(msg.sig, msg.sender, foo, bar, msg.value, msg.data);
        _;
    }
  }

/**
 * @dev 安全运算库
 * @link https://github.com/dapphub/ds-math/blob/49b38937c0c0b8af73b05f767a0af9d5e85a1e6c/src/math.sol
 */
contract DSMath {

    /* uint256加运算 */
    function add(uint256 x, uint256 y) constant internal returns (uint256 z) {
        assert((z = x + y) >= x);
    }
    /* uint256减运算 */
    function sub(uint256 x, uint256 y) constant internal returns (uint256 z) {
        assert((z = x - y) <= x);
    }

    /* uint256乘运算 */
    function mul(uint256 x, uint256 y) constant internal returns (uint256 z) {
        z = x * y;
        assert(x == 0 || z / x == y);
    }

    /* uint256除运算 */
    function div(uint256 x, uint256 y) constant internal returns (uint256 z) {
        z = x / y;
    }

    /* uint256求最小数 */
    function min(uint256 x, uint256 y) constant internal returns (uint256 z) {
        return x <= y ? x : y;
    }

    /* uint256求最大数 */
    function max(uint256 x, uint256 y) constant internal returns (uint256 z) {
        return x >= y ? x : y;
    }

    /* uint128加运算，h即half缩写 */
    function hadd(uint128 x, uint128 y) constant internal returns (uint128 z) {
        assert((z = x + y) >= x);
    }

    /* uint128减运算 */
    function hsub(uint128 x, uint128 y) constant internal returns (uint128 z) {
        assert((z = x - y) <= x);
    }

    /* uint128乘运算 */
    function hmul(uint128 x, uint128 y) constant internal returns (uint128 z) {
        z = x * y;
        assert(x == 0 || z / x == y);
    }

    /* uint128除运算 */
    function hdiv(uint128 x, uint128 y) constant internal returns (uint128 z) {
        z = x / y;
    }

    /* uint128求最大数 */
    function hmin(uint128 x, uint128 y) constant internal returns (uint128 z) {
        return x <= y ? x : y;
    }

    /* uint128求最小数 */
    function hmax(uint128 x, uint128 y) constant internal returns (uint128 z) {
        return x >= y ? x : y;
    }

    /* int256求最小数 */
    function imin(int256 x, int256 y) constant internal returns (int256 z) {
        return x <= y ? x : y;
    }

    /* int256求最大数 */
    function imax(int256 x, int256 y) constant internal returns (int256 z) {
        return x >= y ? x : y;
    }

    /*
     * WAD math
     */

    uint128 constant WAD = 10 ** 18;

    function wadd(uint128 x, uint128 y) constant internal returns (uint128) {
        return hadd(x, y);
    }

    function wsub(uint128 x, uint128 y) constant internal returns (uint128) {
        return hsub(x, y);
    }

    function wmul(uint128 x, uint128 y) constant internal returns (uint128 z) {
        z = cast((uint256(x) * y + WAD / 2) / WAD);
    }

    function wdiv(uint128 x, uint128 y) constant internal returns (uint128 z) {
        z = cast((uint256(x) * WAD + y / 2) / y);
    }

    function wmin(uint128 x, uint128 y) constant internal returns (uint128) {
        return hmin(x, y);
    }
    function wmax(uint128 x, uint128 y) constant internal returns (uint128) {
        return hmax(x, y);
    }

    /*
    RAY math
     */

    uint128 constant RAY = 10 ** 27;

    function radd(uint128 x, uint128 y) constant internal returns (uint128) {
        return hadd(x, y);
    }

    function rsub(uint128 x, uint128 y) constant internal returns (uint128) {
        return hsub(x, y);
    }

    function rmul(uint128 x, uint128 y) constant internal returns (uint128 z) {
        z = cast((uint256(x) * y + RAY / 2) / RAY);
    }

    function rdiv(uint128 x, uint128 y) constant internal returns (uint128 z) {
        z = cast((uint256(x) * RAY + y / 2) / y);
    }

    function rpow(uint128 x, uint64 n) constant internal returns (uint128 z) {
        // This famous algorithm is called "exponentiation by squaring"
        // and calculates x^n with x as fixed-point and n as regular unsigned.
        //
        // It's O(log n), instead of O(n) for naive repeated multiplication.
        //
        // These facts are why it works:
        //
        //  If n is even, then x^n = (x^2)^(n/2).
        //  If n is odd,  then x^n = x * x^(n-1),
        //   and applying the equation for even x gives
        //    x^n = x * (x^2)^((n-1) / 2).
        //
        //  Also, EVM division is flooring and
        //    floor[(n-1) / 2] = floor[n / 2].

        z = n % 2 != 0 ? x : RAY;

        for (n /= 2; n != 0; n /= 2) {
            x = rmul(x, x);

            if (n % 2 != 0) {
                z = rmul(z, x);
            }
        }
    }

    function rmin(uint128 x, uint128 y) constant internal returns (uint128) {
        return hmin(x, y);
    }

    function rmax(uint128 x, uint128 y) constant internal returns (uint128) {
        return hmax(x, y);
    }

    function cast(uint256 x) constant internal returns (uint128 z) {
        assert((z = uint128(x)) == x);
    }

}

/*
* @dev ERC20标准接口
* @link https://github.com/dapphub/erc20/blob/768a3d8ca30590522c68951e989e5b69f5859151/src/erc20.sol
*/
contract ERC20 {
    /* 查询token总发行量 */
    function totalSupply() constant returns (uint supply);
    /* 查询指定钱包地址的token余额 */
    function balanceOf(address who) constant returns (uint value);
    /* 查询owner授权spender还能提取的token余额 */
    function allowance(address owner, address spender) constant returns (uint _allowance);
    /* 转账value个token到指定钱包地址to */
    function transfer(address to, uint value) returns (bool ok);
    /* 批准spender账户从自己的账户转移value个token，可分多次转移 */
    function approve(address spender, uint value) returns (bool ok);
    /* 与approve搭配使用，approve批准之后，调用transferFrom来转移token */
    function transferFrom(address from, address to, uint value) returns (bool ok);

    /* 转账日志 */
    event Transfer(address indexed from, address indexed to, uint value);
    /* 授权日志，当调用approve成功时，一定要触发Approval事件 */
    event Approval(address indexed owner, address indexed spender, uint value);
}

/**
 * @dev ERC20标准合约
 * @link https://github.com/dapphub/ds-token/blob/master/src/base.sol
 */
contract DSTokenBase is ERC20, DSMath {
    /* 发行总量 */
    uint256  _supply;
    /* 账户余额 */
    mapping (address => uint256) _balances;
    /* 被授权token使用额度 */
    mapping (address => mapping (address => uint256))  _approvals;

    /* 合约初始化 */
    function DSTokenBase(uint256 supply) {
        /* 合约管理员拥有合约所有token */
        _balances[msg.sender] = supply;
        /* 合约的发行总量 */
        _supply = supply;
    }

    /* 查询合约的发行总量 */
    function totalSupply() constant returns (uint256) {
        return _supply;
    }

    /* 查询账户的token余额 */
    function balanceOf(address src) constant returns (uint256) {
        return _balances[src];
    }

    /* 查询src授权guy还能提取的token个数 */
    function allowance(address src, address guy) constant returns (uint256) {
        return _approvals[src][guy];
    }

    /* 转账函数，从自己账户给dst转账wad个token */
    function transfer(address dst, uint wad) returns (bool) {
        assert(_balances[msg.sender] >= wad);
        _balances[msg.sender] = sub(_balances[msg.sender], wad);
        _balances[dst] = add(_balances[dst], wad);
        Transfer(msg.sender, dst, wad);
        return true;
    }

    /* 与approve搭配使用，approve批准之后，调用transferFrom函数来转移token */
    function transferFrom(address src, address dst, uint wad) returns (bool) {
        assert(_balances[src] >= wad);
        assert(_approvals[src][msg.sender] >= wad);
        _approvals[src][msg.sender] = sub(_approvals[src][msg.sender], wad);
        _balances[src] = sub(_balances[src], wad);
        _balances[dst] = add(_balances[dst], wad);
        Transfer(src, dst, wad);
        return true;
    }

    /* 批准guy账户从自己的账户转移wad个token，可以分多次转移。 */
    function approve(address guy, uint256 wad) returns (bool) {
        _approvals[msg.sender][guy] = wad;
        Approval(msg.sender, guy, wad);
        return true;
    }

}

/**
 * @dev 停止或开启合约
 * 需要被授权才能操作，并记录函数参数日志
 * @link https://github.com/dapphub/ds-stop/blob/master/src/stop.sol
 */
contract DSStop is DSAuth, DSNote {
    /* 合约是否被停止 */
    bool public stopped;

    /* 合约非停止状态下才能操作 */
    modifier stoppable {
        assert (!stopped);
        _;
    }

    /* 停止合约 */
    function stop() auth note {
        stopped = true;
    }

    /* 开启合约 */
    function start() auth note {
        stopped = false;
    }

}

/**
 * @dev ERC20标准合约
 * @link https://github.com/dapphub/ds-token/blob/master/src/token.sol
 */
contract DSToken is DSTokenBase(0), DSStop {
    /* token标志 */
    bytes32 public symbol;
    /* token精度 */
    uint256 public decimals = 18; // standard token precision. override to customize
    /* 合约管理员 */
    address public generator;

    /* 仅合约管理员才能操作 */
    modifier onlyGenerator {
        if(msg.sender != generator) throw;
        _;
    }

    /* 初始化token标识、token创建者 */
    function DSToken(bytes32 symbol_) {
        symbol = symbol_;
        generator = msg.sender;
    }

    /* 转账，方法重载，在没有停止合约的情况下，且记录操作日志 */
    function transfer(address dst, uint wad) stoppable note returns (bool) {
        return super.transfer(dst, wad);
    }

    /* 批准guy账户从自己的账户转移wad个token。可以分多次转移 */
    function approve(address guy, uint wad) stoppable note returns (bool) {
        return super.approve(guy, wad);
    }

    /* 与approve搭配使用，approve批准之后，调用transferFrom函数来转移token */
    function transferFrom(address src, address dst, uint wad) stoppable note returns (bool) {
        return super.transferFrom(src, dst, wad);
    }

    /* 将token从自己账户转账到另一个指定的地址（需要权限或批准，且未停止合约，记录函数参数日志） */
    function push(address dst, uint128 wad) returns (bool) {
        return transfer(dst, wad);
    }

    /* 从指定的账户转移token到自己账户（需要权限或批准，且未停止合约，记录函数参数日志） */
    function pull(address src, uint128 wad) returns (bool) {
        return transferFrom(src, msg.sender, wad);
    }

    /* 增发token（需要权限或批准，且未停止合约，记录函数参数日志） */
    function mint(uint128 wad) auth stoppable note {
        _balances[msg.sender] = add(_balances[msg.sender], wad);
        _supply = add(_supply, wad);
    }

    /* 燃烧token（需要权限或批准，且未停止合约，记录函数参数日志） */
    function burn(uint128 wad) auth stoppable note {
        _balances[msg.sender] = sub(_balances[msg.sender], wad);
        _supply = sub(_supply, wad);
    }

    /* 仅提供给合约管理员转账使用，记录函数参数日志 */
    function generatorTransfer(address dst, uint wad) onlyGenerator note returns (bool) {
        return super.transfer(dst, wad);
    }

    /* token名称 */
    bytes32 public name = "";

    /* 设置token名称（需要权限或批准） */
    function setName(bytes32 name_) auth {
        name = name_;
    }

}
