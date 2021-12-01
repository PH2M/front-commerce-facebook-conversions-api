import axios from "axios";

const makeAxiosInstanceForFacebookConversionsApi = (req) => {
  if (
    !req.config ||
    !req.config.facebook_conversions_api ||
    !req.config.facebook_conversions_api["token"] ||
    !req.config.facebook_conversions_api["pixel"]
  ) {
    console.error(
      "Be sure FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_PIXEL and FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_TOKEN is set."
    );
    return false;
  }

  return axios.create({
    baseURL: `https://graph.facebook.com/v${req.config.facebook_conversions_api["version"]}/${req.config.facebook_conversions_api["pixel"]}`,
    timeout: 1000,
    params: {
      access_token: req.config.facebook_conversions_api["token"],
    },
    transformRequest: [
      (data) => {
        if (req.config.facebook_conversions_api["test_event_code"]) {
          data.test_event_code =
            req.config.facebook_conversions_api["test_event_code"];
        }

        return data;
      },
      ...axios.defaults.transformRequest,
    ],
  });
};

export default makeAxiosInstanceForFacebookConversionsApi;
