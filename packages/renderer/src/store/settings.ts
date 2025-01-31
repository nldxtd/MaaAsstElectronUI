import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import version from '@/hooks/caller/version'

export enum Locale {
  zhCN = 'ZhCN',
  enUS = 'EnUS',
}

export interface SettingState {
  penguinReportId: string
  yituliuReportId: string
  forMizuki: boolean
  version: {
    core: {
      current?: string
      latest?: string
    }
    ui: {
      current?: string
      latest?: string
    }
  }
  _locale: Locale
  monsters: boolean
}

export interface SettingAction {
  checkUpdate: () => void
  setPenguinReportId: (reportId: string) => void
  setYituliuReportId: (reportId: string) => void
  changeLocale: (locale: Locale) => void
  updateVersionInfo: () => void
  setForMizuki: (forMizuki: boolean) => void
  toggleMonsters: () => void
}

export interface SettingGetters {
  [K: string]: any
  locale: (state: SettingState) => Locale
}

const useSettingStore = defineStore<'setting', SettingState, SettingGetters, SettingAction>(
  'setting',
  {
    state: () => {
      return {
        penguinReportId: '',
        yituliuReportId: '',
        forMizuki: false,
        version: {
          core: {},
          ui: {}
        },
        _locale: Locale.zhCN,
        monsters: false
      }
    },
    getters: {
      locale (state) {
        if (state.monsters) {
          return Locale.enUS
        }
        return state._locale
      }
    },
    actions: {
      checkUpdate () {
      },
      setPenguinReportId (reportId) {
        this.penguinReportId = reportId
      },
      setYituliuReportId (reportId) {
        this.yituliuReportId = reportId
      },
      changeLocale (locale: Locale) {
        if (this.monsters) {
          this.toggleMonsters()
        }
        this._locale = locale
        const i18n = useI18n()
        i18n.locale.value = this.locale
      },
      async updateVersionInfo () {
        this.version.core.current = await version.core() ?? undefined
        this.version.ui.current = await version.ui()
      },
      setForMizuki (forMizuki: boolean) {
        this.forMizuki = forMizuki
      },
      toggleMonsters () {
        this.monsters = !this.monsters
        if (this.monsters) {
          document.body.className = 'monster'
        } else {
          document.body.className = ''
        }
        const i18n = useI18n()
        i18n.locale.value = this.locale
      }
    }
  }
)

export default useSettingStore
