import express from 'express';
import { addMessage, getAllMsg } from '../controllers/message.js';

const router = express.Router();

router.post('/addmessage', addMessage);
router.post('/getallmsg', getAllMsg);

export default router;