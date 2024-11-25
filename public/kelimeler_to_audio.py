import pandas as pd
import json
import os
from gtts import gTTS

# Excel dosyasının yolunu belirtin
file_path = r"C:\Users\ziyao\Desktop\Coding Projects\wordcardarabıc\public\ortakkelimeler_yedek.xlsx"

# Excel dosyasını oku
excel_data = pd.read_excel(file_path)

# Verileri kontrol etmek için ekrana yazdır
print(excel_data.head())

# Verileri JSON formatına dönüştürme
output_json_path = r"C:\Users\ziyao\Desktop\Coding Projects\wordcardarabıc\public\kelimeler.json"

kelimeler = {}

# Excel verilerini JSON formatına dönüştür
for index, row in excel_data.iterrows():
    arabic_word = row['arabic_word']
    turkish_meaning = row['turkish_meaning']
    kelime_cinsi = row['kelime_cinsi']
    kelimeler[arabic_word] = {
        'turkish_meaning': turkish_meaning,
        'kelime_cinsi': kelime_cinsi
    }

# JSON verisini dosyaya kaydet
with open(output_json_path, 'w', encoding='utf-8') as f:
    json.dump(kelimeler, f, ensure_ascii=False, indent=4)

print(f"JSON dosyası oluşturuldu: {output_json_path}")

# Ses dosyalarını kaydedeceğimiz dizin
audio_output_dir = r"C:\Users\ziyao\Desktop\Coding Projects\wordcardarabıc\public\ses_dosyaları"

# Ses dosyasını kaydetme fonksiyonu
def save_tts(text, file_name, format='mp3', language='ar', output_dir=audio_output_dir):
    myobj = gTTS(text=text, lang=language, slow=False)
    
    # Çıkış dizini yoksa oluştur
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Ses dosyasını kaydet
    myobj.save(f"{output_dir}/{file_name}.{format}")

# Arapça kelimeleri ses dosyasına kaydet
for word, details in kelimeler.items():
    print(f"Processing {word}")
    save_tts(word, file_name=word, output_dir=f"{audio_output_dir}/{word}")

print("Tüm ses dosyaları oluşturuldu.")
