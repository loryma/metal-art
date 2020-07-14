build with:

```sh
npm run build
```

resize images with image magick

```sh
convert *.jpg -resize 30%x30% -set filename:base "%[base]" "thumb_%[filename:base].jpg""
```

convert images to webp with imagmin and imagemin-webp plugin

```sh
imagemin thumb_*.jpg --plugin.webp.quality=100 > thumb_*.webp --out-dir=build
```
