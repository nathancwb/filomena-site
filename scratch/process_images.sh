#!/bin/bash
PORTFOLIO_DIR="/Volumes/TRAFEGO/MATERIAIS SITE/Portfólio"
DEST_DIR="/Users/nathanalmeida/.gemini/antigravity/scratch/3_frameworks_modernos/filomena-site-astro/public/assets/images/portfolio"

cp "$PORTFOLIO_DIR/Lupetec_caderno+filomena.png" "$DEST_DIR/lupetec-caderno.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/Mockup Folder 1.png" "$DEST_DIR/masotti-folder.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/Mockup-Cartão-Visita.png" "$DEST_DIR/masotti-card.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/mockup-pasta-institucional.png" "$DEST_DIR/masotti-pasta.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/Mockup_Convite.png" "$DEST_DIR/peopleleap-convite.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/adesivo-representante.png" "$DEST_DIR/iseg-adesivo.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/mockup-adesivo-showroom-latina.png" "$DEST_DIR/latina-adesivo.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/mockup-totem-latina-atualizado.png" "$DEST_DIR/latina-totem.jpg" 2>/dev/null || true
cp "$PORTFOLIO_DIR/voucher-cores.png" "$DEST_DIR/vital-voucher.jpg" 2>/dev/null || true

# We need to extract the PDF for Neonova and Tudo Natal
sips -s format jpeg "$PORTFOLIO_DIR/Neonova-uniforme-variacoes.pdf" --out "$DEST_DIR/neonova-uniforme.jpg"
sips -s format jpeg "$PORTFOLIO_DIR/Tudo-Natal_Uniforme-Social.pdf" --out "$DEST_DIR/tudonatal-uniforme.jpg"

