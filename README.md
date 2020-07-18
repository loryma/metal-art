build with:

```sh
npm run build
```

resize images with image magick

```sh
convert *.jpg -resize 30%x30% -set filename:base "%[base]" "thumb_%[filename:base].jpg""
```

convert images to webp with imagmin-cli and imagemin-webp plugin

```sh
imagemin thumb_*.jpg --plugin.webp.quality=100 > thumb_*.webp --out-dir=build
```

```sh
# this optimizes image with Imagemagik - put script in bashrc and do - source ~/.bashrc
# example usage
# arguments example inputfile.png 300 outputdir/ where '400x300> is image size
# https://imagemagick.org/script/command-line-options.php#resize
smartresize() {
  mogrify -path $3 -filter Triangle -define filter:support=2 -thumbnail $2 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB $1
}
```

```sh
mogrify -filter Triangle -define filter:support=2 -thumbnail '400x300>' -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB 'thumb_*.jpg'
```
