Install dotnet
```wget -q https://packages.microsoft.com/config/ubuntu/18.10/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-2.2
```

Visual Studio Code
Download .deb from https://code.visualstudio.com/download
```sudo dpkg -i code_1.33.1-1554971066_amd64.deb```

To solve Omnisharp not finding framework:
```export MSBuildSDKsPath="/usr/share/dotnet/sdk/$(dotnet --version)/Sdks"```
