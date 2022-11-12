import React from 'react'

export const MessageCard = ({ msg }) => {
    return(
        <div id = "message-reply">
        <div className={msg.userType=="Student"?"message-card":"message-card-special"}>
          <div class = "card-header d-flex flex-row justify-content-between">
              <div id = "sender-name">{msg.from}</div>
              <div>{msg.date}</div>
              <div class = "upvote d-flex flex-row justify-content-between">
                  <div>0</div>
                  <div>
                      <i class="material-icons icon-styling">change_history</i>
                  </div>                    
              </div>                
          </div>
          <div className="card-body" >
            <h3 className='card-msg'>{msg.title}</h3>
          </div>
        </div>
    </div>
    )
}