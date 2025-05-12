import React, { useEffect } from 'react';

const MessengerChat = ({ pageId }) => {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div 
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id={pageId}
        greeting_dialog_display="show"
        greeting_dialog_delay="3"
        logged_in_greeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?"
        logged_out_greeting="Xin chào! Chúng tôi có thể giúp gì cho bạn?">
      </div>
    </>
  );
};

export default MessengerChat; 