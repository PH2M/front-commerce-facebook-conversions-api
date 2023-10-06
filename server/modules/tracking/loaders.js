import mem from "mem";

const parseCookies = mem(
  (cookie) => {
    var list = {},
      rc = cookie;
    rc &&
      rc.split(";").forEach(function (cookie) {
        var parts = cookie.split("=");
        list[parts.shift().trim()] = decodeURI(parts.join("="));
      });
    return list;
  },
  { maxAge: 60000 }
);

const FacebookConversionsApiLoader = (req) => (axiosInstance) => {
  const mappingEventName = (frontcommerceEventName) => {
    let facebookEventName = frontcommerceEventName;
    switch (frontcommerceEventName) {
      case "Product Added":
        facebookEventName = "AddToCart";
        break;
      case "Order Completed":
        facebookEventName = "Purchase";
        break;
      case "Checkout Started":
        facebookEventName = "InitiateCheckout";
        break;
      default:
        break;
    }
    return facebookEventName;
  };

  const mappingEventCustomData = (
    frontcommerceEventName,
    frontcommerceEventCustomData
  ) => {
    let facebookEventCustomData = frontcommerceEventCustomData;
    switch (frontcommerceEventName) {
      case "Order Completed":
        facebookEventCustomData = {
          ...facebookEventCustomData,
          value: facebookEventCustomData.total,
        };
        break;
      default:
        break;
    }
    return facebookEventCustomData;
  };

  const payload = (event_name, event_source_url, custom_data) => {
    const user_data = {
      em: [null],
      ph: [null],
      fbp: null,
    };
    const cookies = parseCookies(req.headers.cookie);
    if (cookies?._fbp) {
      user_data["fbp"] = cookies._fbp;
    }
    if (cookies?._fbc) {
      user_data["fbc"] = cookies._fbc;
    }
    const currentDateTime = new Date().getTime().toString();
    return {
      data: [
        {
          event_name: mappingEventName(event_name),
          event_time: currentDateTime.substring(0, currentDateTime.length - 3),
          event_source_url,
          action_source: "website",
          user_data,
          custom_data: mappingEventCustomData(event_name, custom_data),
        },
      ],
    };
  };

  const trackViewContent = (title, pathname) => {
    return axiosInstance
      ? axiosInstance.post(
          "/events",
          payload("ViewContent", pathname, { content_category: title })
        )
      : null;
  };
  const trackEvent = (type, pathname, customData) => {
    return axiosInstance
      ? axiosInstance.post("/events", payload(type, pathname, customData))
      : null;
  };

  return {
    trackViewContent,
    trackEvent,
  };
};
export default FacebookConversionsApiLoader;
