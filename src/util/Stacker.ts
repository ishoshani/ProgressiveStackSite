import { Tag } from "./Tag";

export interface Stacker{
    name:String;
    tags: Tag[];
}

export interface StackView{
    speaker:Stacker;
    directResponse:Stacker[];
    stack: Stacker[];
}