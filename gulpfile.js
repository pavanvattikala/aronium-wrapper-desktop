const gulp = require("gulp");
const createWindowsInstaller =
  require("electron-winstaller").createWindowsInstaller;
const path = require("path");

gulp.task("create-windows-installer", function (done) {
  createWindowsInstaller({
    appDirectory: path.join(
      __dirname,
      "release-builds",
      "aronium-desktop-wrapper-win32-ia32"
    ),
    outputDirectory: path.join(__dirname, "release", "windows-installer"),
    authors: "Pavan Vattikala",
    version: "1.0.0",
    exe: "aronium-desktop-wrapper.exe",
    setupExe: "AroniumDesktopWrapperInstaller.exe",
    noMsi: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "Aronium Desktop Wrapper",
  })
    .then(() => done())
    .catch((error) => {
      console.error(error.message || error);
      done(error);
    });
});
