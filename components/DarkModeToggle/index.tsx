import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import useDarkMode from 'use-dark-mode'

const DarkModeToggle: React.FC = () => {
  const isDark = useDarkMode()

  return (
    <Switch
      checked={isDark.value}
      onChange={isDark.toggle}
      className={`${
        isDark.value ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={`${
          isDark.value ? 'translate-x-4' : 'translate-x-0'
        } pointer-events-none relative inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <span
          className={`${
            isDark.value
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <SunIcon className="w-3 h-3 text-amber-500" />
        </span>
        <span
          className={`${
            isDark.value
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <MoonIcon className="w-3 h-3 text-blue-500" />
        </span>
      </span>
    </Switch>
  )
}

export default DarkModeToggle
