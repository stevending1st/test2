import { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'react-bootstrap';

@observer
export class VotePage extends PureComponent {
    render() {
        return (
            <Container fluid="md" className="vh-100">
                <h2 className="text-center mt-4">Vote Rule</h2>
                <ul>
                    <li>You should mint nft before voting.</li>
                    <li>You should create a vote before voting.</li>
                </ul>
                <hr />
            </Container>
        );
    }
}
