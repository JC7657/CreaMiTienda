Import-Module WinSCP

# Variables
$ftpUser = "deployer@hallyustars.cl"
$ftpPassword = "*Th18061998"
$ftpServer = "201.148.105.199"
$ftpPort = "21"
$ftpRemotePath = "/"
$source = "package.json", "dist"
$zipName = "app.zip"
$zipPath = "C:\Users\thoma\Desktop\entorno-hallyu-stars\hallyu-stars-pwa\app.zip"

# Comprimir carpeta dist y archivo package.js
Write-Host "1. Creando $zipName"
Compress-Archive -Path $source -DestinationPath $zipName -Force

# Cargar el archivo .zip al servidor FTP
Write-Host "2. Subiendo $zipName al servidor FTP"

# Configurar la sesión FTP
$sessionOptions = New-Object WinSCP.SessionOptions -Property @{
    Protocol = [WinSCP.Protocol]::Ftp
    HostName = $ftpServer
    UserName = $ftpUser
    Password = $ftpPassword
    FtpMode = [WinSCP.FtpMode]::Passive
    PortNumber = $ftpPort
}

# Iniciar la sesión y subir el archivo
$session = New-Object WinSCP.Session
try {
    $session.Open($sessionOptions)
    $transferOptions = New-Object WinSCP.TransferOptions
    $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
    $transferResult = $session.PutFiles($zipPath, $ftpRemotePath + '/' + $zipName, $False, $transferOptions)
    # Verificar si la transferencia fue exitosa
    $transferResult.Check()
    Write-Host "Subida completada"
} finally {
    $session.Dispose()
}

# Eliminar el archivo .zip local
<# Write-Host "5. Eliminando $zipName localmente"
Remove-Item -Path $zipName #>

Write-Host "Proceso completado."
