import { webSocket } from 'rxjs/webSocket';

const server = "frontend.binaryws.com"
const language = "EN"
const app_id = "11780"
const brand_name = "deriv"
const socket_url = `wss://${server}/websockets/v3?app_id=${app_id}&l=${language}&brand=${brand_name}`;

export const ticksSubject = webSocket(socket_url);

