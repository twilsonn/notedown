import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const fonts = ['Brush Script MT', 'Courier New', 'Inter', 'Times New Roman']

const SelectFont: React.FC<{ changeFont: (family: string) => void }> = ({
  changeFont
}) => {
  const [selected, setSelected] = useState(fonts[0])

  const onSelectChange = (f: string) => {
    setSelected(f)
    changeFont(f)
  }

  return (
    <Listbox value={selected} onChange={onSelectChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button
              className="relative bg-gray-200 w-48 h-8 rounded-md shadow-sm border pl-3 pr-10 py-1.5 text-left cursor-default sm:text-sm
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            >
              <span className="block truncate">{selected}</span>
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
              <Listbox.Options className="scrollbar absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {fonts.map((font) => (
                  <Listbox.Option
                    key={font}
                    className={({ active }) =>
                      `${
                        active ? 'text-white bg-blue-400' : 'text-gray-900'
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
                              active ? 'text-white' : 'text-blue-400'
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
