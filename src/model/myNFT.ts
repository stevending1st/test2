import { BigNumber } from 'ethers';
import { observable } from 'mobx';

import client from './client';
import { contract } from './contract';

export class MyNFTModel {
    @observable
    balance = 0;

    async mint(to: string, id: number) {
        const daiContract = await client.getDaiContractWithSigner(
            contract.myNFT
        );
        await daiContract.mint(to, id);
    }

    async balanceOf(account: string) {
        const daiContract = await client.getDaiContract(contract.myNFT);
        const balanceBigNumber = await daiContract.balanceOf(account);
        return (this.balance = (balanceBigNumber as BigNumber).toNumber());
    }

    async ownerOf(id: number) {
        const daiContract = await client.getDaiContract(contract.myNFT);
        return daiContract.ownerOf(id);
    }

    async userOwnedTokens(address: string) {
        const daiContract = await client.getDaiContract(contract.myNFT);
        return daiContract.userOwnedTokens(address);
    }
}

export default new MyNFTModel();
