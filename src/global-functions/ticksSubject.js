import { webSocket } from 'rxjs/webSocket';
import { socket_url } from '../state/storageSignals';

export const ticksSubject = webSocket(socket_url());
