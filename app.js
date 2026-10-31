(function(){
"use strict";
/* ================= Shared (runs in browser and at build) ================= */
var ESC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return ESC[c];});}
function safeJson(o){return JSON.stringify(o).replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");}
function L(o,lang){if(!o)return"";if(typeof o==="string")return o;return o[lang]||o.tr||o.en||"";}
function fmtNum(n){var v=Number(n);if(!isFinite(v))return"";return new Intl.NumberFormat("tr-TR",{maximumFractionDigits:2}).format(v);}
function fmtPrice(n){return fmtNum(n)+"\u00a0\u20ba";}

var DAYS={tr:["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],en:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]};
var TAGS={popular:{tr:"Çok sevilen",en:"Favourite"},"new":{tr:"Yeni",en:"New"},vegetarian:{tr:"Vejetaryen",en:"Vegetarian"},vegan:{tr:"Vegan",en:"Vegan"},glutenFree:{tr:"Glutensiz",en:"Gluten-free"}};
var ALLERGENS={gluten:{tr:"Gluten",en:"Gluten"},milk:{tr:"Süt",en:"Milk"},eggs:{tr:"Yumurta",en:"Eggs"},nuts:{tr:"Sert kabuklu yemişler",en:"Tree nuts"},peanuts:{tr:"Yer fıstığı",en:"Peanuts"},soy:{tr:"Soya",en:"Soy"},sesame:{tr:"Susam",en:"Sesame"},mustard:{tr:"Hardal",en:"Mustard"},celery:{tr:"Kereviz",en:"Celery"},sulphites:{tr:"Sülfit",en:"Sulphites"},fish:{tr:"Balık",en:"Fish"},crustaceans:{tr:"Kabuklu deniz ürünleri",en:"Crustaceans"},molluscs:{tr:"Yumuşakçalar",en:"Molluscs"},lupin:{tr:"Acı bakla",en:"Lupin"}};

var T={
tr:{skip:"Menüye geç",lang:"Dil",toDark:"Koyu temaya geç",toLight:"Açık temaya geç",categories:"Kategoriler",search:"Menüde ara",searchPh:"Kahve, tost, tatlı",close:"Kapat",
noResults:function(q){return"“"+q+"” için sonuç yok.";},soldOut:"Tükendi",
openNow:function(t){return"Şu an açık. Kapanış "+t;},closedNow:function(w,t){return"Şu an kapalı. Açılış "+w+" "+t;},today:"bugün",tomorrow:"yarın",
visit:"Bize uğrayın",directions:"Yol tarifi",call:"Ara",hours:"Çalışma saatleri",closedDay:"Kapalı",wifi:"Wi-Fi",
vat:"Fiyatlara KDV dahildir.",allergy:"Alerjiniz varsa siparişten önce lütfen bize söyleyin.",updated:function(d){return"Son güncelleme: "+d;},
manage:"Menüyü yönet",allergens:"Alerjenler",noAllergens:"Bu ürün için alerjen bilgisi girilmemiş. Lütfen bize sorun.",menuTitle:"Menü",
adminTitle:"Menü yönetimi",tabMenu:"Menü",tabInfo:"İşletme",tabData:"Yedek",back:"Menüye dön",
estimated:"Fiyatlar şimdilik tahmini. Her fiyatı kontrol edin, sonra bu kutuyu işaretleyin.",confirmPrices:"Fiyatları kontrol ettim",
addItem:"Ürün ekle",addCat:"Kategori ekle",editItem:"Ürünü düzenle",newItem:"Yeni ürün",editCat:"Kategoriyi düzenle",newCat:"Yeni kategori",
moveUp:"Yukarı taşı",moveDown:"Aşağı taşı",edit:"Düzenle",del:"Sil",available:"Satışta",sizes:function(n){return n+" boyut";},emptyCat:"Bu kategoride henüz ürün yok.",
fName:"Ad",fDesc:"Açıklama",fPrice:"Fiyat (₺)",fSizes:"Boyutlar",fSizesHint:"Boyutların fiyatı farklıysa ekleyin. Liste boşsa tek fiyat kullanılır.",addSize:"Boyut ekle",sizeTr:"Boyut (TR)",sizeEn:"Size (EN)",
fCat:"Kategori",fPhoto:"Fotoğraf",choosePhoto:"Fotoğraf seç",changePhoto:"Değiştir",removePhoto:"Kaldır",fTags:"Etiketler",fAllergens:"Alerjenler",fNote:"Kategori notu",fNoteHint:"Başlığın altında gösterilir, örneğin bitkisel süt ücreti.",
position:"Sıra",cancel:"Vazgeç",done:"Tamam",remove:"Kaldır",
errName:"En az bir dilde ad girin.",errPrice:"Geçerli bir fiyat girin.",errSize:"Her boyut için ad ve fiyat girin.",
confirmDelItem:function(n){return"“"+n+"” silinsin mi?";},confirmDelCat:function(n,c){return c?"“"+n+"” kategorisi ve içindeki "+c+" ürün silinsin mi?":"“"+n+"” kategorisi silinsin mi?";},
unsaved:"Yayınlanmadı",discard:"Geri al",confirmDiscard:"Yayınlanmamış tüm değişiklikler silinsin mi?",publish:"Yayınla",publishing:"Yayınlanıyor…",published:"Yayınlandı",
conflict:"Menü bu sayfa açıldıktan sonra güncellenmiş. Birkaç dakika bekleyip sayfayı yenileyin, değişiklikleriniz taslak olarak saklandı.",tooLarge:"Sayfa çok büyük. Birkaç fotoğrafı kaldırıp tekrar deneyin.",rateLimited:"GitHub istek sınırına ulaşıldı. Birkaç dakika sonra tekrar deneyin.",failed:"Yayınlanamadı. Bağlantınızı kontrol edip tekrar deneyin.",
publishedGh:"Yayınlandı. Menü hemen güncellendi.",sessionOut:"Oturumunuz sona erdi. Tekrar giriş yapın.",offline:"Bağlantı yok. Değişiklikleriniz taslak olarak saklandı.",
draftFound:"Önceki oturumdan yayınlanmamış değişiklikler bulundu.",restore:"Geri yükle",dismiss:"Sil",
business:"İşletme bilgileri",bizName:"İşletme adı",tagline:"Alt başlık",address:"Adres",phone:"Telefon",maps:"Google Maps bağlantısı",insta:"Instagram kullanıcı adı",instaHint:"@ işareti olmadan. Boş bırakılırsa gösterilmez.",
wifiF:"Wi-Fi bilgisi",wifiHint:"Örneğin: Ağ Cuginos, şifre kahve2026. Boş bırakılırsa gösterilmez.",hoursF:"Çalışma saatleri",closedF:"Kapalı",annF:"Duyuru",annHint:"Menünün en üstünde gösterilir. Boş bırakılırsa gizlenir.",
dataTitle:"Yedek ve aktarım",dataHint:"Menünün tamamını JSON olarak saklayın veya başka bir yere taşıyın.",exportJson:"JSON indir",copyJson:"JSON kopyala",copied:"Kopyalandı",copyFail:"Kopyalanamadı. Aşağıdaki metni elle seçip kopyalayın.",
importTitle:"Yedekten geri yükle",importHint:"Bir menü yedeğini buraya yapıştırın. Mevcut taslağın yerini alır.",importBtn:"İçe aktar",importBad:"Bu geçerli bir menü yedeği değil.",imported:"İçe aktarıldı. Kontrol edip yayınlayın.",
stats:function(c,i,kb){return c+" kategori, "+i+" ürün. Menü verisi yaklaşık "+kb+" KB, sınır 4 MB.";},photoFail:"Fotoğraf okunamadı. JPG veya PNG deneyin.",loginLead:"Devam etmek için giriş yapın.",username:"Kullanıcı adı",password:"Şifre",show:"Şifreyi göster",hide:"Şifreyi gizle",signIn:"Giriş yap",checking:"Kontrol ediliyor…",loginErr:"Kullanıcı adı veya şifre hatalı.",locked:function(n){return"Çok fazla hatalı deneme. "+Math.ceil(n/60)+" dakika sonra tekrar deneyin.";},logout:"Çıkış yap",creds:"Giriş bilgileri",credsHint:"Değişiklik hemen geçerli olur ve diğer cihazların oturumunu kapatır.",curPw:"Mevcut şifre",newUser:"Kullanıcı adı",newPw:"Yeni şifre",newPw2:"Yeni şifre (tekrar)",updateCreds:"Giriş bilgilerini güncelle",errCur:"Mevcut şifre hatalı.",errShort:"Yeni şifre en az 10 karakter olmalı.",errMatch:"Yeni şifreler eşleşmiyor.",errUser:"Kullanıcı adı girin.",credsUpdated:"Giriş bilgileri güncellendi.",saveUnavailable:"İndirme burada kullanılamıyor. JSON kopyala seçeneğini kullanın."},
en:{skip:"Skip to menu",lang:"Language",toDark:"Switch to dark theme",toLight:"Switch to light theme",categories:"Categories",search:"Search the menu",searchPh:"Coffee, toastie, cake",close:"Close",
noResults:function(q){return"Nothing matches “"+q+"”.";},soldOut:"Sold out",
openNow:function(t){return"Open now. Closes "+t;},closedNow:function(w,t){return"Closed now. Opens "+w+" "+t;},today:"today",tomorrow:"tomorrow",
visit:"Visit us",directions:"Directions",call:"Call",hours:"Opening hours",closedDay:"Closed",wifi:"Wi-Fi",
vat:"Prices include VAT.",allergy:"If you have an allergy, please tell us before you order.",updated:function(d){return"Last updated "+d;},
manage:"Manage menu",allergens:"Allergens",noAllergens:"No allergen info is listed for this item. Please ask us.",menuTitle:"Menu",
adminTitle:"Manage menu",tabMenu:"Menu",tabInfo:"Business",tabData:"Backup",back:"Back to menu",
estimated:"Prices are estimates for now. Check every price, then tick this box.",confirmPrices:"I've checked the prices",
addItem:"Add item",addCat:"Add category",editItem:"Edit item",newItem:"New item",editCat:"Edit category",newCat:"New category",
moveUp:"Move up",moveDown:"Move down",edit:"Edit",del:"Delete",available:"Available",sizes:function(n){return n+" sizes";},emptyCat:"No items in this category yet.",
fName:"Name",fDesc:"Description",fPrice:"Price (₺)",fSizes:"Sizes",fSizesHint:"Add sizes if they're priced differently. With no sizes, the single price is used.",addSize:"Add size",sizeTr:"Size (TR)",sizeEn:"Size (EN)",
fCat:"Category",fPhoto:"Photo",choosePhoto:"Choose photo",changePhoto:"Change",removePhoto:"Remove",fTags:"Labels",fAllergens:"Allergens",fNote:"Category note",fNoteHint:"Shown under the heading, for example a plant milk charge.",
position:"Position",cancel:"Cancel",done:"Done",remove:"Remove",
errName:"Enter a name in at least one language.",errPrice:"Enter a valid price.",errSize:"Enter a name and price for every size.",
confirmDelItem:function(n){return"Delete “"+n+"”?";},confirmDelCat:function(n,c){return c?"Delete “"+n+"” and its "+c+" items?":"Delete “"+n+"”?";},
unsaved:"Not published",discard:"Discard",confirmDiscard:"Discard all unpublished changes?",publish:"Publish",publishing:"Publishing…",published:"Published",
conflict:"The menu was updated after this page opened. Wait a few minutes and reload; your changes are kept as a draft.",tooLarge:"The page is too large. Remove a few photos and try again.",rateLimited:"GitHub rate limit reached. Try again in a few minutes.",failed:"Couldn't publish. Check your connection and try again.",
publishedGh:"Published. The menu is live now.",sessionOut:"Your session expired. Sign in again.",offline:"No connection. Your changes are kept as a draft.",
draftFound:"Unpublished changes from an earlier session were found.",restore:"Restore",dismiss:"Delete",
business:"Business details",bizName:"Business name",tagline:"Tagline",address:"Address",phone:"Phone",maps:"Google Maps link",insta:"Instagram username",instaHint:"Without the @. Hidden when empty.",
wifiF:"Wi-Fi details",wifiHint:"For example: network Cuginos, password coffee2026. Hidden when empty.",hoursF:"Opening hours",closedF:"Closed",annF:"Announcement",annHint:"Shown at the top of the menu. Hidden when empty.",
dataTitle:"Backup and transfer",dataHint:"Keep a copy of the whole menu as JSON, or move it somewhere else.",exportJson:"Download JSON",copyJson:"Copy JSON",copied:"Copied",copyFail:"Couldn't copy. Select the text below and copy it manually.",
importTitle:"Restore from backup",importHint:"Paste a menu backup here. It replaces the current draft.",importBtn:"Import",importBad:"This isn't a valid menu backup.",imported:"Imported. Review it, then publish.",
stats:function(c,i,kb){return c+" categories, "+i+" items. Menu data is about "+kb+" KB, limit 4 MB.";},photoFail:"Couldn't read that photo. Try a JPG or PNG.",loginLead:"Sign in to continue.",username:"Username",password:"Password",show:"Show password",hide:"Hide password",signIn:"Sign in",checking:"Checking…",loginErr:"Wrong username or password.",locked:function(n){return"Too many failed attempts. Try again in "+Math.ceil(n/60)+" minutes.";},logout:"Sign out",creds:"Sign-in details",credsHint:"The change applies at once and signs other devices out.",curPw:"Current password",newUser:"Username",newPw:"New password",newPw2:"Repeat new password",updateCreds:"Update sign-in details",errCur:"Current password is wrong.",errShort:"New password must be at least 10 characters.",errMatch:"New passwords don't match.",errUser:"Enter a username.",credsUpdated:"Sign-in details updated.",saveUnavailable:"Downloads aren't available here. Use Copy JSON instead."}
};

var I={
search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
insta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
wifi:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></svg>',
up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>',
down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>',
trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',
plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
out:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/></svg>',
eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'
};


var LOGO='<svg viewBox="0 0 786 308" aria-hidden="true" focusable="false"><g transform="translate(346 0)"><path class="s" fill-rule="evenodd" d="M49.1 142.7C47.9 142.2 47.4 141.0 46.7 137.3C45.1 128.9 46.7 121.9 51.7 115.1C55.3 110.3 63.2 103.3 65.1 103.3C66.1 103.3 66.1 103.3 65.9 104.8C65.7 106.5 62.9 112.6 61.0 115.5C57.6 120.8 54.7 131.4 54.7 138.7C54.7 142.1 54.2 142.7 51.6 142.9C50.6 142.9 49.5 142.9 49.1 142.7ZM18.4 142.2C17.2 141.6 12.5 136.2 10.6 133.4C8.6 130.2 6.4 124.8 5.9 121.3C5.4 117.8 6.0 108.1 7.0 104.1C7.9 100.4 9.6 97.0 11.0 96.1C12.3 95.2 12.5 95.2 13.2 95.9C13.7 96.4 13.7 97.0 13.5 101.1C13.0 109.1 13.3 114.9 14.3 119.3C15.3 123.2 17.5 129.7 18.5 131.7C19.4 133.4 22.0 140.5 22.0 141.2C22.0 142.6 20.1 143.2 18.4 142.2ZM36.8 136.9C33.6 134.1 33.4 117.7 36.4 109.2C40.4 98.0 47.9 89.7 68.3 74.3C70.6 72.6 73.4 70.5 74.5 69.6C77.1 67.6 78.1 66.5 80.7 62.6C85.3 55.8 88.9 47.6 89.7 42.0C90.1 38.8 90.4 38.1 91.3 37.8C94.0 37.0 96.4 43.0 96.4 50.7C96.5 61.6 94.3 68.0 87.4 77.3C82.1 84.3 71.2 94.7 63.2 100.3C57.1 104.5 51.1 110.5 47.4 116.0C44.8 120.0 42.6 125.8 41.2 132.4C40.1 137.6 39.0 138.8 36.8 136.9ZM22.1 122.7C21.2 122.2 19.3 116.7 19.0 113.8C18.3 108.0 18.8 101.0 20.2 95.9C21.6 90.8 27.3 79.4 30.9 74.6C33.2 71.6 44.7 59.9 47.5 57.8C50.3 55.8 57.4 48.8 60.2 45.3C62.5 42.6 66.6 36.2 67.5 34.1C69.8 28.8 71.2 21.0 71.5 11.9C71.8 4.6 71.9 4.3 73.9 4.3C75.5 4.3 76.4 5.4 78.0 9.5C81.2 17.7 81.8 21.5 81.6 30.6C81.4 38.3 80.9 40.6 78.3 46.8C77.1 49.6 75.9 51.8 74.3 54.0C73.0 55.7 71.3 58.1 70.5 59.2C69.7 60.3 67.3 63.1 65.1 65.5C61.3 69.7 58.7 72.0 49.7 79.3C45.5 82.6 40.0 87.6 36.9 90.8C31.1 96.8 27.1 105.8 25.8 116.0C25.6 118.3 25.2 120.7 25.0 121.3C24.5 122.7 23.2 123.4 22.1 122.7Z"/></g><path class="w" fill-rule="evenodd" transform="translate(0 154)" d="M728.3 147.8C718.8 146.7 709.3 144.5 700.5 141.3C692.6 138.3 693.2 139.5 693.6 126.0C693.8 120.4 694.0 113.6 694.1 110.9C694.2 104.7 694.5 104.2 697.6 104.1C701.2 103.9 701.8 104.5 706.2 112.7C710.0 119.8 712.0 122.4 717.8 127.6C723.3 132.5 733.4 134.9 740.3 133.0C747.1 131.1 751.0 127.4 753.2 120.7C754.4 117.3 754.5 111.3 753.4 108.1C751.4 101.9 746.2 96.7 736.2 90.8C728.8 86.5 726.6 85.3 723.2 83.5C701.6 72.1 692.4 55.2 697.4 36.1C699.7 26.9 707.3 18.3 717.2 13.5C718.6 12.8 722.0 11.7 725.4 10.9C733.6 8.8 739.1 8.4 748.1 9.1C755.1 9.7 757.1 10.1 766.6 12.5C772.8 14.1 774.1 14.7 774.6 16.4C775.0 18.2 774.4 40.7 773.9 43.7C773.2 47.0 772.7 47.4 769.4 47.3C766.3 47.1 766.0 46.8 763.0 40.7C756.9 28.3 751.8 24.2 742.0 23.8C734.2 23.4 728.5 26.4 725.6 32.2C724.5 34.5 724.5 34.6 724.5 39.0L724.5 43.5L725.9 46.5C727.1 49.0 727.8 49.9 730.4 52.5C734.7 56.8 738.5 59.2 751.0 65.8C761.7 71.4 768.2 76.1 774.5 82.5C777.7 85.8 778.2 86.5 779.9 89.8C782.9 96.1 783.5 99.1 783.5 107.8C783.5 113.9 783.4 115.5 782.9 117.3C778.8 131.6 770.2 140.6 755.9 145.5C749.1 147.8 737.1 148.8 728.3 147.8ZM62.8 146.8C62.3 146.7 60.7 146.5 59.3 146.3C52.2 145.4 38.4 139.3 31.8 134.3C26.9 130.5 21.3 123.8 18.2 117.8C16.2 114.0 13.4 107.8 12.7 105.3C12.6 104.7 11.9 102.5 11.4 100.6C9.9 95.6 9.3 90.5 9.3 82.5C9.3 72.5 9.9 68.7 12.9 57.3C13.4 55.4 17.2 45.7 18.2 43.5C23.0 34.0 34.2 22.4 44.1 16.7C55.0 10.4 66.7 7.8 81.7 8.1C85.8 8.2 90.3 8.5 92.2 8.8C94.0 9.1 97.3 9.5 99.5 9.8C101.7 10.1 105.3 10.8 107.5 11.3C114.4 13.0 114.2 12.5 114.1 24.5C114.0 29.6 113.9 36.7 113.8 40.2L113.6 46.5L112.5 47.6C111.5 48.6 111.2 48.7 109.4 48.7C107.0 48.7 106.1 47.9 105.1 44.9C104.4 42.6 101.9 37.6 100.3 35.2C96.4 29.5 92.5 26.4 86.5 24.3C83.6 23.3 83.3 23.2 78.5 23.2C74.1 23.2 73.1 23.3 70.2 24.1C61.8 26.3 55.1 31.4 49.8 39.5C44.0 48.4 40.9 62.8 41.5 77.9C41.8 87.2 42.7 92.4 45.4 101.0C48.4 110.5 53.6 118.2 60.8 123.8C64.3 126.5 64.7 126.7 67.8 127.9C75.2 130.7 82.0 130.7 90.8 127.8C97.5 125.6 104.3 120.6 110.0 113.8C115.8 106.8 115.9 106.7 119.5 110.5C124.0 115.1 123.8 116.7 117.2 124.4C115.7 126.1 113.7 128.5 112.7 129.7C108.8 134.5 99.3 140.9 92.1 143.5C89.3 144.5 83.6 145.9 80.5 146.3C78.0 146.7 64.5 147.0 62.8 146.8ZM586.7 137.7C575.8 137.3 570.7 135.5 561.0 128.7C556.8 125.8 555.6 124.6 553.4 121.6C552.4 120.1 551.0 118.6 550.3 118.1C549.4 117.5 549.0 117.0 549.0 116.4C549.0 116.0 548.5 114.8 547.9 113.8C541.2 103.5 538.0 91.4 538.0 77.1C538.0 63.6 540.9 52.1 546.8 41.7C548.2 39.4 549.0 37.6 549.0 37.0C549.0 36.4 549.1 36.0 549.3 36.0C550.0 36.0 551.8 34.1 553.4 31.7C557.7 25.3 566.0 19.6 576.0 16.1L580.5 14.6L588.8 14.3C593.4 14.1 599.0 14.0 601.3 14.1C616.0 14.7 629.2 21.2 640.0 33.1C653.4 47.9 657.9 77.7 650.1 100.9C646.3 112.4 640.6 120.5 631.3 127.4C619.8 136.0 608.9 138.5 586.7 137.7ZM177.3 137.0C168.2 136.1 162.9 134.5 156.4 130.7C150.3 127.2 144.7 120.0 142.4 113.0C142.0 111.8 141.3 108.9 140.8 106.5L139.9 102.2L139.7 65.7L139.5 29.2L138.5 27.4C137.6 25.7 135.8 23.9 133.2 21.9C132.0 21.0 131.9 20.8 132.1 19.5C132.4 17.6 133.4 16.8 135.9 16.5C138.6 16.3 174.4 16.5 175.0 16.8C176.2 17.3 176.7 20.0 176.0 21.4C175.8 21.7 174.8 22.6 173.7 23.3C171.5 24.7 169.9 26.4 169.1 28.2C168.5 29.4 168.5 31.9 168.4 61.7C168.2 102.0 168.4 104.5 171.7 111.2C175.1 118.4 181.1 122.0 189.3 122.0C197.2 122.0 202.7 119.3 206.4 113.7C210.6 107.5 210.7 106.0 210.6 63.5C210.5 33.7 210.4 30.3 209.9 28.8C209.1 26.3 207.6 24.5 205.0 22.9C202.6 21.3 202.3 20.9 202.3 19.2C202.3 17.6 203.3 16.8 205.5 16.5C206.5 16.4 213.2 16.3 220.6 16.4C235.5 16.5 235.0 16.4 235.5 18.9C235.8 20.8 235.2 22.1 233.1 23.6C232.0 24.3 230.6 25.8 229.8 26.8C228.6 28.6 228.5 28.9 228.2 32.3C228.1 34.2 228.0 48.3 228.0 63.6C228.0 80.2 227.9 92.7 227.7 94.9C227.5 96.9 227.2 100.0 227.0 101.9C226.5 107.4 224.6 113.8 222.2 118.7C220.2 122.6 213.7 129.0 209.3 131.4C205.3 133.6 199.3 135.6 194.3 136.5C190.6 137.1 181.4 137.4 177.3 137.0ZM289.2 136.5C287.7 136.2 285.9 136.0 285.1 136.0C283.1 136.0 275.2 133.2 271.7 131.3C263.9 126.9 257.1 120.6 252.4 113.1C249.0 107.7 245.5 97.8 243.8 88.6C243.1 84.8 243.0 73.1 243.6 67.5C244.8 56.9 249.0 45.1 254.4 36.7C256.9 33.0 262.8 26.8 266.7 23.9C271.3 20.4 278.8 16.8 284.0 15.6C289.8 14.1 300.4 12.9 304.0 13.2C304.8 13.3 307.5 13.5 310.0 13.7C319.5 14.4 331.1 17.1 335.2 19.5C337.5 20.8 337.5 20.8 337.2 34.6C337.0 50.2 337.0 50.3 332.6 50.3C329.5 50.3 329.0 49.9 326.5 45.1C322.5 37.3 318.6 32.6 314.2 30.0C308.0 26.4 298.3 26.4 291.3 30.1C288.2 31.6 284.1 35.3 281.8 38.5C278.9 42.6 276.4 50.5 274.6 61.2C273.6 67.4 273.5 82.8 274.5 89.0C275.6 96.4 277.8 104.2 280.0 108.8C283.4 115.9 288.9 121.0 295.0 122.8C299.7 124.2 307.4 123.1 311.2 120.6C314.0 118.7 313.8 119.7 313.7 101.0L313.6 84.5L312.8 82.7C311.8 80.7 310.8 80.0 306.0 78.1C302.5 76.7 301.7 75.8 301.7 73.5C301.7 71.7 302.6 70.5 304.4 69.9C306.5 69.3 345.4 69.6 346.9 70.2C348.5 70.8 349.1 72.0 348.9 73.9C348.8 75.3 348.5 75.7 346.9 77.2C345.5 78.4 344.7 79.5 343.9 81.2L342.8 83.5L342.9 101.7C342.9 119.5 342.9 119.9 343.6 121.8C344.4 124.0 344.5 125.9 343.9 126.8C343.7 127.1 341.8 127.9 339.6 128.6C337.5 129.3 335.5 130.1 335.1 130.2C331.6 132.1 319.3 135.4 312.9 136.3C307.3 137.1 293.6 137.2 289.2 136.5ZM362.9 133.8C362.5 133.6 362.0 133.0 361.9 132.2C361.4 130.4 362.2 129.0 364.5 127.7C366.9 126.3 367.7 125.2 368.8 122.0C370.2 117.7 370.4 110.4 370.2 68.7C370.1 39.0 369.9 32.5 369.5 30.6C368.7 26.8 367.3 24.8 364.4 23.4C362.4 22.4 361.6 21.1 361.8 19.6C362.0 18.0 362.8 16.7 363.9 16.3C364.5 16.1 371.6 16.0 384.3 16.1C403.1 16.2 403.9 16.2 405.2 16.8C406.2 17.4 406.6 17.8 406.8 18.7C407.3 20.6 406.6 21.8 404.3 23.3C401.9 25.0 400.5 26.7 399.6 29.0C398.3 32.6 398.1 113.8 399.5 119.8C400.1 122.6 401.5 124.8 404.0 127.0C407.8 130.3 408.1 133.3 404.6 133.8C401.8 134.2 363.6 134.2 362.9 133.8ZM423.4 134.1C422.5 133.9 421.1 132.3 420.8 131.1C420.5 130.0 421.4 128.8 423.8 127.3C426.2 125.6 427.6 122.9 428.0 118.7C428.2 116.9 428.3 98.9 428.3 72.5C428.2 23.6 428.4 28.2 425.4 25.2C424.5 24.2 423.3 23.0 422.6 22.4C421.3 21.2 420.9 19.8 421.4 18.4C422.0 16.6 422.5 16.5 437.7 16.5C453.1 16.5 453.0 16.5 454.5 18.8C455.1 19.5 457.4 22.9 459.8 26.2C465.2 33.5 465.8 34.4 468.4 38.2C469.5 39.8 470.9 41.8 471.5 42.5C472.1 43.2 473.2 44.7 473.9 45.7C474.6 46.7 477.1 50.2 479.5 53.4C481.9 56.6 484.6 60.3 485.5 61.7C486.3 63.0 488.4 66.0 490.1 68.3C491.7 70.6 494.3 74.4 495.8 76.7C498.6 80.9 500.6 83.3 501.3 83.3C502.3 83.3 502.4 81.5 502.2 56.2C502.1 38.7 501.9 30.3 501.6 29.0C501.2 27.2 499.8 25.5 495.9 22.1C494.8 21.2 494.7 20.9 494.7 19.6C494.7 16.5 495.1 16.4 509.7 16.4C525.3 16.4 526.7 16.6 527.2 19.2C527.5 20.9 526.9 21.8 524.9 23.1C522.7 24.5 521.2 26.3 520.2 28.3C519.3 30.5 519.0 46.0 519.1 94.2L519.2 132.6L518.4 133.4C517.7 134.1 517.4 134.2 510.9 134.3C507.2 134.3 503.7 134.3 503.1 134.2C501.4 133.9 499.6 132.0 496.6 127.5C495.1 125.3 493.4 122.9 492.8 122.2C492.2 121.4 490.2 118.6 488.3 115.8C486.4 113.1 483.6 109.0 482.0 106.9C480.5 104.7 478.5 101.9 477.7 100.7C476.8 99.5 474.5 96.2 472.5 93.5C470.4 90.8 467.8 87.0 466.5 85.2C465.2 83.3 463.1 80.4 461.8 78.7C460.5 76.9 458.9 74.6 458.3 73.5C457.7 72.4 456.0 69.8 454.5 67.7C453.1 65.6 451.0 62.5 449.9 60.9C447.9 57.9 446.9 57.2 446.2 58.1C445.5 59.0 445.3 71.6 445.5 95.3C445.7 118.8 445.7 118.7 446.8 121.7C448.1 125.0 449.2 126.6 450.8 127.5C454.3 129.5 454.8 132.8 451.7 133.7C450.5 134.0 424.9 134.5 423.4 134.1ZM600.8 125.3C606.6 124.4 612.5 119.6 615.5 113.5C617.8 108.7 618.6 106.6 619.5 102.7C621.7 93.4 622.1 89.3 622.1 75.3C622.2 63.8 622.2 63.8 621.1 58.0C618.5 43.8 614.3 34.9 608.0 30.7C603.2 27.4 600.8 26.6 596.8 27.0C589.9 27.7 588.4 28.8 586.6 34.3C586.1 35.7 584.8 38.7 583.6 41.0C579.8 48.4 579.1 51.1 577.0 64.7C576.0 71.5 576.0 71.7 576.1 81.9L576.2 92.2L577.4 97.9C578.8 104.2 582.5 115.7 584.1 118.8C586.9 124.0 593.4 126.5 600.8 125.3ZM665.4 52.7C664.1 51.8 663.2 50.0 663.5 48.5C663.7 47.3 664.6 46.4 668.6 43.3C671.3 41.3 673.7 38.2 673.7 36.7C673.7 35.5 673.3 35.2 669.2 33.0C665.7 31.1 664.5 29.9 663.2 26.9C659.0 17.6 664.5 8.4 675.0 7.2C682.8 6.2 689.2 11.9 690.1 20.5C690.6 25.2 689.8 31.6 688.3 35.0C683.8 45.4 670.3 55.8 665.4 52.7Z"/></svg>';
function itemPrices(it){return(it.variants&&it.variants.length)?it.variants.map(function(v){return Number(v.price);}):[Number(it.price)];}

function renderItem(it,lang,withPhotos){
  var t=T[lang],name=L(it.name,lang),desc=L(it.desc,lang),sold=it.available===false,has=it.variants&&it.variants.length;
  var price=sold?t.soldOut:(has?fmtPrice(Math.min.apply(null,itemPrices(it))):fmtPrice(it.price));
  var h='<li class="item'+(sold?" soldout":"")+'" data-id="'+esc(it.id)+'"><button type="button" class="item-btn" aria-haspopup="dialog"><span class="item-main"><span class="item-line"><span class="item-name">'+esc(name)+'</span><span class="leader" aria-hidden="true"></span><span class="price">'+esc(price)+'</span></span>';
  if(desc)h+='<span class="item-desc">'+esc(desc)+'</span>';
  if(has&&!sold)h+='<span class="variants">'+it.variants.map(function(v){return"<span>"+esc(L(v.label,lang))+" "+esc(fmtPrice(v.price))+"</span>";}).join("")+'</span>';
  var tags=(it.tags||[]).filter(function(k){return TAGS[k];});
  if(tags.length)h+='<span class="tags">'+tags.map(function(k){return'<span class="tag '+esc(k)+'">'+esc(TAGS[k][lang])+'</span>';}).join("")+'</span>';
  h+='</span>';
  if(it.photo)h+=withPhotos?'<img class="thumb" src="'+esc(it.photo)+'" alt="" width="76" height="76" loading="lazy" decoding="async">':'<img class="thumb" data-photo="'+esc(it.id)+'" alt="" width="76" height="76">';
  return h+'</button></li>';
}
function renderSections(D,lang,withPhotos){
  return D.categories.map(function(c){
    var note=L(c.note,lang);
    return'<section class="section" id="c-'+esc(c.id)+'" aria-labelledby="h-'+esc(c.id)+'"><h2 id="h-'+esc(c.id)+'">'+esc(L(c.name,lang))+'</h2>'+(note?'<p class="note">'+esc(note)+'</p>':"")+'<ul class="items">'+c.items.map(function(it){return renderItem(it,lang,withPhotos);}).join("")+'</ul></section>';
  }).join("");
}
function renderChips(D,lang){return D.categories.map(function(c,i){return'<a class="chip" href="#c-'+esc(c.id)+'"'+(i===0?' aria-current="true"':"")+'>'+esc(L(c.name,lang))+'</a>';}).join("");}
function fmtDate(iso,lang){if(!iso)return"";var d=new Date(iso);if(isNaN(d))return"";return new Intl.DateTimeFormat(lang==="tr"?"tr-TR":"en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Istanbul"}).format(d);}
function renderVisit(D,lang){
  var t=T[lang],f=D.info,h='<section class="visit" aria-labelledby="visit-h"><h2 id="visit-h">'+esc(t.visit)+'</h2><div class="visit-card">';
  if(f.address)h+='<a class="row" href="'+esc(f.mapsUrl||("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(f.address)))+'" target="_blank" rel="noopener">'+I.pin+'<span>'+esc(f.address)+'</span><span class="go">'+esc(t.directions)+'</span></a>';
  if(f.phone)h+='<a class="row" href="tel:'+esc(f.phone.replace(/[^+\d]/g,""))+'">'+I.phone+'<span>'+esc(f.phone)+'</span><span class="go">'+esc(t.call)+'</span></a>';
  if(f.instagram)h+='<a class="row" href="https://www.instagram.com/'+esc(f.instagram.replace(/^@/,""))+'/" target="_blank" rel="noopener">'+I.insta+'<span>@'+esc(f.instagram.replace(/^@/,""))+'</span><span class="go">Instagram</span></a>';
  if(f.wifi)h+='<div class="row">'+I.wifi+'<span>'+esc(f.wifi)+'</span><span class="go">'+esc(t.wifi)+'</span></div>';
  h+='<div class="row" style="display:block"><table class="hours"><caption class="sr">'+esc(t.hours)+'</caption><tbody>';
  (f.hours||[]).forEach(function(d,i){h+='<tr data-day="'+i+'"><td>'+esc(DAYS[lang][i])+'</td><td>'+(d?esc(d[0])+"–"+esc(d[1]):esc(t.closedDay))+'</td></tr>';});
  h+='</tbody></table></div></div><p class="fine">'+esc(t.vat)+" "+esc(t.allergy)+(D.updatedAt?"<br>"+esc(t.updated(fmtDate(D.updatedAt,lang))):"")+'</p><p class="fine"><button type="button" class="manage-link" data-act="open-admin">'+esc(t.manage)+'</button></p></section>';
  return h;
}
function renderSite(D,lang,withPhotos){
  var t=T[lang],ann=L(D.info.announcement,lang);
  return'<a class="skip" href="#menu">'+esc(t.skip)+'</a>'+
  '<header class="sign"><div class="sign-bar"><div class="seg" role="group" aria-label="'+esc(t.lang)+'"><button type="button" data-lang="tr" lang="tr" aria-pressed="'+(lang==="tr")+'">TR</button><button type="button" data-lang="en" lang="en" aria-pressed="'+(lang==="en")+'">EN</button></div>'+
  '<button type="button" class="icon-btn" data-act="theme" aria-label="'+esc(t.toDark)+'">'+I.moon+'</button></div>'+
  '<h1 class="logo">'+LOGO+'<span class="sr">'+esc(D.info.name)+'</span></h1>'+
  '<p class="tagline">'+esc(L(D.info.tagline,lang))+'</p><p class="status" id="status" role="status"></p></header>'+
  (ann?'<div class="notice"><p>'+esc(ann)+'</p></div>':"")+
  '<nav class="catnav" aria-label="'+esc(t.categories)+'"><div class="catnav-inner" id="navrow"><button type="button" class="search-btn" data-act="search" aria-label="'+esc(t.search)+'">'+I.search+'</button><div class="chips" id="chips">'+renderChips(D,lang)+'</div></div>'+
  '<div class="searchbar" id="searchbar" hidden><label class="sr" for="q">'+esc(t.search)+'</label><input id="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="'+esc(t.searchPh)+'"><button type="button" class="text-btn" data-act="search-close">'+esc(t.close)+'</button></div></nav>'+
  '<main id="menu" tabindex="-1">'+renderSections(D,lang,withPhotos)+'<p class="empty" id="empty" hidden></p></main>'+renderVisit(D,lang);
}
var DOW=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
function jsonLd(D){
  var f=D.info,diet={vegan:"https://schema.org/VeganDiet",vegetarian:"https://schema.org/VegetarianDiet",glutenFree:"https://schema.org/GlutenFreeDiet"};
  var o={"@context":"https://schema.org","@type":"CafeOrCoffeeShop",name:f.name,address:{"@type":"PostalAddress",streetAddress:f.address,addressLocality:"Antalya",addressCountry:"TR"},telephone:f.phone||undefined,
    openingHoursSpecification:(f.hours||[]).map(function(d,i){return d?{"@type":"OpeningHoursSpecification",dayOfWeek:"https://schema.org/"+DOW[i],opens:d[0],closes:d[1]}:null;}).filter(Boolean),
    hasMenu:{"@type":"Menu",name:"Menü",inLanguage:["tr","en"],hasMenuSection:D.categories.map(function(c){return{"@type":"MenuSection",name:L(c.name,"tr"),hasMenuItem:c.items.map(function(it){
      var m={"@type":"MenuItem",name:L(it.name,"tr")};var d=L(it.desc,"tr");if(d)m.description=d;
      m.offers=itemPrices(it).map(function(p){return{"@type":"Offer",price:String(p),priceCurrency:f.currency||"TRY",availability:it.available===false?"https://schema.org/OutOfStock":"https://schema.org/InStock"};});
      var sd=(it.tags||[]).filter(function(k){return diet[k];}).map(function(k){return diet[k];});if(sd.length)m.suitableForDiet=sd;return m;})};})}};
  if(f.instagram)o.sameAs=["https://www.instagram.com/"+f.instagram.replace(/^@/,"")+"/"];
  return o;
}
function renderDocument(D,opts){
  opts=opts||{};
  var f=D.info,title=f.name+" | Menü",desc=L(f.tagline,"tr")+". Menü ve fiyatlar, çalışma saatleri ve adres.";
  return"<!doctype html>\n<html lang=\"tr\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">"+
  "<title>"+esc(title)+"</title><meta name=\"description\" content=\""+esc(desc)+"\"><meta name=\"color-scheme\" content=\"light dark\">"+
  "<meta name=\"theme-color\" content=\"#1F3A26\" media=\"(prefers-color-scheme: light)\"><meta name=\"theme-color\" content=\"#10201A\" media=\"(prefers-color-scheme: dark)\">"+
  "<link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%E2%98%95%3C/text%3E%3C/svg%3E\">"+(D.site&&D.site.url?"<link rel=\"canonical\" href=\""+esc(D.site.url)+"\"><meta property=\"og:url\" content=\""+esc(D.site.url)+"\">":"")+"<meta property=\"og:type\" content=\"website\"><meta property=\"og:title\" content=\""+esc(title)+"\"><meta property=\"og:description\" content=\""+esc(desc)+"\"><meta property=\"og:locale\" content=\"tr_TR\"><meta property=\"og:locale:alternate\" content=\"en_GB\">"+
  "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Marcellus&display=swap\">"+
  (opts.cssHref?"<link rel=\"stylesheet\" href=\""+esc(opts.cssHref)+"\">":"<style id=\"styles\">"+(opts.css||"")+"</style>")+"<script type=\"application/ld+json\">"+safeJson(jsonLd(D))+"<\/script></head><body>"+
  "<div id=\"site\">"+renderSite(D,"tr",false)+"</div><dialog class=\"sheet\" id=\"sheet\" aria-labelledby=\"sheet-title\"></dialog><div class=\"admin\" id=\"admin\" hidden></div><div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\" hidden></div>"+
  "<script type=\"application/json\" id=\"menu-data\">"+safeJson(D)+"<\/script>"+
  (opts.jsHref?"<script src=\""+esc(opts.jsHref)+"\" defer><\/script>":"<script id=\"app\">"+(opts.js||"")+"<\/script>")+"</body></html>";
}
var shared={renderDocument:renderDocument,T:T};
if(typeof module!=="undefined"&&module.exports){module.exports=shared;}
if(typeof document==="undefined")return;

/* ================= Browser ================= */
var $=function(s,r){return(r||document).querySelector(s);},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var dataEl=$("#menu-data");if(!dataEl)return;
var D=JSON.parse(dataEl.textContent);
var reduced=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch(e){return null;}}
function sstore(k,v){try{if(v===undefined)return sessionStorage.getItem(k);if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v);}catch(e){return null;}}
function clone(o){return JSON.parse(JSON.stringify(o));}
var lang=store("cg-lang")||((navigator.language||"tr").toLowerCase().indexOf("tr")===0?"tr":"en");
if(lang!=="tr"&&lang!=="en")lang="tr";
var theme=store("cg-theme");if(theme==="dark"||theme==="light")document.documentElement.setAttribute("data-theme",theme);


var toastTimer;
function toast(msg,ms){var el=$("#toast");el.textContent=msg;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.hidden=true;},ms||3600);}

