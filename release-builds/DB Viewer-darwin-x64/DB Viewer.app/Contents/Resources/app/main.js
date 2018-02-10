const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  ipcMain
} = require('electron');
const fs = require('fs');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 1000,
    minWidth: 1200,
    minHeight: 1000,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/assets/icons/png/64x64.png`
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);
  // win.loadURL(`http://localhost:4200`)
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // ipcMain.on('user-data', function (event, arg) {
  //   console.log('event', event);
  //   console.log('arg', arg);
  //   //do child process or other data manipulation and name it manData
  //   event.sender.send('fileData', 'test');
  // });


  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })

  let newMenu = setMainMenu();
  Menu.setApplicationMenu(newMenu);
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})


function setMainMenu() {
  const template = [{
      label: 'Edit',
      submenu: [{
          label: 'Open File',
          accelerator: 'Control+O',
          click: function () {
            showOpen();
          }
        },
        {
          label: 'Quit',
          accelerator: 'Control+Q',
          click: function () {
            app.quit();
          }
        },
      ]
    },
    {
      role: 'window',
      submenu: [{
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    }
  ]

  return Menu.buildFromTemplate(template);
}


var showOpen = function () {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'JSON',
      extensions: ['json']
    }]
  }, FilePaths => {
    if (!FilePaths) {
      return;
    }

    FilePaths.map(FilePath => {
      fs.readFile(FilePath, (err, data) => {
        if (err) {
          return;
        }
        win.webContents.send('fileData', data, FilePath);
      });
    });

  });
};
