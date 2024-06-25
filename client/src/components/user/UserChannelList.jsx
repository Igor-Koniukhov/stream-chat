import React from "react";
import { AddChannel } from "../../assets";
import {TYPE_MSGING, TYPE_TEAM} from "../../utils/constants";

const UserChannelList = ({
  setToggleContainer,
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  if (error) {
    return type === TYPE_TEAM ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === TYPE_TEAM ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === TYPE_TEAM ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === TYPE_TEAM ? TYPE_TEAM : TYPE_MSGING}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default UserChannelList;
