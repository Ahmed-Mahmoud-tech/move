// import React from 'react'
// // import { IpcRenderer } from 'electron';
// const { ipcRenderer } = window.electron.ipcRenderer;

// const Test = () => {

//   // const func = async (x) => {
//   //    const response = await window.electron.ping8(x)
//   //   console.log(response) // prints out 'pong'
//   // }

//   const fun = async () => {

// window.electron.ipcRenderer.send('message-from-renderer', 'Hello from the renderer process');
//   }
//   window.electron.ipcRenderer.on('message-from-main', (event, data) => {
//     console.log(`Message from main process: ${data}`);
//   });

// // // Listen for a response from the main process
// // ipcRenderer.on('message-from-main', (event, data) => {
// //   console.log(`Message from main process: ${data}`);
// // });

//   //  window.electron.ipcRenderer.send('electron:say', 'hello')

// // // Send a message to the main process with the response asynchronously
// // window.electron.ipcRenderer.invoke('electron:doAThing', '').then(re => {
// //   console.log(re)
// // })

// // // Receive messages from the main process
// // window.electron.ipcRenderer.on('electron:reply', (_, args) => {
// //   console.log(args)
// // })

//   return (
//     <div onClick={fun} >tesssssrrrs333333333333ssssst</div>
//   )
// }

// export default Test
