import { Request, Response  } from "express";
import { verifyToken } from "../utils/authorization-helpers";
import { CommentList, MediaItem, MediaItemsList } from "media";
import { RouteModuleOutput } from "routes";
import { initializeRouter } from "../utils/routes-helpers";
import mediaController from "./media.controller";

const deleteMediaFile = async(req: Request, res: Response): Promise<void> => {
  try {
    const { fileId } = req.params;

    if (+fileId) {
      await mediaController.deleteMediaFile(+fileId);
      res.status(200).end();
    } else {
      res.status(400).json({ message: "Wrong file id provided" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMediaFilesList = async(req: Request, res: Response): Promise<void> => {
  try {
    const { mediaFilesNumber, pageNumber } = req.query;
    const response: MediaItemsList = await mediaController.getMediaFilesList(+mediaFilesNumber, +pageNumber);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMediaFileById = async(req: Request, res: Response): Promise<void> => {
  try {
    const { fileId } = req.params;
    const mediaFile: MediaItem = await mediaController.getMediaFileById(+fileId);
    res.status(200).json(mediaFile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addMediaFile = async(req: Request, res: Response): Promise<void> => {
  try {
    const { imageTitle, image, creationDate } = req.body;
    console.log("=======================");
    if (!imageTitle || !image || !creationDate) {
      res.status(400).json({ message: "Wrong body sent" });
    } else {
      await mediaController.addNewImage(imageTitle, image, creationDate);
      res.status(200).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMediaFileComments = async(req: Request, res: Response): Promise<void> => {
  try {
    const { fileId } = req.params;
    const { commentsNumber, pageNumber } = req.query;
    const response: CommentList = await mediaController.getMediaFileComments(
      +fileId,
      +commentsNumber,
      +pageNumber
    );
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addMediaComment = async(req, res): Promise<void> => {
  try {
    const { fileId } = req.params;
    const { commentBody, creationDate } = req.body;
    if (!fileId || !commentBody || !creationDate) {
      res.status(400).json({ message: "Wrong body sent" });
    } else {
      await mediaController.addNewComment(+fileId, commentBody, 3, creationDate);
      res.status(200).end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const routes: RouteModuleOutput = {
  route: "/media",
  router: initializeRouter([
    ["/", {
      get: getMediaFilesList,
      post: [verifyToken, addMediaFile]
    }],
    ["/:fileId", {
      get: getMediaFileById,
      delete: [verifyToken, deleteMediaFile]
    }],
    ["/:fileId/comments", {
      get: getMediaFileComments,
      post: [verifyToken, addMediaComment]
    }]
  ])
};

export default routes;
