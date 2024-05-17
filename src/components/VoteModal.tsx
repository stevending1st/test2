import { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import vote from '../model/vote';

interface AddCandidateInput {
    candidateName: string;
    candidate: string;
}

interface AddCandidateModalProps {
    show: boolean;
    onClose?: () => any;
}

export const VoteModal = ({ show, onClose }: AddCandidateModalProps) => {
    const [candidates, setCandidates] = useState([]);
    // useEffect(() => {
    //     const init = async () => {
    //         try{
    //             const nowCandidates = await vote.getVotersArray();
    //             console.log("nowCandidates:", nowCandidates);
    //             return;
    //             setCandidates(() => nowCandidates);
    //         } catch(err: any) {
    //             console.error(err);
    //             alert(err);
    //         }
    //     }
    //     init();
    // }, []);
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClose?.();
    };
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>添加候选人</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    {/* <Row>
                    <Col sm="2">名称：</Col>
                    <Col sm="10">
                        <Form.Control placeholder="请输入名称" onChange={({ target: { value } }) => setPeople(people => ({ ...people, candidateName: value }))} />
                    </Col>
                </Row>
                <Row className="my-1">
                    <Col sm="2">地址：</Col>
                    <Col sm="10">
                        <Form.Control placeholder="请输入地址" onChange={({ target: { value } }) => setPeople(people => ({ ...people, candidate: value }))} />
                    </Col>
                </Row>
                <Row>
                    <Button type="submit">确定</Button>
                </Row> */}
                </Form>
            </Modal.Body>
        </Modal>
    );
};
