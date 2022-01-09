import React, { Fragment, useState } from 'react'
import { useGoogleFonts, GoogleFontsStatus } from '@flyyer/use-googlefonts'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const fonts = [
  {
    name: 'Inter',
    css: "'Inter', sans-serif",
    styles: ['100..900', '100..900italic']
  },
  {
    name: 'Roboto',
    css: "'Roboto', sans-serif",
    styles: ['100..900', '100..900italic']
  },
  {
    name: 'Open Sans',
    css: "''Open Sans', sans-serif",
    styles: ['100..900', '100..900italic']
  },
  {
    name: 'Poppins',
    css: "'Poppins', sans-serif",
    styles: ['100..900', '100..900italic']
  },
  {
    name: 'Playfair Display',
    css: "'Playfair Display', sans-serif",
    styles: ['100..900', '100..900italic']
  },
  {
    name: 'Roboto Mono',
    css: "'Roboto Mono', sans-serif",
    styles: ['100..900', '100..900italic']
  },
  {
    name: 'Source Code Pro',
    css: "'Source Code Pro', sans-serif",
    styles: ['100..900', '100..900italic']
  }
]

const SelectFont: React.FC = () => {
  const [selected, setSelected] = useState(fonts[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="bg-gray-200 relative w-36 border h-8 rounded-md shadow-sm pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
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
                {fonts.map(({ name }) => (
                  <Listbox.Option
                    key={name}
                    className={({ active }) =>
                      `${
                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                      } cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                    value={name}
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
                          {name}
                        </span>

                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-indigo-600'
                            } 
                              absolute inset-y-0 right-0 flex items-center pr-4)
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
