import React from "react"
import { MESSENGER_NAME } from "../../utils/constants"

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">{MESSENGER_NAME}</p>
  </div>
)

export default CompanyHeader