function isDark(){var a=document.documentElement.getAttribute("data-theme");if(a)return a==="dark";return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches;}
function paintThemeBtn(){var b=$('[data-act="theme"]');if(!b)return;var d=isDark();b.innerHTML=d?I.sun:I.moon;b.setAttribute("aria-label",d?T[lang].toLight:T[lang].toDark);}

function renderAll(){
  document.documentElement.lang=lang;
  $("#site").innerHTML=renderSite(D,lang,true);
  paintThemeBtn();fillStatus();markToday();spy();
}
function hydratePhotos(){
  var map={};D.categories.forEach(function(c){c.items.forEach(function(it){if(it.photo)map[it.id]=it.photo;});});
  $$("img[data-photo]").forEach(function(img){var p=map[img.getAttribute("data-photo")];if(p){img.src=p;img.loading="lazy";}img.removeAttribute("data-photo");});
}

/* ----- open/closed status, Istanbul time ----- */
function istNow(){
  var parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Istanbul",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
  var o={};parts.forEach(function(p){o[p.type]=p.value;});
  return{day:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].indexOf(o.weekday),min:(+o.hour%24)*60+(+o.minute)};
}
function toMin(s){var m=/^(\d{1,2}):(\d{2})$/.exec(s||"");return m?(+m[1])*60+(+m[2]):null;}
function fillStatus(){
  var el=$("#status");if(!el)return;var H=D.info.hours||[],n=istNow(),t=T[lang];if(n.day<0){el.textContent="";return;}
  function span(d){var h=H[(d+7)%7];if(!h)return null;var o=toMin(h[0]),c=toMin(h[1]);if(o==null||c==null)return null;if(c<=o)c+=1440;return[o,c,h];}
  var today=span(n.day),prev=span(n.day-1),open=null;
  if(today&&n.min>=today[0]&&n.min<today[1])open=today;
  else if(prev&&prev[1]>1440&&n.min<prev[1]-1440)open=prev;
  if(open){el.className="status";el.innerHTML='<span class="dot" aria-hidden="true"></span><span>'+esc(t.openNow(open[2][1]))+"</span>";return;}
  for(var k=0;k<7;k++){var s=span(n.day+k);if(!s)continue;if(k===0&&n.min>=s[0])continue;
    var when=k===0?t.today:k===1?t.tomorrow:DAYS[lang][(n.day+k)%7];
    el.className="status is-closed";el.innerHTML='<span class="dot" aria-hidden="true"></span><span>'+esc(t.closedNow(when,s[2][0]))+"</span>";return;}
  el.textContent="";
}
function markToday(){var n=istNow();$$(".hours tr").forEach(function(tr){tr.classList.toggle("today",+tr.getAttribute("data-day")===n.day);});}

