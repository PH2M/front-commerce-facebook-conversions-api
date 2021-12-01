Front-Commerce Facebook conversions API
-------
Implement the Facebook conversions API to your Front-Commerce project https://www.facebook.com/business/help/2041148702652965?id=818859032317965

![Latest version](https://img.shields.io/badge/latest-v1.0.0-red.svg)

Requirements
------------
❔ Front-Commerce > 2.10.0: Never tested but it should work
✅ Front-Commerce = 2.10.0
❔ Front-Commerce < 2.10.0: Never tested but it should work

Installation & Configuration
------------
1. Install the latest stable version for the module
```
npm install ph2m/front-commerce-facebook-conversions-api#1.0.0
```
2. Generate your Access Token from Facebook Buisness account: https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#via-events-manager
3. Add your own configuration on the `.env` file
```
[Required] FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_TOKEN => Your Facebook conversions API token
[Required] FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_PIXEL => Your Facebook pixel ID
[Optionnal] FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_TEST_EVENT_CODE => Your Facebook API test event code, do not set for production mode
[Optionnal] FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_VERSION => Facebook API version, by default 12.0
```
4. Load the module on `.front-commerce.js` file
```
 modules: [
    ...
    "./node_modules/front-commerce-facebook-conversions-api/facebook-conversions-api",
  ],
  serverModules: [
    ...
    {
      name: "FacebookConversionsApi",
      path: "./node_modules/front-commerce-facebook-conversions-api/server/modules/tracking",
    },
  ],
  webModules: [
    ...
    {
      name: "FrontCommerceConversionsApi",
      path: "./node_modules/front-commerce-facebook-conversions-api/facebook-conversions-api/web",
    },
  ],
```

How it works
------------
Use the track Event and track Page of Front-Commerce for trigger an mutation who can sent the current track to the conversions API. 


Licence
-------
[GNU General Public License, version 3 (GPLv3)](http://opensource.org/licenses/gpl-3.0)
