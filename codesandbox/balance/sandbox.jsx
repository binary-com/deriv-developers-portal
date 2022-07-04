import React from 'react';

export const sandboxes = {
    ticks: '<iframe src="https://codesandbox.io/embed/github/binary-com/deriv-developers-portal/tree/master/examples/ticks?autoresize=1&codemirror=1&expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Findex.js&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="static" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>'
}

export const SandboxIframe = ({ sandbox }) => {
    return (<div dangerouslySetInnerHTML={ {__html:  sandbox?sandbox:""}} />);
}
