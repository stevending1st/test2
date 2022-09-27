import mynftAbi from '../abi/mynft-abi.json';
import voteAbi from '../abi/vote-abi.json';

export const contract = {
    myNFT: {
        // abi: ['function ownerOf(uint tokenId) external view returns (address owner)','function balanceOf(address owner) external view returns (uint balance)'],
        abi: mynftAbi,
        address: '0x49bce9b9af0db2161525ee4b67de7221a8cf72d9'
    },
    vote: {
        abi: voteAbi,
        address: '0xE3D974266F19750A977be827E67522F9EB80F774'
    }
};
