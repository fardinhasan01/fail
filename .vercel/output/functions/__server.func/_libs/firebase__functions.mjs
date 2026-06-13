import { b as _registerComponent, r as registerVersion, _ as _isFirebaseServerApp } from "./firebase__app.mjs";
import "./firebase__util.mjs";
import { a as Component } from "./firebase__component.mjs";
const FUNCTIONS_TYPE = "functions";
class ContextProvider {
  constructor(app, authProvider, messagingProvider, appCheckProvider) {
    this.app = app;
    this.auth = null;
    this.messaging = null;
    this.appCheck = null;
    this.serverAppAppCheckToken = null;
    if (_isFirebaseServerApp(app) && app.settings.appCheckToken) {
      this.serverAppAppCheckToken = app.settings.appCheckToken;
    }
    this.auth = authProvider.getImmediate({ optional: true });
    this.messaging = messagingProvider.getImmediate({
      optional: true
    });
    if (!this.auth) {
      authProvider.get().then((auth) => this.auth = auth, () => {
      });
    }
    if (!this.messaging) {
      messagingProvider.get().then((messaging) => this.messaging = messaging, () => {
      });
    }
    if (!this.appCheck) {
      appCheckProvider?.get().then((appCheck) => this.appCheck = appCheck, () => {
      });
    }
  }
  async getAuthToken() {
    if (!this.auth) {
      return void 0;
    }
    try {
      const token = await this.auth.getToken();
      return token?.accessToken;
    } catch (e) {
      return void 0;
    }
  }
  async getMessagingToken() {
    if (!this.messaging || !("Notification" in self) || Notification.permission !== "granted") {
      return void 0;
    }
    try {
      return await this.messaging.getToken();
    } catch (e) {
      return void 0;
    }
  }
  async getAppCheckToken(limitedUseAppCheckTokens) {
    if (this.serverAppAppCheckToken) {
      return this.serverAppAppCheckToken;
    }
    if (this.appCheck) {
      const result = limitedUseAppCheckTokens ? await this.appCheck.getLimitedUseToken() : await this.appCheck.getToken();
      if (result.error) {
        return null;
      }
      return result.token;
    }
    return null;
  }
  async getContext(limitedUseAppCheckTokens) {
    const authToken = await this.getAuthToken();
    const messagingToken = await this.getMessagingToken();
    const appCheckToken = await this.getAppCheckToken(limitedUseAppCheckTokens);
    return { authToken, messagingToken, appCheckToken };
  }
}
const DEFAULT_REGION = "us-central1";
class FunctionsService {
  /**
   * Creates a new Functions service for the given app.
   * @param app - The FirebaseApp to use.
   */
  constructor(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain = DEFAULT_REGION, fetchImpl = (...args) => fetch(...args)) {
    this.app = app;
    this.fetchImpl = fetchImpl;
    this.emulatorOrigin = null;
    this.contextProvider = new ContextProvider(app, authProvider, messagingProvider, appCheckProvider);
    this.cancelAllRequests = new Promise((resolve) => {
      this.deleteService = () => {
        return Promise.resolve(resolve());
      };
    });
    try {
      const url = new URL(regionOrCustomDomain);
      this.customDomain = url.origin + (url.pathname === "/" ? "" : url.pathname);
      this.region = DEFAULT_REGION;
    } catch (e) {
      this.customDomain = null;
      this.region = regionOrCustomDomain;
    }
  }
  _delete() {
    return this.deleteService();
  }
  /**
   * Returns the URL for a callable with the given name.
   * @param name - The name of the callable.
   * @internal
   */
  _url(name2) {
    const projectId = this.app.options.projectId;
    if (this.emulatorOrigin !== null) {
      const origin = this.emulatorOrigin;
      return `${origin}/${projectId}/${this.region}/${name2}`;
    }
    if (this.customDomain !== null) {
      return `${this.customDomain}/${name2}`;
    }
    return `https://${this.region}-${projectId}.cloudfunctions.net/${name2}`;
  }
}
const name = "@firebase/functions";
const version = "0.13.5";
const AUTH_INTERNAL_NAME = "auth-internal";
const APP_CHECK_INTERNAL_NAME = "app-check-internal";
const MESSAGING_INTERNAL_NAME = "messaging-internal";
function registerFunctions(variant) {
  const factory = (container, { instanceIdentifier: regionOrCustomDomain }) => {
    const app = container.getProvider("app").getImmediate();
    const authProvider = container.getProvider(AUTH_INTERNAL_NAME);
    const messagingProvider = container.getProvider(MESSAGING_INTERNAL_NAME);
    const appCheckProvider = container.getProvider(APP_CHECK_INTERNAL_NAME);
    return new FunctionsService(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain);
  };
  _registerComponent(new Component(
    FUNCTIONS_TYPE,
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(true));
  registerVersion(name, version, variant);
  registerVersion(name, version, "esm2020");
}
registerFunctions();
