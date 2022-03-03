import {
  DownloadIcon,
  ExclamationIcon,
  UploadIcon,
  XIcon
} from '@heroicons/react/solid'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { syncNotes, updateNotes } from '../../../store/reducers/notesSlicer'

const SelectButton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    icon: JSX.Element
    description: string
  }
> = (props) => {
  const { description, icon } = props
  return (
    <div
      className="flex w-full hover:brightness-95 hover:dark:brightness-125 cursor-pointer"
      {...props}
    >
      <div className="p-5 bg-gray-300 dark:bg-stone-800 rounded-l-2xl">
        <div className="flex justify-center items-center h-full w-full">
          {icon}
        </div>
      </div>
      <div className="p-5 bg-gray-200 dark:bg-stone-700 dark:text-stone-300 rounded-r-2xl w-full">
        <div className="flex justify-start items-center h-full w-full">
          {description}
        </div>
      </div>
    </div>
  )
}

const SyncConflictModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { conflictModal } = useAppSelector((state) => state.notes.present)

  return (
    <div className="flex flex-col bg-white dark:bg-stone-900 shadow-2xl ring-1 ring-gray-200 dark:ring-stone-800 p-8 max-w-lg m-auto rounded-2xl prose dark:prose-invert">
      <div className="flex items-center">
        <ExclamationIcon className="w-9 h-9" />
        <h2 className="m-0 ml-2">Sync Failed</h2>
      </div>
      <div>
        <p>
          Conflicts were detected during the sync. Please select an option below
          to continue.
        </p>
      </div>
      <div className="space-y-4">
        <SelectButton
          onClick={() => {
            dispatch<any>(syncNotes(true))
          }}
          icon={
            <UploadIcon className="w-8 h-8 fill-gray-600 dark:fill-stone-300" />
          }
          description="Upload local version to cloud"
        />
        <SelectButton
          icon={
            <DownloadIcon className="w-8 h-8 fill-gray-600 dark:fill-stone-300" />
          }
          description="Download cloud version"
          onClick={() => {
            conflictModal.syncedNotes && conflictModal.lastUpdate
              ? dispatch(
                  updateNotes({
                    notes: conflictModal.syncedNotes,
                    lastUpdate: conflictModal.lastUpdate
                  })
                )
              : null
          }}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
        >
          <XIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default SyncConflictModal
