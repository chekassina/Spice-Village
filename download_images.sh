#!/bin/bash
mkdir -p public/images

# Copy the generated logo to public/logo.png
if [ -f "src/assets/images/spice_logo_1784484984532.jpg" ]; then
  cp "src/assets/images/spice_logo_1784484984532.jpg" "public/logo.png"
  echo "Copied generated logo to public/logo.png"
else
  # If for some reason the specific timestamp differed, find any spice_logo and copy it
  find src/assets/images/ -name "spice_logo*.jpg" -exec cp {} public/logo.png \;
  echo "Copied found logo to public/logo.png"
fi

# Define Unsplash IDs for 20 vibrant, authentic Zanzibar/African/Spice/Cooking photos
IMAGES=(
  "photo-1596040033229-a9821ebd058d" # ra1.jpg: Spices market hero
  "photo-1509358271058-acd22cc93898" # ra2.jpg: Cloves close-up
  "photo-1513530534585-c7b1394c6d51" # ra3.jpg: Cinnamon/star anise
  "photo-1509099836639-18ba1795216d" # ra4.jpg: African village welcoming scene
  "photo-1544924405-b1ea827fc1f1" # ra5.jpg: Traditional artisan / African village
  "photo-1488521787991-ed7bbaae773c" # ra6.jpg: African school children smiling
  "photo-1595974482597-4b8da8879bc5" # ra7.jpg: Village organic farm / field
  "photo-1556910103-1c02745aae4d" # ra8.jpg: Fresh ingredients on table
  "photo-1547592180-85f173990554" # ra9.jpg: Hands cooking in clay pot
  "photo-1512058564366-18510be2db19" # ra10.jpg: Traditional spiced rice pilau/biryani
  "photo-1502082553048-f009c37129b9" # ra11.jpg: Lush green spice farm trail
  "photo-1563720223185-11003d516935" # ra12.jpg: Stone Town Zanzibar alley
  "photo-1606787366850-de6330128bfc" # ra13.jpg: Cooking school group
  "photo-1483683804023-6ccdb62f86ef" # ra14.jpg: Zanzibar beautiful ocean turquoise
  "photo-1507525428034-b723cf961d3e" # ra15.jpg: Zanzibar sunset palms
  "photo-1516450360452-9312f5e86fc7" # ra16.jpg: Traditional African drumming/dance
  "photo-1531123897727-8f129e1688ce" # ra17.jpg: Smiling local African guide
  "photo-1615485290382-441e4d049cb5" # ra18.jpg: Cardamom close-up
  "photo-1615485500704-8e990f9900f7" # ra19.jpg: Ginger and turmeric roots
  "photo-1533285907943-75b6329437b8" # ra20.jpg: Basket of vanilla and nutmeg
)

for i in "${!IMAGES[@]}"; do
  NUM=$((i+1))
  ID="${IMAGES[$i]}"
  echo "Downloading ra${NUM}.jpg (ID: ${ID})..."
  curl -s "https://images.unsplash.com/${ID}?auto=format&fit=crop&w=800&h=600&q=85" -o "public/images/ra${NUM}.jpg"
done

echo "All images downloaded successfully."
