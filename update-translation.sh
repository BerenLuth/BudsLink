#!/bin/bash
set -e

APP_ID="io.github.maniacx.BudsLink"

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PO_DIR="$ROOT_DIR/po"
POT_FILE="$PO_DIR/${APP_ID}.pot"

cd "$ROOT_DIR"

LINGUAS_FILE="$PO_DIR/LINGUAS"
ls "$PO_DIR"/*.po \
    | xargs -n1 basename \
    | sed 's/\.po$//' \
    | sort -u \
    > "$LINGUAS_FILE"

echo "Generated $LINGUAS_FILE:"
cat "$LINGUAS_FILE"

ALL_FILES=$(find src -type f -name '*.js')

xgettext \
    --language=JavaScript \
    --add-comments="TRANSLATORS:" \
    --from-code=UTF-8 \
    --copyright-holder="maniacx@github.com" \
    --package-name="BudsLink" \
    --output="$POT_FILE" \
    $ALL_FILES

for file in "$PO_DIR"/*.po; do
    lang=$(basename "$file" .po)
    echo "Updating $lang"

    msgmerge --backup=off --update --no-fuzzy-matching "$file" "$POT_FILE"
done


