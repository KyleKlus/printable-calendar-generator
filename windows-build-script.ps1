$build_path = "./dist"
$src_path = "./src"
$index_path = "/index.html"
$style_path = "/style.css"
$media_path = "/media/*"

if (-not(Test-Path $build_path -PathType Container)) {
    New-Item -Path $build_path -ItemType Directory
}

Copy-Item ($src_path + $media_path) ($build_path) -Force
Copy-Item ($src_path + $index_path) ($build_path + $index_path) -Force
Copy-Item ($src_path + $style_path) ($build_path + $style_path) -Force