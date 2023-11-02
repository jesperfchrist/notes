export interface Augment {
    id: string;
    text: string;
    tags: string[];
    list: string; // TODO: move this to enum for list type
}

export interface Project {
    description: string;
    dueDate: Date;
    actions: string[];
}

export interface Ation {
    
}