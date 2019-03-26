interface User {
    id: string;
    name: string;
    created_on: string;
}

interface UserList {
    next_page: string;
    prev_page: string;
    users: User[];
}

interface UserCreated {
    id: string;
    selfUrl: string;
}

interface PetrinetUploaded {
    petrinetId: string;
    petrinetUrl: string;
}

export { User, UserList, UserCreated, PetrinetUploaded };
