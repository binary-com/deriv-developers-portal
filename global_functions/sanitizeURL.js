const splitURL = () => {
    const current_url = window.location.href;
    const split_url = current_url.split('?');
    return split_url[0];
}

export const sanitizeURL = () => window.history.replaceState(null, 'sanitized', splitURL());
