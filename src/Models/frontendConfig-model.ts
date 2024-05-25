import Joi from "joi";

class FrontendConfig {
  public shipment_cost_base: number;
  public physical_price: number;
  public audio_price: number;
  public epub_price: number;
  public pdf_price: number;

  public shipment_cost: number;
  public physical_discounted_amount: number;
  public audio_discounted_amount: number;
  public epub_discounted_amount: number;
  public pdf_discounted_amount: number;

  public max_physical: number;

  public local_phone: string
  public international_phone: string ;

  public addressBaseAPI: string;
  public citiesAPIsuffix: string;
  public streetsAPIsuffix: string;

  public showBanner: boolean;
  public banner_message: string;

  public constructor(c: FrontendConfig) {
    this.addressBaseAPI = c.addressBaseAPI;
    this.audio_discounted_amount = c.audio_discounted_amount;
    this.audio_price = c.audio_price;
    this.citiesAPIsuffix = c.citiesAPIsuffix;
    this.epub_discounted_amount = c.epub_discounted_amount;
    this.epub_price = c.epub_price;
    this.max_physical = c.max_physical;
    this.local_phone = c.local_phone;
    this.international_phone = c.international_phone;
    this.pdf_discounted_amount = c.pdf_discounted_amount;
    this.pdf_price = c.pdf_price;
    this.physical_discounted_amount = c.physical_discounted_amount;
    this.physical_price = c.physical_price;
    this.shipment_cost = c.shipment_cost;
    this.shipment_cost_base = c.shipment_cost_base;
    this.showBanner = c.showBanner;
    this.streetsAPIsuffix = c.streetsAPIsuffix;
    this.banner_message = c.banner_message;
  }

  private static validationScheme = Joi.object({
    shipment_cost_base: Joi.number().required().integer().positive(),
    physical_price: Joi.number().required().integer().positive(),
    audio_price: Joi.number().required().integer().positive(),
    epub_price: Joi.number().required().integer().positive(),
    pdf_price: Joi.number().required().integer().positive(),
    shipment_cost: Joi.number().required().integer().positive().max(Joi.ref('shipment_cost_base')),
    physical_discounted_amount: Joi.number().required().integer().positive().max(Joi.ref('physical_price')),
    audio_discounted_amount: Joi.number().required().integer().positive().max(Joi.ref('audio_price')),
    epub_discounted_amount: Joi.number().required().integer().positive().max(Joi.ref('epub_price')),
    pdf_discounted_amount: Joi.number().required().integer().positive().max(Joi.ref('pdf_price')),
    max_physical: Joi.number().required().integer().positive().max(10),
    showBanner: Joi.boolean().required(),
    addressBaseAPI: Joi.string().required(),
    citiesAPIsuffix: Joi.string().required(),
    streetsAPIsuffix: Joi.string().required(),
    local_phone: Joi.string().required().length(10),
    international_phone: Joi.string().required().length(12),
    banner_message: Joi.string().optional(),
  });

  public validate(): string {
    const result = FrontendConfig.validationScheme.validate(this);
    return result.error?.message;
  }
}

export default FrontendConfig;