/* ----- scrollspy ----- */
var io;
function spy(){
  if(io)io.disconnect();if(!("IntersectionObserver" in window))return;
  io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(!e.isIntersecting)return;setActive(e.target.id);});
  },{rootMargin:"-70px 0px -65% 0px"});
  $$(".section").forEach(function(s){io.observe(s);});
}
function setActive(id){
  var chips=$("#chips");if(!chips)return;var cur=null;
  $$(".chip",chips).forEach(function(c){var on=c.getAttribute("href")==="#"+id;c.setAttribute("aria-current",on?"true":"false");if(on)cur=c;});
  if(cur){var l=cur.offsetLeft-chips.offsetLeft-24;chips.scrollTo({left:l,behavior:reduced?"auto":"smooth"});}
}

/* ----- search ----- */
function norm(s){return String(s||"").toLocaleLowerCase("tr").replace(/ı/g,"i").normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function runSearch(q){var top=$("#menu").offsetTop-$(".catnav").offsetHeight;if(q&&scrollY>top)scrollTo(0,top);
  var nq=norm(q.trim()),any=false,index={};
  D.categories.forEach(function(c){c.items.forEach(function(it){index[it.id]=norm([L(it.name,"tr"),L(it.name,"en"),L(it.desc,"tr"),L(it.desc,"en"),L(c.name,"tr"),L(c.name,"en")].join(" "));});});
  $$(".section").forEach(function(sec){var vis=0;$$(".item",sec).forEach(function(li){var ok=!nq||index[li.getAttribute("data-id")].indexOf(nq)>-1;li.hidden=!ok;if(ok)vis++;});sec.hidden=vis===0;if(vis)any=true;});
  var em=$("#empty");em.hidden=any||!nq;if(!any&&nq)em.textContent=T[lang].noResults(q.trim());
}
function openSearch(){$("#navrow").hidden=true;var sb=$("#searchbar");sb.hidden=false;var top=$("#menu").offsetTop-$(".catnav").offsetHeight;if(scrollY>top)scrollTo(0,top);$("#q").focus({preventScroll:true});}
function closeSearch(){var q=$("#q");q.value="";runSearch("");$("#searchbar").hidden=true;$("#navrow").hidden=false;var b=$('[data-act="search"]');if(b)b.focus();}

/* ----- item sheet ----- */
function findItem(id){for(var i=0;i<D.categories.length;i++){var c=D.categories[i];for(var j=0;j<c.items.length;j++)if(c.items[j].id===id)return{cat:c,item:c.items[j]};}return null;}
function openSheet(id){
  var r=findItem(id);if(!r)return;var it=r.item,t=T[lang],dlg=$("#sheet"),sold=it.available===false,has=it.variants&&it.variants.length;
  var price=sold?t.soldOut:has?it.variants.map(function(v){return L(v.label,lang)+" "+fmtPrice(v.price);}).join("   "):fmtPrice(it.price);
  var tags=(it.tags||[]).filter(function(k){return TAGS[k];}),al=(it.allergens||[]).filter(function(k){return ALLERGENS[k];});
  dlg.innerHTML=(it.photo?'<img class="sheet-photo" src="'+esc(it.photo)+'" alt="">':"")+'<div class="sheet-body"><div class="sheet-head"><h3 id="sheet-title">'+esc(L(it.name,lang))+'</h3><button type="button" class="sheet-close" data-act="sheet-close" aria-label="'+esc(t.close)+'">'+I.x+'</button></div>'+
  '<p class="sheet-price">'+esc(price)+'</p>'+(L(it.desc,lang)?'<p class="sheet-desc">'+esc(L(it.desc,lang))+'</p>':"")+
  (tags.length?'<div class="tags">'+tags.map(function(k){return'<span class="tag '+esc(k)+'">'+esc(TAGS[k][lang])+'</span>';}).join("")+'</div>':"")+
  '<h4>'+esc(t.allergens)+'</h4>'+(al.length?'<ul class="allergens">'+al.map(function(k){return"<li>"+esc(ALLERGENS[k][lang])+"</li>";}).join("")+"</ul>":'<p class="sheet-desc" style="margin:0">'+esc(t.noAllergens)+"</p>")+
  '<p class="fine">'+esc(t.allergy)+'</p></div>';
  if(typeof dlg.showModal==="function")dlg.showModal();else dlg.setAttribute("open","");
}
function closeSheet(){var d=$("#sheet");if(d.open){if(d.close)d.close();else d.removeAttribute("open");}}

/* ----- global events ----- */
document.addEventListener("click",function(e){
  var el=e.target.closest("[data-lang],[data-act],.item-btn,.chip");if(!el)return;
  if(el.closest("#admin"))return;
  if(el.hasAttribute("data-lang")){var nl=el.getAttribute("data-lang");if(nl!==lang){lang=nl;store("cg-lang",lang);var y=scrollY;renderAll();scrollTo(0,y);}return;}
  if(el.classList.contains("chip")){e.preventDefault();var sec=document.getElementById(el.getAttribute("href").slice(1));if(sec){sec.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});setActive(sec.id);}return;}
  if(el.classList.contains("item-btn")){openSheet(el.closest(".item").getAttribute("data-id"));return;}
  var a=el.getAttribute("data-act");
  if(a==="theme"){var nt=isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",nt);store("cg-theme",nt);paintThemeBtn();}
  else if(a==="search")openSearch();
  else if(a==="search-close")closeSearch();
  else if(a==="sheet-close")closeSheet();
  else if(a==="open-admin")openAdmin();
});
document.addEventListener("input",function(e){if(e.target.id==="q")runSearch(e.target.value);});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&e.target.id==="q")closeSearch();});
$("#sheet").addEventListener("click",function(e){if(e.target===this)closeSheet();});
if(window.matchMedia)matchMedia("(prefers-color-scheme: dark)").addEventListener("change",paintThemeBtn);
setInterval(fillStatus,60000);

