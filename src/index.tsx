import { auto } from 'browser-unhandled-rejection';
import { render } from 'react-dom';

import { PageFrame } from './page';
import metamask from './model/metamask';

auto();

self.addEventListener('unhandledrejection', ({ reason }) => {
    const { message } = reason as Error;

    if (message) self.alert(message);
});

// 监听网络改变
window.ethereum.on(
    'chainChanged',
    chainId => {
        console.log('------chainChanged-------', chainId); // 打印改变后的网络 ID
        if (Number(chainId) !== 4) alert('not Rinkeby!');
    },
    { once: true }
);

// 监听账户改变
window.ethereum.on(
    'accountsChanged',
    accounts => {
        console.log('------accountsChanged-------');
        location.reload();
    },
    { once: true }
);

render(<PageFrame />, document.querySelector('#app'));
