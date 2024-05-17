import { observable } from 'mobx';

import client from './client';

export class MetaMaskModel {
    account = observable.box(''); // 缓存登录钱包地址

    connectMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            // 如果已经安装 metamask 插件
            console.log('MetaMask is installed!');
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            }); // 用 metamask 的接口请求登录
            console.log('accounts:', accounts);
            this.account.set(accounts?.length > 0 ? accounts[0] : '');
            console.log('account:', this.account.get());
        } else {
            // 如果未安装 metamask 插件
            console.error('MetaMask is not installed!');
        }
    };
}

export default new MetaMaskModel();
