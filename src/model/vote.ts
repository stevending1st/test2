import { formatBytes32String } from 'ethers/lib/utils';

import client from './client';
import { contract } from './contract';

const candidateNameRE = /^[\w ]{1,31}$/;
export class VoteModel {
    async addCandidate(candidate: string, candidateName: string) {
        console.log(
            'candidateName:',
            candidateName,
            candidateNameRE.test(candidateName)
        );
        if (!candidateNameRE.test(candidateName))
            throw Error('参选者名称须为小于 32 个字符，且为字母数字空格');
        const candidateNameBytes32String = formatBytes32String(candidateName);
        const daiContract = await client.getDaiContractWithSigner(
            contract.vote
        );
        await daiContract.addCandidate(candidate, candidateNameBytes32String);
    }

    async vote(candidate: string) {
        const daiContract = await client.getDaiContractWithSigner(
            contract.vote
        );
        await daiContract.vote(candidate);
    }

    async getVotersArray() {
        const daiContract = await client.getDaiContract(contract.vote);
        return await daiContract.getCandidatesArray();
    }
}
export default new VoteModel();
