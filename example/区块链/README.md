# 智能合约项目

> Created By xuxuejin

## 智能合约开发规划

智能合约项目在开发的时候，主要分为三大部分：

-   智能合约代码：根据业务不同，编写不同的合约代码

-   合约部署脚本：部署脚本通用，基本不需要更改

-   合约测试脚本：根据不同的业务，编写不同的测试脚本

★ **注意事项**

合约开发完以后需要通过 eslint 工具检测，测试合约有没有语法问题

## 智能合约架构

### 1. 业务和存储为分开

为了能让智能合约更加灵活，方便升级和扩展，采用数据和业务逻辑分来的方案，间接地支持了合约的升级，架构设计如下：

| 存储合约 | 网关合约 | 业务合约 |
| -------- | -------- | -------- |
| storage  | gateway  | execute  |

-   storage

    该合约用于真正的存储数据。

-   gateway

    该合约起到一个中间桥梁的作用，连接存储合约和业务合约，业务合约的相关操作都先经过此代理，再由该代理加载存储合约实现数据的存储或查询。

-   execute

    该合约主要用来处理复杂业务逻辑，然后将处理完的结果交给网关合约，网关合约再调用存储合约进行最终的数据存储。

    比如一网通管项目，调用端入参由“公式名+数据”组成，业务合约需要根据不同的公式，计算出每一步的结果，再组合成业务需要的数据，最后由网关合约调用存储合约进行数据存储。

这种架构在写合约的时候，有几点需要注意的地方：

-   白名单机制

    为了防止恶意合约调用存储合约，增加了白名单机制，每次部署完业务合约，会把业务合约的地址添加到存储合约里，在进行数据存储时，存储合约会校验该业务合约的地址在不在白名单中，不在白名单里便不会执行。

-   部署顺序

    因为有三个合约，在部署的时候，需要注意顺序，其实顺序问题是由上面白名单机制引起的，为了保证能把业务合约的地址存到存储合约的白名单中，所以要遵循：存储合约 -> 网关合约 -> 业务合约 的顺序进行部署。

### 2. 业务和存储一体

这种架构只有一个合约，数据和业务逻辑都在一个合约里边，没有部署顺序问题，业务和存储都在一个合约里做完。

过往项目都是使用的存储和业务分型的架构，但是这种合约调合约的方式，每调用一次合约，就需要调用 v8 引擎生成实例，有性能问题。

## 目录结构

```
contract-project
├── address
├── config
├── contract
├── deploy
├── test
├── utils
```

-   `address`：部署完成后生成的合约地址存储在该目录下
-   `config`：配置文件
-   `contract`：智能合约
-   `deploy`：部署脚本
-   `test`：测试脚本
-   `utils`：工具库

## 调试

1. 连接测服调试

    登录节点服务器，通过查看日志的方式，查看智能合约的 log 输出

    > IP：172.17.3.121 username：fabric pwd：fabric

    > tail -100f /usr/local/pioneer/log/pioneer-out.log

    在合约代码里使用链提供的 Utils.log 输出的日志查看

2. 本地搭建测试链

## 常用接口

### 1. http

1. 查看合约内容，用来检测合约有没有部署成功，是不是最新的合约内容

    > /getAccount?address=ulpi3boKhwTSLMfZBqUHUd9242ixWtW2qg8cEt

2. 查询账号基本信息，合约部署成功后，可以通过该接口查询部署的合约

    > /getAccountBase?address=ulpi3WcGtwtSBjyoLDesK81rRk9tSJa4VDZLME

3. 查看存储在合约 metaData 上的数据，数据上链，数据就是保存在 metaData 对象内

    > /getAccountMetaData?address=ulpi3kNqZX8TDAbZxyPH12xN4wPKf4ks2zBSz2

4. 根据 hash 查询交易详情

    > /getTransactionHistory?hash=11a44ba858875b5136a4927082169d124f72c32ce6e5ace439bf2f2440ae33b2

5. 查询创世账号：区块链刚刚部署完成，那么区块链系统中只有创世账号

    > HTTP GET localhost:36002/getGenesisAccount

6. http 接口直接部署合约

    > 172.17.3.121:36002/submitTransaction

    ```
       {
          "items": [{
             "private_keys": ["privByFwi1dmPFvcXBTAo8Zw6pNEjpMRWxVRgXGE622EpuKwWk3HZw5F"],
             "transaction_json": {
                "nonce": 28507,
                "operations": [{
                   "create_account": {
                      "dest_address": "",
                      "priv": {
                         "master_weight": "0",
                         "thresholds": {
                            "tx_threshold": "1"
                         }
                      },
                      "init_input": "init",
                      "contract": {
                         "payload": "通过lint校验的合约代码"
                      }
                   },
                   "type": 1
                }],
                "source_address": "ulpi3r6xjCqtMfFr4Vf6v7v9e5ke3q6QaAHEjh"
             }
          }]
       }
    ```

    每次部署 nonce 值需要 +1

