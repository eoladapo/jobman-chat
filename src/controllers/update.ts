import { StatusCodes } from 'http-status-codes';
import { IMessageDocument } from '@eoladapo/jobman-shared';
import { Response, Request } from 'express';
import { markMessageAsRead, markMultipleMessagesAsRead, updateOffer } from '@chat/services/message.service';

const offer = async (req: Request, res: Response): Promise<void> => {
  const { messageId, type } = req.body;
  const message: IMessageDocument = await updateOffer(messageId, type);
  res.status(StatusCodes.OK).json({ message: 'Message updated', singleMessage: message });
};

const multipleMessages = async (req: Request, res: Response): Promise<void> => {
  const { messageId, receiverUsername, senderUsername } = req.body;
  await markMultipleMessagesAsRead(messageId, receiverUsername, senderUsername);
  res.status(StatusCodes.OK).json({ message: 'Messages marked as read' });
};

const markSingleMessage = async (req: Request, res: Response): Promise<void> => {
  const { messageId } = req.body;
  await markMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({ message: 'Message marked as read' });
};

export { offer, multipleMessages, markSingleMessage };
