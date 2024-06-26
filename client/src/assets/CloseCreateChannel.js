import React from "react"
import {FaTimesCircle} from 'react-icons/fa'

export const CloseCreateChannel = ({setIsCreating, setIsEditing}) => (
  <FaTimesCircle
    size={32}
    color="var(--primary-color)"
    style={{cursor: 'pointer'}}
    onClick={() => {
      if (setIsCreating) setIsCreating(false)
      if (setIsEditing) setIsEditing(false)
    }}
  />
)
