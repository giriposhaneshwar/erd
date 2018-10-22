export class Config {
  public static API_URL = "";
  public static appConfig = {
    mainNav: ["Home", "About"]
  };
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

export class Storage{
  public static setKey = () => {
    alert(1);
  }
}
