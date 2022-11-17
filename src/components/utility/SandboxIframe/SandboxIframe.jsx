export const url_base = 'https://codesandbox.io/embed/github/binary-com/deriv-developers-portal/tree/master/examples/';

export const sandboxes = {
    auth: `${url_base}auth`,
    ticks: `${url_base}ticks`,
    ticks_history: `${url_base}ticks_history`,
    website_status: `${url_base}website_status`,
    buy_contract: `${url_base}buy_contract`,
    active_symbols: `${url_base}active_symbols`,
    balance: `${url_base}balance`,
    sell_expired_contracts: `${url_base}expired_contracts`,
    contracts_for_symbol: `${url_base}contracts_for_symbol`,
    profit_table: `${url_base}profit_table`,
    portfolio: `${url_base}portfolio`,
    keep_alive: `${url_base}keep_alive`,
    proposal_open_contract: `${url_base}open_contracts`,
    proposal: `${url_base}proposal`,
    statement: `${url_base}statement`,
};

export const SandboxIframe = ({ sandbox }) => {
    const sandbox_url_attributes =
        '?autoresize=1&runonclick=1&codemirror=1&expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Findex.js&theme=darkveiw&view=split';
    return (
        <div className='sandbox-wrapper'>
            <iframe
                className='sandbox-iframe'
                src={`${sandbox}${sandbox_url_attributes}`}
                style={{
                    width: '100%',
                    height: '500px',
                    border: '0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '50px',
                }}
                title='static'
                sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
                loading='lazy'
            />
        </div>
    );
};