/* ----- boot ----- */
if(lang!=="tr")renderAll();else{hydratePhotos();paintThemeBtn();fillStatus();markToday();spy();}

/* ================= Admin ================= */
var W=null,tab="menu",A=$("#admin"),modal=null,draftOffer=null,publishing=false;
var DRAFT_KEY="cg-draft";
var authed=false;
function api(path,opt){
  opt=opt||{};
  var init={method:opt.method||"GET",credentials:"same-origin",cache:"no-store",headers:opt.headers||{}};
  if(opt.body!==undefined){init.body=typeof opt.body==="string"?opt.body:JSON.stringify(opt.body);init.headers["Content-Type"]="application/json";}
  return fetch("/api/"+path,init).then(function(r){
    return r.text().then(function(txt){
      var data=null;try{data=txt?JSON.parse(txt):null;}catch(e){}
      if(!r.ok){var err=new Error((data&&data.error)||String(r.status));err.status=r.status;err.code=data&&data.error;err.data=data;throw err;}
      return data;
    });
  });
}
var lockTimer;
function renderLogin(){
  var t=T[lang];
  A.innerHTML='<div class="login"><div class="logo login-logo">'+LOGO+'</div>'+
  '<form class="login-card form" id="login-form" novalidate><h1>'+esc(t.adminTitle)+'</h1><p class="lead">'+esc(t.loginLead)+'</p>'+
  '<div class="field"><label for="lg-user">'+esc(t.username)+'</label><input id="lg-user" name="username" type="text" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false" required></div>'+
  '<div class="field"><label for="lg-pass">'+esc(t.password)+'</label><div class="pw"><input id="lg-pass" name="password" type="password" autocomplete="current-password" required><button type="button" class="tbtn" data-a="pw-toggle" aria-label="'+esc(t.show)+'" aria-pressed="false">'+I.eye+'</button></div></div>'+
  '<p class="err" id="lg-err" role="alert"></p><button type="submit" class="btn primary block" id="lg-btn">'+esc(t.signIn)+'</button><button type="button" class="btn ghost block" data-a="close">'+esc(t.back)+'</button></form></div>';
  paintLock();var u=$("#lg-user",A);if(u)u.focus();
}
function paintLock(){var btn=$("#lg-btn",A);if(btn)btn.disabled=false;}
function submitLogin(form){
  var t=T[lang],err=$("#lg-err",form),btn=$("#lg-btn",form),pw=$("#lg-pass",form);
  btn.disabled=true;btn.textContent=t.checking;err.textContent="";
  api("login",{method:"POST",body:{username:$("#lg-user",form).value,password:pw.value}}).then(function(){
    authed=true;pw.value="";openAdmin();
  },function(e){
    btn.disabled=false;btn.textContent=t.signIn;
    err.textContent=e.status===429?t.locked(Math.max(60,(e.data&&e.data.retryAfter)||900)):e.status===401?t.loginErr:t.failed;
    pw.value="";pw.focus();
  });
}
function uid(s){return(norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,24)||"item")+"-"+Math.random().toString(36).slice(2,6);}
function dirty(){return W&&JSON.stringify(W)!==JSON.stringify(D);}
function saveDraft(){if(!W)return;if(dirty())store(DRAFT_KEY,JSON.stringify({base:D.updatedAt||"",at:Date.now(),data:W}));else store(DRAFT_KEY,null);}
function changed(){saveDraft();paintSavebar();}
function catById(id){for(var i=0;i<W.categories.length;i++)if(W.categories[i].id===id)return W.categories[i];return null;}
function locate(id){for(var i=0;i<W.categories.length;i++){var c=W.categories[i];for(var j=0;j<c.items.length;j++)if(c.items[j].id===id)return{c:c,i:j,ci:i};}return null;}
function move(arr,i,d){var j=i+d;if(j<0||j>=arr.length)return;var x=arr[i];arr[i]=arr[j];arr[j]=x;}

