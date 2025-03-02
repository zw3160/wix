export interface MenuNode {
    id: number;
    name: string;
    children: MenuNode[];
}

export interface MenuItemProps {
    item: MenuNode;
    onAdd: (parentId: number) => void;
    onRename: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
}