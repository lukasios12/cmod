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

export { User, UserList };
