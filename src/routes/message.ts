import { message } from '@chat/controllers/create';
import { conversation, getConversationList, messages, userMessages } from '@chat/controllers/get';
import { markSingleMessage, multipleMessages, offer } from '@chat/controllers/update';
import express, { Router } from 'express';

const router: Router = express.Router();

const messageRoutes = (): Router => {
  router.get('/conversation/:senderUsername/:receiverUsername', conversation);
  router.get('/conversations/:username', getConversationList);
  router.get('/:senderUsername/:receiverUsername', messages);
  router.get('/:conversationId', userMessages);
  router.post('/', message);
  router.put('/offer', offer);
  router.put('/mark-as-read', markSingleMessage);
  router.put('/mark-multiple-as-read', multipleMessages);
  return router;
};

export { messageRoutes };
