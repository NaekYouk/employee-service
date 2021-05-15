import query from "./media.queries";
import { sqlQuery } from "../postgres";
import { Comment, CommentList, MediaItem, MediaItemsList } from "media";
import { Maybe, PostgresCountObject } from "common";
import { getPageOffset, isInteger, validateInteger } from "../utils/number-helpers";
import { getCloudinaryMediaFilesPath, validateString } from "../utils/string-helpers";
import cloudinary from "cloudinary";

const getMediaFilesList = async(mediaFilesNumber: number, pageNumber: number): Promise<MediaItemsList> => {
  const parsedPageNumber = isInteger(pageNumber) ? pageNumber : 1;
  const limit: number = isInteger(mediaFilesNumber) ? mediaFilesNumber : 10;
  const offset: number = getPageOffset(parsedPageNumber, limit);

  const results: Array<Maybe<MediaItem>> = await sqlQuery(query.getMediaFilesList(limit, offset));
  const rowsCount: Array<Maybe<PostgresCountObject>> = await sqlQuery(query.getMediaFilesCount);

  return {
    allMediaFilesCount: +rowsCount[0].count,
    currentPage: parsedPageNumber,
    results
  };
};

const getMediaFileById = async(fileId: number): Promise<Maybe<MediaItem>> => {
  validateInteger(fileId, "Media file id is not an integer");
  const results: Array<Maybe<MediaItem>> = await sqlQuery(query.getMediaFileById(fileId));
  return results[0];
};

const addNewImage = async(imageTitle: string, image: any, creationDate: string): Promise<void> => {
  validateString(imageTitle, "Image title is not a string");
  validateString(image, "Image is not a string");

  // TODO Add date validation

  const publicId: string = getCloudinaryMediaFilesPath(imageTitle);
  const response: any = await cloudinary.v2.uploader.upload(image, {
    resource_type: "image",
    public_id: publicId,
    overwrite: true
  });
  if (response && response.secure_url) {
    try {
      await sqlQuery(
        query.addImage(imageTitle, creationDate, response.secure_url, 3)
      );
    } catch (e) {
      await cloudinary.v2.uploader.destroy(publicId);
    }
  }
};

const getMediaFileComments = async(itemId: number, commentsNumber: number, pageNumber: number): Promise<CommentList> => {
  const parsedPageNumber = isInteger(pageNumber) ? pageNumber : 1;
  const limit: number = isInteger(commentsNumber) ? commentsNumber : 10;
  const offset: number = getPageOffset(parsedPageNumber, limit);

  const results: Array<Maybe<Comment>> = await sqlQuery(query.getMediaFileComments(itemId, limit, offset));
  const rowsCount: Array<Maybe<PostgresCountObject>> = await sqlQuery(query.getMediaFileCommentsCount);

  return {
    allCommentsCount: +rowsCount[0].count,
    currentPage: parsedPageNumber,
    results: results
  };
};

const addNewComment = async(fileId: number, commentBody: string, commentAuthor: number, creationDate: string): Promise<void> => {
  validateInteger(fileId, "Media file id is not an integer");
  validateString(commentBody, "Comment boyd is not a string");
  validateInteger(commentAuthor, "Author id is not an integer");

  // TODO Add date validation

  await sqlQuery(query.addComment(fileId, commentBody, commentAuthor, creationDate));
};

const deleteMediaFile = async(fileId: number): Promise<void> => {
  validateInteger(fileId, "Media file id is not an integer");
  const mediaFile: Maybe<MediaItem> = await getMediaFileById(fileId);
  if (mediaFile) {
    const publicId = getCloudinaryMediaFilesPath(mediaFile.title);
    await cloudinary.v2.uploader.destroy(publicId);
    await sqlQuery(query.deleteMediaFile(fileId));
  }
};

export default {
  getMediaFilesList,
  getMediaFileById,
  addNewImage,
  getMediaFileComments,
  addNewComment,
  deleteMediaFile
};
