import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const fonts = ['Inter', 'Comic Sans MS', 'Courier New', 'Times New Roman']

const SelectFont: React.FC<{
  changeFont: (family: string) => void
  currentFont: string
}> = ({ changeFont, currentFont }) => {
  const [selected, setSelected] = useState(fonts[0])

  const onSelectChange = (f: string) => {
    setSelected(f)
    changeFont(f)
  }

  useEffect(() => {
    setSelected(currentFont || 'Inter')
  }, [currentFont])

  return (
    <Listbox value={selected} onChange={onSelectChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="menu_select hidden sm:block">
              <span className="truncate text-xs md:text-sm">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute z-10 mt-1 w-full max-h-60 shadow-md rounded-md py-1 overflow-auto focus:outline-none text-xs
              bg-white dark:bg-stone-900 ring-1 ring-black ring-opacity-5 "
              >
                {fonts.map((font) => (
                  <Listbox.Option
                    key={font}
                    className={({ active }) =>
                      `${
                        active
                          ? 'text-white bg-blue-400 dark:bg-stone-800'
                          : 'text-gray-900 dark:text-stone-200'
                      } cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                    value={font}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          }
                            block truncate)
                          `}
                        >
                          {font}
                        </span>

                        {selected ? (
                          <span
                            className={`${
                              active
                                ? 'text-white dark:text-stone-600'
                                : 'text-blue-400 dark:text-blue-700'
                            } 
                              absolute inset-y-0 right-0 flex items-center pr-4
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectFont
