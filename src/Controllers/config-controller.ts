import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import configLogic from '../Logic/config-logic';
import FrontendConfig from '../Models/frontendConfig-model';

const router = express.Router();

router.get("/config", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = await configLogic.getConfig();
        res.json(config);
    }
    catch (err: any) {
        next({ error: err, from: "ConfigController-GetConfig" });
    }
});

router.put("/config", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.shipment_cost_base = +req.body.shipment_cost_base;
        req.body.physical_price = +req.body.physical_price;
        req.body.audio_price = +req.body?.audio_price;
        req.body.epub_price = +req.body?.epub_price;
        req.body.pdf_price = +req.body?.pdf_price;
        req.body.shipment_cost = +req.body?.shipment_cost;
        req.body.physical_discounted_amount = +req.body?.physical_discounted_amount;
        req.body.audio_discounted_amount = +req.body?.audio_discounted_amount;
        req.body.epub_discounted_amount = +req.body?.epub_discounted_amount;
        req.body.pdf_discounted_amount = +req.body?.pdf_discounted_amount;
        req.body.max_physical = +req.body?.max_physical;
        req.body.audio_price = +req.body?.audio_price;
        req.body.audio_price = +req.body?.audio_price;
        req.body.showBanner = req.body?.showBanner || req.body?.showBanner === "true" ? true : false;
        const frontConf = new FrontendConfig(req.body);

        const conf = await configLogic.updateConfig(frontConf);
        res.json(conf);
    }
    catch (err: any) {
        next({ error: err, from: "ConfigController-UpdateConfig" });
    }
});

export default router;