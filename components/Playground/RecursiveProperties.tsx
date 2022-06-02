import SchemaDescription from './SchemaDescription';
import SchemaObjectContent from './SchemaObjectContent';

export default function RecursiveProperties ( { is_open, properties, value } : { is_open: boolean, properties: any, value: any }): any {
    const keys = properties && Object.keys(properties);
    if (!is_open) {
        return null;
    }
    if (!keys) {
        return <>
            <SchemaDescription description={value.description}/>
        </>
    }
    return keys?.map((key, index) => {
        return (
            <SchemaObjectContent key={index} key_value={key} properties={properties} />
        );
    });
}
