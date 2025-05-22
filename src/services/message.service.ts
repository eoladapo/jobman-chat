import { conversationModel } from '@chat/models/conversation.schema';
import { MessageModel } from '@chat/models/message.schema';
import { publishDirectMessage } from '@chat/queues/message.producer';
import { chatChannel, socketIOChatObject } from '@chat/server';
import { IMessageDetails, IMessageDocument, lowerCase } from '@eoladapo/jobman-shared';

const createConversation = async (conversationId: string, senderUsername: string, receiverUsername: string): Promise<void> => {
  await conversationModel.create({
    conversationId,
    senderUsername,
    receiverUsername
  });
};

const addMessage = async (data: IMessageDocument): Promise<IMessageDocument> => {
  const message: IMessageDocument = (await MessageModel.create(data)) as IMessageDocument;
  if (data.hasOffer) {
    const emailMessageDetails: IMessageDetails = {
      sender: data.senderUsername,
      amount: `${data.offer?.price}`,
      buyerUsername: lowerCase(`${data.receiverUsername}`),
      sellerUsername: lowerCase(`${data.senderUsername}`),
      title: data.offer?.gigTitle,
      description: data.offer?.description,
      deliveryDays: `${data.offer?.deliveryDays}`,
      template: 'offer'
    };

    await publishDirectMessage(
      chatChannel,
      'jobman-order-notification',
      'order-email',
      JSON.stringify(emailMessageDetails),
      'Order email sent to notification service'
    );
  }
  socketIOChatObject.emit('message received', message);
  return message;
};

export { createConversation, addMessage };
