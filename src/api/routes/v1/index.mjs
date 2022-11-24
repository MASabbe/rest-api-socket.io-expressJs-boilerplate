import path from 'path';
import express from 'express';
import authRoutes from './auth.route.mjs';
import userRoutes from './user.route.mjs';
import app from '../../../config/express.mjs';
const router = express.Router();
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));
/**
 * GET v1/docs
 */
router.use('/docs', express.static('./public/docs/index.html'));
router.use('/assets', express.static(`./public/docs/assets/`));
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
export default router;
