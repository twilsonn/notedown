import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

import { useEffect, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

import createPersistedState from 'use-persisted-state'

const useColorSchemeState = createPersistedState('theme')

export function useColorScheme(): {
  isDark: boolean
  setIsDark: (value: boolean) => void
} {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)'
    },
    undefined
  )
  const [isDark, setIsDark] = useColorSchemeState<boolean>()

  const value = useMemo(
    () => (isDark === undefined ? !!systemPrefersDark : isDark),
    [isDark, systemPrefersDark]
  )
  useEffect(() => {
    if (value) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [value])

  return {
    isDark: value,
    setIsDark
  }
}