function showAdminShell(){A.hidden=false;document.body.style.overflow="hidden";if(location.hash!=="#admin")history.replaceState(null,"","#admin");}
function openAdmin(){
  if(!authed){showAdminShell();renderLogin();
    api("session").then(function(r){if(r&&r.authed){authed=true;openAdmin();}},function(){});
    return;}
  if(!W){W=clone(D);var raw=store(DRAFT_KEY);if(raw){try{var dr=JSON.parse(raw);if(dr&&dr.data&&dr.data.categories&&JSON.stringify(dr.data)!==JSON.stringify(D)){if(dr.base===(D.updatedAt||""))W=dr.data;else draftOffer=dr;}}catch(e){}}}
  tab=sstore("cg-admin-tab")||tab;
  A.hidden=false;document.body.style.overflow="hidden";if(location.hash!=="#admin")history.replaceState(null,"","#admin");
  renderAdmin();var h=$("h1",A);if(h){h.tabIndex=-1;h.focus();}
}
function closeAdmin(){A.hidden=true;document.body.style.overflow="";if(location.hash==="#admin")history.replaceState(null,"",location.pathname+location.search);
  renderAll();}
window.addEventListener("hashchange",function(){if(location.hash==="#admin"&&A.hidden)openAdmin();});

function sw(checked,attrs,label){return'<label class="switch"><input type="checkbox" '+attrs+(checked?" checked":"")+' aria-label="'+esc(label)+'"><span></span></label>';}
function renderAdmin(){
  var t=T[lang],h='<div class="admin-top"><div class="admin-top-row"><h1>'+esc(t.adminTitle)+'</h1><button type="button" class="btn ghost" style="color:var(--on-brand);padding:0 10px" data-a="close">'+esc(t.back)+'</button><button type="button" class="icon-btn" data-a="logout" aria-label="'+esc(t.logout)+'" title="'+esc(t.logout)+'">'+I.out+'</button></div>'+
  '<div class="admin-tabs" role="tablist">'+["menu","info","data"].map(function(k){var lb={menu:t.tabMenu,info:t.tabInfo,data:t.tabData}[k];return'<button type="button" role="tab" data-a="tab" data-tab="'+k+'" aria-selected="'+(tab===k)+'">'+esc(lb)+'</button>';}).join("")+'</div></div><div class="admin-body">';
  if(draftOffer)h+='<div class="banner">'+esc(t.draftFound)+' <span class="admin-actions" style="margin:10px 0 0"><button type="button" class="btn gold" data-a="draft-restore">'+esc(t.restore)+'</button><button type="button" class="btn" data-a="draft-dismiss">'+esc(t.dismiss)+'</button></span></div>';
  if(tab==="menu")h+=adminMenu(t);else if(tab==="info")h+=adminInfo(t);else h+=adminData(t);
  h+='</div><div class="savebar" id="savebar" hidden><div class="savebar-in"><p><b>'+esc(t.unsaved)+'</b></p><button type="button" class="btn ghost" data-a="discard">'+esc(t.discard)+'</button><button type="button" class="btn primary" data-a="publish">'+esc(t.publish)+'</button></div></div>';
  var st=A.scrollTop;A.innerHTML=h;A.scrollTop=st;paintSavebar();
}
function paintSavebar(){var sb=$("#savebar",A);if(!sb)return;sb.hidden=!dirty();var pb=$('[data-a="publish"]',sb);if(pb){pb.disabled=publishing;pb.textContent=publishing?T[lang].publishing:T[lang].publish;}}

