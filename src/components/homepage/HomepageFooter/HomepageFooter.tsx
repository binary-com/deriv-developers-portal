export const HomepageFooter = () => {
    return (
        <div className='container dark' id='derivFooter'>
            <div className='row-container'>
                <div className='single-container dark'>
                    <h2>Get connected</h2>
                    <p className='mb-16p'>Discuss ideas and share solutions with developers worldwide.</p>
                    <a
                        target='_blank'
                        href='https://binary.vanillacommunity.com/'
                        className='community-btn'
                        rel='noreferrer noopener'
                    >
                        Join our community
                    </a>
                </div>
                <div className='single-container dark'>
                    <h2>We're here to help</h2>
                    <p>
                        Email us at
                        <a href='mailto: api-support@deriv.com'> api-support@deriv.com</a>
                        <br />
                        if you have any questions.
                    </p>
                </div>
            </div>
        </div>
    );
};
