import { IConversationDocument } from '@eoladapo/jobman-shared';
import { Schema, Model, model } from 'mongoose';

const conversationSchema = new Schema({
  conversationId: { type: String, required: true, unique: true, index: true },
  senderUsername: { type: String, required: true, index: true },
  receiverUsername: { type: String, required: true, index: true }
});

const conversationModel: Model<IConversationDocument> = model<IConversationDocument>('Conversation', conversationSchema, 'Conversation');
export { conversationModel };
