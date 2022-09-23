/// <reference types="node" />
/// <reference types="node" />
import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";
export declare function run(CUSTOM_APP_PORT?: number, skipAdminAdd?: boolean): Promise<HTTPSServer<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | HTTPServer<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>;
