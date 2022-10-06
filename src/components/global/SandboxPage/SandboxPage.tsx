import { SandboxIframe } from "../../utility/SandboxIframe/SandboxIframe"; 

interface SandboxPageProps {
    title: string,
    description: {
        before: string;
        after: string;
    },
    sandbox: string
}

export default function SandboxPage({title, description, sandbox}:SandboxPageProps) {
    return (
        <div>
            <h1>{title}</h1>
            <div>{description.before}</div>
            <SandboxIframe sandbox={sandbox} />
            <div>{description.after}</div>
        </div>
    );
}
