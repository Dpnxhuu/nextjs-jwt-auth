# Pehle saare node dev servers band karo, phir cache saaf karo
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
}
Write-Host "Done. Ab sirf ek baar chalao: pnpm dev"
