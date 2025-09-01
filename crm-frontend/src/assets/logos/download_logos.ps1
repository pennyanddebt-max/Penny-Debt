# PowerShell script to download all bank and NBFC logos for Penny-Debt CRM
$logos = @(
    @{name='sbi.png'; url='https://sbi.co.in/favicon.ico'},
    @{name='hdfc.png'; url='https://www.hdfcbank.com/favicon.ico'},
    @{name='icici.png'; url='https://www.icicibank.com/favicon.ico'},
    @{name='axis.png'; url='https://www.axisbank.com/favicon.ico'},
    @{name='kotak.png'; url='https://www.kotak.com/favicon.ico'},
    @{name='indusind.png'; url='https://www.indusind.com/favicon.ico'},
    @{name='yesbank.png'; url='https://www.yesbank.in/favicon.ico'},
    @{name='idfcfirst.png'; url='https://www.idfcfirstbank.com/favicon.ico'},
    @{name='pnb.png'; url='https://www.pnbindia.in/favicon.ico'},
    @{name='bob.png'; url='https://www.bankofbaroda.in/favicon.ico'},
    @{name='canara.png'; url='https://canarabank.com/favicon.ico'},
    @{name='unionbank.png'; url='https://www.unionbankofindia.co.in/favicon.ico'},
    @{name='bajaj.png'; url='https://www.bajajfinserv.in/favicon.ico'},
    @{name='shriram.png'; url='https://www.shriramfinance.in/favicon.ico'},
    @{name='cholamandalam.png'; url='https://www.cholamandalam.com/favicon.ico'},
    @{name='mahindra.png'; url='https://www.mahindrafinance.com/favicon.ico'},
    @{name='ltfs.png'; url='https://www.ltfs.com/favicon.ico'},
    @{name='adityabirla.png'; url='https://www.adityabirlacapital.com/favicon.ico'},
    @{name='muthoot.png'; url='https://www.muthootfinance.com/favicon.ico'},
    @{name='manappuram.png'; url='https://www.manappuram.com/favicon.ico'},
    @{name='tatacapital.png'; url='https://www.tatacapital.com/favicon.ico'},
    @{name='poonawalla.png'; url='https://poonawallafincorp.com/favicon.ico'},
    @{name='hdbfs.png'; url='https://www.hdbfs.com/favicon.ico'},
    @{name='iifl.png'; url='https://www.iifl.com/favicon.ico'},
    @{name='indiabulls.png'; url='https://www.indiabullshomeloans.com/favicon.ico'},
    @{name='piramal.png'; url='https://www.piramalfinance.com/favicon.ico'},
    @{name='herofincorp.png'; url='https://www.herofincorp.com/favicon.ico'},
    @{name='sundaram.png'; url='https://www.sundaramfinance.in/favicon.ico'},
    @{name='tvscredit.png'; url='https://www.tvscredit.com/favicon.ico'},
    @{name='capitalfloat.png'; url='https://www.capitalfloat.com/favicon.ico'},
    @{name='creditaccess.png'; url='https://www.creditaccessgrameen.in/favicon.ico'},
    @{name='ugro.png'; url='https://www.ugrocapital.com/favicon.ico'},
    @{name='fivestar.png'; url='https://fivestargroup.in/favicon.ico'},
    @{name='aptus.png'; url='https://www.aptusindia.com/favicon.ico'},
    @{name='aavas.png'; url='https://www.aavas.in/favicon.ico'},
    @{name='northernarc.png'; url='https://www.northernarc.com/favicon.ico'},
    @{name='jmfinancial.png'; url='https://www.jmfl.com/favicon.ico'},
    @{name='edelweiss.png'; url='https://www.edelweissfin.com/favicon.ico'}
)

$assetsPath = "${PSScriptRoot}\logos"
if (!(Test-Path $assetsPath)) { New-Item -ItemType Directory -Path $assetsPath }

foreach ($logo in $logos) {
    $dest = "$assetsPath\$($logo.name)"
    Invoke-WebRequest -Uri $logo.url -OutFile $dest
    Write-Host "Downloaded $($logo.name)"
}
Write-Host "All logos downloaded to $assetsPath"
