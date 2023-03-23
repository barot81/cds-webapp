
import * as CryptoJS from 'crypto-js';  
import { FusionConfigService } from '../../configuration';

export class Cryptography {
    
    static encryptRequest<T>(body: T, configService: FusionConfigService) {
        const jsonBody = typeof(body) === 'string' ? body : JSON.stringify(body);
        var key = CryptoJS.enc.Utf8.parse(configService.appSettings.Cryptography.Key);  
        var iv = CryptoJS.enc.Utf8.parse(configService.appSettings.Cryptography.IV); 
        const encryptedBody = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonBody), key,  
        {  
            keySize: configService.appSettings.Cryptography.Keysizes / 8,  
            iv: iv,  
            mode: CryptoJS.mode.CBC,  
            padding: CryptoJS.pad.Pkcs7  
        });
        return { 
            data : encryptedBody.toString()
        }
    }

    static encryptText(plaintext: string, configService: FusionConfigService): string {
        var key = CryptoJS.enc.Utf8.parse(configService.appSettings.Cryptography.Key);
        var iv = CryptoJS.enc.Utf8.parse(configService.appSettings.Cryptography.IV);
        var ciphertext = CryptoJS.AES.encrypt(plaintext, key,  
        {  
            keySize: configService.appSettings.Cryptography.Keysizes / 8,  
            iv: iv,  
            mode: CryptoJS.mode.CBC,  
            padding: CryptoJS.pad.Pkcs7  
        }).toString();
        return ciphertext;
    }
    static decryptText(cypher: string, configService: FusionConfigService): string {
        var key = CryptoJS.enc.Utf8.parse(configService.appSettings.Cryptography.Key);
        var iv = CryptoJS.enc.Utf8.parse(configService.appSettings.Cryptography.IV);
        var bytes  = CryptoJS.AES.decrypt(cypher, key,  
            {  
                keySize: configService.appSettings.Cryptography.Keysizes / 8,  
                iv: iv,  
                mode: CryptoJS.mode.CBC,  
                padding: CryptoJS.pad.Pkcs7  
            });
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
}
