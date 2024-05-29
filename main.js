const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module for mennu
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const ip = require("ip"); // Import the ip package

const currentMode = "prod"; // dev or prod

const displayMenu = currentMode === "dev" ? false : true;

/////////////////////////////

///////////////////////////////
// Copy paste fixed by this

app.on("ready", () => {
  //  createWindow() // commented for avoiding double window issue
});

// PHP SERVER CREATION /////
const PHPServer = require("php-server-manager");

let server;

if (process.platform === "win32") {
  const host = ip.address(); // Get the system's IP address

  server = new PHPServer({
    php: `${__dirname}/php/php.exe`,
    port: 5555,
    host: host, // Listen on all available network interfaces
    directory: path.join(__dirname, "aronium-wrapper", "public"), // Adjust directory here
    directives: {
      display_errors: 1,
      expose_php: 1,
    },
  });
}

//////////////////////////

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  server.run();
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: displayMenu,
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://" + server.host + ":" + server.port + "/");

  /*
mainWindow.loadURL(url.format({
  pathname: path.join(__dirname, 'index.php'),
  protocol: 'file:',
  slashes: true
}))
*/
  const { shell } = require("electron");
  shell.showItemInFolder("fullPath");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // PHP SERVER QUIT
    server.close();
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow); // <== this is extra so commented, enabling this can show 2 windows..

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    // PHP SERVER QUIT
    server.close();
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
