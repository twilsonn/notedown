import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { useModal } from 'react-modal-hook'
import Modal from '../../Modal'
import { CogIcon as CogIconOutline } from '@heroicons/react/outline'
import {
  CogIcon as CogIconSolid,
  MoonIcon,
  SunIcon
} from '@heroicons/react/solid'
import { useSession, signOut } from 'next-auth/react'
import useDarkMode from 'use-dark-mode'
import AuthModal from '../../AuthModal'

const Settings: React.FC = () => {
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal closeModal={hideModal}>
        <AuthModal />
      </Modal>
    )
  })

  const { data: session } = useSession()
  const isDark = useDarkMode()

  return (
    <Menu
      as="div"
      className="relative inline-block text-left transition-colors"
    >
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="flex items-center"
              aria-label="open settings"
            >
              {open ? (
                <CogIconSolid className="w-5 h-5 text-gray-700 dark:text-stone-300" />
              ) : (
                <CogIconOutline className="w-5 h-5 text-gray-700 dark:text-stone-300" />
              )}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`origin-bottom-left absolute left-0 bottom-0 mb-8 w-56 rounded-md shadow-lg ring-1 divide-y  focus:outline-none ${
                isDark.value
                  ? 'divide-stone-800 bg-stone-900 ring-stone-800'
                  : 'divide-gray-100 bg-gray-100 ring-gray-300'
              }`}
            >
              {session?.user && (
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-800 dark:text-stone-400">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-stone-300 truncate">
                    {session?.user?.email}
                  </p>
                </div>
              )}
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active
                          ? 'bg-gray-300 text-gray-900 dark:bg-stone-700 dark:text-stone-200'
                          : 'text-gray-700 dark:text-stone-300'
                      } flex items-center justify-between px-4 py-2 text-sm cursor-pointer`}
                      onClick={isDark.toggle}
                    >
                      Toggle Dark Mode
                      {isDark.value ? (
                        <MoonIcon className="w-4 h-4 text-blue-500" />
                      ) : (
                        <SunIcon className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="https://github.com/twilsonn/notedown"
                      target="_blank"
                      rel="noreferrer"
                      className={`${
                        active
                          ? 'bg-gray-300 text-gray-900 dark:bg-stone-700 dark:text-stone-200'
                          : 'text-gray-700 dark:text-stone-300'
                      } block px-4 py-2 text-sm`}
                    >
                      Github
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                {session?.user ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className={`${
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-stone-700 dark:text-stone-200'
                            : 'text-gray-700 dark:text-stone-300'
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={showModal}
                        className={`${
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-stone-700 dark:text-stone-200'
                            : 'text-gray-700 dark:text-stone-300'
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Sign in
                      </button>
                    )}
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Settings
