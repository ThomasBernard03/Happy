import { Injectable } from '@angular/core'
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private electronService: ElectronService) { }


    addToClipboard(content: string) {
        this.electronService.ipcRenderer?.send("add-clipboard", content)
    }

    openImagePicker(onImage : (imageBase64 : string) => void) {

        const options = {
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'svg'] }
            ]
        }

        this.electronService.ipcRenderer?.send("open-file-picker", options)

        this.electronService.ipcRenderer?.once("open-file-picker-result", (e, files) => {
            console.log(files);
            
            const natImage = this.electronService?.nativeImage?.createFromPath(files[0])
            onImage(natImage?.toDataURL() ?? "")
        })
    }
}