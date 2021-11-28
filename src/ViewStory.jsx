import React from "react";

const ViewStory = ({ stories }) => {

  if (!stories || stories.length === 0) {
    return null;
  }
  return (
    stories.map((story, index) => {
      const timeStamp = new Date(story.timestamp * 1000);
      const dateTime = timeStamp.toISOString().split('T')[0] + ' ' + timeStamp.toISOString().split('T')[1].substring(0, 5)
      return (
        <div className="mb-4" key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
          <div className="bio text-center mb-4">
            <div>Story number {index + 1}: </div>
            <div>message: {story.message}</div>
            <div>story teller: {story.teller}</div>
            <div>Told on :
            <time datetime={timeStamp}>{dateTime}</time>
            </div>

          </div>
        </div>
      )
    })
  )
}

export default ViewStory;