function adminMenu(t){
  var h="";
  if(W.estimatedPrices)h+='<div class="banner"><label style="display:flex;gap:10px;align-items:flex-start;cursor:pointer"><input type="checkbox" data-a="prices-ok" style="width:20px;height:20px;margin:1px 0 0;accent-color:var(--brand)"><span>'+esc(t.estimated)+' <strong>'+esc(t.confirmPrices)+'</strong></span></label></div>';
  W.categories.forEach(function(c,ci){
    h+='<section class="acat" data-cat="'+esc(c.id)+'"><div class="acat-head"><h2>'+esc(L(c.name,lang))+'</h2><span class="count">'+c.items.length+'</span><div class="tools">'+
    '<button type="button" class="tbtn" data-a="cat-up" aria-label="'+esc(t.moveUp)+'"'+(ci===0?" disabled":"")+'>'+I.up+'</button><button type="button" class="tbtn" data-a="cat-down" aria-label="'+esc(t.moveDown)+'"'+(ci===W.categories.length-1?" disabled":"")+'>'+I.down+'</button>'+
    '<button type="button" class="tbtn" data-a="cat-edit" aria-label="'+esc(t.editCat)+'">'+I.edit+'</button></div></div><div>';
    if(!c.items.length)h+='<p style="margin:0;padding:14px 16px;color:var(--muted);font-size:14.5px">'+esc(t.emptyCat)+'</p>';
    c.items.forEach(function(it){
      var has=it.variants&&it.variants.length,other=L(it.name,lang==="tr"?"en":"tr"),sub=L(it.desc,lang)||(other!==L(it.name,lang)?other:"");
      h+='<div class="aitem'+(it.available===false?" off":"")+'" data-item="'+esc(it.id)+'"><div class="nm"><b>'+esc(L(it.name,lang)||"—")+'</b><span>'+esc(sub)+'</span></div>'+
      (has?'<button type="button" class="btn" style="min-height:40px;padding:0 12px;font-size:14px" data-a="item-edit">'+esc(t.sizes(it.variants.length))+'</button>':'<input class="price-in" inputmode="decimal" data-a="price" value="'+esc(fmtNum(it.price))+'" aria-label="'+esc(t.fPrice+" "+L(it.name,lang))+'">')+
      '<div class="tools" style="align-items:center;gap:6px">'+sw(it.available!==false,'data-a="avail"',t.available+" "+L(it.name,lang))+'<button type="button" class="tbtn" data-a="item-edit" aria-label="'+esc(t.editItem)+'">'+I.edit+'</button></div></div>';
    });
    h+='</div><div class="acat-foot"><button type="button" class="btn ghost" data-a="item-add">'+I.plus+esc(t.addItem)+'</button></div></section>';
  });
  return h+'<button type="button" class="btn" data-a="cat-add">'+I.plus+esc(t.addCat)+'</button>';
}
function biField(label,key,obj,multi,hint){
  var inp=function(l){return multi?'<textarea data-f="'+key+"."+l+'" lang="'+l+'" rows="2">'+esc(obj&&obj[l]||"")+'</textarea>':'<input type="text" data-f="'+key+"."+l+'" lang="'+l+'" value="'+esc(obj&&obj[l]||"")+'">';};
  return'<div class="field"><span class="lbl">'+esc(label)+'</span><div class="pair"><div><span class="sub">Türkçe</span>'+inp("tr")+'</div><div><span class="sub">English</span>'+inp("en")+'</div></div>'+(hint?'<span class="hint">'+esc(hint)+'</span>':"")+'</div>';
}
function adminInfo(t){
  var f=W.info,h='<div class="info-card form"><h2>'+esc(t.business)+'</h2>'+
  '<div class="field"><label for="i-name">'+esc(t.bizName)+'</label><input id="i-name" type="text" data-i="name" value="'+esc(f.name)+'"></div>'+biField(t.tagline,"tagline",f.tagline,false)+
  '<div class="field"><label for="i-addr">'+esc(t.address)+'</label><input id="i-addr" type="text" data-i="address" value="'+esc(f.address)+'"></div>'+
  '<div class="field"><label for="i-phone">'+esc(t.phone)+'</label><input id="i-phone" type="tel" data-i="phone" value="'+esc(f.phone)+'"></div>'+
  '<div class="field"><label for="i-maps">'+esc(t.maps)+'</label><input id="i-maps" type="url" data-i="mapsUrl" value="'+esc(f.mapsUrl)+'"></div>'+
  '<div class="field"><label for="i-ig">'+esc(t.insta)+'</label><input id="i-ig" type="text" autocapitalize="off" data-i="instagram" value="'+esc(f.instagram)+'"><span class="hint">'+esc(t.instaHint)+'</span></div>'+
  '<div class="field"><label for="i-wifi">'+esc(t.wifiF)+'</label><input id="i-wifi" type="text" data-i="wifi" value="'+esc(f.wifi)+'"><span class="hint">'+esc(t.wifiHint)+'</span></div></div>';
  h+='<div class="info-card"><h2>'+esc(t.hoursF)+'</h2><div class="hours-edit">';
  for(var i=0;i<7;i++){var d=f.hours[i];h+='<div class="hr" data-day="'+i+'"><span>'+esc(DAYS[lang][i])+'</span><input type="time" data-h="0" value="'+esc(d?d[0]:"09:00")+'"'+(d?"":" disabled")+' aria-label="'+esc(DAYS[lang][i])+' open"><input type="time" data-h="1" value="'+esc(d?d[1]:"22:00")+'"'+(d?"":" disabled")+' aria-label="'+esc(DAYS[lang][i])+' close"><span class="checks"><label><input type="checkbox" data-h="closed"'+(d?"":" checked")+'>'+esc(t.closedF)+'</label></span></div>';}
  h+='</div></div><div class="info-card form"><h2>'+esc(t.annF)+'</h2>'+biField(t.annF,"announcement",f.announcement,true,t.annHint)+'</div>';
  h+='<form class="info-card form" id="pw-form" novalidate><h2>'+esc(t.creds)+'</h2><p class="hint" style="margin:-6px 0 0">'+esc(t.credsHint)+'</p>'+
  '<div class="field"><label for="pw-user">'+esc(t.newUser)+'</label><input id="pw-user" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" value="'+esc(D.adminUser||"cuginos")+'"></div>'+
  '<div class="field"><label for="pw-cur">'+esc(t.curPw)+'</label><input id="pw-cur" type="password" autocomplete="current-password"></div>'+
  '<div class="pair"><div class="field"><label for="pw-new">'+esc(t.newPw)+'</label><input id="pw-new" type="password" autocomplete="new-password" minlength="8"></div><div class="field"><label for="pw-new2">'+esc(t.newPw2)+'</label><input id="pw-new2" type="password" autocomplete="new-password"></div></div>'+
  '<p class="err" id="pw-err" role="alert"></p><div><button type="submit" class="btn">'+esc(t.updateCreds)+'</button></div></form>';
  return h;
}
function adminData(t){
  var items=0;W.categories.forEach(function(c){items+=c.items.length;});
  var kb=Math.round(new Blob([JSON.stringify(W)]).size/1024);
  return'<div class="info-card"><h2>'+esc(t.dataTitle)+'</h2><p style="margin:0;color:var(--muted)">'+esc(t.dataHint)+'</p><p style="margin:10px 0 0;font-size:14.5px">'+esc(t.stats(W.categories.length,items,kb))+'</p>'+
  '<div class="admin-actions"><button type="button" class="btn" data-a="export">'+esc(t.exportJson)+'</button><button type="button" class="btn" data-a="copy">'+esc(t.copyJson)+'</button></div><textarea id="json-out" class="sr" readonly></textarea></div>'+
  '<div class="info-card form"><h2>'+esc(t.importTitle)+'</h2><div class="field"><label for="json-in" class="sr">'+esc(t.importTitle)+'</label><textarea id="json-in" rows="6" spellcheck="false" style="font-size:13px"></textarea><span class="hint">'+esc(t.importHint)+'</span></div><div><button type="button" class="btn" data-a="import">'+esc(t.importBtn)+'</button></div></div>';
}

