import { Component } from '@angular/core';
import * as QRCode from 'easyqrcodejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qr-code-app';
  public qrcode: any = null;
  public fname = '';
  public lname = '';
  public orgname = '';
  public position = '';
  public phone = '';
  public email = '';
  public url = '';
  public address = '';
  public notes = '';

  generateQRCode(): void {
    var codeText = "BEGIN:VCARD\r\nVERSION:3.0\r\nN:";
    codeText += this.lname + ";" + this.fname + "\r\n";
    codeText += "FN:" + this.fname + " " + this.lname + "\r\n";
    codeText += "ORG:" + this.orgname + "\r\n";
    codeText += "URL:" + this.url + "\r\n";
    codeText += "EMAIL;TYPE=INTERNET:" + this.email + "\r\n";
    codeText += "TEL;TYPE=voice,cell,pref:" + this.phone + "\r\n";
    codeText += "ADR:" + this.address + "\r\n";
    codeText += "NOTES:" + this.notes + "\r\n";
    codeText += "END:VCARD";
    codeText = decodeURIComponent(codeText);

    console.log(codeText);
    console.log(codeText.length);
    console.log(screen.width);
    var imagesize = 150;
    if(screen.width < 480) imagesize = 100;
    console.log(imagesize);

    const config = {
      title: "Logo",
      config: {
        text: codeText, // Content
        width: imagesize, // Widht
        height: imagesize, // Height
        colorDark: "#000000", // Dark color
        colorLight: "#ffffff", // Light color
        // === Logo
        logo: "assets/logo.png", // LOGO
        logoBackgroundColor: '#ffffff', // Logo backgroud color, Invalid when `logBgTransparent` is true; default is '#ffffff'
        logoBackgroundTransparent: false, // Whether use transparent image, default is false
        correctLevel: QRCode.CorrectLevel.M // L, M, Q, H
      }
    };
    if (this.qrcode != null) { this.qrcode.clear(); }
    this.qrcode = new QRCode(document.getElementById('qrcode'), config.config);
  }
}
