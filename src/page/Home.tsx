import { Contract, providers } from 'ethers';
import { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-class-tools';
import { Container, Button } from 'react-bootstrap';

import client from '../model/client';
import myNFT from '../model/myNFT';
import { contract } from '../model/contract';

@observer
class HomePage extends PureComponent<
    RouteComponentProps<{}, {}, { guest: string }>
> {
    async mintNFT() {
        try {
            // 未封装形式的合约调用
            /**
             if (!window.ethereum) throw Error("请安装 MetaMask!"); // 判断是否已经安装 Metamask
             const provider = new providers.Web3Provider(window.ethereum); // 获取 provider
             const accounts = await provider.send("eth_requestAccounts", []); 
             const account = accounts?.length > 0 ? accounts[0] : '';
             const { chainId } = await provider.getNetwork(); // 获取链接网络
             if (chainId !== 4) throw("not Rinkeby!");
             const { address, abi } = contract.myNFT;
             const daiContract = new Contract(address, abi, provider); // new 合约实例
             const re = await daiContract.balanceOf(account); // 获取当前账户的 mint 个数
             console.log("balanceOf - re:", re);
             */

            const account = await client.requestAccounts(); // 登录
            const balance = await myNFT.balanceOf(account); // 获取当前账户的 mint 个数
            console.log(balance);

            if (!balance) {
                // 当 mint 个数为 0，执行

                // 生成随机的 ID
                // const myNFTIdString =
                //     '' + Math.round(Math.random() * 89 + 10) + Date.now();
                // const myNFTIdNum = Number(myNFTIdString);
                const myNFTIdNum = Number(
                    '' + Math.round(Math.random() * 89 + 10) + Date.now()
                ); // 上面两条语句可合成这一条语句
                console.log('myNFTIdNum:', myNFTIdNum);

                await myNFT.mint(account, myNFTIdNum); // mint 指定 ID 的 NFT
                await myNFT.balanceOf(account); // 获取当前账户的 mint 个数
            }
        } catch (error: any) {
            console.log('err:', error);
        }
    }

    async componentDidMount() {
        // 组件挂载后执行
        await client.requestAccounts();
        const account = client.account;
        if (account) {
            // 用户已登录执行
            const balance = await myNFT.balanceOf(account);
            console.log(balance);
        }
    }

    render() {
        const { guest } = this.props.query;
        const { account } = client;
        return (
            <Container
                fluid="md"
                className="vh-100 d-flex justify-content-center  align-items-center"
            >
                {guest && <h2>Welcome {guest}!</h2>}

                {!account && <h1 className="my-4">欢迎，请登录！</h1>}

                {account && myNFT.balance <= 0 && (
                    <Button onClick={() => this.mintNFT()}>Mint My NFT</Button>
                )}

                {account && myNFT.balance > 0 && (
                    <p className="h3">You Minted</p>
                )}
            </Container>
        );
    }
}

export default withRouter(HomePage);
