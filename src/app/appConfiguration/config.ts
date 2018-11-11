export class Config {
  public static API_URL = "";
  public static appConfig = {
    mainNav: ["Home", "About"]
  };

  getModuleName = () => {
    let wd = window.location.pathname;
    let url = wd.split('/');
    console.log("Window location", wd, url);
    return { module: url[1], tab: url[2] };
  }
}
export class REST_API {
  public static HTTP = {
    mwqDataEntry: {
      getData: {
        url: "",
        path: ""
      },
      postData: {
        url: "",
        path: ""
      }
    }
  }
}

