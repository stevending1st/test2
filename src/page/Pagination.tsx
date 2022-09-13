import { observer } from 'mobx-react';
import { PureComponent } from 'react';
import { Container, Badge } from 'react-bootstrap';
import {
    Loading,
    Column,
    IdeaTable,
    PaginationBar,
    text2color
} from 'idea-react';

import { Project } from '../model/Project';
import repositoryStore from '../model/Repository';
import * as style from './Pagination.module.less';

@observer
export class PaginationPage extends PureComponent {
    componentDidMount() {
        repositoryStore.getList({}, 1);
    }

    columns: Column<Project>[] = [
        {
            key: 'full_name',
            label: 'Repository Name',
            render: ({ html_url, full_name }) => (
                <a target="_blank" href={html_url}>
                    {full_name}
                </a>
            )
        },
        {
            key: 'homepage',
            label: 'Home Page',
            render: ({ homepage }) => (
                <a target="_blank" href={homepage}>
                    {homepage}
                </a>
            )
        },
        { key: 'language', label: 'Programming Language' },
        {
            key: 'topics',
            label: 'Topic',
            render: ({ topics }) => (
                <>
                    {topics.map(topic => {
                        const color = text2color(topic);

                        return (
                            <Badge
                                key={topic}
                                className="me-2"
                                bg={color}
                                text={color === 'light' ? 'dark' : undefined}
                            >
                                {topic}
                            </Badge>
                        );
                    })}
                </>
            )
        },
        { key: 'stargazers_count', label: 'Star Count' }
    ];

    render() {
        const { columns } = this,
            { downloading, pageIndex, pageSize, totalCount, currentPage } =
                repositoryStore;

        return (
            <Container className={style.root}>
                {!!downloading && <Loading />}

                <IdeaTable columns={columns} list={currentPage} />
                <PaginationBar
                    className="mt-2"
                    currentPage={pageIndex}
                    pageCount={Math.ceil(totalCount / pageSize)}
                    onChange={index => repositoryStore.getList({}, index)}
                />
            </Container>
        );
    }
}
