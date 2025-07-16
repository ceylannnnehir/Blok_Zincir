# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
#######################################____ODEV___#########################################

# Online Seçim Uygulaması (Ethereum Sepolia Ağı)
---
Bu proje, Ethereum Sepolia test ağı üzerinde çalışan çevrimiçi bir seçim uygulamasıdır. Kullanıcılar sadece önceden tanımlanmış özel hesaplarla oy kullanabilir. Uygulama, Solidity ile yazılmış bir akıllı sözleşme, Hardhat ile testler, ve React.js ile bir web arayüzünden oluşmaktadır.


## Projeyi Çalıştırmak İçin Adımlar
```bash
# Backend Kurulumu (Hardhat + Solidity)
## Gerekli klasöre girin:
### cd inbox/voting-app
####  Bağımlılıkları yükleyin:
##### npm install


#  Sözleşmeyi deploy edin (Sepolia ağına):
## .env dosyasına sunları doldurun: ( kimlik numaralarını SHA26 özet değeri oluşturun ve ardından BIP39 seed kısmına özet değeri girin ardından sayfanın altında ilk private key kısmını kopyala daha sonra Metamask sayfasının hesap ekle bölümüne basın hesap veya donanım cüzdanı ekleyin butonuna basın ardından özel anahtar linkine taklayın özet değerden oluşturduğunuz private key yapıştırın sonra import edin. Oluşan hesap adının ilk ve son değerlerini BIP39 sayfasındaki adres kısmından private key eşleşmesi gerekiyor kontrol edin 5 hesabınızı. )
### SEPOLIA_RPC_URL=" "
### PRIVATE_KEY_1=" "
### PRIVATE_KEY_2=""
### PRIVATE_KEY_3=""
### PRIVATE_KEY_4=""
### PRIVATE_KEY_5=""

#  Deploy komutu:( bu kod çalıştıktan sonra gelen adresi App.js dosyasındaki contractAddress değişkenine yapıştırın.....)
## ## Gerekli klasöre girin:
### cd inbox/voting-app 
#### npx hardhat run scripts/deploy.js --network sepolia
#####  Testleri çalıştırın:
###### npm test

###  test sayısı ödevde 8 tanedir.

#  Frontend Kurulumu (React): (Tarayıcıda http://localhost:3000 adresinde açılacaktır.)
## Frontend klasörüne girin:
### cd frontend
####  Bağımlılıkları yükleyin:
##### npm install
###### Uygulamayı başlatın:
####### npm start

# deploy.js dosyasına voters değişkenine:
## Oluşturmuş olduğunuz özel anahtarlar ile hesap adlarının (5 hesap) adreslerini yazın.

# hardhat.config.js dosyasına 5 adresin private key 'leri ekleyin.

#####################################################################

# sepolia.etherscan.io sayfasında adresimizi gridikten sonra çıkan sonuçlar:
## Method --> Çağrılan fonksiyon — Vote() ve End Voting() fonksiyonu çağrılmış "End Voting() fonksiyonu sadece hesap 2 de çalışıyor yani 0xB4970... adresinde.
## From --> İşlemi yapan seçmen hesablar (5 farklı hesap ve hesap 2 deki sonlanırma işlemi yapılıyor toplam en son 6 hesap işlem yapılmaktadır.)
## To --> Akıllı sözleşmenin adresi: "0x40f664079201E7D28C0481A56ADB3fc48C56A60D"
## Amount --> Kontrata hiç ETH gönderilmediği anlamına gelir (0 ETH)
## Txn Fee --> İşlem için ödenen Sepolia ETH gas ücreti fiyatları



