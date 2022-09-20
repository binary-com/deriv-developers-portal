import { webSocket } from "rxjs/webSocket";
import { socket_url } from "./storageSignals";

export const ticksSubject = webSocket(socket_url());