### 2. sdk

1. 调用合约代码

    > sdk.contract.call(args);

    这个接口可以直接调用合约 init 和 main 方法，args 参数有个必传参数 optType：

    - 0 调用合约的读写接口 init
    - 1 调用合约的读写接口 main
    - 2 调用合约只读接口 query

    所有通过 sdk 查询合约存储数据，只要 optType 传 2 即可

### 3. chain

1. 调用合约

    > Chain.contractCall(contractAddress, asset, amount, input);

2. 代理调用

    > Chain.delegateCall(contractAddress, input);

3. 存储数据：上链数据就是通过该方法存储在合约账号的 metadata 里边

    > Chain.store(metadata_key, metadata_value);

## 操作

操作是指在跟链交互的操作，目前操作有 10 种，分别是: 激活账户、设置账户 metadata、设置账户权限、发送 BU、发行资产、转移资产、创建合约、发送资产触发合约、发送 BU 触发合约、日志。

所有跟链交互的操作都可以视为一次交易，都需要走以下操作流程：

1. 获取账户 nonce 值

    ```
    const nonceInfo = await sdk.account.getNonce(sourceAddress);
    const nonce = new BigNumber(nonceInfo.result.nonce).plus(1).toString(10)
    ```

    sourceAddress 为发起这笔交易的源账户地址

2. 构建操作:具体操作看文档

    ```
    const createContractOperationInfo = sdk.operation.contractCreateOperation({
      sourceAddress: sourceAddress,
      initBalance: '90000000',
      payload: contract_str,
      initInput: init_params_str,
      metadata: 'Create contract',
    });
    ```

    contractCreateOperation 操作是创建合约，具体参数看众链文档

3. 序列化交易

    ```
    let blobInfo = sdk.transaction.buildBlob({
      sourceAddress: sourceAddress,
      gasPrice: '3000',
      feeLimit: '1001798200000',
      nonce: nonce,
      operations: [createContractOperation],
      metadata: 'Create token',
    });
    ```

4. 签名交易

    ```
    const signatureInfo = sdk.transaction.sign({
      privateKeys: [privateKey],
      blob,
    });
    ```

    privateKey 为发起这笔交易的账户的私钥

5. 提交交易

    ```
    const data = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    ```

## 过往项目

1. 曹家渡智能合约：[仓库地址](https://gitlab.intranet.huiyin.com/union/cjd-dangjian-contract)

2. 实验室智能合约：[仓库地址](https://gitlab.intranet.huiyin.com/union/laboratory)

3. 一网通管智能合约：[仓库地址](https://gitlab.intranet.huiyin.com/union/job-flow-contract)

4. 存证通智能合约：[仓库地址](https://gitlab.intranet.huiyin.com/union/czt/contract)

## 参考文档

1. 众链开发文档：[合约文档](https://gitlab.intranet.huiyin.com/union/unionledger-doc/blob/master/contract_CN.md)

2. 众链设计文档：[设计文档](https://gitlab.intranet.huiyin.com/union/unionledger-doc/blob/master/design_CN.md)

3. 众链开发文档：[开发文档](https://gitlab.intranet.huiyin.com/union/unionledger-doc/blob/master/develop_CN.md)

4. BUMO 文档：[文档](https://docs.bumo.io/cn/docs/syntax_in_smart_contract/)

5. 语法校验工具：[ESlint](http://jslint.bumocdn.com/)

## 待办

1. 合约项目整合到一个项目里边

2. ESlint 整合到合约项目里

3. 合约部署脚本使用同一套

### 附：

1. 存证通合约

-   存储合约 /getAccount?address=ulpi3jbaRGf7tLCxABJXxWtKBcYkXLKaY7cNKJ
-   业务合约 /getAccount?address=ulpi3WuFCMGqtJYCe25VzJSRNEvXFmXdd7bd2M
-   链上数据 /getAccountMetaData?address=ulpi3jbaRGf7tLCxABJXxWtKBcYkXLKaY7cNKJ
-   交易记录 /getTransactionHistory?hash=11a44ba858875b5136a4927082169d124f72c32ce6e5ace439bf2f2440ae33b2

2. 一网通业务合约

-   存储合约 /getAccount?address=ulpi3ZiJYWfr53JassCwgrVGTNgBwqGdgSUSFA
-   业务合约 /getAccount?address=ulpi3jandg82sqCE9PesSdvKu3VzUXWcrLx5by
-   网关合约 /getAccount?address=ulpi3dVTzs7DkGS4Kh8zrzjR8noGeipf74QsDg
