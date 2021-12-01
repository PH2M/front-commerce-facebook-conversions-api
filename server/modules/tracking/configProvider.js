export default {
    name: "facebook-conversions-api",
    schema: () => ({
      facebook_conversions_api: {
        version: {
          doc: "Facebook conversions API version",
          format: String,
          default: "12.0",
          env: "FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_VERSION",
        },
        token: {
          doc: "Facebook conversions API token",
          format: String,
          default: "",
          env: "FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_TOKEN",
        },
        pixel: {
          doc: "Facebook conversions API pixel",
          format: String,
          default: "",
          env: "FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_PIXEL",
        },
        test_event_code: {
          doc: "Facebook conversions API test event code",
          format: String,
          default: "",
          env: "FRONT_COMMERCE_FACEBOOK_CONVERSIONS_API_TEST_EVENT_CODE",
        },
      },
    }),
  };
  