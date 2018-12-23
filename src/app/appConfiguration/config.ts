export class Config {
DOMAIN = (window.location.origin === 'http://localhost:4200') ? "http://localhost":window.location.origin;
DIRECTORY =  "/MWQWebservice";
APPLICATION =  "/MWQSitesRestServices.svc";
UPLOAD_DIR = '/upload';

API_URL = this.DOMAIN + this.DIRECTORY + this.APPLICATION ;
UPLOAD_URL = this.DOMAIN + this.DIRECTORY + this.UPLOAD_DIR;

  /* HOST_PATH = "/MWQWebservice/MWQSitesRestServices.svc";
  API_URL = (window.location.origin === 'http://localhost:4200') ? "http://localhost" + this.HOST_PATH :
    window.location.origin + this.HOST_PATH; */
  public static appConfig = {
    mainNav: ["Home", "About"]
  };
  getModuleName = () => {
    let wd = window.location.pathname;
    let url = wd.split('/');
    console.log("Window location", wd, url);

    if (window.location.origin === 'http://localhost:4200') {
      return { module: url[1], tab: url[2] };
    }
    else if (window.location.origin === 'http://localhost') {
      return { module: url[2], tab: url[3] };
    }
    else if (window.location.origin === 'http://10.56.84.173') {
      return { module: url[2], tab: url[3] };
    }
    else if (window.location.origin === 'http://10.56.65.11') {
      return { module: url[2], tab: url[3] };
    }
    else if (window.location.origin === 'http://10.10.1.90') {
      return { module: url[2], tab: url[3] };
    }
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

