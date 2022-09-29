import { SandboxIframe } from "../../utility/SandboxIframe/SandboxIframe"; 

interface SandboxPageProps {
    title: string,
    description: any,
    sandbox: string
}

export default function SandboxPage({title, description, sandbox}:SandboxPageProps) {
    return (
        <div>
            <h1>{title}</h1>
            <div>{description}</div>
            <SandboxIframe sandbox={sandbox} />
        </div>
    );
}
