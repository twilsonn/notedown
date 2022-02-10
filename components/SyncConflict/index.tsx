import React, { useEffect } from 'react'
import { useModal } from 'react-modal-hook'
import { useAppSelector } from '../../store'
import Modal from '../Modal'
import SyncConflictModal from './SyncModal'

const SyncConflict: React.FC = () => {
  const { conflictModal } = useAppSelector((state) => state.notes.present)

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal closeModal={hideModal}>
        <SyncConflictModal />
      </Modal>
    )
  })

  useEffect(() => {
    if (conflictModal.show) {
      showModal()
    } else {
      hideModal()
    }
  }, [conflictModal.show, hideModal, showModal])

  return null
}

export default SyncConflict
