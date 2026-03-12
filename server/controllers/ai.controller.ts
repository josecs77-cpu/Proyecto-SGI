import { Request, Response, NextFunction } from 'express';
import { generateQuickAnalysis } from '../services/ai.service.js';

export const analyzeContext = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { context } = req.body;

        if (!context) {
             res.status(400).json({ success: false, error: 'Context is required for analysis' });
             return;
        }

        const analysis = await generateQuickAnalysis(context);

        res.status(200).json({
            success: true,
            data: analysis
        });
    } catch (error) {
        // Pass error to global Express error middleware
        next(error);
    }
};