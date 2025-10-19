import express from 'express';
import { StatsController } from './stats.controller';

const router = express.Router();
router.get("/overview", StatsController.getProjectStat);

router.get("/recent", StatsController.getRecentActivities );

export const statsRouter = router;