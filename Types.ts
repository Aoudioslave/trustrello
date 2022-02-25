export interface  Assignees {
    name: string,
    avt: string,
}

export interface Task {
    id: string,
    title: string,
    columnId: string,
    assignees: Assignees
}

export interface Column {
    id: string,
    name: string,
    items: Task[]
}
