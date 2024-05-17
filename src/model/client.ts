import { providers, Contract } from 'ethers';
import { observable } from 'mobx';

export class ClientModel {
    @observable
    provider = null; // provider 缓存

    @observable
    account = ''; // provider 缓存

    @observable
    signer = null; // signer 缓存

    // 获取 provider
    getProvider() {
        if (!window.ethereum) throw Error('请安装 MetaMask!'); // 判断是否安装 Metamask
        this.provider = new providers.Web3Provider(window.ethereum);
        return this.provider;
    }

    // 获取登录账户
    async requestAccounts() {
        if (this.provider && this.account) return this.account; // 判断 account 缓存
        if (!this.provider) this.getProvider();
        const accounts = await this.provider.send('eth_requestAccounts', []); // 登录
        return (this.account = accounts?.length > 0 ? accounts[0] : '');
    }

    // 获取 signer
    async getSigner() {
        if (this.provider && this.account && this.signer) return this.signer; // 判断 signer 缓存
        if (!this.provider || !this.account) await this.requestAccounts();
        return (this.signer = this.provider.getSigner());
    }

    // 获取合约对象
    async getDaiContract(contract) {
        const provider = this.getProvider();
        const { chainId } = await provider.getNetwork(); // 获取网络 ID
        if (chainId !== 4) throw Error('not Rinkeby!'); // 判断当前网络 ID 是不是 4
        const { address, abi } = contract;
        return new Contract(address, abi, provider);
    }

    // 获取合约对象并链接 signer
    async getDaiContractWithSigner(contract) {
        const signer = await this.getSigner();
        const daiContract = await this.getDaiContract(contract);
        return daiContract.connect(signer); // 链接 signer
    }
}

export default new ClientModel();
