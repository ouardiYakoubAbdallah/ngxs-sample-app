//Here we define four actions for CRUD operations respectively

//Read
export class GetUsers {
    static readonly type = '[USERS] Get';
}

//Create
export class AddUsers {
    static readonly type = '[USERS] Add';
    constructor(public payload: any) { }
}

//Update
export class UpdateUsers {
    static readonly type = '[USERS] Update';
    constructor(public payload: any, public id: number, public i:number) { }
}

//Delete
export class DeleteUsers {
    static readonly type = '[USERS] Delete';
    constructor(public id: number) { }
}