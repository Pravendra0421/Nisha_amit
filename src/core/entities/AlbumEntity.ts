export interface AlbumEntity{
    id:string;
    name:string;
    CoverImage?:string;
    url:string[];
    createdAt:Date;
    updatedAt:Date;
}