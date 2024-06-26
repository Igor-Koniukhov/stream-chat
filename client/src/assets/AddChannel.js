import React from "react"
import { FaPlusCircle } from 'react-icons/fa'

export const AddChannel = ({ setCreateType, setIsCreating, setIsEditing, setToggleContainer, type }) => (
  <FaPlusCircle
    size={14}
    color="green"
    style={{ cursor: 'pointer', opacity: 0.66 }}
    onClick={() => {
      setCreateType(type)
      setIsCreating((prevState) => !prevState)
      setIsEditing(false)
      if (setToggleContainer) setToggleContainer((prevState) => !prevState)
    }}
  />
)
