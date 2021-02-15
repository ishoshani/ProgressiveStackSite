import { Stacker } from "./Stacker";
import { Tag } from "./Tag";

export interface RoomDesc{
    title: string;
    tags: Tag[];
    list: Stacker[];
}