import { Maybe } from "common";

export type MediaItemsList = {
  allMediaFilesCount: number;
  currentPage: number;
  results: Array<Maybe<MediaItem>>;
};

export type MediaItem = {
  id: number;
  file: string;
  title: string;
  creationDate: string;
  author: number;
};
export type CommentList = {
  allCommentsCount: number;
  currentPage: number;
  results: Array<Maybe<Comment>>
}
export type Comment = {
  id: number;
  body: string;
  author: string;
  creationDate: string;
};
