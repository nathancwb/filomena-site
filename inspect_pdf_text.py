def search_keywords(pdf_path):
    print(f"Lendo: {pdf_path}")
    try:
        with open(pdf_path, 'rb') as f:
            content = f.read().lower()
            found = []
            for kw in [b'dubelato', b'boali', b'siltomac', b'latina', b'masotti', b'neonova', b'tudo natal', b'iseg', b'petrus']:
                if kw in content:
                    found.append(kw.decode('utf-8'))
            print(f"Palavras-chave encontradas: {found}")
    except Exception as e:
        print(f"Erro: {e}")

search_keywords("/Volumes/DESIGN/Clientes/Dubelato/Offline/Outdoor de Inauguração/Impressão/Dubelato_Outdoor-de-Inauguração_Filomena.pdf")
search_keywords("/Volumes/DESIGN/Clientes/Dubelato/Offline/Outdoor de Inauguração - Esquina/Impressão/Dubelato_Outdoor-de-Inauguração-Esquina_Filomena.pdf")
search_keywords("/Volumes/TRAFEGO/MATERIAIS SITE/Portfólio/Mockup - Outdoor 1.png") # Wait, this is a PNG
