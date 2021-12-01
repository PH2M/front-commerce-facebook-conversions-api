import { keyValuesToObject } from "web/core/utils/keyValues";

export default {
  Mutation: {
    facebookViewContentTracking: (_, { title, pathname }, { loaders }) => {
      loaders.FacebookConversionsApi.trackViewContent(title, pathname);
      return true;
    },
    facebookEventTracking: (_, { data }, { loaders }) => {
      const additionnalData = keyValuesToObject(data);
      loaders.FacebookConversionsApi.trackEvent(
        additionnalData.type,
        additionnalData.pathname,
        additionnalData
      );
      return true;
    },
  },
};
