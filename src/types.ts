// Request types
interface InitialRequest {
    id: number | null;
}

interface EdgeRequest {
    id: number;
    fromId: number;
    toId: number;
    transition: string;
}

interface StateRequest {
    state: string;
    id: number;
}

interface GraphRequest {
    states: Array<StateRequest>;
    edges: Array<EdgeRequest>;
    initial: InitialRequest;
}

// Response types
interface UserResponse {
    id: string;
    name: string;
    created_on: string;
}

interface UserListResponse {
    next_page: string;
    prev_page: string;
    users: UserResponse[];
}

interface UserCreatedResponse {
    id: string;
    selfUrl: string;
}

interface PetrinetCreatedResponse {
    petrinetId: string;
    petrinetUrl: string;
}

interface SessionCreatedResponse {
    session_id: number;
}

interface FeedbackResponse {
    general: Array<number>;
    specific: Array<number>;
}

interface ErrorResponse {
    error: string;
}

export {
    InitialRequest,
    EdgeRequest,
    StateRequest,
    GraphRequest,
    UserResponse,
    UserListResponse,
    UserCreatedResponse,
    PetrinetCreatedResponse,
    SessionCreatedResponse,
    FeedbackResponse,
    ErrorResponse
};
