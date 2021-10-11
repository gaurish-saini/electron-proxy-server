const { app, BrowserWindow } = require("electron");

function mainWindow() {
  let appWindow = new BrowserWindow();
  appWindow.loadFile("./index.html");

  appWindow.on("closed", () => {
    appWindow = null;
  });

  appWindow.once("ready-to-show", () => {
    appWindow.show();
  });

}

function backgroundWindow() {
  let backgroundWindow = new BrowserWindow({
    width: 300,
    height: 275,
    // frame: false,
  });

  var Proxy = require("http-mitm-proxy");
  var proxy = Proxy();
  proxy.listen({ port: 8081 });

  backgroundWindow.loadFile("background.html");
  backgroundWindow.once("ready-to-show", () => {
    backgroundWindow.hide();
  });

  backgroundWindow.on("closed", () => {
    backgroundWindow = null;
  });
}

app.on("ready", backgroundWindow);
app.on("ready", mainWindow);
