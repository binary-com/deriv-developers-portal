import style from './JsonSchemas.module.scss';

const JsonSchemas = () => {
    const json_navigation = [
        {
            id: 'json-schemas',
            title: 'JSON Schemas',
            path: 'https://github.com/binary-com/websockets/tree/gh-pages/config',
        },
        {
            id: 'changelog',
            title: 'changelog',
            path: 'https://github.com/binary-com/websockets/commits/gh-pages',
        },
        {
            id: 'json-editor',
            title: 'JSON Editor with JSON Schema support',
            path: 'https://jeremydorn.com/json-editor/',
        },
        {
            id: 'json-schema_ts',
            title: 'Generate JSON Schema from TypeScript',
            path: 'https://lbovet.github.io/typson-demo/',
        },
        {
            id: 'json-schema_object',
            title: 'Generate JSON Schema from JSON Object',
            path: 'https://jsonschema.net/',
        },
        {
            id: 'json-schema_validator',
            title: 'JSON Schema Validator',
            path: 'https://www.jsonschemavalidator.net/',
        },
    ];

    return (
        <div data-id='json-schemas' className={style['page-container']}>
            <h1>JSON Schemas</h1>
            <p>
                Our API is defined by
                <a href={json_navigation[0].path} target='_blank' rel='noreferrer'>
                    {' '}
                    {json_navigation[0].title}
                </a>
                . Get updates by looking for "JSON Schema Update" in the
                <a href={json_navigation[1].path} target='_blank' rel='noreferrer'>
                    {' '}
                    {json_navigation[1].title}
                </a>
                .
            </p>
            <h3>Useful tools:</h3>
            {json_navigation.map(
                ({ id, title, path }, i) =>
                    i > 1 && (
                        <p key={id}>
                            <a key={id} href={path} target='_blank' rel='noreferrer'>
                                {title}
                            </a>
                        </p>
                    )
            )}
        </div>
    );
};

export default JsonSchemas;
