import { StateRequest } from "./state-request";
import { EdgeRequest } from "./edge-request";
import { InitialRequest } from "./initial-request";

interface GraphRequest {
    states: Array<StateRequest>;
    edges: Array<EdgeRequest>;
    initial: InitialRequest;
}

export { GraphRequest };