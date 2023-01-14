import SystemInformation from 'systeminformation'

export const getArch = (): Api.Maa.Arch => {
  let arch: Api.Maa.Arch = 'NoArch'
  switch (process.arch) {
    case 'x64':
      arch = 'x64'
      break
    case 'arm64':
      arch = 'arm64'
      break
  }
  return arch
}

export const getPlatform = (): Api.Maa.Platform => {
  let platform: Api.Maa.Platform = 'NoPlatform'
  switch (process.platform) {
    case 'win32':
      platform = 'windows'
      break
    case 'darwin':
      platform = 'macos'
      break
    case 'linux':
      platform = 'linux'
      break
  }
  return platform
}

export const getSystemInformation = async (): Promise<any> => {
  return await SystemInformation.getStaticData()
}

export const getDownloadUrlSuffix = (): string => {
  let ret = ''
  const platform = getPlatform()
  switch (platform) {
    case 'windows':
      ret = '-win-x64'
      break
    case 'macos':
      ret = '-macos'
      break
  }
  return ret
}
