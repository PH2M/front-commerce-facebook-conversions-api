import typeDefs from "./schema.gql";
import resolvers from "./resolvers";
import FacebookConversionsApiLoader from "./loaders";
import makeAxiosInstanceForFacebookConversionsApi from "./factories";
import configService from "server/core/config/configService";
import configProvider from "./configProvider";

configService.append(configProvider);

export default {
  namespace: "FacebookConversionsApi",
  dependencies: ["Front-Commerce/Core"],
  typeDefs,
  resolvers,
  contextEnhancer: ({ req }) => {
    const axiosInstance = makeAxiosInstanceForFacebookConversionsApi(req);
    return {
      FacebookConversionsApi: FacebookConversionsApiLoader(req)(axiosInstance),
    };
  },
};
