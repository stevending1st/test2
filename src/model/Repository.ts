import { buildURLData } from 'web-utility';
import { ListModel } from 'mobx-restful';
import { components } from '@octokit/openapi-types';

import { service } from './service';
import { Project } from './Project';

export type Organization = components['schemas']['organization-full'];

export class RepositoryModel extends ListModel<Project> {
    client = service;
    baseURI = 'orgs/idea2app/repos';

    async loadPage(page: number, per_page: number) {
        const { body } = await this.client.get<Project[]>(
            `${this.baseURI}?${buildURLData({ page, per_page })}`
        );
        const [_, organization] = this.baseURI.split('/');
        const {
            body: { public_repos }
        } = await this.client.get<Organization>(`orgs/${organization}`);

        return { pageData: body, totalCount: public_repos };
    }
}

export default new RepositoryModel();
