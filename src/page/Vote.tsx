import { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Button, Container } from 'react-bootstrap';
import { formatBytes32String, parseBytes32String } from 'ethers/lib/utils';
import { AddCandidateModal } from '../components/AddCandidateModal';
import { observable } from 'mobx';
import { VoteModal } from '../components/VoteModal';

@observer
export class VotePage extends PureComponent {
    @observable
    isShowAddCandidateModal = false;

    @observable
    isShowVoteModal = false;

    onCloseAddCandidateModal() {
        this.isShowAddCandidateModal = false;
    }

    onCloseVoteModal() {
        this.isShowVoteModal = false;
    }

    componentDidMount() {}
    render() {
        return (
            <Container fluid="md" className="vh-100">
                <h2 className="text-center mt-4">Vote Rule</h2>
                <ul>
                    <li>You should mint nft before voting.</li>
                    <li>You should create a vote before voting.</li>
                </ul>
                <hr />
                <Button
                    className="me-2"
                    onClick={() => (this.isShowVoteModal = true)}
                >
                    投票
                </Button>
                <Button
                    variant="success"
                    onClick={() => (this.isShowAddCandidateModal = true)}
                >
                    新增候选人
                </Button>

                <VoteModal
                    show={this.isShowVoteModal}
                    onClose={() => this.onCloseVoteModal()}
                />
                <AddCandidateModal
                    show={this.isShowAddCandidateModal}
                    onClose={() => this.onCloseAddCandidateModal()}
                />
            </Container>
        );
    }
}
