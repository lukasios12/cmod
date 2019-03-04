import { Graph } from "src/system/graph/graph";
import { Edge } from "src/system/graph/edge";
import { State } from "src/system/graph/state";
import { StateRequest } from "src/request-types/state-request";
import { EdgeRequest } from "src/request-types/edge-request";
import { InitialRequest } from "src/request-types/initial-request";
import { GraphRequest } from "src/request-types/graph-request";

class GraphToRequest {
    public static convert(g: Graph) {
        let states = g.states;
        let edges = g.edges;
        
        let requestStates = new Array<StateRequest>();
        let requestEdges = new Array<EdgeRequest>();

        let sids = states.keys();
        for(let i = 0; i < sids.length; i++) {
            let state: State = states.get(sids[i])!;
            let r: StateRequest = {
                state: state.toString(),
                id: sids[i]
            };
            requestStates.push(r);
        }
        
        let eids = edges.keys();
        for(let i = 0; i < eids.length; i++) {
            let edge: Edge = edges.get(eids[i])!;
            let r: EdgeRequest = {
                id: eids[i],
                fromId: edge.from,
                toId: edge.to,
                transition: edge.label
            };
            requestEdges.push(r);
        }

        let initial = g.initial;
        let requestInitial: InitialRequest = {
            id: initial
        }

        let result: GraphRequest = {
            states: requestStates,
            edges: requestEdges,
            initial: requestInitial
        };
        return result;
    }
}

export { GraphToRequest };