/* ----- admin modals ----- */
function openModal(title,body,foot,onClick){
  closeModal();var dlg=document.createElement("dialog");dlg.className="modal";dlg.setAttribute("aria-label",title);
  dlg.innerHTML='<div class="modal-head"><h3>'+esc(title)+'</h3><button type="button" class="tbtn" data-m="cancel" aria-label="'+esc(T[lang].close)+'">'+I.x+'</button></div><div class="modal-body">'+body+'</div><div class="modal-foot">'+foot+'</div>';
  A.appendChild(dlg);modal=dlg;
  dlg.addEventListener("click",function(e){if(e.target===dlg){closeModal();return;}var b=e.target.closest("[data-m]");if(!b)return;if(b.getAttribute("data-m")==="cancel"){closeModal();return;}onClick(b.getAttribute("data-m"),b,dlg);});
  dlg.addEventListener("close",function(){if(dlg.parentNode)dlg.parentNode.removeChild(dlg);if(modal===dlg)modal=null;});
  dlg.showModal();return dlg;
}
function closeModal(){if(modal){var m=modal;modal=null;if(m.open)m.close();if(m.parentNode)m.parentNode.removeChild(m);}}
function confirmBox(msg,label){return new Promise(function(res){var done=false;
  var dlg=openModal(msg,"",'<button type="button" class="btn" data-m="cancel">'+esc(T[lang].cancel)+'</button><button type="button" class="btn danger" data-m="ok">'+esc(label)+'</button>',function(k){if(k==="ok"){done=true;closeModal();res(true);}});
  $(".modal-body",dlg).remove();dlg.addEventListener("close",function(){if(!done)res(false);});});}

function tagChecks(sel,map,name){return'<div class="checks">'+Object.keys(map).map(function(k){return'<label><input type="checkbox" name="'+name+'" value="'+k+'"'+(sel.indexOf(k)>-1?" checked":"")+'>'+esc(map[k][lang])+'</label>';}).join("")+'</div>';}
function varRow(v){return'<div class="var-row"><input type="text" data-v="tr" value="'+esc(v&&v.label&&v.label.tr||"")+'" aria-label="'+esc(T[lang].sizeTr)+'" placeholder="Orta"><input type="text" data-v="en" value="'+esc(v&&v.label&&v.label.en||"")+'" aria-label="'+esc(T[lang].sizeEn)+'" placeholder="Medium"><input type="text" inputmode="decimal" data-v="price" value="'+esc(v?fmtNum(v.price):"")+'" aria-label="'+esc(T[lang].fPrice)+'" placeholder="₺"><button type="button" class="tbtn" data-m="var-del" aria-label="'+esc(T[lang].remove)+'">'+I.trash+'</button></div>';}
function parsePrice(s){s=String(s==null?"":s).trim().replace(/\s|₺/g,"");if(!s)return NaN;if(/,\d{1,2}$/.test(s))s=s.replace(/\./g,"").replace(",",".");else s=s.replace(/[.,](?=\d{3}\b)/g,"").replace(",",".");var n=Number(s);return n>=0?n:NaN;}

function readPhoto(file){return new Promise(function(res,rej){
  var fr=new FileReader();fr.onerror=rej;fr.onload=function(){var img=new Image();img.onerror=rej;img.onload=function(){
    var max=900,w=img.naturalWidth,h=img.naturalHeight,s=Math.min(1,max/Math.max(w,h));var cv=document.createElement("canvas");cv.width=Math.round(w*s);cv.height=Math.round(h*s);
    cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);var out=cv.toDataURL("image/webp",.76);if(out.indexOf("data:image/webp")!==0)out=cv.toDataURL("image/jpeg",.8);res(out);};img.src=fr.result;};fr.readAsDataURL(file);});}

function itemModal(catId,itemId){
  var t=T[lang],loc=itemId?locate(itemId):null,isNew=!loc,cat=isNew?catById(catId):loc.c;
  var it=isNew?{id:"",name:{tr:"",en:""},desc:{tr:"",en:""},price:"",tags:[],allergens:[],available:true,photo:""}:clone(loc.c.items[loc.i]);
  var photo=it.photo||"";
  function photoHtml(){return(photo?'<img src="'+esc(photo)+'" alt="">':'<div class="ph" aria-hidden="true"></div>')+'<div class="admin-actions" style="margin:0"><label class="btn" style="cursor:pointer">'+esc(photo?t.changePhoto:t.choosePhoto)+'<input type="file" accept="image/*" data-photo-in class="sr"></label>'+(photo?'<button type="button" class="btn ghost" data-m="photo-del">'+esc(t.removePhoto)+'</button>':"")+'</div>';}
  var body='<div class="form">'+biField(t.fName,"name",it.name,false)+biField(t.fDesc,"desc",it.desc,true)+
  '<div class="field"><label for="m-price">'+esc(t.fPrice)+'</label><input id="m-price" type="text" inputmode="decimal" data-f="price" value="'+esc(it.price===""?"":fmtNum(it.price))+'" style="max-width:160px"></div>'+
  '<div class="field"><span class="lbl">'+esc(t.fSizes)+'</span><div id="vars" style="display:grid;gap:6px">'+(it.variants||[]).map(varRow).join("")+'</div><div><button type="button" class="btn ghost" data-m="var-add">'+I.plus+esc(t.addSize)+'</button></div><span class="hint">'+esc(t.fSizesHint)+'</span></div>'+
  '<div class="field"><label for="m-cat">'+esc(t.fCat)+'</label><select id="m-cat">'+W.categories.map(function(c){return'<option value="'+esc(c.id)+'"'+(c.id===cat.id?" selected":"")+'>'+esc(L(c.name,lang))+'</option>';}).join("")+'</select></div>'+
  '<div class="field" style="grid-template-columns:1fr auto;align-items:center"><span class="lbl">'+esc(t.available)+'</span>'+sw(it.available!==false,'id="m-avail"',t.available)+'</div>'+
  '<div class="field"><span class="lbl">'+esc(t.fPhoto)+'</span><div class="photo-edit" id="m-photo">'+photoHtml()+'</div></div>'+
  '<div class="field"><span class="lbl">'+esc(t.fTags)+'</span>'+tagChecks(it.tags||[],TAGS,"tags")+'</div>'+
  '<div class="field"><span class="lbl">'+esc(t.fAllergens)+'</span>'+tagChecks(it.allergens||[],ALLERGENS,"al")+'</div>'+
  (isNew?"":'<div class="field"><span class="lbl">'+esc(t.position)+'</span><div class="admin-actions" style="margin:0"><button type="button" class="btn" data-m="up"'+(loc.i===0?" disabled":"")+'>'+I.up+esc(t.moveUp)+'</button><button type="button" class="btn" data-m="down"'+(loc.i===loc.c.items.length-1?" disabled":"")+'>'+I.down+esc(t.moveDown)+'</button></div></div>')+
  '<p class="hint" id="m-err" role="alert" style="color:var(--closed);margin:0;font-weight:600"></p></div>';
  var foot=(isNew?"":'<button type="button" class="btn danger" data-m="delete">'+I.trash+esc(t.del)+'</button>')+'<span class="spacer"></span><button type="button" class="btn" data-m="cancel">'+esc(t.cancel)+'</button><button type="button" class="btn primary" data-m="save">'+esc(t.done)+'</button>';
  var dlg=openModal(isNew?t.newItem:t.editItem,body,foot,function(k,b,dlg){
    if(k==="var-add"){$("#vars",dlg).insertAdjacentHTML("beforeend",varRow(null));$("#vars .var-row:last-child input",dlg).focus();}
    else if(k==="var-del"){b.closest(".var-row").remove();}
    else if(k==="photo-del"){photo="";$("#m-photo",dlg).innerHTML=photoHtml();}
    else if(k==="up"||k==="down"){var l=locate(it.id);move(l.c.items,l.i,k==="up"?-1:1);changed();closeModal();renderAdmin();itemModal(null,it.id);}
    else if(k==="delete"){var nm=L(it.name,lang);confirmBox(t.confirmDelItem(nm),t.del).then(function(ok){if(!ok)return;var l=locate(it.id);if(l){l.c.items.splice(l.i,1);changed();renderAdmin();}});}
    else if(k==="save"){
      var err=$("#m-err",dlg),g=function(s){var e=$('[data-f="'+s+'"]',dlg);return e?e.value.trim():"";};
      var nt={tr:g("name.tr"),en:g("name.en")};if(!nt.tr&&!nt.en){err.textContent=t.errName;$('[data-f="name.tr"]',dlg).focus();return;}
      var vars=[],bad=false;$$("#vars .var-row",dlg).forEach(function(r){var tr=$('[data-v="tr"]',r).value.trim(),en=$('[data-v="en"]',r).value.trim(),p=parsePrice($('[data-v="price"]',r).value);if(!tr&&!en&&isNaN(p))return;if((!tr&&!en)||isNaN(p))bad=true;vars.push({label:{tr:tr||en,en:en||tr},price:p});});
      if(bad){err.textContent=t.errSize;return;}
      var price=parsePrice(g("price"));if(!vars.length&&isNaN(price)){err.textContent=t.errPrice;$("#m-price",dlg).focus();return;}
      var out={id:it.id||uid(nt.tr||nt.en),name:nt,desc:{tr:g("desc.tr"),en:g("desc.en")},price:isNaN(price)?vars[0].price:price,
        tags:$$('input[name="tags"]:checked',dlg).map(function(x){return x.value;}),allergens:$$('input[name="al"]:checked',dlg).map(function(x){return x.value;}),
        available:$("#m-avail",dlg).checked,photo:photo};
      if(vars.length)out.variants=vars;
      var target=catById($("#m-cat",dlg).value)||cat,l=locate(out.id);
      if(l){if(l.c===target)l.c.items[l.i]=out;else{l.c.items.splice(l.i,1);target.items.push(out);}}else target.items.push(out);
      changed();closeModal();renderAdmin();
    }
  });
  dlg.addEventListener("change",function(e){if(!e.target.hasAttribute("data-photo-in"))return;var f=e.target.files&&e.target.files[0];if(!f)return;
    readPhoto(f).then(function(p){photo=p;$("#m-photo",dlg).innerHTML=photoHtml();}).catch(function(){toast(t.photoFail);});});
  var first=$('[data-f="name.'+lang+'"]',dlg);if(first&&isNew)first.focus();
}
function catModal(catId){
  var t=T[lang],c=catId?catById(catId):null,isNew=!c,cur=c||{name:{tr:"",en:""},note:{tr:"",en:""},items:[]};
  var body='<div class="form">'+biField(t.fName,"name",cur.name,false)+biField(t.fNote,"note",cur.note,true,t.fNoteHint)+'<p class="hint" id="m-err" role="alert" style="color:var(--closed);margin:0;font-weight:600"></p></div>';
  var foot=(isNew?"":'<button type="button" class="btn danger" data-m="delete">'+I.trash+esc(t.del)+'</button>')+'<span class="spacer"></span><button type="button" class="btn" data-m="cancel">'+esc(t.cancel)+'</button><button type="button" class="btn primary" data-m="save">'+esc(t.done)+'</button>';
  openModal(isNew?t.newCat:t.editCat,body,foot,function(k,b,dlg){
    if(k==="delete"){confirmBox(t.confirmDelCat(L(c.name,lang),c.items.length),t.del).then(function(ok){if(!ok)return;W.categories=W.categories.filter(function(x){return x!==c;});changed();renderAdmin();});}
    else if(k==="save"){var g=function(s){return $('[data-f="'+s+'"]',dlg).value.trim();};var nm={tr:g("name.tr"),en:g("name.en")};
      if(!nm.tr&&!nm.en){$("#m-err",dlg).textContent=t.errName;return;}nm.tr=nm.tr||nm.en;nm.en=nm.en||nm.tr;
      var note={tr:g("note.tr"),en:g("note.en")};
      if(isNew)W.categories.push({id:uid(nm.tr),name:nm,note:note,items:[]});else{c.name=nm;c.note=note;}
      changed();closeModal();renderAdmin();}
  });
}

