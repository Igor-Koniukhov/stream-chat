import React from "react"
import {FaBolt} from 'react-icons/fa'

export const LightningBolt = ({giphyState, onCommandClick}) => (
  <div onClick={onCommandClick} style={{display: "flex"}}>
    <FaBolt
      size={16}
      color={giphyState ? "var(--primary-color)" : "black"}
      style={{opacity: giphyState ? 1 : 0.2}}
    />
  </div>
)
