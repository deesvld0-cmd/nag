Add-Type -AssemblyName System.Drawing

$outDir = 'C:\Users\nagi\Downloads\New folder\restored'
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

function Save-Jpeg {
    param(
        [System.Drawing.Bitmap]$Bitmap,
        [string]$Path,
        [int]$Quality = 95
    )
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$Quality)
    $Bitmap.Save($Path, $codec, $encParams)
    $encParams.Dispose()
}

function Enhance-Image {
    param([System.Drawing.Bitmap]$Source)

    $w = $Source.Width
    $h = $Source.Height
    $dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)

    $g = [System.Drawing.Graphics]::FromImage($dst)
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $contrast = [single]1.08
    $lift = [single]0.015
    $t = [single]((1 - $contrast) / 2 + $lift)

    $cm = New-Object System.Drawing.Imaging.ColorMatrix
    $cm.Matrix00 = $contrast
    $cm.Matrix11 = $contrast
    $cm.Matrix22 = $contrast
    $cm.Matrix33 = [single]1
    $cm.Matrix44 = [single]1
    $cm.Matrix40 = $t
    $cm.Matrix41 = $t
    $cm.Matrix42 = $t
    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $ia.SetColorMatrix($cm)

    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($Source, $rect, 0, 0, $w, $h, [System.Drawing.GraphicsUnit]::Pixel, $ia)

    $ia.Dispose()
    $g.Dispose()
    return $dst
}

function Add-Trainer-Overlay {
    param(
        [System.Drawing.Bitmap]$Bitmap,
        [string]$TrainerName
    )

    $g = [System.Drawing.Graphics]::FromImage($Bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $overlayHeight = [int]([Math]::Max(170, $Bitmap.Height * 0.17))
    $overlayY = $Bitmap.Height - $overlayHeight
    $rect = New-Object System.Drawing.Rectangle(0, $overlayY, $Bitmap.Width, $overlayHeight)

    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.Color]::FromArgb(235, 0, 0, 0),
        [System.Drawing.Color]::FromArgb(100, 0, 0, 0),
        90
    )
    $g.FillRectangle($brush, $rect)

    $nameSize = [Math]::Max(42, [int]($Bitmap.Width * 0.055))
    $subSize = [Math]::Max(20, [int]($Bitmap.Width * 0.028))
    $nameFont = New-Object System.Drawing.Font('Arial', $nameSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $subFont = New-Object System.Drawing.Font('Arial', $subSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

    $padX = [int]($Bitmap.Width * 0.04)
    $nameY = $overlayY + [int]($overlayHeight * 0.18)
    $subY = $overlayY + [int]($overlayHeight * 0.62)

    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 0, 0, 0))
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 210, 230, 255))

    $upper = $TrainerName.ToUpperInvariant()
    $g.DrawString($upper, $nameFont, $shadowBrush, $padX + 2, $nameY + 2)
    $g.DrawString($upper, $nameFont, $whiteBrush, $padX, $nameY)
    $g.DrawString('TRAINER', $subFont, $accentBrush, $padX, $subY)

    $accentPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(160, 80, 200, 255), [single]([Math]::Max(3, $Bitmap.Width * 0.004)))
    $g.DrawLine($accentPen, $padX, $subY - 10, $padX + [int]($Bitmap.Width * 0.22), $subY - 10)

    $accentPen.Dispose()
    $shadowBrush.Dispose()
    $whiteBrush.Dispose()
    $accentBrush.Dispose()
    $nameFont.Dispose()
    $subFont.Dispose()
    $brush.Dispose()
    $g.Dispose()
}

$items = @(
    @{ Path = 'C:\Users\nagi\Downloads\628548363_883851134274905_3373738491940827916_n.jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\634089249_883852740941411_3091512875647220794_n.jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\633884283_883850964274922_6752759694367470736_n.jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\634097032_883854757607876_5083010141514054215_n (1).jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\629346309_883852690941416_5014494084283846199_n (1).jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\632929103_883852640941421_7803982307652325876_n (1).jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\634405839_883850927608259_2824634583163996145_n.jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\632535347_883851107608241_6314960143157603558_n.jpg'; Trainer = $null },
    @{ Path = 'C:\Users\nagi\Downloads\photo_2026-05-10_19-40-30.jpg'; Trainer = 'Ochirerdene' },
    @{ Path = 'C:\Users\nagi\Downloads\688897558_1487005043436278_8647903402816109950_n.jpg'; Trainer = 'Boloerdene' },
    @{ Path = 'C:\Users\nagi\Downloads\463107881_2588657667991145_2812272180236696609_n (1).jpg'; Trainer = 'Amarbat' }
)

foreach ($item in $items) {
    $inPath = $item.Path
    $trainer = $item.Trainer

    if (-not (Test-Path -LiteralPath $inPath)) {
        Write-Warning "Missing: $inPath"
        continue
    }

    $src = New-Object System.Drawing.Bitmap($inPath)
    $enhanced = Enhance-Image -Source $src
    $src.Dispose()

    if ($null -ne $trainer) {
        Add-Trainer-Overlay -Bitmap $enhanced -TrainerName $trainer
    }

    $base = [System.IO.Path]::GetFileNameWithoutExtension($inPath)
    if ($null -ne $trainer) {
        $outName = "trainer_${trainer}_restored.jpg"
    } else {
        $outName = "${base}_restored.jpg"
    }
    $outPath = Join-Path $outDir $outName

    Save-Jpeg -Bitmap $enhanced -Path $outPath -Quality 95
    $enhanced.Dispose()
    Write-Output "DONE`t$outPath"
}
