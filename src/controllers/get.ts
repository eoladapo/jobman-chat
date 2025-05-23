import { IConversationDocument, IMessageDocument } from '@eoladapo/jobman-shared';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConversation, getMessages, getUserConversationList, getUserMessages } from '@chat/services/message.service';

export const conversation = async (req: Request, res: Response): Promise<void> => {
  const { senderUsername, receiverUsername } = req.params;
  const conversations: IConversationDocument[] = await getConversation(senderUsername, receiverUsername);
  res.status(StatusCodes.OK).json({ message: 'chat conversation', conversations });
};

export const messages = async (req: Request, res: Response): Promise<void> => {
  const { senderUsername, receiverUsername } = req.params;
  const messages: IMessageDocument[] = await getMessages(senderUsername, receiverUsername);
  res.status(StatusCodes.OK).json({ message: 'chat messages', messages });
};

export const getConversationList = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  const messages: IMessageDocument[] = await getUserConversationList(username);
  res.status(StatusCodes.OK).json({ message: 'chat conversation list', conversation: messages });
};

export const userMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IMessageDocument[] = await getUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ message: 'chat messages', conversation: messages });
};
