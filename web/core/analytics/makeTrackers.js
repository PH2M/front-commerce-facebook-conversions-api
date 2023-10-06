import logHandler from "web/core/logs/logHandler";
import gql from "graphql-tag";

const MUTATION_FACEBOOK_EVENT_TRACKING = gql`
  mutation facebookEventTracking($data: [KeyValueInput]) {
    facebookEventTracking(data: $data)
  }
`;
const MUTATION_FACEBOOK_PAGE_TRACKING = gql`
  mutation facebookViewContentTracking($title: String, $pathname: String) {
    facebookViewContentTracking(title: $title, pathname: $pathname)
  }
`;

const trackEventForFacebookConversionsApi = (event, properties) => {
  const data = [];
  data.push({ key: "type", value: event });
  data.push({ key: "pathname", value: window.location?.href });
  if (properties && typeof properties === "object") {
    Object.entries(properties).forEach(([key, value]) =>
      data.push({ key, value: value ? value.toString() : "" })
    );
  }
  if (window && window.apolloClient) {
    window.apolloClient.mutate({
      mutation: MUTATION_FACEBOOK_EVENT_TRACKING,
      variables: { data },
    });
  }
};
const trackViewContentForFacebookConversionsApi = (title) => {
  if (window && window.apolloClient) {
    window.apolloClient.mutate({
      mutation: MUTATION_FACEBOOK_PAGE_TRACKING,
      variables: { title, pathname: window.location?.href },
    });
  }
};

// For e-commerce events, please read the guidelines at the following url
//  https://segment.com/docs/spec/ecommerce/v2/
//  for GA matching, see https://github.com/segment-integrations/analytics.js-integration-google-analytics/blob/master/test/index.test.js
const trackEvent = (analyticsReady) => (event, properties) => {
  trackEventForFacebookConversionsApi(event, properties);
  analyticsReady.then((analytics) => {
    if (!analytics) return;

    analytics.ready(() => {
      try {
        analytics.track(event, properties);
      } catch (e) {
        logHandler.getLogger().error(e);
      }
    });
  });
};

export let previousTrackedPageTitle = null;

const trackPage = (analyticsReady) => (title) => {
  previousTrackedPageTitle = title;
  trackViewContentForFacebookConversionsApi(title);
  analyticsReady.then((analytics) => {
    if (!analytics) return;

    if (analytics) {
      analytics.ready(() => {
        try {
          analytics.page(title);
        } catch (e) {
          logHandler.getLogger().error(e);
        }
      });
    }
  });
};

export default (analyticsReady) => ({
  trackEvent: trackEvent(analyticsReady),
  trackPage: trackPage(analyticsReady),
});