/* ----- publish ----- */
function publish(){
  if(publishing||!dirty())return;var t=T[lang];
  publishing=true;paintSavebar();saveDraft();
  var next=clone(W);delete next.site;
  api("menu",{method:"PUT",body:next,headers:D.updatedAt?{"If-Match":D.updatedAt}:{}}).then(function(res){
    D=next;D.updatedAt=res.updatedAt;D.version=res.version;W=clone(D);
    store(DRAFT_KEY,null);publishing=false;renderAdmin();toast(t.publishedGh,5000);
  },function(e){
    publishing=false;
    if(e.status===409)toast(t.conflict,9000);
    else if(e.status===401){authed=false;renderLogin();toast(t.sessionOut,7000);return;}
    else if(e.status===413)toast(t.tooLarge,6000);
    else if(e.status===429)toast(t.rateLimited,6000);
    else if(e.status===undefined)toast(t.offline,6000);
    else toast(t.failed,6000);
    paintSavebar();
  });
}
A.addEventListener("click",function(e){
  if(e.target.closest("dialog"))return;
  var b=e.target.closest("[data-a]");if(!b)return;var a=b.getAttribute("data-a"),t=T[lang];
  var catEl=b.closest("[data-cat]"),itemEl=b.closest("[data-item]"),cid=catEl&&catEl.getAttribute("data-cat");
  switch(a){
    case"close":closeAdmin();break;
    case"logout":api("logout",{method:"POST"}).catch(function(){});authed=false;closeModal();W=null;draftOffer=null;closeAdmin();break;
    case"pw-toggle":var pin=$("#lg-pass",A),show=pin.type==="password";pin.type=show?"text":"password";b.setAttribute("aria-pressed",String(show));b.setAttribute("aria-label",show?t.hide:t.show);pin.focus();break;
    case"tab":tab=b.getAttribute("data-tab");sstore("cg-admin-tab",tab);renderAdmin();A.scrollTop=0;break;
    case"cat-up":case"cat-down":var i=W.categories.indexOf(catById(cid));move(W.categories,i,a==="cat-up"?-1:1);changed();renderAdmin();break;
    case"cat-edit":catModal(cid);break;
    case"cat-add":catModal(null);break;
    case"item-add":itemModal(cid,null);break;
    case"item-edit":itemModal(cid,itemEl.getAttribute("data-item"));break;
    case"discard":confirmBox(t.confirmDiscard,t.discard).then(function(ok){if(!ok)return;W=clone(D);store(DRAFT_KEY,null);renderAdmin();});break;
    case"publish":publish();break;
    case"draft-restore":W=draftOffer.data;draftOffer=null;changed();renderAdmin();break;
    case"draft-dismiss":draftOffer=null;if(!dirty())store(DRAFT_KEY,null);else saveDraft();renderAdmin();break;
    case"export":var blob=new Blob([JSON.stringify(W,null,2)],{type:"application/json"}),ln=document.createElement("a");ln.href=URL.createObjectURL(blob);ln.download="cuginos-menu-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(ln);ln.click();setTimeout(function(){URL.revokeObjectURL(ln.href);ln.remove();},1500);break;
    case"copy":var txt=JSON.stringify(W,null,2),ta=$("#json-out",A);
      var fallback=function(){ta.className="";ta.value=txt;ta.style.cssText="width:100%;min-height:160px;margin-top:10px;font-size:12px";ta.select();toast(t.copyFail,5000);};
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(function(){toast(t.copied);},fallback);else fallback();break;
    case"import":try{var o=JSON.parse($("#json-in",A).value);if(!o||!Array.isArray(o.categories)||!o.info||!Array.isArray(o.info.hours))throw 0;
      o.categories.forEach(function(c){if(!c.id||!c.name||!Array.isArray(c.items))throw 0;c.items.forEach(function(it){if(!it.id||!it.name)throw 0;});});
      delete o.auth;delete o.github;W=o;changed();tab="menu";renderAdmin();toast(t.imported);}catch(err){toast(t.importBad,5000);}break;
  }
});
A.addEventListener("change",function(e){
  var el=e.target,a=el.getAttribute("data-a"),itemEl=el.closest("[data-item]");
  if(a==="avail"){var l=locate(itemEl.getAttribute("data-item"));l.c.items[l.i].available=el.checked;itemEl.classList.toggle("off",!el.checked);changed();}
  else if(a==="price"){var l2=locate(itemEl.getAttribute("data-item")),p=parsePrice(el.value);if(isNaN(p)){el.value=fmtNum(l2.c.items[l2.i].price);toast(T[lang].errPrice);return;}l2.c.items[l2.i].price=p;el.value=fmtNum(p);changed();}
  else if(a==="prices-ok"){W.estimatedPrices=!el.checked;changed();renderAdmin();}
  else if(el.hasAttribute("data-i")){W.info[el.getAttribute("data-i")]=el.value.trim();changed();}
  else if(el.hasAttribute("data-f")&&el.closest(".info-card")){var p2=el.getAttribute("data-f").split(".");W.info[p2[0]]=W.info[p2[0]]||{tr:"",en:""};W.info[p2[0]][p2[1]]=el.value.trim();changed();}
  else if(el.hasAttribute("data-h")){var row=el.closest("[data-day]"),di=+row.getAttribute("data-day"),cl=$('[data-h="closed"]',row),o=$('[data-h="0"]',row),c=$('[data-h="1"]',row);
    o.disabled=c.disabled=cl.checked;W.info.hours[di]=cl.checked?null:[o.value||"09:00",c.value||"22:00"];changed();}
});
A.addEventListener("submit",function(e){
  e.preventDefault();var f=e.target,t=T[lang];
  if(f.id==="login-form"){submitLogin(f);return;}
  if(f.id==="pw-form"){
    var err=$("#pw-err",f),user=$("#pw-user",f).value.trim(),cur=$("#pw-cur",f).value,n1=$("#pw-new",f).value,n2=$("#pw-new2",f).value;
    if(!user){err.textContent=t.errUser;return;}
    if(n1.length<10){err.textContent=t.errShort;return;}
    if(n1!==n2){err.textContent=t.errMatch;return;}
    err.textContent=t.checking;err.classList.add("busy");
    api("password",{method:"POST",body:{currentUser:user,current:cur,user:user,next:n1}}).then(function(){
      $("#pw-cur",f).value="";$("#pw-new",f).value="";$("#pw-new2",f).value="";
      err.textContent="";err.classList.remove("busy");toast(t.credsUpdated,6000);
    },function(e){
      err.classList.remove("busy");err.textContent=e.status===401?t.errCur:e.status===400?t.errShort:t.failed;
      $("#pw-cur",f).focus();
    });
  }
});
A.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.getAttribute("data-a")==="price")e.target.blur();});

if(location.hash==="#admin")openAdmin();
})();
