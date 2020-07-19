build with:

```sh
npm run build
```

convert images to webp with imagmin-cli and imagemin-webp plugin

```sh
imagemin thumb_*.jpg --plugin.webp.quality=100 > thumb_*.webp --out-dir=build
```

```sh
# this optimizes image with Imagemagik - put script in bashrc and do - source ~/.bashrc
# example usage
# arguments example 
# '*.jpg' '400x300>' build/ where '400x300> is image size
# https://imagemagick.org/script/command-line-options.php#resize
smartresize() {
  mogrify -path $3 -filter Triangle -define filter:support=2 -thumbnail $2 -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB $1
}
```

```sh
mogrify -filter Triangle -define filter:support=2 -thumbnail '400x300>' -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB 'thumb_*.jpg'
```

```sh
mogrify -unsharp 0.25x0.25+8+0.065 -resize '400x300>' -normalize -density 180 thumb_*.jpg
```

```sh
#minimize
# npm install imagemin-gifsicle@6.0.0 https://github.com/imagemin/imagemin-gifsicle/issues/40
imagemin images/* --out-dir=build
```

```sh
# resize images with image magick
convert *.jpg -resize '400x300>' -set filename:base "%[base]" "thumb_%[filename:base].jpg"
```

```sh
# cwebp to convert to webp https://developers.google.com/speed/webp/docs/compiling#building
```

```sh
cjpeg -quality 70 -outfile compressed-image.jpg 2.jpg
for i in *.jpg ; do  cjpeg -quality 90 -outfile "build/$i" "$i"; done
```